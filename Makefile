.PHONY: pretty
pretty:
	npx prettier -w .

.PHONY: dapp
dapp:
	cd app && pnpm dev