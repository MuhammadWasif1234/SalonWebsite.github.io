# Velvet & Shears — Hair Salon Website

A 10-page responsive website for a hair salon, built with **HTML, CSS and JavaScript only**. There is no backend; all form data is stored in the browser's `localStorage`.

**Live demo:** https://muhammadwasif1234.github.io/YOUR-REPO-NAME/

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, featured services, stats, review slider |
| About | `about.html` | Salon story, values and timeline |
| Services | `services.html` | 12 services with category filter |
| Pricing | `pricing.html` | Price tables and cost estimator |
| Gallery | `gallery.html` | Filterable gallery with lightbox |
| Team | `team.html` | Stylist profiles |
| Booking | `booking.html` | Appointment form saved to localStorage |
| Reviews | `reviews.html` | Client reviews and review form |
| FAQ | `faq.html` | Searchable accordion |
| Contact | `contact.html` | Contact form saved to localStorage |

## Features

- Shared header and footer injected by JavaScript, with active-page highlighting
- Responsive layout with a mobile hamburger menu
- Contact form with validation, saved messages list, delete, clear all and JSON export
- Booking form that blocks past dates, Sundays and already-booked time slots
- Service and gallery filters, image lightbox with keyboard navigation
- Price estimator with a 10% discount on 3 or more services
- Star-rating review form with a live average rating
- FAQ accordion with live search
- Newsletter signup saved to localStorage

## Tech Stack

- HTML5
- CSS3 (variables, Grid, Flexbox, media queries)
- Vanilla JavaScript (ES6)
- `localStorage` for data persistence

## Project Structure

```
├── index.html
├── about.html
├── services.html
├── pricing.html
├── gallery.html
├── team.html
├── booking.html
├── reviews.html
├── faq.html
├── contact.html
├── style.css
└── main.js
```

## Run Locally

1. Download or clone this repository.
2. Open `index.html` in any modern browser.

No installation or server is needed.

## Deploy on GitHub Pages

1. Go to **Settings → Pages**.
2. Set **Source** to "Deploy from a branch", then choose `main` and `/ (root)`.
3. Save and wait a minute for the site to go live.

## localStorage Keys

| Key | Data |
|-----|------|
| `vs_contact_messages` | Contact form messages |
| `vs_contact_draft` | Unsent contact form draft |
| `vs_bookings` | Appointments |
| `vs_reviews` | Submitted reviews |
| `vs_newsletter` | Newsletter emails |

Data is stored only in the visitor's own browser and is not sent anywhere.

## Author

Muhammad Wasif
