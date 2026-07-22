# Find My Local — Website

Marketing site for **Find My Local Private Limited**. Static site (HTML + CSS + vanilla JS), deployed via GitHub Pages to **https://findmylocal.co**.

## Structure
```
index.html         Single-page site
style.css          Styles (responsive: 850px / 500px breakpoints)
script.js          Topic cards, scroll reveal, mobile menu, feedback form
assets/            logo.png, india-network-map.jpg
CNAME              Custom domain (findmylocal.co)
robots.txt         Crawler rules + sitemap pointer
sitemap.xml        Sitemap for search engines
.nojekyll          Serve files as-is (no Jekyll processing)
.github/workflows/deploy.yml   Auto-deploy to GitHub Pages on push to main
```

## Deployment
GitHub Pages serves from the `main` branch (root). Every push to `main` auto-rebuilds the live site.
One-time setup: Settings → Pages → Source = Deploy from a branch → main / root; Custom domain = findmylocal.co (via CNAME file); Enforce HTTPS.

## DNS (at the domain registrar)
Apex `findmylocal.co` → four A records:
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
`www` → CNAME → `<github-username>.github.io`

## Local preview
`python -m http.server 8080` then open http://localhost:8080
