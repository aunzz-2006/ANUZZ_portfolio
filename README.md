# Anuj Bharat Gadekar — Portfolio

Premium responsive React + TypeScript portfolio built with Vite, custom CSS, Motion for React, GSAP/ScrollTrigger, Lucide icons and EmailJS.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Personal details and assets

- Update contact/social URLs in the `profile` object near the top of `src/App.tsx`.
- Replace `public/Anuj-Gadekar-Resume.pdf` to update the downloadable resume.
- Replace `public/assets/anuj-profile.png` to update the portrait.
- Project preview images are custom SVG illustrations in `public/assets/projects/`. Replace them with actual screenshots when available.
- Project repository/demo links are intentionally not fabricated; add verified URLs to the project data in `src/App.tsx`.

## Contact form delivery

The form includes client-side validation. It will not claim a message was sent until EmailJS confirms delivery. To enable email delivery to `anujgadekar688@gmail.com`:

1. Create an EmailJS service and a template that uses `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, and `{{message}}`.
2. Set the template recipient to `anujgadekar688@gmail.com`.
3. Copy `.env.example` to `.env` and fill in `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.
4. Restart the dev server / rebuild after changing environment variables.

Never commit private service credentials. EmailJS public keys are designed for browser use; apply provider-side rate limits and spam protection before public deployment.

## Accuracy notes

- Education uses the updated details supplied in the request: 10th PMVC Chinchpur (91.20%), 12th PVP Loni (70%), and B.E. Computer Engineering (expected 2027, 9.5 CGPA).
- The uploaded resume lists 9.19 CGPA, while the latest typed instruction says 9.5. This implementation follows the latest typed value; verify the final CGPA before publishing.
- The actual uploaded profile photo and resume PDF are included.
- Project visuals are illustrative SVG previews, not screenshots of deployed applications.
