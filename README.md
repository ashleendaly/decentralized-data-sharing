# A Blockchain-based Data Sharing Scheme using Attribute-Based Encryption and Semi-Fungible Tokens

This repository contains the client and key-generation server for a blockchain-based data-sharing scheme utilizing Ciphertext-Policy Attribute-Based Encryption (CP-ABE) and semi-fungible tokens.

## Project Structure

- **`rabe-wasm`**: Contains a Rust package wrapped as WebAssembly. The compiled WebAssembly files are located in the `public` directory.
- **`src`**: Holds all the files necessary to build and run the web application, including the client-side logic and the key-generation server.
  - **`app`**: Implements folder-based routing for the web application. Each subdirectory represents a distinct route, with `api` specifically handling the key-generation server functionalities.
  - **`components`**: Contains reusable UI components.
  - **`contexts`**: Manages global state, including MetaMask wallet connections.
  - **`contracts`**: Stores the ABIs for the smart contracts.
  - **`lib`**: Includes configuration files for third-party services like Shadowsocks and Supabase.
  - **`util`**: Offers utility functions, including those for interacting with MetaMask or the key-generation server.

## Build Instructions

1. **Install dependencies**: Run `pnpm i` to install the required Node.js packages.
2. **Build the project**:
   - Compile the Rust package to WebAssembly: `pnpm run build:rabe`
   - Build the web application: `pnpm run build:app`
3. **Run the application**: Start the development server with `pnpm dev`.

## Requirements

Before starting, ensure you have the following installed:

- **Node.js**: Required for npm packages and running Node.js commands.
- **pnpm**: A fast, efficient Node.js package manager.
- **Rust and Cargo**: Needed for compiling the Rust code. Cargo is Rust's package manager and build system.
- **wasm-pack**: A tool for building Rust-generated WebAssembly packages for the web.
- **A modern web browser**: For running and interacting with the web application.

## Enviornment Variables

`NEXT_PUBLIC_THIRDWEB_API_KEY`: The API key of the Thirdweb account used for connecting to IPFS
`NEXT_PUBLIC_THIRDWEB_CLIENT_ID`: The client ID of the Thirdweb account used for connecting to IPFS
`APPLICATION_DOMAIN`:"http://localhost:3000"
`NEXT_PUBLIC_SUPABASE_URL`: The connection url to a supabase database
`NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anon key to a supabase database
`INFURA_API_KEY`: The api key to an infura account
