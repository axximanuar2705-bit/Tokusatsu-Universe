# TOKUSATSU UNIVERSE — Stremio add-on starter

This is a metadata/discovery catalog add-on. It does **not** provide video streams.

## What's included
- Kamen Rider
- Ultraman
- Super Sentai
- GARO
- Metal Hero
- Godzilla & Kaiju
- Other Tokusatsu

The starter list is curated, not exhaustive. Entries use add-on-local IDs (`tu:`), so this first build does not yet resolve Cinemeta/IMDb posters or episode metadata. The next data-enrichment pass should map titles to IMDb IDs where verified.

## Run locally
Requires Node.js 18+:
```bash
npm start
```
Then open `http://127.0.0.1:7000/manifest.json` in a browser. For local testing, add that manifest URL in Stremio.

## Install from anywhere
To install on Android/other devices, deploy this folder to a host that provides a public HTTPS URL. Then use:
`https://YOUR-HOST/manifest.json`

Stremio add-ons are HTTP services exposing a manifest and catalog/meta endpoints. See:
- https://github.com/Stremio/stremio-addon-sdk
- https://stremio.github.io/stremio-addon-sdk/api/responses/manifest.html

## Expand the catalog
Edit `catalog.json`. Each item needs:
- `id`: unique URL-safe identifier
- `name`: display title
- `year`: release year
- `type`: `movie` or `series`

Keep IDs unique across the whole file.
