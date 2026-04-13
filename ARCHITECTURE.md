# 🏗️ ChainBrowser Architecture

This document provides a comprehensive overview of the ChainBrowser architecture, design patterns, and technical decisions.

---

## 📋 Table of Contents

- [System Architecture](#system-architecture)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Extension Architecture](#extension-architecture)
- [Security Model](#security-model)
- [Technology Stack](#technology-stack)
- [Design Patterns](#design-patterns)
- [Future Enhancements](#future-enhancements)

---

## 🖥️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Extension                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │              UI Layer (React)                     │   │
│  │  ┌─────────┬──────────┬──────────┬──────────┐   │   │
│  │  │ Wallet  │ Explorer │ DevTools │ Settings │   │   │
│  │  └─────────┴──────────┴──────────┴──────────┘   │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Service Layer (Business Logic)          │   │
│  │  ┌──────────────┬──────────────┬──────────────┐ │   │
│  │  │   Stellar    │    Wallet    │   Network    │ │   │
│  │  │   Service    │   Service    │   Service    │ │   │
│  │  └──────────────┴──────────────┴──────────────┘ │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Extension Layer (Chrome APIs)            │   │
│  │  ┌──────────┬──────────┬───────────────────┐    │   │
│  │  │Background│  Content │   Inpage Script   │    │   │
│  │  │ Worker   │  Script  │   (Web3 Provider) │    │   │
│  │  └──────────┴──────────┴───────────────────┘    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              External Services                           │
│  ┌──────────────┬──────────────┬──────────────────┐    │
│  │   Horizon    │   Soroban    │    Other dApps   │    │
│  │     API      │     RPC      │                  │    │
│  └──────────────┴──────────────┴──────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Component Architecture

### React Component Hierarchy

```
App
├── Navigation
├── Routes
│   ├── Wallet (default)
│   │   ├── WalletList
│   │   ├── WalletCard
│   │   ├── CreateWalletModal
│   │   └── WalletActions
│   ├── Explorer
│   │   ├── SearchBar
│   │   ├── AccountDetails
│   │   ├── TransactionList
│   │   └── AssetViewer
│   ├── DevTools
│   │   ├── ContractTester
│   │   ├── TransactionBuilder
│   │   ├── NetworkInspector
│   │   └── DebugConsole
│   └── Settings
│       ├── NetworkSelector
│       ├── SecuritySettings
│       └── Preferences
└── GlobalProviders
    ├── ThemeProvider
    └── WalletProvider
```

### Component Organization

```
src/
├── components/
│   ├── ui/              # Shared UI components
│   │   ├── Button
│   │   ├── Input
│   │   ├── Modal
│   │   ├── Navigation
│   │   └── Settings
│   ├── wallet/          # Wallet-specific components
│   ├── explorer/        # Explorer-specific components
│   └── devtools/        # DevTools-specific components
├── hooks/               # Custom React hooks
├── stores/              # State management (Zustand)
└── services/            # Business logic services
```

---

## 🔄 Data Flow

### State Management Flow

```
User Action → Component → Zustand Store → Service → API → Store → Component
     ↓           ↓           ↓              ↓         ↓       ↓         ↓
   Click     Dispatch    Update State   Call SDK   Fetch   Update   Re-render
```

### State Management Strategy

**Zustand** is used for global state management with the following approach:

1. **Persisted State**: Wallets, networks, settings (stored in chrome.storage)
2. **Ephemeral State**: UI state, loading states, temporary data
3. **Derived State**: Computed values from store selectors

### Store Structure

```typescript
AppState {
  // Network
  currentNetwork: Network
  availableNetworks: Network[]
  
  // Wallet
  wallets: Wallet[]
  activeWallet: Wallet | null
  
  // UI
  isLoading: boolean
  error: string | null
  
  // Actions
  setNetwork, addWallet, removeWallet, ...
}
```

---

## 🔌 Extension Architecture

### Chrome Extension Manifest V3 Components

#### 1. **Background Service Worker**
- **Location**: `src/background/index.ts`
- **Purpose**: 
  - Handle extension lifecycle events
  - Manage persistent storage
  - Process messages from popup/content scripts
  - Execute periodic tasks (balance refresh)
  - Coordinate wallet operations

#### 2. **Popup UI**
- **Location**: `src/popup/` (main React app)
- **Purpose**:
  - Primary user interface
  - Wallet management
  - Transaction signing
  - Network selection

#### 3. **Content Script**
- **Location**: `src/content/index.ts`
- **Purpose**:
  - Inject Web3 provider into web pages
  - Bridge between dApps and extension
  - Handle message passing

#### 4. **Inpage Script**
- **Location**: `public/inpage.js` (future)
- **Purpose**:
  - Provide `window.chainbrowser` API
  - Standard Web3 provider interface
  - dApp integration

### Communication Flow

```
dApp ←→ Inpage Script ←→ Content Script ←→ Background Worker ←→ Popup
  ↓          ↓                ↓                  ↓                ↓
Web3     window.postMessage  chrome.runtime    chrome.storage    React UI
API        messages           messaging          persistence      Components
```

---

## 🔒 Security Model

### Key Security Principles

1. **Private Key Protection**
   - Keys never leave the extension
   - Encrypted storage using Chrome's secure storage
   - Auto-lock feature with timeout

2. **Transaction Signing**
   - User confirmation required for all transactions
   - Clear transaction details display
   - No automatic signing without consent

3. **Network Security**
   - HTTPS-only connections to Stellar APIs
   - Network passphrase validation
   - Custom network verification

4. **Content Security Policy**
   - Strict CSP in manifest.json
   - No inline scripts (except WASM)
   - Resource whitelisting

### Security Layers

```
┌─────────────────────────────────────┐
│    User Confirmation Layer          │  ← Manual approval required
├─────────────────────────────────────┤
│    Encryption Layer                 │  ← Keys encrypted at rest
├─────────────────────────────────────┤
│    Validation Layer                 │  ← Input sanitization
├─────────────────────────────────────┤
│    Network Layer                    │  ← HTTPS, CSP
└─────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Core Technologies

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 19 | UI library |
| **Language** | TypeScript | Type safety |
| **Build Tool** | Vite + CRXJS | Fast builds, extension support |
| **Styling** | TailwindCSS 4 | Utility-first CSS |
| **State Management** | Zustand | Lightweight state management |
| **Routing** | React Router 7 | Client-side routing |
| **Icons** | Lucide React | Icon library |

### Blockchain Integration

| Technology | Purpose |
|-----------|---------|
| **@stellar/stellar-sdk** | Stellar blockchain interaction |
| **Horizon API** | Account/transaction queries |
| **Soroban RPC** | Smart contract interaction |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Vitest** | Unit testing |
| **React Testing Library** | Component testing |
| **TypeScript** | Static type checking |

---

## 🎨 Design Patterns

### 1. **Service Layer Pattern**
- Business logic isolated in service classes
- Services are framework-agnostic
- Easy to test and maintain

```typescript
// Example: StellarService handles all Stellar interactions
class StellarService {
  async getAccount() { ... }
  async sendPayment() { ... }
}
```

### 2. **Repository Pattern**
- Data access abstracted behind repositories
- Consistent interface for data operations
- Easy to swap implementations

### 3. **Observer Pattern**
- Zustand store for reactive state
- Components subscribe to state changes
- Automatic re-rendering on state updates

### 4. **Strategy Pattern**
- Network switching strategy
- Different implementations for mainnet/testnet
- Runtime selection of network configuration

### 5. **Factory Pattern**
- Wallet creation factory
- Different wallet types (new, imported, hardware)
- Consistent wallet creation interface

---

## 📊 Performance Considerations

### Optimization Strategies

1. **Lazy Loading**
   - Routes loaded on demand
   - Heavy components lazy-loaded
   
2. **Memoization**
   - React.memo for expensive components
   - useMemo for computed values
   - useCallback for event handlers

3. **Caching**
   - Account data cached temporarily
   - Network responses cached
   - Balance refresh intervals

4. **Bundle Size**
   - Code splitting by route
   - Tree shaking unused code
   - Minification and compression

---

## 🔮 Future Enhancements

### Phase 1: Core Features (Current)
- [x] Basic wallet creation
- [x] Network switching
- [ ] Transaction sending
- [ ] Balance viewing

### Phase 2: Advanced Features
- [ ] Multi-signature wallets
- [ ] Hardware wallet support (Ledger, Trezor)
- [ ] NFT gallery
- [ ] Token swap integration
- [ ] dApp browser with tab management

### Phase 3: Developer Tools
- [ ] Soroban contract deployment
- [ ] Contract interaction UI
- [ ] Transaction builder
- [ ] Debug console
- [ ] Network monitoring

### Phase 4: Ecosystem
- [ ] Plugin system for third-party extensions
- [ ] Extension API for dApps
- [ ] Cross-chain support
- [ ] Mobile app (React Native)
- [ ] Desktop browser (Electron)

---

## 📝 Coding Standards

### File Organization
```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx      # Main component
│       ├── ComponentName.test.tsx # Tests
│       └── index.ts               # Exports
├── services/
│   └── ServiceName.ts             # Service implementation
├── stores/
│   └── storeName.ts               # Zustand store
├── hooks/
│   └── useHookName.ts             # Custom hook
└── types/
    └── index.ts                   # Type definitions
```

### Naming Conventions
- **Components**: PascalCase (`WalletCard`)
- **Files**: PascalCase for components, camelCase for others
- **Types/Interfaces**: PascalCase (`WalletData`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_NETWORKS`)
- **Functions**: camelCase (`sendPayment`)

---

## 🧪 Testing Strategy

### Test Levels

1. **Unit Tests**
   - Services and utilities
   - Custom hooks
   - State management

2. **Component Tests**
   - Component rendering
   - User interactions
   - State updates

3. **Integration Tests**
   - Component workflows
   - Service integration
   - Store interactions

4. **E2E Tests** (Future)
   - Full user journeys
   - Extension workflows
   - dApp integration

---

## 🚀 Deployment

### Development
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Extension Loading
1. Build the extension: `npm run build`
2. Open Chrome: `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the `dist` folder

### Production Build
- Minified and optimized code
- Source maps for debugging
- Extension package for Chrome Web Store

---

## 📚 Additional Resources

- [Stellar SDK Documentation](https://stellar.github.io/js-stellar-sdk/)
- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

*Last updated: April 2026*
