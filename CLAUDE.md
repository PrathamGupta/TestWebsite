# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website hosted on GitHub Pages at `prathamgupta.github.io`. No build system, no package manager, no framework — pure HTML, CSS, and vanilla JavaScript.

## Development

Open `index.html` directly in a browser, or serve locally to avoid CORS issues with `fetch()`:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Architecture

### Content Loading Pattern
`index.html` is the only full page. It uses `fetch()` to dynamically inject HTML fragments from `pages/` into named `<div>` elements at runtime (e.g., `#experience`, `#projects`). Fragments in `pages/` are **partial HTML only** — no `<html>`, `<head>`, or `<body>` tags.

```js
loadContent('experience', './pages/experienceShort.html');
loadContent('projects', './pages/projects.html');
```

### Pages Directory
- `pages/experienceShort.html` — card summaries for the homepage
- `pages/experienceLong.html` — expanded experience with toggle "Show More" sections
- `pages/projects.html` — project cards for the homepage
- Other pages (`about`, `blog`, `contact`) are linked in the navbar but not yet implemented

### Design System
- Color: `#39DA39` (terminal green) on dark backgrounds (`#0a0a0a`/`#1a1a1a`)
- Font: `Fira Code` (monospace, from Google Fonts)
- Cards: `.card` class with hover shimmer effect via `::before` pseudo-element
- Terminal aesthetic: section headers use `$cat`, `$ls` prefixes

### Assets
- `images/` — PNG assets with transparent backgrounds for the site graphic
- `files/Resume.pdf` — linked resume (currently commented out in navbar)
- `CNAME` — GitHub Pages custom domain config
