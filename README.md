# ACT-SO New Jersey static site

This is a static rebuild of the current WordPress site for GitHub and Cloudflare Pages.

## Local preview

From this folder:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Cloudflare Pages

Use this folder as the project root. No build command is required; the output directory is `/`.

## Notes before launch

- The contact form currently opens the visitor's email app and drafts a message to `admin@actsonewjersey.org`.
- Donation and journal links still point to the existing NAACP NJ event pages.
- Registration and volunteer intent buttons still point to the existing Google Forms.
