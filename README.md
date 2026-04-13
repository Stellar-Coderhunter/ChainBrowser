# 🔗 ChainBrowser - Web3 Browser Extension for Stellar & Blockchain

<p align="center">
  <img src="public/favicon.svg" alt="ChainBrowser Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>A browser extension focused on blockchain (especially Stellar) - Think: Chrome + MetaMask + Stellar tools built-in</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## 💡 What Is ChainBrowser?

ChainBrowser is a **browser extension** built specifically for blockchain users, developers, and Web3 applications. It provides a seamless experience for interacting with the Stellar network and other blockchains.

**Vision:** "Google Chrome + MetaMask + Stellar tools built-in"

---

## 🧠 Problem It Solves

Right now in Web3:
- ❌ Users install many separate extensions
- ❌ Wallets are disconnected from browsing experience
- ❌ Developer tools are scattered across multiple platforms
- ❌ No unified blockchain browsing experience

## 🚀 Our Solution

A browser extension where:
- ✅ Wallet is built-in and native
- ✅ Stellar tools are integrated seamlessly
- ✅ Web3 interaction is frictionless
- ✅ Developer mode for smart contract testing
- ✅ Built-in blockchain explorer

---

## ✨ Core Features

### 1. 🔐 Built-in Wallet
- Create and manage Stellar wallets
- Secure key management
- Send/receive assets (XLM, tokens, NFTs)
- Multi-account support

### 2. 🌐 dApp Browser
- Open Web3 applications directly
- Automatic wallet connection
- Transaction signing and approval

### 3. 📊 Transaction Panel
- View transaction history
- Confirm and sign actions
- Message signing support
- Real-time status updates

### 4. 🛠️ Developer Mode
- Test Soroban smart contracts
- Interact with Stellar network
- Debug transactions
- Network inspection tools

### 5. 🔄 Network Switcher
- **Mainnet** - Production Stellar network
- **Testnet** - Testing environment
- **Futurenet** - Soroban development
- **Local network** - Custom RPC endpoints

### 6. 🔍 Built-in Explorer
- View account details and balances
- Inspect smart contracts
- Track transaction status
- Asset analytics

---

## 🧰 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite + CRXJS (Chrome Extension) |
| **Styling** | TailwindCSS 4 |
| **Blockchain** | Stellar SDK + Soroban Client |
| **State Management** | Zustand / Context API |
| **Wallet** | Stellar Freighter Integration |
| **Testing** | Vitest + React Testing Library |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────┐
│         Chromium Extension Base         │
├─────────────────────────────────────────┤
│           Custom UI Layer               │
│  ┌──────────┬──────────┬──────────┐    │
│  │  Wallet  │  dApp    │  Dev     │    │
│  │  Module  │ Browser  │  Tools   │    │
│  └──────────┴──────────┴──────────┘    │
├─────────────────────────────────────────┤
│        Wallet + Stellar SDK Layer       │
├─────────────────────────────────────────┤
│     Network Layer (RPC/API Services)    │
└─────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Chrome/Edge/Brave** browser (Chromium-based)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/chainbrowser.git
cd chainbrowser
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Load extension in browser**
   - Open Chrome/Edge and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder from the project

### Building for Production

```bash
npm run build
# or
yarn build
```

The built extension will be in the `dist/` folder.

---

## 📁 Project Structure

```
ChainBrowser/
├── .github/                    # GitHub templates (issues, PRs, workflows)
├── public/                     # Static assets
│   ├── icons/                  # Extension icons (16, 48, 128px)
│   └── favicon.svg
├── src/
│   ├── assets/                 # Images, fonts, etc.
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Base UI components (buttons, inputs, etc.)
│   │   ├── wallet/             # Wallet-related components
│   │   ├── explorer/           # Blockchain explorer components
│   │   └── devtools/           # Developer tools components
│   ├── services/               # Business logic and external APIs
│   │   ├── stellar/            # Stellar SDK integration
│   │   ├── wallet/             # Wallet management
│   │   └── network/            # Network configuration
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # State management (Zustand stores)
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   ├── background/             # Extension background scripts
│   ├── popup/                  # Extension popup UI
│   ├── options/                # Extension options/settings page
│   ├── content/                # Content scripts for web pages
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Application entry point
├── manifest.json               # Extension manifest (v3)
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # TailwindCSS configuration
├── package.json
└── README.md
```

---

## 🗺️ Roadmap & Contributing

ChainBrowser is an community-driven project. We've defined a clear path to MVP:

- 🛤️ **[Full Roadmap](ROADMAP.md)**: See what we're building and where you can help.
- 🤝 **[Contributing Guide](CONTRIBUTING.md)**: Our standards and workflow.

### 🚀 Developer Quick Start: Adding a Module

Want to add a new tool to the Developer Suite or a new Explorer view? 

1.  **Define the UI**: Create your component in `src/components/[module_name]/`.
2.  **Add a Route**: Register your component in `src/App.tsx`.
3.  **Update Navigation**: (If it's a top-level mode) Add it to `src/components/ui/Navigation.tsx`.
4.  **Use the Store**: Connect your logic to `useAppStore()` for persistence and network state.

---

## 🎯 Contributing

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Community

- 🌐 **Website**: [Coming Soon](#)
- 💬 **Discord**: [Join our community](#)
- 🐦 **Twitter**: [@ChainBrowser](#)
- 📧 **Email**: hello@chainbrowser.dev
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-org/chainbrowser/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/your-org/chainbrowser/discussions)

---

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org/) for the Stellar network
- [Vite](https://vitejs.dev/) for the blazing-fast build tool
- [CRXJS](https://crxjs.dev/) for Chrome Extension tooling
- [React](https://react.dev/) for the UI framework
- All our amazing contributors! 🌟

---

<p align="center">
  <strong>Built with ❤️ for the Stellar ecosystem</strong>
</p>

<p align="center">
  ⭐ Star this repo if you find it helpful!
</p>
