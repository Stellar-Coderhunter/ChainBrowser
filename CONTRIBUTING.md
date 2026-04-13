# 🤝 Contributing to ChainBrowser

Thank you for your interest in contributing to ChainBrowser! 🎉 We welcome contributions from everyone, whether you're fixing a typo, improving documentation, or implementing new features.

This guide will help you get started with contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Need Help?](#need-help)

---

## 📜 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Git** ([Download](https://git-scm.com/))
- A Chromium-based browser (Chrome, Edge, Brave, etc.)

### Setup Steps

1. **Fork the Repository**
   - Click the "Fork" button on GitHub
   - Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ChainBrowser.git
   cd ChainBrowser
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/ChainBrowser.git
   git remote -v  # Verify remotes
   ```

3. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Load Extension in Browser**
   - Open your browser and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from the project
   - The extension should now be loaded and active

---

## 🔄 Development Workflow

### 1. Keep Your Fork Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Switch to your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### 2. Create a Feature Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
# or
git checkout -b docs/documentation-update
```

**Branch Naming Convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 3. Make Your Changes

Follow the [Coding Standards](#coding-standards) and make your changes.

### 4. Test Your Changes

```bash
# Run linting
npm run lint

# Run tests (when available)
npm test

# Build the extension
npm run build
```

### 5. Commit Your Changes

Follow the [Commit Message Guidelines](#commit-message-guidelines):

```bash
git add .
git commit -m "feat: add wallet connection feature"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then go to GitHub and create a Pull Request from your fork to the main repository.

---

## ✏️ Making Changes

### File Structure

Refer to the [Project Structure](README.md#-project-structure) in the README for a complete overview.

### Adding New Features

1. **Create components** in `src/components/`
2. **Add services** in `src/services/`
3. **Define types** in `src/types/`
4. **Update tests** if applicable
5. **Update documentation** if needed

### Adding New Pages/Views

1. Create a new component in `src/components/`
2. Add routing in `src/App.tsx`
3. Update the navigation menu
4. Add tests

### Modifying Existing Features

1. Locate the relevant component/service
2. Make changes following existing patterns
3. Update tests
4. Update documentation if API/behavior changes

---

## 📤 Submitting Pull Requests

### PR Checklist

Before submitting your PR, ensure:

- [ ] Your code follows the [Coding Standards](#coding-standards)
- [ ] You've added/updated tests (if applicable)
- [ ] All tests pass: `npm test`
- [ ] Linting passes: `npm run lint`
- [ ] You've tested the extension locally
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow the [guidelines](#commit-message-guidelines)

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots of UI changes

## Related Issues
Closes #issue-number
```

### Review Process

1. A maintainer will review your PR
2. Changes may be requested
3. Once approved, a maintainer will merge it
4. Your contribution will be credited! 🎉

---

## 💻 Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow existing code style and patterns
- Keep functions small and focused
- Use meaningful variable and function names
- Add comments for complex logic
- Don't repeat yourself (DRY principle)

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type - use `unknown` if needed
- Enable strict mode in `tsconfig.json`
- Export types/interfaces from `src/types/`

### React

- Use functional components with hooks
- Keep components small and focused
- Use custom hooks for reusable logic
- Prefer composition over inheritance
- Follow React best practices

### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Use CSS variables for theming
- Keep styles consistent with design system

### Code Organization

```typescript
// 1. Imports (external, internal, relative)
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useWallet } from '@/hooks/useWallet';

// 2. Type definitions
interface Props {
  address: string;
}

// 3. Component definition
export const WalletDisplay: React.FC<Props> = ({ address }) => {
  // 4. Hooks
  const { balance } = useWallet(address);
  
  // 5. Event handlers
  const handleClick = () => {
    // logic
  };
  
  // 6. Render
  return <div>{/* JSX */}</div>;
};
```

---

## 🧪 Testing Guidelines

### When to Write Tests

- New features and functionality
- Bug fixes (add regression tests)
- Complex business logic
- Utility functions

### Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import { WalletDisplay } from './WalletDisplay';

describe('WalletDisplay', () => {
  it('should display wallet address', () => {
    render(<WalletDisplay address="GABC123..." />);
    expect(screen.getByText(/GABC123/i)).toBeInTheDocument();
  });
  
  it('should handle invalid address', () => {
    // test case
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes

### Examples

```
feat(wallet): add multi-account support

fix(network): resolve connection timeout on testnet

docs(readme): update installation instructions

refactor(services): extract stellar SDK initialization logic

test(wallet): add unit tests for wallet creation
```

### Best Practices

- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at the end
- Keep subject line under 72 characters
- Use body to explain what and why, not how

---

## 🐛 Issue Reporting Guidelines

### Before Creating an Issue

1. Search existing issues (open and closed)
2. Check the documentation
3. Try the latest version

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)
- Error messages/logs

### Feature Requests

Include:
- Clear description of the feature
- Use case / problem it solves
- Proposed solution (optional)
- Alternatives considered

---

## 🎯 Good First Issues

Looking for your first contribution? Check out issues labeled:
- `good first issue` - Perfect for beginners
- `help wanted` - We need your help
- `documentation` - Improve our docs

---

## 💬 Need Help?

If you have questions or need help:

- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-org/chainbrowser/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-org/chainbrowser/issues)
- 💬 **Discord**: [Join our community](#)
- 📧 **Email**: hello@chainbrowser.dev

---

## 🙏 Thank You

Every contribution matters, no matter how small! We appreciate your time and effort in making ChainBrowser better.

Happy contributing! 🚀

---

*Last updated: April 2026*
