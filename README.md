# Farmiera Poultry

Poultry SOP Guide (EN / BM / 中文) with photo-based AI help.

## Put it on GitHub Pages
1. Create a repo (for example `farmiera-poultry`) and upload everything in this folder.
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)` → Save.
3. Open `https://<your-username>.github.io/farmiera-poultry/` on the phone.
4. Browser menu → "Add to Home screen" to install it.

The website is public: anyone with the link can open it. The API key is NOT in these files,
so that is safe, but the book photos are visible to anyone who finds the link.

## Turn on photo AI
Open the app → Ask AI → AI settings → choose Claude or ChatGPT → paste the API key → Save key → Test connection.
The key is stored only in that phone's browser. Set a monthly spend limit on the provider's website.

## How to release an update
1. Edit `index.html`:
   - change `APP_VERSION` (e.g. "1.1.0" → "1.2.0")
   - add a new entry at the TOP of `CHANGELOG` (version, date/time, what changed in EN/BM/中文)
2. Edit `sw.js`: change `VERSION` to the same number.
3. Upload both files to GitHub. Pages usually goes live within a few minutes.
4. Users get the new version the next time they open the app with internet.
   The "What's new" popup shows once, then never again for that version.

## Files
- `index.html` – the whole app (reference photos built in; works offline except AI)
- `knowledge.json` – knowledge base: symptoms, diseases, action steps, biosecurity SOPs, photo captions
- `img/` – the 34 reference photos as separate files
- `sw.js`, `manifest.webmanifest`, `icons/` – make it installable and offline

Photos come from Ceva books whose copyright forbids reproduction: fine for a private demo, get permission before sharing widely.
