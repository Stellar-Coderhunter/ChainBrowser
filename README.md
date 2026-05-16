# ChainBrowser

<p align="center">
  <img src="public/favicon.svg" alt="ChainBrowser Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>An AI-powered Web3 browser companion for Stellar: wallet, explorer, dApp access, and developer tooling in one extension.</strong>
</p>

<p align="center">
  <a href="#vision">Vision</a> •
  <a href="#problem">Problem</a> •
  <a href="#solution">Solution</a> •
  <a href="#ai-features">AI Features</a> •
  <a href="#grant-readiness">Grant Readiness</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## Vision

ChainBrowser is a browser extension designed to make Stellar easier to use, safer to navigate, and more productive to build on.

The long-term vision is simple:

**Make blockchain interaction feel as intuitive as modern web browsing.**

Instead of forcing users to stitch together wallets, explorers, documentation, transaction decoders, and developer tools across many tabs and extensions, ChainBrowser brings the core Web3 workflow into one interface.

---

## Problem

Today, Stellar and broader Web3 adoption still face a tooling gap:

- Users juggle multiple tools for wallets, explorers, and dApp interaction
- Transaction details are often too technical for everyday users
- Developers waste time switching between docs, RPC tools, contract explorers, and test environments
- New users struggle to understand risk before signing transactions
- Ecosystem discovery is fragmented, especially for emerging dApps and onchain tools

This creates friction for three groups that matter to ecosystem growth:

- End users who want a safer and simpler way to interact with dApps
- Developers who need faster debugging and smarter contract tooling
- Ecosystem teams who benefit from better onboarding, retention, and transaction confidence

---

## Solution

ChainBrowser is an extension-first product that combines:

- A built-in Stellar wallet experience
- A dApp-aware browser companion layer
- A transaction review and signing interface
- A blockchain explorer and network inspector
- AI-assisted guidance for users and developers

In short, ChainBrowser aims to be:

**Browser + Wallet + Explorer + AI Copilot for Stellar**

---

## Core Features

### 1. Wallet Layer

- Create and manage Stellar wallets
- Support account switching and multi-account flows
- Send and receive XLM, tokens, and future asset types
- Provide secure signing and transaction approval UX

### 2. dApp Access Layer

- Detect Web3-ready pages and streamline wallet connection
- Support in-context signing flows
- Improve dApp usability without requiring users to leave the page

### 3. Explorer Layer

- Inspect accounts, balances, assets, and contract activity
- Track transaction status and history
- Surface developer-relevant network and contract information

### 4. Developer Mode

- Test Soroban interactions faster
- Inspect RPC/network behavior
- Debug contract calls and transaction failures
- Provide a better local-to-testnet workflow

### 5. Multi-Network Support

- Mainnet
- Testnet
- Futurenet
- Local/custom RPC environments

---

## AI Features

ChainBrowser’s strongest differentiation is its AI layer. The goal is not to add generic chatbot functionality, but to build **high-utility AI features tightly connected to real onchain workflows**.

### AI Transaction Explainer

- Converts raw transaction details into plain-language summaries
- Explains what a transaction will do before the user signs
- Highlights asset movement, contract calls, account changes, and possible risk signals

Example value:
"This transaction will swap your USDC for XLM, approve contract access for one action, and pay an estimated network fee of X."

### AI Risk Assistant

- Flags suspicious transaction patterns
- Warns users about blind signing or unexpected approvals
- Helps users recognize phishing-like dApp behavior or unusual contract requests

### AI dApp Page Interpreter

- Reads the current dApp page context and explains what the user is about to do
- Identifies likely user actions such as swapping, minting, staking, bridging, or claiming rewards
- Reduces confusion for non-technical users

### AI Contract and Event Explainer

- Summarizes smart contract methods in human language
- Interprets emitted events and transaction results
- Helps developers and users understand what happened after execution

### AI Debug Copilot for Developers

- Explains likely causes of failed transactions
- Suggests missing parameters, balance issues, auth problems, or network mismatches
- Shortens the debugging cycle for Soroban builders

### AI Ecosystem Discovery

- Helps users discover useful Stellar dApps, tools, and workflows
- Surfaces context-aware suggestions based on intent, such as payments, swaps, NFTs, developer tools, or testing flows

### AI Portfolio and Activity Insights

- Summarizes account activity in natural language
- Gives users a clean explanation of recent transactions, balances, and notable changes
- Makes account monitoring easier for less technical users

---

## Why AI Matters Here

Most blockchain interfaces expose technical details but do not help users understand them.

ChainBrowser uses AI to improve:

- **Clarity**: explain what the chain is doing
- **Safety**: warn before users sign risky actions
- **Speed**: help developers diagnose failures faster
- **Accessibility**: make Stellar easier for new users to adopt

This is especially valuable for grant support because it creates tooling that can improve both **ecosystem usability** and **developer productivity**, not just one niche workflow.

---

## Grant Readiness

ChainBrowser is positioned as ecosystem infrastructure rather than just a consumer extension.

### Grant Thesis

ChainBrowser can help the Stellar ecosystem by reducing the friction between:

- discovering dApps
- understanding transactions
- signing safely
- debugging smart contract interactions

That makes it a strong fit for grants focused on:

- developer tooling
- user onboarding
- wallet innovation
- ecosystem accessibility
- AI applied to public blockchain infrastructure

### Public Value Proposition

If successful, ChainBrowser can:

- lower the learning curve for new Stellar users
- reduce failed or misunderstood transactions
- help developers ship and test faster
- improve trust in onchain interaction through better explanations
- create reusable AI-assisted transaction interpretation patterns for the ecosystem

### Proposed Deliverables

- A working browser extension MVP for Stellar
- AI transaction explanation and signing review flows
- AI-assisted contract/debug tooling for developers
- Explorer and account activity views
- Testnet and developer-mode support for Soroban builders

### Suggested Success Metrics

- Number of extension installs or active testers
- Number of transactions reviewed through AI explanation flows
- Reduction in failed or abandoned signing flows during testing
- Number of developers using the debug assistant in testnet workflows
- Number of Stellar dApps tested with the extension

### Why This Is Fundable

This project is more compelling than a standard wallet pitch because it sits at the intersection of:

- wallet UX
- security education
- AI explainability
- developer tooling
- ecosystem growth

It is easier to justify in a grant context when framed as a **shared access layer for the Stellar ecosystem**, not just a standalone product.

---

## Technical Direction

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite + CRXJS |
| Styling | TailwindCSS 4 |
| Blockchain | Stellar SDK + Soroban Client |
| State Management | Zustand / Context API |
| Wallet Integration | Freighter-compatible and native wallet flows |
| Testing | Vitest + React Testing Library |
| AI Layer | Planned transaction interpretation, contract analysis, and UX assistant services |

---

## Architecture

```text
┌───────────────────────────────────────────────┐
│            Chromium Extension Shell           │
├───────────────────────────────────────────────┤
│                 UI Experience                 │
│  ┌──────────┬──────────────┬───────────────┐ │
│  │ Wallet   │ Explorer     │ Dev Tools     │ │
│  │ Module   │ + Activity   │ + Inspector   │ │
│  └──────────┴──────────────┴───────────────┘ │
├───────────────────────────────────────────────┤
│               AI Assistance Layer             │
│  Explain • Warn • Summarize • Debug • Guide  │
├───────────────────────────────────────────────┤
│            Stellar SDK / Soroban Layer        │
├───────────────────────────────────────────────┤
│         RPC, Indexing, and Data Services      │
└───────────────────────────────────────────────┘
```

---

## Roadmap

### Phase 1: Foundation MVP

- [x] Project scaffolding
- [ ] Basic wallet creation and management
- [ ] Stellar network connectivity
- [ ] Simple extension popup UI
- [ ] Initial account and transaction viewer

### Phase 2: Core Web3 Workflows

- [ ] Full wallet send/receive flows
- [ ] dApp connection and signing support
- [ ] Network switcher
- [ ] Transaction history
- [ ] Basic explorer functionality

### Phase 3: AI Safety and Explainability

- [ ] AI transaction explainer
- [ ] AI signing risk warnings
- [ ] AI account activity summaries
- [ ] AI dApp page interpreter

### Phase 4: Developer Intelligence

- [ ] Soroban contract interaction assistant
- [ ] AI debug copilot for failed transactions
- [ ] Contract method and event explanation
- [ ] Advanced developer inspection tools

### Phase 5: Ecosystem Expansion

- [ ] Extension API for ecosystem integrations
- [ ] dApp discovery and recommendation layer
- [ ] Plugin system
- [ ] Mobile companion experience

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x or yarn >= 1.22.x
- Chrome, Edge, or Brave

### Installation

```bash
git clone https://github.com/Stellar-Coderhunter/ChainBrowser.git
cd ChainBrowser
npm install
npm run dev
```

### Load the Extension

1. Open `chrome://extensions/`
2. Enable Developer Mode
3. Click `Load unpacked`
4. Select the built extension directory

### Production Build

```bash
npm run build
```

---

## Ideal Grant Narrative

If you are submitting this for funding, the strongest framing is:

**ChainBrowser builds an AI-assisted access layer for Stellar that improves transaction clarity, user safety, and developer productivity inside the browser.**

That pitch is stronger than:

**We are building a wallet extension.**

The first sounds like ecosystem infrastructure. The second sounds like a crowded product category.

---

## Contributing

Contributions are welcome. Areas that are especially valuable:

- Stellar wallet flows
- Soroban integration
- browser extension security
- AI prompt and evaluation design
- transaction decoding and explainability
- developer tooling UX

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
