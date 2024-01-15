.PHONY: pretty
pretty:
	npx prettier -w .

.PHONY: dapp
dapp:
	cd dapp && pnpm dev