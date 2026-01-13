# OpenCode Workshop (30 min)

> Learn to vibe code with AI using your Microsoft license

This repo can be found at [https://github.com/deankroker/basic-nextjs-app](https://github.com/deankroker/basic-nextjs-app) and the live site at [https://aka.ms/axande/opencode](https://aka.ms/axande/opencode)

## Quick Reference

| Time (PT) | Section |
|-----------|---------|
| Pre-session | Prerequisites (A+ students do this as folks trickle in) |
| 11:05 | Getting started with code |
| 11:10 | Using for doc writing |
| 11:20 | Hands-on: Update the app |

### Prerequisites Checklist

- [ ] Link GitHub to Microsoft Enterprise: [repos.opensource.microsoft.com/link](https://repos.opensource.microsoft.com/link)
- [ ] Install [VS Code](https://code.visualstudio.com/)
- [ ] Install OpenCode: `curl -fsSL https://opencode.ai/install | bash`
- [ ] Clone repo: `git clone https://github.com/deankroker/basic-nextjs-app`
- [ ] Install [Node LTS with pnpm](https://nodejs.org/en/download/)
- [ ] (Optional) Markdown editor: [Typora](https://typora.io/) (macOS) / [MarkText](https://www.marktext.cc/) (Windows)

### Essential Commands

| Command | What it does |
|---------|--------------|
| `opencode` | Launch OpenCode in terminal |
| `/models` | Select GitHub Copilot model |
| `/init` | Create Agent.md for context |
| `Tab` | Toggle Plan vs Build mode |
| `pnpm i` | Install local dependencies for Next.js project |
| `pnpm dev` | Run local dev server |

## Detailed Guide

### Prerequisites (Do Now!)

#### 1. Get Opus 4.5 Access

Link your GitHub account to Microsoft Enterprise to unlock free access to Claude models via GitHub Copilot.

1. Go to [repos.opensource.microsoft.com/link](https://repos.opensource.microsoft.com/link)
2. Sign in with your Microsoft account
3. Link your GitHub account

#### 2. Install VS Code

Download from [code.visualstudio.com](https://code.visualstudio.com/)

> We're using VS Code for its integrated terminal and Git support. Works great on Windows + macOS.

#### 3. Install OpenCode

**macOS / Linux:**
```bash
curl -fsSL https://opencode.ai/install | bash
```

**Windows (Git Bash):**
```bash
curl -fsSL https://opencode.ai/install | bash
```

After installation, you may need to add OpenCode to your PATH or restart your terminal.

#### 4. Clone the Workshop Repo

```bash
git clone https://github.com/deankroker/basic-nextjs-app
cd basic-nextjs-app
```

#### 5. Install Node.js with pnpm

Download the LTS version from [nodejs.org/en/download](https://nodejs.org/en/download/)

During installation, make sure to select the option to install pnpm (or install it separately with `npm install -g pnpm`).

#### 6. (Optional) Markdown Editor

For a nicer markdown editing experience outside VS Code:
- **macOS**: [Typora](https://typora.io/) - clean, minimal WYSIWYG markdown
- **Windows**: [MarkText](https://www.marktext.cc/) - free, open-source Typora alternative

### Part 1: Getting Started with Code (11:05 PT)

#### Why OpenCode?

- **Claude Code vs OpenCode**: Both use an [effective harness](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) for long-running agents (per Anthropic's research), but OpenCode is free for you via your Microsoft license.
- **Why Opus 4.5?:** This is the strongest general-purpose coding model available today (Jan 13, 2026) for agentic workflows.
- **Why not GitHub Copilot or agents?** The differentiator is the *harness*. OpenCode is designed for long-running, stateful work. I often have 3–5 agents running in parallel. Today, Copilot in VS Code still behaves closer to high-quality autocomplete, though it’s improving. The industry momentum is around [Claude Code](chatgpt://generic-entity?number=3)-style workflows. 
- Works right in your terminal alongside VS Code.

#### Setup Steps

1. **Open VS Code** (close any existing projects) and clone the repo (if you haven't already):

```
Ctrl+Shift+P → Git: Clone → paste repo URL
```
   
2. **Open the integrated terminal**:
- Windows: `Terminal → New Terminal → Select Git Bash`
- macOS: `Terminal → New Terminal` (zsh works great)

3. **Launch OpenCode**:
```bash
opencode
```
   
4. **Select your model**:
```
/models
```
Select **GitHub Copilot** and login when prompted.

5. **Initialize project context**:
```
/init
```
This creates an `Agent.md` file that helps the AI understand your project.

> **Why Agent.md?** Context is power! The more the AI knows about your project structure, conventions, and goals, the better it can help you.

#### Plan vs Build: The Key Concept

Press `Tab` to toggle between modes:

| Mode | What it does | When to use |
|------|--------------|-------------|
| **Plan** | Read-only exploration | Research, ask questions, explore code safely |
| **Build** | Makes actual changes | When you're ready to write/edit code |

**Pro tip**: Start in Plan mode to think through your approach, then switch to Build when you're ready to execute.

#### Demo 1: Code Update

This part will be live!

#### Test Your Changes

```bash
pnpm i      # Install dependencies
pnpm dev    # Start dev server at localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) to see your app running!

### Part 2: Using for Doc Writing (11:20 PT)

#### Markdown in VS Code

VS Code has built-in markdown support:
- **Preview**: `Ctrl+Shift+V` (or `Cmd+Shift+V` on Mac)
- **Side-by-side**: `Ctrl+K V`

#### Demo 2: Update to an Epic

This part will be live!

#### Dedicated Markdown Editors

For longer-form writing, dedicated editors can be nicer:
- **Typora** (macOS): WYSIWYG editing, clean interface
- **MarkText** (Windows): Free alternative with similar features

## Post-Session

We only scratched the surface today. Here's where to learn more:

| Topic | Link |
|-------|------|
| OpenCode Docs | [opencode.ai/docs](https://opencode.ai/docs) |
| MCP Servers | Extend OpenCode with external tools |
| Slash Commands | Create custom workflows |
| Agent.md Best Practices | Optimize your project context |

Also suggest trying Claude Code! 

### Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `Tab` | Toggle Plan/Build mode |
| `Ctrl+C` | Cancel current operation |
| `Ctrl+L` | Clear screen |
| `/help` | See all commands |
| `/models` | Switch AI models |
| `/init` | Initialize project context |

## Troubleshooting

### OpenCode not found after install

Add to your PATH or restart your terminal:
```bash
# Check if installed
which opencode

# If not found, try restarting terminal or adding to PATH
export PATH="$HOME/.opencode/bin:$PATH"
```

### GitHub Copilot login issues

1. Make sure your GitHub is linked at [repos.opensource.microsoft.com/link](https://repos.opensource.microsoft.com/link)
2. Try `/models` again and follow the OAuth flow

### pnpm not found

```bash
npm install -g pnpm
```

Happy vibe coding!