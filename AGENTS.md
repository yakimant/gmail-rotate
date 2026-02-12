# AGENTS.md

## Purpose
Provide guidance for agents working in this repo. Keep changes additive and do not modify the Apps Script source unless explicitly requested.

## Repo overview
- `gmail-rotate.gs` is the Google Apps Script source. Do not edit unless asked.
- Tooling/config files live at repo root.

## Common commands
- `pnpm install`
- `pnpm lint`
- `pnpm format`
- `pnpm test`
- `pnpm deploy`
- `nix develop`

## Conventions
- Prefer small, focused changes.
- Avoid adding secrets or production config to the repo.
- If adding new tooling, document it in `README.md`.
