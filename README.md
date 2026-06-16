# CS Freshman Character Builder

Static Next.js app for CS freshmen to answer 20 reflection questions and receive a shareable RPG-style character sheet.

## Local Development

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000/cs-freshman-character-builder/`.

## Checks

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run build
```

## Static Assets

Character images live in `public/characters` and are selected by job plus gender presentation:

```txt
/characters/machinist-female.png
/characters/machinist-male.png
```

The included PNGs are placeholders so the static app renders immediately. Replace them with final artwork using the same filenames.

## GitHub Pages

The app is configured for repository Pages at:

```txt
https://<github-user-or-org>.github.io/cs-freshman-character-builder/
```

If the repository name changes, update `basePath` in `next.config.ts` and `NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy.yml`.
