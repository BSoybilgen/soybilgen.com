# soybilgen.com

Personal site of Baris Soybilgen: research, code and posts. Built with [Astro](https://astro.build) and React, deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npx astro check  # type check
```

## Content

Everything on the page comes from `src/data/`:

| File | Edited by | What it holds |
|---|---|---|
| `profile.json` | hand | Intro, about text, education, links |
| `publications.json` | hand + refresh | Publications. Hand: group, themes, venue, url, featured, summary. Refresh: `citations`, and new Scholar items in `unsorted` (not shown) |
| `metrics.json` | refresh | Citations, h-index, i10-index (Google Scholar); article and chapter counts |
| `repos.json` | hand + refresh | Public repositories. Hand: summary, snippet, tags, order. Refresh: stars, language, new repos |
| `x_posts.json` | refresh | Recent X posts (own posts, quotes, and replies that carry a chart) |
| `pinned.json` | hand | X post ids to pin first, or to hide |

A daily job on the VPS refreshes the "refresh" fields and pushes when something changed; GitHub Actions then deploys.
