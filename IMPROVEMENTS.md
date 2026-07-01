# Suggested Improvements

A list of recommended enhancements for the Kawu Sumaila portfolio site, prioritised by impact.

---

## High Priority

### 1. Contact Form
Add a working contact form on the Contact page so visitors can send messages directly to the Senator's office. Use Supabase to store submissions or a service like Resend/EmailJS to send emails.

### 2. News & Press Section
Add a News page where the admin can publish updates, press releases, and statements. Each post should have a title, date, body text, and optional image — managed from the admin panel.

---

## Medium Priority

### 3. Image Optimisation
Compress images before upload and serve them in WebP format for faster page load times. Consider using Supabase image transformations or a CDN like Cloudinary.

### 4. Admin — Drag to Reorder Achievements
Replace the manual order number input with a drag-and-drop interface so achievements can be reordered visually.

### 5. Admin — Rich Text Editor
Replace plain textareas for bio and letter body with a simple rich text editor (e.g. TipTap or Quill) so the admin can add bold, italic, and bullet formatting without knowing HTML.

### 6. Loading Skeletons
Replace "Loading..." text with skeleton placeholders that match the page layout, giving visitors a smoother experience while content fetches.

### 7. Analytics
Add a privacy-friendly analytics tool (e.g. Vercel Analytics or Plausible) to see how many people visit the site and which pages they read most.

---

## Lower Priority

### 8. Gallery / Media Section
A photo gallery page where the admin can upload event photos. Useful for rallies, committee sessions, and constituency visits.

### 9. Video Embed Support
Allow the admin to paste a YouTube or Vimeo link on any achievement or news post to embed video footage.

### 10. Dark Mode
Add a dark mode toggle for visitors who prefer it.

### 11. Admin Activity Log
Record a history of changes made in the admin panel (what was changed, when, and by whom) for accountability.

### 12. Sitemap & Robots.txt
Add a sitemap.xml and robots.txt file to help search engines crawl and index the site correctly.
