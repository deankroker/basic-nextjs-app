"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TipCard = {
  id: string;
  icon: string;
  title: string;
  preview: string;
  tips: { title: string; description: string }[];
  link?: { label: string; url: string };
};

const tipCards: TipCard[] = [
  {
    id: "git",
    icon: "</>",
    title: "Git Basics",
    preview: "Clone, commit, push, branches",
    tips: [
      {
        title: "git clone <url>",
        description: "Download a repository to your local machine",
      },
      {
        title: "git add .",
        description: "Stage all changes for commit",
      },
      {
        title: 'git commit -m "message"',
        description: "Save staged changes with a description",
      },
      {
        title: "git push",
        description: "Upload commits to remote repository (GitHub)",
      },
      {
        title: "git pull",
        description: "Download and merge remote changes",
      },
    ],
    link: {
      label: "Git Handbook",
      url: "https://guides.github.com/introduction/git-handbook/",
    },
  },
  {
    id: "terminal",
    icon: ">_",
    title: "Terminal/CLI",
    preview: "Navigate like a pro",
    tips: [
      {
        title: "cd <folder>",
        description: "Change directory - navigate into a folder",
      },
      {
        title: "cd ..",
        description: "Go up one directory level",
      },
      {
        title: "ls (or dir on Windows)",
        description: "List files and folders in current directory",
      },
      {
        title: "pwd",
        description: "Print working directory - see where you are",
      },
      {
        title: "clear (or cls)",
        description: "Clear the terminal screen",
      },
    ],
    link: {
      label: "Command Line Crash Course",
      url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line",
    },
  },
  {
    id: "opencode",
    icon: "AI",
    title: "OpenCode Tips",
    preview: "/init, Tab, /models",
    tips: [
      {
        title: "/init",
        description:
          "Creates Agent.md for project context - helps AI understand your codebase",
      },
      {
        title: "Tab (Plan vs Build)",
        description:
          "Toggle modes: Plan = safe exploration, Build = make changes",
      },
      {
        title: "/models",
        description: "Switch AI models - select GitHub Copilot for free access",
      },
      {
        title: "/help",
        description: "See all available slash commands",
      },
      {
        title: "Ctrl+P",
        description: "Open action palette for quick commands",
      },
    ],
    link: { label: "OpenCode Docs", url: "https://opencode.ai/docs" },
  },
  {
    id: "vscode",
    icon: "{}",
    title: "VS Code Shortcuts",
    preview: "Work faster with hotkeys",
    tips: [
      {
        title: "Ctrl+` (backtick)",
        description: "Toggle integrated terminal",
      },
      {
        title: "Ctrl+P",
        description: "Quick file open - type filename to jump to it",
      },
      {
        title: "Ctrl+Shift+P",
        description: "Command palette - access all VS Code commands",
      },
      {
        title: "Ctrl+/ ",
        description: "Toggle comment on selected lines",
      },
      {
        title: "Ctrl+Shift+V",
        description: "Preview markdown file",
      },
    ],
    link: {
      label: "VS Code Shortcuts",
      url: "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf",
    },
  },
  {
    id: "node",
    icon: "npm",
    title: "Node/pnpm",
    preview: "Package management basics",
    tips: [
      {
        title: "pnpm install (or pnpm i)",
        description: "Install all dependencies from package.json",
      },
      {
        title: "pnpm dev",
        description: "Start development server (runs next dev)",
      },
      {
        title: "pnpm add <package>",
        description: "Add a new dependency to your project",
      },
      {
        title: "package.json",
        description: "Config file listing dependencies and scripts",
      },
      {
        title: "node_modules/",
        description: "Folder with installed packages (don't edit or commit!)",
      },
    ],
    link: { label: "pnpm Docs", url: "https://pnpm.io/motivation" },
  },
  {
    id: "debug",
    icon: "!",
    title: "Debugging Tips",
    preview: "Find and fix issues",
    tips: [
      {
        title: "console.log()",
        description: "Print values to browser/terminal to inspect them",
      },
      {
        title: "Browser DevTools (F12)",
        description: "Inspect elements, network, console in browser",
      },
      {
        title: "Read the error message",
        description: "Errors usually tell you the file and line number",
      },
      {
        title: "Google the error",
        description: "Copy the error message - someone else had it too",
      },
      {
        title: "Ask OpenCode!",
        description: "Paste the error and ask for help debugging",
      },
    ],
    link: {
      label: "Chrome DevTools Guide",
      url: "https://developer.chrome.com/docs/devtools/",
    },
  },
];

type Tab = "guide" | "reference";

type Props = {
  readmeContent: string;
};

export default function WorkshopPage({ readmeContent }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("guide");
  const [selectedCard, setSelectedCard] = useState<TipCard | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            OpenCode Workshop
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Learn to vibe code with AI using your Microsoft license
          </p>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "guide"
                  ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              Workshop Guide
            </button>
            <button
              onClick={() => setActiveTab("reference")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "reference"
                  ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              Quick Reference
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        {activeTab === "guide" ? (
          /* Markdown README Content */
          <article className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:border-b prose-h2:border-zinc-200 prose-h2:pb-2 dark:prose-h2:border-zinc-800 prose-h3:text-xl prose-h3:mt-8 prose-h4:text-lg prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-800 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200 prose-pre:bg-zinc-100 prose-pre:text-zinc-800 dark:prose-pre:bg-zinc-800 dark:prose-pre:text-zinc-200 prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg dark:prose-blockquote:bg-blue-950 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-blockquote:not-italic prose-table:text-sm prose-th:bg-zinc-100 dark:prose-th:bg-zinc-800 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-td:border-zinc-200 dark:prose-td:border-zinc-700 prose-li:marker:text-zinc-400">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: ({ children }) => (
                  <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-800">
                    {children}
                  </pre>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className="text-zinc-800 dark:text-zinc-200"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {readmeContent}
            </ReactMarkdown>
          </article>
        ) : (
          /* Quick Reference Grid */
          <>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Click a card to see detailed tips for each topic.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tipCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className={`group rounded-xl border bg-white p-6 text-left transition-all hover:border-zinc-400 hover:shadow-md dark:bg-zinc-900 dark:hover:border-zinc-600 ${
                    selectedCard?.id === card.id
                      ? "border-zinc-900 ring-2 ring-zinc-900 dark:border-zinc-100 dark:ring-zinc-100"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 font-mono text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {card.icon}
                  </div>
                  <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {card.preview}
                  </p>
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            {selectedCard && (
              <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 font-mono text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {selectedCard.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      {selectedCard.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                    aria-label="Close"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <ul className="space-y-4">
                  {selectedCard.tips.map((tip, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-zinc-100 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        {index + 1}
                      </span>
                      <div>
                        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                          {tip.title}
                        </code>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {tip.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {selectedCard.link && (
                  <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <a
                      href={selectedCard.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                      {selectedCard.link.label}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Footer hint */}
            <p className="mt-10 text-center text-sm text-zinc-400 dark:text-zinc-500">
              Press{" "}
              <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800">
                Tab
              </kbd>{" "}
              in OpenCode to toggle between Plan and Build mode
            </p>
          </>
        )}
      </main>
    </div>
  );
}
