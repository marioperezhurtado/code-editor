## Code Editor
Local-first web code editor built with Svelte. Inspired by [vscode.dev](https://vscode.dev).

<p>
  <img src="https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte"/>
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
</p>

## Roadmap
- [ ] Drag and drop inside file explorer
    - [ ] Files
    - [ ] Folders
- [ ] I18n
- [ ] Custom color themes
- [ ] Fuzzy find
- [ ] Vim motions

## Dependencies
- **Syntax Highlighting:** [Highlight.js](https://github.com/highlightjs/highlight.js)

## Installation

```bash
git clone https://github.com/marioperezhurtado/code-editor.git
cd code-editor
npm install
```

## Developing
Once you've created a project and installed dependencies with npm install (or pnpm install or yarn), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
