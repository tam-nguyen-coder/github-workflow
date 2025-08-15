# GitHub Workflow Demo

A simple NestJS API service demonstrating GitHub workflow best practices with development and production environments.

## 🚀 Features

- **Environment-aware API** - Reads configuration from environment variables
- **Health check endpoints** - Monitor application status
- **Docker support** - Containerized deployment
- **GitHub Actions CI/CD** - Automated testing and deployment
- **Multi-environment setup** - Development and production workflows
- **Comprehensive testing** - Unit and E2E tests

## 📋 API Endpoints

| Endpoint  | Method | Description                               |
| --------- | ------ | ----------------------------------------- |
| `/`       | GET    | Hello World message                       |
| `/env`    | GET    | Environment information and configuration |
| `/health` | GET    | Health check with system information      |

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone and install dependencies**:

   ```bash
   git clone <your-repo-url>
   cd github-workflow
   npm install
   ```

2. **Set up environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run the application**:

   ```bash
   # Development mode with hot reload
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

4. **Test the API**:
   ```bash
   curl http://localhost:3000/
   curl http://localhost:3000/env
   curl http://localhost:3000/health
   ```

### Docker Development

```bash
# Run development environment
npm run docker:dev

# Run production environment
npm run docker:prod

# Stop and cleanup
npm run docker:down
```

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🌍 Environment Configuration

The application supports multiple environments through environment variables:

| Variable        | Description                | Default                 |
| --------------- | -------------------------- | ----------------------- |
| `NODE_ENV`      | Environment type           | `development`           |
| `PORT`          | Server port                | `3000`                  |
| `APP_NAME`      | Application name           | `GitHub Workflow Demo`  |
| `APP_VERSION`   | Application version        | `1.0.0`                 |
| `API_URL`       | Base API URL               | `http://localhost:3000` |
| `DEBUG`         | Debug mode                 | `true`                  |
| `DATABASE_URL`  | Database connection string | Not set                 |
| `DEPLOYMENT_ID` | Deployment identifier      | `local`                 |

## 🔄 GitHub Workflow

This project demonstrates a complete GitHub workflow setup:

### Branch Strategy

- `main` - Production branch (protected)
- `develop` - Development branch (protected)
- `feature/*` - Feature branches

### Automated Workflows

- **CI Pipeline** - Runs tests and linting on every PR
- **Development Deployment** - Auto-deploy to dev environment on merge to `develop`
- **Production Deployment** - Deploy to production on merge to `main` (with approval)
- **Dependency Review** - Security scanning on PRs

### Environment Protection

- **Development**: No restrictions for rapid iteration
- **Production**: Requires approval and passing tests

## 📚 Documentation

- [**GitHub Setup Guide**](./docs/github-setup-guide.md) - Complete setup instructions for GitHub workflows
- [**Environment Guide**](./config/environment-guide.md) - Environment configuration reference

## 🏗️ Project Structure

```
github-workflow/
├── .github/workflows/     # GitHub Actions workflows
├── src/                   # Application source code
├── test/                  # E2E tests
├── docs/                  # Documentation
├── config/                # Configuration guides
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Multi-environment setup
└── .env.example          # Environment template
```

## 🚢 Deployment

The application can be deployed using:

1. **Docker**: Use the provided Dockerfile and docker-compose.yml
2. **GitHub Actions**: Automated deployment to your infrastructure
3. **Manual**: Build and run with Node.js

### Docker Deployment

```bash
# Build production image
docker build -t github-workflow .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e APP_NAME="GitHub Workflow Demo" \
  github-workflow
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 Scripts Reference

| Script                | Description                               |
| --------------------- | ----------------------------------------- |
| `npm start`           | Start the application                     |
| `npm run start:dev`   | Start in development mode with hot reload |
| `npm run start:prod`  | Start in production mode                  |
| `npm run build`       | Build the application                     |
| `npm test`            | Run unit tests                            |
| `npm run test:e2e`    | Run end-to-end tests                      |
| `npm run test:cov`    | Run tests with coverage                   |
| `npm run lint`        | Run ESLint                                |
| `npm run format`      | Format code with Prettier                 |
| `npm run docker:dev`  | Run development environment with Docker   |
| `npm run docker:prod` | Run production environment with Docker    |
| `npm run docker:down` | Stop and remove Docker containers         |

## 🐛 Troubleshooting

- **Port already in use**: Change the `PORT` environment variable
- **Tests failing**: Check that all dependencies are installed with `npm ci`
- **Docker issues**: Ensure Docker is running and you have sufficient permissions
- **Environment variables**: Verify all required environment variables are set

## 📝 License

This project is for educational purposes demonstrating GitHub workflow best practices.

---

Built with ❤️ using [NestJS](https://nestjs.com/)
