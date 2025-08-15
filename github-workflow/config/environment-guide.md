# Environment Configuration Guide

This project supports multiple environments with different configurations.

## Environment Files

Create the following files in the project root based on your environment:

### Development Environment (`.env`)
```bash
NODE_ENV=development
PORT=3000
APP_NAME=GitHub Workflow Demo - DEV
APP_VERSION=1.0.0-dev
API_URL=http://localhost:3000
DEBUG=true
DATABASE_URL=mongodb://localhost:27017/github-workflow-dev
DEPLOYMENT_ID=dev-local
```

### Production Environment (`.env` for production deployment)
```bash
NODE_ENV=production
PORT=3000
APP_NAME=GitHub Workflow Demo - PROD
APP_VERSION=1.0.0
API_URL=https://your-production-domain.com
DEBUG=false
DATABASE_URL=mongodb://prod-cluster:27017/github-workflow-prod
DEPLOYMENT_ID=prod-release
```

## Available Endpoints

1. **GET /** - Hello World message
2. **GET /env** - Environment information and configuration
3. **GET /health** - Health check endpoint

## Environment Variables

| Variable | Description | Development Default | Production Example |
|----------|-------------|--------------------|--------------------|
| NODE_ENV | Environment type | development | production |
| PORT | Server port | 3000 | 3000 |
| APP_NAME | Application name | GitHub Workflow Demo - DEV | GitHub Workflow Demo - PROD |
| APP_VERSION | Application version | 1.0.0-dev | 1.0.0 |
| API_URL | Base API URL | http://localhost:3000 | https://your-domain.com |
| DEBUG | Debug mode | true | false |
| DATABASE_URL | Database connection | mongodb://localhost:27017/... | mongodb://prod:27017/... |
| DEPLOYMENT_ID | Deployment identifier | dev-local | prod-release |

## Setup Instructions

1. Copy `.env.example` to `.env`
2. Update the values according to your environment
3. Run `npm run start:dev` for development or `npm run start:prod` for production
