set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

lint:
  pnpm lint

format:
  pnpm format

test:
  pnpm test

deploy:
  pnpm deploy
