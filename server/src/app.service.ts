import * as Promise from 'bluebird';
import { Logger, Injectable } from '@nestjs/common';
import { uploadS3 } from '@/helper/s3';
import { extractTextAsync, getDetectionResult } from '@/helper/textract';
import { sleep } from '@/helper/utils';
import { analyzeFinancialStatements } from '@/helper/analyze';
import { FinancialFilesType } from '@/types/files';
import { mockReport } from '@/mocks/mockFileResponse';
import { ServerResponse } from 'http';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async analyzeFinancialStatements(
    uploaded: FinancialFilesType,
    stream: ServerResponse,
  ): Promise<void> {
    const bsFile = uploaded.balanceSheet?.[0];
    const plFile = uploaded.profitAndLoss?.[0];

    // Return mock report if MOCK_REPORT is true
    if (process.env.MOCK_REPORT === 'true') {
      stream.write(mockReport);
      stream.end();
      return;
    }

    // Upload files to s3
    this.logger.log('Uploading files to S3');
    const files = [bsFile, plFile];
    await Promise.map(files, (file) =>
      uploadS3(file.originalname, file.buffer),
    );
    stream.write(' ');

    // Textract asynchronous text detection
    this.logger.log('Start Textract asynchronous text detection');
    const jobIds = await Promise.map(files, (file) =>
      extractTextAsync(file.originalname),
    );
    stream.write(' ');

    // Get result
    const pollInterval = process.env.TEXTRACT_POLL_INTERVAL_MS || 2000;
    let jobReps: Array<string[] | boolean> = [false, false];
    while (!jobReps.every((status) => status)) {
      jobReps = await Promise.map(jobIds, (id) => getDetectionResult(id));
      this.logger.log('waiting for result...');
      await sleep(pollInterval);
    }
    stream.write(' ');

    // Call GPT to analyze
    this.logger.log('Analyzing financial statements');
    let statements = jobReps.flat().join('\n');
    // TODO: Remove this line before product release
    statements = statements.replace(/Heycart|Kpack/g, 'Example');

    await analyzeFinancialStatements(statements, this.logger, stream);
  }
}
