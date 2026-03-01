# AGENTS.md

This document describes conventions and guidelines for AI coding agents working on this repository.

## Repository Overview

`api-session-manager-sdk` is a TypeScript/Node.js client SDK for the `api-session-manager` REST service. The SDK is auto-generated from an OpenAPI/Swagger specification using [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api).

## Technology Stack

- **Language**: TypeScript 5.x
- **Runtime**: Node.js >= 18.0.0 (compatible with Node.js 25)
- **HTTP client**: axios 1.x
- **Build tool**: TypeScript compiler (`tsc`)
- **SDK generator**: swagger-typescript-api 13.x

## Project Structure

```
.
├── src/
│   ├── index.ts               # Re-exports from lib/
│   └── lib/
│       └── api-session-manager.ts  # Generated SDK (do not edit manually)
├── dist/                      # Build output (committed to repo)
├── swagger/                   # Place Swagger/OpenAPI specs here for generation
├── .scripts/
│   ├── generator.js           # SDK generation script
│   ├── sync.js                # Swagger sync script
│   └── release.sh             # Release script
├── package.json
├── tsconfig.json
└── README.md
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run sdk:generate` | Regenerate SDK from Swagger spec |
| `npm run release` | Generate, build, and publish to npm |

## Development Guidelines

### Source Files

- **`src/lib/api-session-manager.ts`** is auto-generated. Regenerate it using `npm run sdk:generate` rather than editing it manually whenever possible.
- When the Swagger spec changes, run `npm run sdk:generate` to regenerate the SDK.

### TypeScript

- The project targets **TypeScript 5.x** with `moduleResolution: "node10"`.
- Strict mode is enabled; all types must be explicitly defined.
- Build with `npm run build` and resolve all TypeScript errors before committing.

### axios

- The project uses **axios 1.x**. Note that axios 1.x changed the headers API compared to 0.x:
  - Method-specific headers (`headers.common`, `headers.post`, `headers.put`) are no longer supported on `AxiosRequestConfig`.
  - Use `AxiosHeaders` or plain header objects instead.

### Dependencies

- Keep dependencies up to date.
- Run `npm audit` after updating dependencies and address any vulnerabilities.
- Do not downgrade TypeScript below 5.x or axios below 1.x.

### Build Artifacts

- The `dist/` directory is committed to the repository (it is the published package output).
- Rebuild (`npm run build`) before committing changes to source files.

## Security

- Do not commit secrets, tokens, or credentials.
- The `.env` file is gitignored; use it for local configuration only.
- Run `npm audit` regularly and fix vulnerabilities promptly.
