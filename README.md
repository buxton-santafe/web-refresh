# City of Santa Fe — Website Discovery Demo

A **prototype for discovery and internal review**, not an official City of Santa Fe website.

## View the demo

Open `index.html` in a browser, or run a local development server from this folder:

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish using GitHub Pages

1. Create a new GitHub repository. Use a **private repository** if the content should not be publicly accessible; note that GitHub Pages sites may still be publicly reachable depending on your plan and settings. For restricted departmental access, use an IT-managed private staging server instead.
2. Upload **all files and folders** from this directory to the repository root (including `index.html` and `assets/`).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Open the GitHub Pages URL shown in Settings → Pages once deployment completes.

No build step or package installation is required. Relative CSS and JS paths also work for project repositories hosted at `username.github.io/repository-name/`.

## Structure

- `index.html` — page markup and navigation
- `assets/css/site.css` — original ordered styles, consolidated into one stylesheet
- `assets/js/script-01.js` through `script-07.js` — original application scripts, in their original execution positions
- `.nojekyll` — disable Jekyll processing for GitHub Pages

## Important demo limitations

- Applications, opportunities, projects, and some public meetings are illustrative prototype content, not confirmed current City information.
- Demo forms do not send or store submissions; do not enter sensitive information.
- Some imagery, the City seal, map tiles, map data, and linked pages are hosted externally and require an internet connection. External services may block requests or change.
- The prototype is not a production website and has not completed full browser or accessibility verification.
- Confirm authorization to use any external photographs, seals, and licensed fonts before public publication.

## Updates

Edit `index.html`, `assets/css/site.css`, or the JavaScript files and push changes to the repository. GitHub Pages will redeploy automatically.
