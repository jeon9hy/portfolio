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

`content.json` at the repo root holds the hero/about/log/contact text and log post data (including any attached images, as compressed base64). The page fetches this file at load time, so updating `content.json` and redeploying is all that's needed to change what visitors see.

Click the **⚙ 설정** button (bottom right) and enter the admin code to unlock editing. Once authenticated, the Log section also reveals **+ 새 글 작성** and each post's **Edit**/**Delete** controls (hidden otherwise) — writing, editing, or deleting a post deploys immediately with no separate save step. General site text (hero/about/log title/contact) is edited from the settings panel itself and applies when you press 저장. A **로그아웃** button in the settings panel re-locks all of this until the admin code is entered again.

All of the above calls `/api/save`, a serverless function that commits the updated `content.json` straight to this repo's `master` branch — Vercel then redeploys automatically, so changes go live within a minute or two with no manual export/import step.

If the save API isn't configured (see below) or the request fails, the edit still applies to that browser's local storage as a fallback, and an alert explains that it wasn't deployed.

### One-time setup for live editing

The save API needs two secrets, set as Vercel **Project Settings → Environment Variables** (not committed to the repo):

- `GITHUB_TOKEN` — a GitHub personal access token with **Contents: Read and write** access to this repo (create one at GitHub → Settings → Developer settings → Personal access tokens).
- `ADMIN_CODE` — the same admin code used by the settings panel (currently `985213`).

After adding both, trigger a redeploy so the function picks them up.

## Deployment

This repo can be deployed as-is on [Vercel](https://vercel.com): import the repository, choose the "Other" framework preset (no build command), and deploy. Since the page lives at `index.html`, it will be served directly at the root URL. The `api/save.js` file is automatically detected by Vercel as a serverless function.

## Contents

- `index.html` — the complete portfolio page.
- `content.json` — the live site content (text + log posts), fetched by the page at runtime.
- `api/save.js` — serverless function the admin panel calls to commit content updates.
