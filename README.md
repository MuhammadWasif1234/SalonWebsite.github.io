Website Architecture Note: Velvet & Shears Hair Salon

Overview: A static website built with plain HTML, CSS and JavaScript, with no backend. Every page shares one stylesheet (style.css) and one script (main.js). Form data is saved in the browser’s localStorage.

#	Page	Purpose
1	index.html	Home: hero, featured services, stats, review slider
2	about.html	Salon story, values, timeline
3	services.html	12 services with category filter
4	pricing.html	Price tables and cost estimator
5	gallery.html	Filterable gallery with lightbox
6	team.html	Stylist profiles
7	booking.html	Appointment form, saved to localStorage
8	reviews.html	Client reviews and a review form
9	faq.html	Searchable accordion
10	contact.html	Contact form, saved to localStorage, plus hours and address
2. Navigation
Shared header and footer: main.js inserts the same header and footer into every page, so the menu is written once and stays consistent.
Menu links: The header links to all pages, and a Book Now button points to the booking page.
Active page: The script compares the current filename with each link and highlights the matching one.
Mobile menu: Below 1100px the menu collapses into a hamburger button that opens and closes a dropdown.
Links between pages: Calls-to-action link across pages. For example, “Book this” on a service opens the booking form with that service already selected, using a URL like booking.html?service=cut-w.
Sticky header: The header stays at the top while scrolling.
3. CSS
One stylesheet: All 10 pages use a single file, so the design is consistent and easy to change.
CSS variables: Colours, fonts, radius and shadows are defined once in :root (for example --rose, --plum, --gold) and reused everywhere.
Layout: CSS Grid is used for card, gallery and footer layouts, and Flexbox for the header, toolbars and buttons.
Reusable classes: Components such as .btn, .card, .section and .form-card keep the styling consistent.
Responsive design: Media queries at 1100px, 900px and 600px reflow the grids into fewer columns and switch to the mobile menu.
Interaction effects: Transitions and hover effects (lifting cards, underlined links), plus scroll-reveal animations and a toast notification. A prefers-reduced-motion rule turns animations off for users who prefer less motion.
Form validation styles: Invalid fields show a red border and an error message.
