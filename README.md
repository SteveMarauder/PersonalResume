# Steven Wu — Resume & Learning Portfolio

A bilingual English and Traditional Chinese resume, personal portfolio, and learning hub, published at:

https://stevemarauder.github.io/PersonalResume/

## Selected projects

| Category | Project | Website |
| --- | --- | --- |
| Bayesian Statistics | Bayes Notes | https://stevemarauder.github.io/think-bayes-learning/ |
| Bayesian Statistics | Bayesian Thinking Lab | https://stevemarauder.github.io/bayesian_thinking_learning/ |
| Language Learning | Hibi Nihongo — Japanese N4 | https://hibi-nihongo-n4-steve.leonsika.chatgpt.site/ |
| Travel & Exploration | YU ATLAS — Taiwan Hot Springs | https://stevemarauder.github.io/hotspring_in_Taiwan/ |
| Travel & Exploration | SNOWBOUND — Japan Ski Planner | https://stevemarauder.github.io/JapanTour/ |

Use the EN / 繁中 controls to switch the whole website, including the resume, project descriptions, filters, search labels, saved-project controls, and accessibility labels. A language selection is remembered in this browser. Share a language-specific link with `?lang=en` or `?lang=zh-TW`. The default is English. Language changes preserve project saves, search text, and the active category.

Linked projects retain their own languages and interfaces. Project descriptions are based on their README files and pages, checked on November 22, 2026. The Japanese site's private teaching materials and source are not copied or published here.

## Resume content

The resume includes six professional roles, five education entries, grouped skills, and five courses/certifications. Career facts and metrics come from the supplied resume; the wording has been edited and translated. The owner confirmed that the University of Pittsburgh degree is still in progress; December 2026 is shown as the expected completion date. The owner requested English-only naming, removal of the ambiguous skill previously labeled 管理頁面, and the public email `Stevenchunhsingwu@gmail.com`. No Chinese personal name, unprovided certification issuer, language proficiency score, or skill rating has been added. The original PDF is not published in the repository.

Institution/company naming references consulted for translation:

- University of Pittsburgh: https://www.sci.pitt.edu/academics/masters-degrees/data-science
- Pukyong National University: https://www.pknu.ac.kr/eng/92
- National Chi Nan University: https://ced.ncnu.edu.tw/
- Soueast (Fujian) Motor: https://www.fjmotor.com.cn/en/About___FJMG/Company_Profile.htm

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
- `resume.css`: resume layout and bilingual navigation.
- `content.js`: paired English and Traditional Chinese interface/resume wording.
- `i18n.js`: language selection, translated metadata, and accessible labels.
- `app.js`: filters, search, saved projects, and last-opened state.
- `favicon.svg`: browser icon.
- `server.mjs`: local-only preview server; never needed by the published site.

Each project has a stable `data-id`, a `data-category`, and search keywords in both languages. Keep IDs stable to preserve browser saves. Filter totals reflect this selected collection of five projects. Edit the English text and its matching `data-i18n` key together, then update the corresponding Traditional Chinese entry in `content.js`.

## GitHub Pages

The deployment uses the repository's root on the `main` branch. Keep `.nojekyll` beside `index.html`. All local asset URLs are relative, so the site works beneath `/PersonalResume/`. Changes pushed to the configured publishing branch are published by GitHub Pages.
