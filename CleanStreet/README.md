# CleanStreet — Smart Community Waste Management

A responsive, frontend-only React prototype for reporting community waste issues and demonstrating cleanup progress. All reports use sample data or locally submitted data stored in the browser's `localStorage`. No backend, API, or database is used. Nothing is sent to a real municipality.

## Features
- Public landing page with report call-to-action and recent reports.
- Report form with validation, image browse/drag-and-drop, preview, and remove.
- Explore reports with combined search, category/status/urgency filters, sorting, and grid/list view.
- Report details with status timeline and related reports.
- Impact dashboard with dynamically calculated metrics and Recharts visualizations.
- Neighborhood location overview with clearly illustrative demo markers.
- Simulated administration page to edit, update status/urgency, delete, and reset reports.
- Local persistence, responsive navigation, accessible labels, and reduced-motion support.
- English interface and centralized color theme based on `#E8A07C`, `#827148`, `#A5AF79`, and `#FFEED6`.

## Run locally
Install Node.js (LTS), then in this folder run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with:

```bash
npm run build
npm run preview
```

## Deploy
Deploy the generated `dist` directory to a static host such as Netlify or Vercel. Configure a single-page-app rewrite so routes such as `/reports/CS-1048` fall back to `index.html`.

## Demo limitations
- Reports are saved in the current browser only.
- There is no authentication or server-side security.
- Administration is a workflow simulation, not a real municipal service.
- Initial sample coordinates and location markers are illustrative, not verified incident locations.
- Optional uploaded images are stored as data URLs in localStorage; very large images are rejected (over 5 MB).
- The dashboard charts calculate from the current local report dataset. Monthly sample dates are seeded relative to the current date.

## Manual test checklist
1. Open Home and use both hero CTAs.
2. Open Report an issue; try submitting empty fields and confirm validation appears.
3. Drag an image into the upload area; also use Browse files. Remove the image and test an invalid file / image over 5 MB.
4. Submit a valid report and confirm the success message and report ID.
5. Open Explore reports and search for the new report by ID, title, or neighborhood.
6. Apply multiple filters, sort oldest/newest, switch grid/list, and reset filters.
7. Open report details and confirm the status timeline matches its status.
8. Open Impact dashboard and confirm counts/charts reflect the added report.
9. Open Demo administration, change status and urgency, edit details, and delete a report with confirmation.
10. Reset demo data and confirm the original sample dataset is restored.
11. Refresh the page and confirm localStorage persistence.
12. Check layouts at 1440, 1024, 768, 390, and 320 px viewport widths.
13. Run `npm run build` and resolve any build errors before presenting.
