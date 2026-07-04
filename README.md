# Portfolio — Kim Jeonghyun

A single-file, self-contained HTML portfolio page for Kim Jeonghyun.

## Overview

The page is bundled as one standalone `.html` file with all assets (scripts, styles, images) embedded inline, so it can be opened directly in a browser or hosted as a static page without any build step or external dependencies.

On load, the site plays a short structural-analysis intro animation (a truss assembling itself) before revealing the homepage. It's skippable and disabled automatically under `prefers-reduced-motion`. The layout is responsive for mobile.

## Usage

1. Download or clone this repository.
2. Open `index.html` in any modern web browser.

No server or installation is required — everything needed to render the page is packaged inside the file itself.

## Editing content

Click the **⚙ 설정** button (bottom right) and enter the admin code to edit hero/about/log/contact text. Saving there only persists to that browser's local storage — to actually update the live site, use the **내보내기 (Export)** button to download a `portfolio-content.json` snapshot, then have it applied to the page's source and redeployed.

## Deployment

This repo can be deployed as-is on [Vercel](https://vercel.com): import the repository, choose the "Other" framework preset (no build command), and deploy. Since the page lives at `index.html`, it will be served directly at the root URL.

## Contents

- `index.html` — the complete portfolio page.
