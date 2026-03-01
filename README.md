# api-session-manager-sdk

TypeScript/Node.js client SDK for the [api-session-manager](https://github.com/bartekdobija/api-session-manager) REST service.

## Requirements

- Node.js >= 18.0.0 (compatible with Node.js 25)
- TypeScript >= 5.0.0

## Installation

```bash
npm install @spotly/api-session-manager-sdk
```

## Usage

```typescript
import { Api } from '@spotly/api-session-manager-sdk';

const client = new Api({
  baseURL: 'http://localhost:8087',
});

// Create a session
const session = await client.v1.createSession({ account: 'your-account-uuid' });

// Get a session
const sessionData = await client.v1.getSession('your-session-token');

// Delete a session
await client.v1.deleteSession('your-session-token');
```

## API

### `Api`

The main client class extending `HttpClient`.

#### `v1.createSession(data: SessionCreationDto, params?: RequestParams)`

Creates a new session for the given account UUID.

#### `v1.getSession(token: string, params?: RequestParams)`

Retrieves session information for the given token.

#### `v1.deleteSession(token: string, params?: RequestParams)`

Deletes the session identified by the given token.

## SDK Generation

The SDK is generated from a Swagger/OpenAPI specification using [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api).

To regenerate the SDK from a Swagger file, place the file in the `swagger/` directory and run:

```bash
npm run sdk:generate
```

## Build

```bash
npm run build
```

## Dependencies

| Package | Version |
|---------|---------|
| axios | ^1.13.6 |
| dotenv | ^17.3.1 |
| typescript | ^5.9.3 |

## License

MIT
