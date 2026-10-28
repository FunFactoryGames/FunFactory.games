# FunFactory.games
Fun Factory Games main page

## Publishing

The site is built with Vite. GitHub Actions builds and deploys it to GitHub Pages
on pushes to `main`. In the repository's **Settings → Pages**, set the build
and deployment source to **GitHub Actions**. The default site address is
https://funfactorygames.github.io/FunFactory.games/.

To build locally, run `npm ci` followed by `npm run build`. To deploy manually,
run the **Deploy to GitHub Pages** workflow from the Actions tab.

## Server pages

The Minecraft and 7 Days to Die pages live at `minecraft/` and
`seven-days-to-die/`. Their text and connection placeholders are in
`src/App.tsx`; update those when the server details are confirmed. The build
creates an entry point for each page so direct links work on GitHub Pages.
