# GitHub Workflow Setup Guide

This guide will walk you through setting up a complete GitHub workflow with development and production environments.

## Prerequisites

- GitHub repository
- Docker Hub account (optional, for container deployment)
- Basic understanding of Git and GitHub

## Step-by-Step Setup Instructions

### 1. Repository Structure Setup

Your repository should have this structure:

```
github-workflow/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Continuous Integration
│       ├── deploy-dev.yml         # Development deployment
│       ├── deploy-prod.yml        # Production deployment
│       └── dependency-review.yml  # Security checks
├── src/                           # Source code
├── test/                          # E2E tests
├── config/                        # Configuration documentation
├── Dockerfile                     # Container configuration
├── docker-compose.yml             # Multi-environment setup
└── .env.example                   # Environment template
```

### 2. Create GitHub Environments

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Environments**
3. Click **New environment**

#### Create Development Environment:

- **Name**: `development`
- **Protection rules**: None (for easy development)
- **Environment secrets**: Add the following secrets:
  ```
  DEV_APP_NAME=GitHub Workflow Demo - DEV
  DEV_API_URL=http://your-dev-server.com
  DEV_DATABASE_URL=mongodb://dev-cluster:27017/github-workflow-dev
  DOCKER_USERNAME=your-dockerhub-username
  DOCKER_PASSWORD=your-dockerhub-password
  ```

#### Create Production Environment:

- **Name**: `production`
- **Protection rules**:
  - ✅ Required reviewers (add yourself and/or team members)
  - ✅ Wait timer: 5 minutes (optional)
  - ✅ Restrict deployments to protected branches
- **Environment secrets**: Add the following secrets:
  ```
  PROD_APP_NAME=GitHub Workflow Demo - PROD
  PROD_API_URL=https://your-production-domain.com
  PROD_DATABASE_URL=mongodb://prod-cluster:27017/github-workflow-prod
  DOCKER_USERNAME=your-dockerhub-username
  DOCKER_PASSWORD=your-dockerhub-password
  ```

### 3. Set Up Branch Protection Rules

1. Go to **Settings** → **Branches**
2. Click **Add rule** or **Add branch protection rule**

#### For `main` branch (Production):

- **Branch name pattern**: `main`
- ✅ Require a pull request before merging
  - ✅ Require approvals: 1
  - ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - **Status checks**: Select `Test and Lint` (will appear after first CI run)
- ✅ Require conversation resolution before merging
- ✅ Include administrators
- ✅ Restrict pushes that create matching branches

#### For `develop` branch (Development):

- **Branch name pattern**: `develop`
- ✅ Require a pull request before merging
  - ✅ Require approvals: 1
- ✅ Require status checks to pass before merging
  - **Status checks**: Select `Test and Lint`
- ✅ Include administrators

### 4. Create Branch Structure

```bash
# Create and setup develop branch
git checkout -b develop
git push -u origin develop

# Set develop as default branch for new PRs (optional)
# Go to Settings → General → Default branch → Switch to 'develop'
```

### 5. GitHub Repository Secrets

Add these repository-wide secrets in **Settings** → **Secrets and variables** → **Actions**:

```
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password
```

### 6. Workflow Triggers

The workflows will trigger as follows:

- **CI (ci.yml)**: Runs on every push and PR to `main` and `develop`
- **Development Deploy (deploy-dev.yml)**: Runs on push to `develop` branch
- **Production Deploy (deploy-prod.yml)**: Runs on push to `main` branch or version tags
- **Dependency Review**: Runs on every pull request

### 7. Testing the Workflow

1. **Create a feature branch**:

   ```bash
   git checkout develop
   git checkout -b feature/add-new-endpoint
   # Make some changes
   git add .
   git commit -m "Add new feature"
   git push -u origin feature/add-new-endpoint
   ```

2. **Create Pull Request**:
   - Target: `develop` branch
   - This will trigger CI workflow

3. **Merge to develop**:
   - After CI passes and PR is approved
   - This will trigger development deployment

4. **Create Release PR**:
   - From `develop` to `main`
   - This will trigger CI workflow

5. **Merge to main**:
   - After CI passes and PR is approved
   - This will trigger production deployment with environment protection

### 8. Local Development

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run start:dev

# Run tests
npm test
npm run test:e2e

# Test with Docker
npm run docker:dev
```

### 9. API Endpoints

Once deployed, your API will have these endpoints:

- `GET /` - Hello World message
- `GET /env` - Environment information and configuration
- `GET /health` - Health check endpoint

Example response from `/env`:

```json
{
  "environment": "production",
  "port": 3000,
  "appName": "GitHub Workflow Demo - PROD",
  "version": "1.0.0",
  "database": "Connected",
  "apiUrl": "https://your-production-domain.com",
  "debugMode": false,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "deploymentId": "prod-abc123"
}
```

### 10. Monitoring and Troubleshooting

- **View workflow runs**: Go to **Actions** tab in your repository
- **Check environment deployments**: Go to **Settings** → **Environments**
- **View logs**: Click on any workflow run to see detailed logs
- **Health checks**: Use the `/health` endpoint to verify deployments

## Best Practices

1. **Never commit secrets** - Always use GitHub secrets and environment variables
2. **Test locally first** - Use Docker Compose to test multi-environment setup
3. **Small commits** - Make focused, small commits for easier review
4. **Descriptive PR titles** - Help reviewers understand the changes
5. **Keep branches updated** - Regularly sync with main/develop branches

## Troubleshooting

- **Tests failing**: Check the test output in the Actions tab
- **Deployment failing**: Verify environment secrets are set correctly
- **Docker issues**: Check Dockerfile and docker-compose.yml configuration
- **Environment variables**: Ensure all required secrets are configured in GitHub

## Next Steps

- Add database integration
- Implement authentication
- Add monitoring and logging
- Set up SSL certificates
- Configure custom domains
- Add more comprehensive testing
