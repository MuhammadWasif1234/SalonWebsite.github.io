/* ==========================================================
   Velvet & Shears — shared JavaScript
   - Injects header/footer on every page
   - Page-specific features, selected via <body data-page="...">
   - All data is kept in the browser's localStorage (no backend)
   ========================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. Data (single source of truth for several pages)
     --------------------------------------------------------- */
  const CURRENCY = "$";

  const SERVICES = [
    { id: "cut-w", name: "Women's Haircut & Style", cat: "Cuts", price: 55, mins: 60, icon: "✂️", desc: "Consultation, wash, precision cut and blow-dry finish." },
    { id: "cut-m", name: "Men's Haircut", cat: "Cuts", price: 35, mins: 40, icon: "💈", desc: "Classic or modern cut with a hot-towel neck finish." },
    { id: "cut-k", name: "Kids' Haircut", cat: "Cuts", price: 25, mins: 30, icon: "🧒", desc: "Gentle, fun and patient styling for under-12s." },
    { id: "col-full", name: "Full Colour", cat: "Colour", price: 110, mins: 120, icon: "🎨", desc: "Single-process colour from roots to ends with gloss." },
    { id: "col-high", name: "Highlights / Balayage", cat: "Colour", price: 160, mins: 180, icon: "🌈", desc: "Hand-painted dimension for a sun-kissed, lived-in look." },
    { id: "col-touch", name: "Root Touch-Up", cat: "Colour", price: 70, mins: 75, icon: "🖌️", desc: "Keep regrowth invisible between full colour appointments." },
    { id: "tr-keratin", name: "Keratin Smoothing Treatment", cat: "Treatments", price: 220, mins: 180, icon: "✨", desc: "Frizz-free, glossy hair that lasts for up to 12 weeks." },
    { id: "tr-deep", name: "Deep Conditioning Spa", cat: "Treatments", price: 45, mins: 40, icon: "💧", desc: "Intensive moisture mask with scalp massage." },
    { id: "tr-scalp", name: "Scalp Therapy", cat: "Treatments", price: 50, mins: 45, icon: "🌿", desc: "Cleansing and soothing ritual for a healthy scalp." },
    { id: "st-blow", name: "Blow-Dry & Style", cat: "Styling", price: 40, mins: 45, icon: "💨", desc: "Sleek, bouncy or beachy — styled just the way you like." },
    { id: "st-up", name: "Event Updo", cat: "Styling", price: 80, mins: 75, icon: "👑", desc: "Elegant updos and braids for parties and special nights." },
    { id: "br-bride", name: "Bridal Hair Package", cat: "Bridal", price: 250, mins: 150, icon: "💍", desc: "Trial session plus wedding-day styling, with a touch-up kit." }
  ];

  const STYLISTS = [
    { id: "amelia", name: "Amelia Hart", role: "Creative Director", skills: ["Balayage", "Precision Cuts", "Bridal"], bio: "15 years of experience and a passion for colour that glows.", color: "linear-gradient(135deg,#b76e79,#3b2540)" },
    { id: "daniel", name: "Daniel Cruz", role: "Senior Stylist", skills: ["Men's Cuts", "Fades", "Beard Care"], bio: "Sharp lines, relaxed chat, and the best hot-towel finish in town.", color: "linear-gradient(135deg,#4a6fa5,#1e1622)" },
    { id: "sofia", name: "Sofia Malik", role: "Colour Specialist", skills: ["Highlights", "Vivid Colours", "Corrections"], bio: "Turns colour dreams into reality, from soft pastels to bold vivids.", color: "linear-gradient(135deg,#c9a36a,#7a4a6b)" },
    { id: "liam", name: "Liam Walker", role: "Stylist & Trainer", skills: ["Texture", "Curly Cuts", "Styling"], bio: "Loves enhancing natural texture and teaching clients how to style at home.", color: "linear-gradient(135deg,#2e7d5b,#1e1622)" }
  ];

  const GALLERY = [
    { cat: "Colour", title: "Honey Balayage", icon: "🍯", bg: "linear-gradient(135deg,#d9a35b,#8a4f3a)" },
    { cat: "Cuts", title: "Textured Bob", icon: "✂️", bg: "linear-gradient(135deg,#7a4a6b,#2a1a30)" },
    { cat: "Bridal", title: "Romantic Low Bun", icon: "💍", bg: "linear-gradient(135deg,#e8b4bc,#9a5560)" },
    { cat: "Styling", title: "Hollywood Waves", icon: "🌊", bg: "linear-gradient(135deg,#4a6fa5,#2a1a30)" },
    { cat: "Colour", title: "Rose Gold Pastel", icon: "🌸", bg: "linear-gradient(135deg,#f0b6c1,#b76e79)" },
    { cat: "Cuts", title: "Classic Fade", icon: "💈", bg: "linear-gradient(135deg,#555,#1e1622)" },
    { cat: "Styling", title: "Sleek Ponytail", icon: "🎀", bg: "linear-gradient(135deg,#c9a36a,#5a3358)" },
    { cat: "Bridal", title: "Braided Crown", icon: "👑", bg: "linear-gradient(135deg,#f4d6a0,#b76e79)" },
    { cat: "Colour", title: "Midnight Violet", icon: "🔮", bg: "linear-gradient(135deg,#6a3d9a,#1e1622)" },
    { cat: "Cuts", title: "Soft Layers", icon: "🍃", bg: "linear-gradient(135deg,#6ea88a,#2f5a4a)" },
    { cat: "Styling", title: "Beachy Texture", icon: "🏖️", bg: "linear-gradient(135deg,#7fc1d6,#c9a36a)" },
    { cat: "Bridal", title: "Vintage Pin Curls", icon: "🌹", bg: "linear-gradient(135deg,#b3382c,#3b2540)" }
  ];

  const SEED_REVIEWS = [
    { name: "Hannah R.", rating: 5, text: "Amelia gave me the most beautiful balayage. I get compliments every single day!", date: "2026-08-14" },
    { name: "Marcus T.", rating: 5, text: "Best fade I've ever had. Daniel is a true professional and the shop is spotless.", date: "2026-09-02" },
    { name: "Priya S.", rating: 4, text: "Loved the keratin treatment — my hair has never been so smooth. Booking was easy too.", date: "2026-09-19" },
    { name: "Emily W.", rating: 5, text: "They styled my wedding party and everything was flawless. Calm, kind and so talented.", date: "2026-07-30" },
    { name: "Omar K.", rating: 5, text: "Sofia fixed a colour disaster from another salon. I'm a customer for life.", date: "2026-10-05" }
  ];

  /* ---------------------------------------------------------
     2. Helpers
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const money = (n) => CURRENCY + Number(n).toFixed(0);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone = (v) => /^[+\d][\d\s\-()]{6,18}$/.test(v);

  // Safe localStorage wrapper (works even if storage is blocked)
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (e) { toast("Could not save — browser storage is unavailable.", true); return false; }
    }
  };
  const KEYS = { messages: "vs_contact_messages", bookings: "vs_bookings", reviews: "vs_reviews", news: "vs_newsletter" };

  function toast(msg, isError) {
    let t = $("#toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.toggle("error", !!isError);
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 3200);
  }

  function setError(input, message) {
    const field = input.closest(".field");
    if (!field) return;
    field.classList.toggle("invalid", !!message);
    const err = $(".err", field);
    if (err) err.textContent = message || "";
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }
  function fmtStamp(iso) {
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  }
  function stars(n) { return "★".repeat(n) + "☆".repeat(5 - n); }

  /* ---------------------------------------------------------
     3. Header & footer (shared by all pages)
     --------------------------------------------------------- */
  const NAV = [
    ["index.html", "Home"], ["about.html", "About"], ["services.html", "Services"], ["pricing.html", "Pricing"],
    ["gallery.html", "Gallery"], ["team.html", "Team"], ["reviews.html", "Reviews"], ["faq.html", "FAQ"], ["contact.html", "Contact"]
  ];

  function buildChrome() {
    const current = location.pathname.split("/").pop() || "index.html";
    const links = NAV.map(([href, label]) =>
      `<li><a href="${href}" class="${href === current ? "active" : ""}">${label}</a></li>`).join("");

    const header = `
      <header class="site-header">
        <div class="container nav-wrap">
          <a href="index.html" class="logo">Velvet <span>&</span> Shears</a>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
          <ul class="nav-links" id="navLinks">
            ${links}
            <li><a href="booking.html" class="btn">Book Now</a></li>
          </ul>
        </div>
      </header>`;

    const footer = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="logo">Velvet <span>&</span> Shears</a>
              <p style="margin-top:12px">Where great hair begins. Cuts, colour and care in a calm, welcoming space.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="gallery.html">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h4>Help</h4>
              <ul>
                <li><a href="booking.html">Book Online</a></li>
                <li><a href="team.html">Our Team</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Newsletter</h4>
              <p style="margin-bottom:0">Hair tips and offers, once a month.</p>
              <form class="news-form" id="newsForm" novalidate>
                <input type="email" id="newsEmail" placeholder="Your email" aria-label="Email for newsletter" required>
                <button class="btn small" type="submit">Join</button>
              </form>
            </div>
          </div>
          <div class="footer-bottom">© ${new Date().getFullYear()} Velvet &amp; Shears Hair Salon. All rights reserved.</div>
        </div>
      </footer>`;

    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);

    const toggle = $("#navToggle"), menu = $("#navLinks");
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "✕" : "☰";
    });

    $("#newsForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("#newsEmail");
      const email = input.value.trim();
      if (!isEmail(email)) return toast("Please enter a valid email address.", true);
      const list = store.get(KEYS.news, []);
      if (list.includes(email.toLowerCase())) return toast("You're already subscribed!");
      list.push(email.toLowerCase());
      store.set(KEYS.news, list);
      input.value = "";
      toast("Thanks for subscribing! 💌");
    });
  }

  /* ---------------------------------------------------------
     4. Scroll reveal
     --------------------------------------------------------- */
  function initReveal() {
    const items = $$(".reveal");
    if (typeof window.IntersectionObserver !== "function") { items.forEach((i) => i.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  }

  /* ---------------------------------------------------------
     5. Page modules
     --------------------------------------------------------- */
  const pages = {};

  // ---- Home: featured services, stat counters, review slider
  pages.home = function () {
    const featured = ["cut-w", "col-high", "tr-keratin"].map((id) => SERVICES.find((s) => s.id === id));
    $("#featuredServices").innerHTML = featured.map((s) => `
      <article class="card reveal">
        <span class="icon">${s.icon}</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.desc)}</p>
        <div class="meta"><span>${s.mins} min</span><span class="price">from ${money(s.price)}</span></div>
      </article>`).join("");

    // animated counters
    $$("[data-count]").forEach((el) => {
      const target = +el.dataset.count, suffix = el.dataset.suffix || "";
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        cur = Math.min(target, cur + step);
        el.textContent = cur.toLocaleString() + suffix;
        if (cur >= target) clearInterval(timer);
      }, 24);
    });

    renderSlider($("#homeSlider"), allReviews().slice(0, 5));
  };

  // ---- Services: category filter
  pages.services = function () {
    const cats = ["All", ...new Set(SERVICES.map((s) => s.cat))];
    const bar = $("#serviceFilters"), grid = $("#serviceGrid");
    bar.innerHTML = cats.map((c, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");

    function render(cat) {
      const list = cat === "All" ? SERVICES : SERVICES.filter((s) => s.cat === cat);
      grid.innerHTML = list.map((s) => `
        <article class="card">
          <span class="tag">${esc(s.cat)}</span>
          <span class="icon">${s.icon}</span>
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.desc)}</p>
          <div class="meta"><span>⏱ ${s.mins} min</span><span class="price">${money(s.price)}</span></div>
          <p style="margin:16px 0 0"><a class="btn small" href="booking.html?service=${s.id}">Book this</a></p>
        </article>`).join("");
    }
    bar.addEventListener("click", (e) => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      $$(".filter-btn", bar).forEach((x) => x.classList.toggle("active", x === b));
      render(b.dataset.cat);
    });
    render("All");
  };

  // ---- Pricing: tables + estimator
  pages.pricing = function () {
    const cats = [...new Set(SERVICES.map((s) => s.cat))];
    $("#priceTables").innerHTML = cats.map((c) => `
      <h3 style="margin-top:34px">${c}</h3>
      <table class="price-table">
        <thead><tr><th>Service</th><th>Duration</th><th>Price</th></tr></thead>
        <tbody>${SERVICES.filter((s) => s.cat === c).map((s) =>
          `<tr><td>${esc(s.name)}</td><td>${s.mins} min</td><td class="amt">${money(s.price)}</td></tr>`).join("")}
        </tbody>
      </table>`).join("");

    const list = $("#estList");
    list.innerHTML = SERVICES.map((s) => `
      <label><input type="checkbox" value="${s.id}"> ${esc(s.name)} <span class="p">${money(s.price)}</span></label>`).join("");

    const length = $("#hairLength"), totalEl = $("#estTotal"), timeEl = $("#estTime"), countEl = $("#estCount");
    function calc() {
      const mult = parseFloat(length.value);
      let total = 0, mins = 0, n = 0;
      $$("input:checked", list).forEach((cb) => {
        const s = SERVICES.find((x) => x.id === cb.value);
        total += s.price; mins += s.mins; n++;
      });
      total *= mult;
      let discount = 0;
      if (n >= 3) discount = total * 0.1;
      totalEl.textContent = money(total - discount);
      countEl.textContent = n ? `${n} service${n > 1 ? "s" : ""} selected${discount ? " · 10% bundle discount applied" : ""}` : "Select services to see an estimate";
      timeEl.textContent = mins ? `≈ ${Math.floor(mins / 60)}h ${mins % 60}m` : "—";
    }
    list.addEventListener("change", calc);
    length.addEventListener("change", calc);
    calc();
  };

  // ---- Gallery: filter + lightbox
  pages.gallery = function () {
    const cats = ["All", ...new Set(GALLERY.map((g) => g.cat))];
    const bar = $("#galleryFilters"), grid = $("#galleryGrid"), lb = $("#lightbox"), lbBox = $("#lbBox");
    bar.innerHTML = cats.map((c, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");

    grid.innerHTML = GALLERY.map((g, i) => `
      <div class="g-item" data-i="${i}" data-cat="${g.cat}" style="background:${g.bg}" tabindex="0" role="button" aria-label="Open ${esc(g.title)}">
        <span>${g.icon}</span><div class="cap">${esc(g.title)} · ${g.cat}</div>
      </div>`).join("");

    let visible = GALLERY.map((_, i) => i), pos = 0;

    bar.addEventListener("click", (e) => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      $$(".filter-btn", bar).forEach((x) => x.classList.toggle("active", x === b));
      $$(".g-item", grid).forEach((el) => el.classList.toggle("hide", b.dataset.cat !== "All" && el.dataset.cat !== b.dataset.cat));
      visible = $$(".g-item:not(.hide)", grid).map((el) => +el.dataset.i);
    });

    function show(i) {
      const g = GALLERY[visible[i]];
      lbBox.style.background = g.bg;
      lbBox.innerHTML = `<span>${g.icon}</span><div class="cap">${esc(g.title)} · ${g.cat}</div>`;
    }
    function open(idx) { pos = visible.indexOf(idx); if (pos < 0) pos = 0; show(pos); lb.classList.add("open"); }
    function close() { lb.classList.remove("open"); }
    function move(d) { pos = (pos + d + visible.length) % visible.length; show(pos); }

    grid.addEventListener("click", (e) => { const it = e.target.closest(".g-item"); if (it) open(+it.dataset.i); });
    grid.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("g-item")) { e.preventDefault(); open(+e.target.dataset.i); }
    });
    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", () => move(-1));
    $("#lbNext").addEventListener("click", () => move(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    });
  };

  // ---- Team
  pages.team = function () {
    $("#teamGrid").innerHTML = STYLISTS.map((s) => `
      <article class="card stylist reveal">
        <div class="avatar" style="background:${s.color}">${s.name.split(" ").map((w) => w[0]).join("")}</div>
        <h3>${esc(s.name)}</h3>
        <div class="role">${esc(s.role)}</div>
        <p>${esc(s.bio)}</p>
        <div class="skills">${s.skills.map((k) => `<span>${esc(k)}</span>`).join("")}</div>
        <p style="margin:18px 0 0"><a class="btn small" href="booking.html?stylist=${s.id}">Book with ${esc(s.name.split(" ")[0])}</a></p>
      </article>`).join("");
  };

  // ---- Booking: form + localStorage list
  pages.booking = function () {
    const form = $("#bookingForm");
    const svc = $("#bkService"), sty = $("#bkStylist"), date = $("#bkDate"), time = $("#bkTime");

    svc.innerHTML = `<option value="">Choose a service…</option>` +
      SERVICES.map((s) => `<option value="${s.id}">${esc(s.name)} — ${money(s.price)}</option>`).join("");
    sty.innerHTML = `<option value="">Choose a stylist…</option>` +
      STYLISTS.map((s) => `<option value="${s.id}">${esc(s.name)} (${esc(s.role)})</option>`).join("");

    // Prefill from URL (?service=...&stylist=...)
    const params = new URLSearchParams(location.search);
    if (params.get("service")) svc.value = params.get("service");
    if (params.get("stylist")) sty.value = params.get("stylist");

    // Min date = today
    const today = new Date();
    const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    date.min = iso(today);

    const SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    function refreshSlots() {
      const bookings = store.get(KEYS.bookings, []);
      const taken = bookings.filter((b) => b.date === date.value && b.stylist === sty.value).map((b) => b.time);
      const prev = time.value;
      time.innerHTML = `<option value="">Choose a time…</option>` +
        SLOTS.map((t) => `<option value="${t}" ${taken.includes(t) ? "disabled" : ""}>${t}${taken.includes(t) ? " (booked)" : ""}</option>`).join("");
      if (prev && !taken.includes(prev)) time.value = prev;
    }
    date.addEventListener("change", refreshSlots);
    sty.addEventListener("change", refreshSlots);
    refreshSlots();

    function validate() {
      let ok = true;
      const name = $("#bkName"), phone = $("#bkPhone"), email = $("#bkEmail");
      const rules = [
        [name, name.value.trim().length >= 2, "Please enter your full name."],
        [phone, isPhone(phone.value.trim()), "Enter a valid phone number."],
        [email, isEmail(email.value.trim()), "Enter a valid email address."],
        [svc, !!svc.value, "Please choose a service."],
        [sty, !!sty.value, "Please choose a stylist."],
        [date, !!date.value && date.value >= date.min, "Choose today or a future date."],
        [time, !!time.value, "Please choose a time slot."]
      ];
      rules.forEach(([el, valid, msg]) => { setError(el, valid ? "" : msg); if (!valid) ok = false; });
      if (date.value && new Date(date.value + "T00:00").getDay() === 0) {
        setError(date, "We're closed on Sundays — please pick another day."); ok = false;
      }
      return ok;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return toast("Please fix the highlighted fields.", true);
      const bookings = store.get(KEYS.bookings, []);
      if (bookings.some((b) => b.date === date.value && b.stylist === sty.value && b.time === time.value)) {
        refreshSlots();
        return toast("Sorry, that slot was just taken. Pick another time.", true);
      }
      bookings.push({
        id: uid(), name: $("#bkName").value.trim(), phone: $("#bkPhone").value.trim(), email: $("#bkEmail").value.trim(),
        service: svc.value, stylist: sty.value, date: date.value, time: time.value, notes: $("#bkNotes").value.trim(),
        createdAt: new Date().toISOString()
      });
      store.set(KEYS.bookings, bookings);
      form.reset();
      refreshSlots();
      renderList();
      toast("Appointment booked! See you soon ✨");
    });

    const listEl = $("#bookingList");
    function renderList() {
      const bookings = store.get(KEYS.bookings, []).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
      $("#bookingCount").textContent = bookings.length;
      if (!bookings.length) { listEl.innerHTML = `<div class="empty">No appointments yet. Book your first visit above!</div>`; return; }
      listEl.innerHTML = bookings.map((b) => {
        const s = SERVICES.find((x) => x.id === b.service), st = STYLISTS.find((x) => x.id === b.stylist);
        return `<div class="record">
          <div>
            <h4>${esc(s ? s.name : b.service)} with ${esc(st ? st.name : b.stylist)}</h4>
            <p>📅 ${fmtDate(b.date)} at ${esc(b.time)} · 👤 ${esc(b.name)} · 📞 ${esc(b.phone)}</p>
            ${b.notes ? `<p>📝 ${esc(b.notes)}</p>` : ""}
          </div>
          <button class="btn small danger" data-cancel="${b.id}">Cancel</button>
        </div>`;
      }).join("");
    }
    listEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cancel]");
      if (!btn || !confirm("Cancel this appointment?")) return;
      store.set(KEYS.bookings, store.get(KEYS.bookings, []).filter((b) => b.id !== btn.dataset.cancel));
      renderList(); refreshSlots();
      toast("Appointment cancelled.");
    });
    renderList();
  };

  // ---- Reviews: slider + add review
  function allReviews() {
    return [...store.get(KEYS.reviews, []), ...SEED_REVIEWS].sort((a, b) => b.date.localeCompare(a.date));
  }

  function renderSlider(root, reviews) {
    if (!root) return;
    root.innerHTML = `
      <div class="slides">${reviews.map((r) => `
        <div class="slide"><div class="card">
          <div class="star-static">${stars(r.rating)}</div>
          <p class="quote">“${esc(r.text)}”</p>
          <strong>${esc(r.name)}</strong>
        </div></div>`).join("")}</div>
      <div class="slider-dots">${reviews.map((_, i) => `<button aria-label="Review ${i + 1}" class="${i === 0 ? "active" : ""}"></button>`).join("")}</div>`;
    const slides = $(".slides", root), dots = $$(".slider-dots button", root);
    let i = 0, timer;
    function go(n) {
      i = (n + reviews.length) % reviews.length;
      slides.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle("active", k === i));
    }
    function auto() { clearInterval(timer); timer = setInterval(() => go(i + 1), 5000); }
    dots.forEach((d, k) => d.addEventListener("click", () => { go(k); auto(); }));
    auto();
  }

  pages.reviews = function () {
    function render() {
      const list = allReviews();
      const avg = list.reduce((a, r) => a + r.rating, 0) / list.length;
      $("#avgRating").textContent = avg.toFixed(1);
      $("#avgStars").textContent = stars(Math.round(avg));
      $("#reviewCount").textContent = `${list.length} reviews`;
      renderSlider($("#reviewSlider"), list.slice(0, 6));
      $("#reviewGrid").innerHTML = list.map((r) => `
        <article class="card review">
          <div class="star-static">${stars(r.rating)}</div>
          <p class="quote">“${esc(r.text)}”</p>
          <div class="who"><div class="dot">${esc(r.name.charAt(0).toUpperCase())}</div>
            <div><strong>${esc(r.name)}</strong><br><small>${fmtDate(r.date)}</small></div></div>
        </article>`).join("");
    }
    render();

    const form = $("#reviewForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#rvName"), text = $("#rvText"), rating = form.querySelector('input[name="rating"]:checked');
      let ok = true;
      [[name, name.value.trim().length >= 2, "Please enter your name."],
       [text, text.value.trim().length >= 10, "Please write at least 10 characters."]]
        .forEach(([el, v, m]) => { setError(el, v ? "" : m); if (!v) ok = false; });
      const ratingField = $("#ratingField");
      ratingField.classList.toggle("invalid", !rating);
      if (!rating) ok = false;
      if (!ok) return toast("Please complete the review form.", true);

      const mine = store.get(KEYS.reviews, []);
      mine.push({ name: name.value.trim(), rating: +rating.value, text: text.value.trim(), date: new Date().toISOString().slice(0, 10) });
      store.set(KEYS.reviews, mine);
      form.reset();
      render();
      toast("Thank you for your review! ⭐");
    });
  };

  // ---- FAQ accordion + search
  pages.faq = function () {
    const items = $$(".faq-item");
    items.forEach((item) => {
      $(".faq-q", item).addEventListener("click", () => {
        const open = item.classList.toggle("open");
        $(".faq-a", item).style.maxHeight = open ? $(".faq-a", item).scrollHeight + 40 + "px" : null;
      });
    });
    const search = $("#faqSearch"), none = $("#faqNone");
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      items.forEach((it) => {
        const match = !q || it.textContent.toLowerCase().includes(q);
        it.style.display = match ? "" : "none";
        if (match) shown++;
      });
      none.style.display = shown ? "none" : "block";
    });
  };

  // ---- Contact: form saved to localStorage + saved messages viewer
  pages.contact = function () {
    const form = $("#contactForm");
    const f = { name: $("#ctName"), email: $("#ctEmail"), phone: $("#ctPhone"), subject: $("#ctSubject"), message: $("#ctMessage") };

    // restore unsent draft
    const draft = store.get("vs_contact_draft", null);
    if (draft) Object.keys(f).forEach((k) => { if (draft[k]) f[k].value = draft[k]; });
    form.addEventListener("input", () => {
      store.set("vs_contact_draft", Object.fromEntries(Object.entries(f).map(([k, el]) => [k, el.value])));
    });

    function validate() {
      let ok = true;
      const rules = [
        [f.name, f.name.value.trim().length >= 2, "Please enter your name."],
        [f.email, isEmail(f.email.value.trim()), "Enter a valid email address."],
        [f.phone, !f.phone.value.trim() || isPhone(f.phone.value.trim()), "Enter a valid phone number or leave blank."],
        [f.subject, !!f.subject.value, "Please choose a subject."],
        [f.message, f.message.value.trim().length >= 10, "Message must be at least 10 characters."]
      ];
      rules.forEach(([el, v, m]) => { setError(el, v ? "" : m); if (!v) ok = false; });
      return ok;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return toast("Please fix the highlighted fields.", true);
      const msgs = store.get(KEYS.messages, []);
      msgs.unshift({
        id: uid(), name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(),
        subject: f.subject.value, message: f.message.value.trim(), createdAt: new Date().toISOString()
      });
      if (!store.set(KEYS.messages, msgs)) return;
      try { localStorage.removeItem("vs_contact_draft"); } catch (e) { /* ignore */ }
      form.reset();
      renderMessages();
      toast("Message saved! We'll be in touch soon 💌");
    });

    const listEl = $("#messageList");
    function renderMessages() {
      const msgs = store.get(KEYS.messages, []);
      $("#msgCount").textContent = msgs.length;
      if (!msgs.length) { listEl.innerHTML = `<div class="empty">No messages saved yet. Send one using the form above.</div>`; return; }
      listEl.innerHTML = msgs.map((m) => `
        <div class="record">
          <div>
            <h4>${esc(m.subject)} — ${esc(m.name)}</h4>
            <p>${esc(m.message)}</p>
            <small>✉ ${esc(m.email)}${m.phone ? " · 📞 " + esc(m.phone) : ""} · ${fmtStamp(m.createdAt)}</small>
          </div>
          <button class="btn small danger" data-del="${m.id}">Delete</button>
        </div>`).join("");
    }
    listEl.addEventListener("click", (e) => {
      const b = e.target.closest("[data-del]");
      if (!b) return;
      store.set(KEYS.messages, store.get(KEYS.messages, []).filter((m) => m.id !== b.dataset.del));
      renderMessages(); toast("Message deleted.");
    });
    $("#clearMessages").addEventListener("click", () => {
      if (!store.get(KEYS.messages, []).length) return toast("Nothing to clear.");
      if (confirm("Delete ALL saved messages?")) { store.set(KEYS.messages, []); renderMessages(); toast("All messages cleared."); }
    });
    $("#exportMessages").addEventListener("click", () => {
      const msgs = store.get(KEYS.messages, []);
      if (!msgs.length) return toast("No messages to export.", true);
      const blob = new Blob([JSON.stringify(msgs, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "salon-messages.json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 500);
    });
    renderMessages();
  };

  // ---- About: nothing dynamic besides the reveal effect
  pages.about = function () {};

  /* ---------------------------------------------------------
     6. Boot
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildChrome();
    const page = document.body.dataset.page;
    if (pages[page]) pages[page]();
    initReveal();
  });
})();
