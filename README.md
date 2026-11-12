# Resume Studio

A responsive resume builder with a live resume preview, three layouts, accent colors, actionable ATS-readiness checks, repeatable experience/education/project sections, local drafts and JSON backup/import.

## Files

- `index.html` — editor and preview layout
- `style.css` — responsive UI and print-to-A4 styles
- `script.js` — editing, preview, local storage and score

Keep all three files together and open `index.html` in a modern browser. Edit the sample profile content or reset it at any time. Your draft stays in this browser; nothing is uploaded.

## Export PDF

Choose **Export PDF**, then in your browser's print dialog choose **Save as PDF**. The print stylesheet exports only the resume preview on A4 pages and lets longer resumes flow across pages instead of clipping them. For the most accurate typography, allow the optional Google Fonts to load first.

## Customize

- Edit the starter resume content in the `DEFAULTS` object at the top of `script.js`.
- Add/remove experience, education and project entries inside the app.
- Use the template selector and accent picker above the preview.
- Use **Backup** to download a JSON copy and **Import** to restore it.

Tip: replace example contact details with real ones before exporting or sharing your resume.
