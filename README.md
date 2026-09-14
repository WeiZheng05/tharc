# Trilateral Human–AI Research Collaborative (THARC)

Static first-release website for the **Trilateral Human–AI Research Collaborative** — a U.S.–UK–Australia community for human-centered AI research, education, and ethical decision-making.

**Founding host:** Wei Zheng, Ph.D., P.E., Professor, Civil and Environmental Engineering, Jackson State University  
**Contact:** wei.zheng@jsums.edu  
**Research site:** https://weizheng05.github.io/research-site/

## Intended GitHub Pages URL

Project site base path:

`https://weizheng05.github.io/tharc/`

All asset links in this site use **relative paths** so the site works both locally and under `/tharc/` on GitHub Pages.

## Local preview

Open the site from this folder:

```bash
# Option A — open the file directly
xdg-open index.html   # or open index.html / double-click

# Option B — simple local server (recommended for JSON fetch)
python3 -m http.server 8080
# then visit http://localhost:8080/
```

Files live under `/workspace/tharc` on the build box (or wherever you clone this repository).

## GitHub Pages setup

1. Create a public repository (suggested name: `tharc`) under the `weizheng05` GitHub account.
2. Push the contents of this folder to the repository root (so `index.html` is at the repo root).
3. In **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`), folder: `/ (root)`
4. Wait for the Pages build; the site should appear at `https://weizheng05.github.io/tharc/`.
5. Confirm relative CSS/JS/JSON loads correctly on the published URL.

Optional: set a custom domain later; keep relative paths.

## Indexing / privacy posture

- Every HTML page includes `<meta name="robots" content="noindex,nofollow,noarchive">`.
- `robots.txt` discourages crawling (`Disallow: /`).
- **No sitemap** is included on purpose.
- Do not add SEO metadata that invites indexing while the community is still forming.

## Data files

| Path | Purpose |
|------|---------|
| `data/country-counts.json` | US / UK / Australia expression-of-interest counters |
| `data/public-directory.json` | Opt-in public directory (empty until consented listings exist) |
| `docs/private-participant-schema.md` | **Documentation only** for a private offline roster |

### Privacy rules (do not break)

1. **Never** commit real participant emails, phone numbers, or private notes to this repository.
2. **Never** invent real people’s names for the public directory.
3. Public directory entries require **explicit consent**; include only non-email display fields.
4. Country counters describe **expressions of interest**, not formal appointments or commitments.
5. Keep the private master roster offline (or in a non-public location). See `docs/private-participant-schema.md`.
6. Status values for private tracking: `interested` | `confirmed` | `active` | `committee` | `advisor`.

## Tech notes

- Static HTML + one CSS file + light vanilla JS (nav, counters, directory filters, share/copy helpers).
- No build step, no framework, no analytics required for this first release.

## Disclaimer

THARC is an independent scholarly community and academic collaboration hosted by faculty. It does **not** represent, speak for, or claim endorsement by any government or any agency. Content on this site is for scholarly community-building and education.

## License / reuse

Coordinate with the founding host before republishing branding or community counts.
