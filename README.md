# Steve — Learning by Making

An English personal portfolio and learning hub, published at:

https://stevemarauder.github.io/PersonalResume/

## Selected projects

| Category | Project | Website |
| --- | --- | --- |
| Bayesian Statistics | Bayes Notes | https://stevemarauder.github.io/think-bayes-learning/ |
| Bayesian Statistics | Bayesian Thinking Lab | https://stevemarauder.github.io/bayesian_thinking_learning/ |
| Language Learning | Hibi Nihongo — Japanese N4 | https://hibi-nihongo-n4-steve.leonsika.chatgpt.site/ |
| Travel & Exploration | YU ATLAS — Taiwan Hot Springs | https://stevemarauder.github.io/hotspring_in_Taiwan/ |
| Travel & Exploration | SNOWBOUND — Japan Ski Planner | https://stevemarauder.github.io/JapanTour/ |

The hub is in English. Linked projects retain their own languages and interfaces. Project descriptions are based on their README files and pages, checked on November 22, 2026. The Japanese site's private teaching materials and source are not copied or published here.

## Features

- Category filters and multiword project search.
- Saved projects and last-opened website, stored only in this browser.
- Keyboard navigation, visible focus, reduced-motion support, and responsive layouts.
- All five website links remain available without JavaScript.
- No external libraries, fonts, trackers, or network requests on page load.

Browser records do not sync across devices or record progress inside the linked sites. Clearing this site's browser data removes its saved-project and last-opened records. Failed browser storage falls back to a usable in-memory experience.

## Local preview

With Node.js 18 or later:

```sh
npm start
```

Open http://127.0.0.1:4190/PersonalResume/ to preview the GitHub Pages project path. No package installation or build is required. You can also open `index.html` directly.

```sh
npm run check
```

## Editing

- `index.html`: profile text, project categories, descriptions, and links.
- `styles.css`: layout, illustrations, colors, and responsive rules.
- `app.js`: filters, search, saved projects, and last-opened state.
- `favicon.svg`: browser icon.
- `server.mjs`: local-only preview server; never needed by the published site.

Each project has a stable `data-id`, a `data-category`, and search keywords. Keep IDs stable to preserve browser saves. Filter totals reflect this selected collection of five projects. The site does not infer qualifications, employment history, or measured project outcomes.

## GitHub Pages

The deployment uses the repository's root on the `main` branch. Keep `.nojekyll` beside `index.html`. All local asset URLs are relative, so the site works beneath `/PersonalResume/`. Changes pushed to the configured publishing branch are published by GitHub Pages.
