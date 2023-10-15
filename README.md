# Credit Package

This is a simple tool for FinOps to upload financial statements, including balance sheet and profit and loss statement,
and extract some important values to do financial analysis for customer onboardings.

## How it works

We firstly use AWS Textract as the OCR tools to extract texts from PDF files.
Then those information is sent to GPT-4 to generate a JSON response with the information we need.

## Folders

- cli: This folder contains command line tools for early stage POC of integrating Textract and GPT-4.
- client: The front-end for the credit package app.
- server: The API server backend for the credit package app.

## Build

```bash
make build
```

## Run
```bash
AWS_ACCESS_KEY_ID="key" \
AWS_SECRET_ACCESS_KEY="access key" \
OPENAI_API_KEY="key" \
make run
```
