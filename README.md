# gmail-rotate

Minimal bootstrap for local development and deployment of the Apps Script project.

## Requirements
- Node.js latest LTS
- pnpm
- Optional: Nix + direnv for a reproducible devshell

## Quick start
```bash
pnpm install
pnpm lint
pnpm format
pnpm test
```

## Deploy
This repo uses `clasp` for Google Apps Script deployment.

1) Install dependencies:
```bash
pnpm install
```

2) Authenticate clasp (one-time):
```bash
pnpm exec clasp login
```

3) Create a `.clasp.json` with your script id:
```json
{
  "scriptId": "YOUR_SCRIPT_ID",
  "rootDir": "."
}
```

4) Deploy:
```bash
pnpm deploy
```

Notes:
- `pnpm deploy` runs `clasp push` (no versioning).
- `.env` is optional; existing environment variables take precedence over `.env` values when using `dotenv`.

## Nix devshell (optional)
```bash
nix develop
```

If you use direnv:
```bash
direnv allow
```

## CI
GitHub Actions runs lint and test on PRs and on `master`. Deploy runs on `master` when secrets are present.

Required secrets for deploy:
- `CLASPRC_JSON`: contents of `~/.clasprc.json`
- `CLASP_JSON`: contents of `.clasp.json`
