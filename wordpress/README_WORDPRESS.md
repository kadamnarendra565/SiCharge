# WordPress Hosting & Deployment Guide: SiCharge Project

This guide explains how to host and display the **SiCharge — Silicon Carbide Battery & Power Module** interactive project on any WordPress website or present it live in your Entrepreneurship Development class.

---

## Option 1: WordPress Custom HTML Block (Easiest & Fastest — 2 Minutes)

If you already have a WordPress site (e.g., WordPress.com, WP Engine, Hostinger, Bluehost, or your college's WordPress portal):

1. Host the project files (`index.html`, `assets/`) on any free static host such as:
   - **GitHub Pages** (100% Free): Create a repository, upload these files, and turn on GitHub Pages in repository settings.
   - **Netlify / Vercel** (100% Free): Drag and drop the `ED Group project` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Go to your **WordPress Admin Dashboard** → **Pages** → **Add New Page**.
3. In the Gutenberg Editor, click the `+` icon to add a new block.
4. Search for and select the **Custom HTML** block.
5. Copy the contents of [`wordpress/sicharge-embed-code.html`](./sicharge-embed-code.html) and paste it into the block.
6. Replace the `src="..."` URL with your hosted link.
7. Click **Publish**! Your interactive app is now live inside WordPress.

---

## Option 2: WordPress Theme Page Template (`page-sicharge.php`)

If you have direct FTP, cPanel, or File Manager access to your WordPress installation:

1. Copy the entire `assets/` folder and `index.html` into your active theme directory:
   ```
   wp-content/themes/<your-active-theme>/
   ├── assets/
   ├── index.html
   └── page-sicharge.php
   ```
2. Copy [`wordpress/page-sicharge.php`](./page-sicharge.php) into the same folder.
3. In WordPress Admin → **Pages** → **Add New**.
4. In the right-hand sidebar under **Page Attributes** → **Template**, select:
   **"SiCharge - SiC Interactive Presentation Template"**.
5. Click **Publish**.

---

## Option 3: Instant 100% Free Cloud Hosting with GitHub Pages (No WordPress Needed)

If you just need a public link to submit to your professor:

1. Go to [GitHub.com](https://github.com) and create a new repository called `sicharge-ed-project`.
2. Upload `index.html`, `assets/`, and `README.md`.
3. Go to **Settings** → **Pages** → Source: **Deploy from a branch** (`main` / root).
4. GitHub will give you a live HTTPS link:
   `https://<your-username>.github.io/sicharge-ed-project/`
5. You can submit this live link directly!

---

## Option 4: Live Offline Presentation in Class (Python Server)

If you are presenting in class without relying on internet or WordPress logins:

1. Open your terminal in this folder.
2. Run:
   ```powershell
   python server.py
   ```
3. Your default web browser will automatically open to `http://localhost:8000`.
4. You can use the live break-even sliders, compare semiconductor physics, inspect the Business Model Canvas, and click **"Print Report"** to show the formatted Experiment 4 worksheet.
