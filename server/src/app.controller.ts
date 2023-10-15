import {
  Controller,
  Post,
  UploadedFiles,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AppService } from '@/app.service';
import { ConfigService } from '@nestjs/config';
import { FinancialFilesType } from '@/types/files';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'balanceSheet', maxCount: 1 },
      { name: 'profitAndLoss', maxCount: 1 },
    ]),
  )
  async uploadFinancialStatements(
    @UploadedFiles()
    files: FinancialFilesType,
    @Response() res,
  ) {
    await this.appService.analyzeFinancialStatements(files, res);
  }
}
