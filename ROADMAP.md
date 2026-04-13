# 🗺️ ChainBrowser Roadmap

This roadmap outlines the development path for the **ChainBrowser MVP**. We encourage community contributions in all areas! 🚀

---

## 🟢 Phase 1: Core Infrastructure (Current)
- [x] **Project Scaffolding**: Vite + React 19 + TypeScript.
- [x] **Navigation Shell**: Layout and mode switching (Wallet, Explorer, DevTools).
- [x] **Extension Bridge**: Background worker communication and Chrome storage persistence.
- [ ] **Account Onboarding**: Complete the Create/Import wallet flow (BIP39 mnemonics).
- [ ] **Network Management**: Dynamic switching between Stellar Mainnet/Testnet/Futurenet.

## 🟡 Phase 2: Wallet & Assets
- [ ] **Balance Refresh**: Implement background alarm to keep XLM/Token balances up to date.
- [ ] **Payment Flow**: Modal-based transaction signing for XLM payments.
- [ ] **Asset Management**: Trustline creation and asset discovery.
- [ ] **Transaction History**: Detailed view of account operations with Horizon integration.

## 🔵 Phase 3: Developer & dApp Tools
- [ ] **Soroban Lab**: UI for calling contract functions with live event inspection.
- [ ] **Transaction Builder**: Visual tool for composing multi-operation transactions.
- [ ] **dApp Provider**: Inpage script injection for `window.chainbrowser` (SEP-0007 / Stellar Freighter compatible).

## 🟣 Phase 4: Explorer & Analytics
- [ ] **Native Explorer**: Full-featured ledger and operation inspector within the extension.
- [ ] **Asset Analytics**: Price charts and volume data for popular Stellar assets.

---

## 🛠️ How to Contribute

We've designed ChainBrowser to be modular. Pick a feature from the roadmap and follow these steps:

1.  **Check Issues**: Look for issues labeled `good first issue` or `help wanted`.
2.  **Pick a Module**:
    -   **UI Changes**: Work in `src/components/[module]`.
    -   **Stellar Logic**: Update `src/services/stellar/StellarService.ts`.
    -   **State Management**: Update `src/stores/appStore.ts`.
3.  **Submit PR**: Follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🎯 High Priority Tasks (Help Needed!)
1.  **Mnemonic Generation**: Implementation of BIP39 word-list generation in `WalletService`.
2.  **Horizon Error Handling**: Robust retry logic for Horizon connectivity issues.
3.  **Tailwind 4 Theming**: Refining the glassmorphism aesthetic across all screens.
