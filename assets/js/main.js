(function () {
  "use strict";

  /* ---- Nav: solid background once the hero banner scrolls past ---- */
  const nav = document.querySelector(".nav");
  const heroBanner = document.querySelector(".hero__banner");

  function updateNavState() {
    const threshold = heroBanner ? heroBanner.getBoundingClientRect().bottom - 68 : 40;
    nav.classList.toggle("is-solid", threshold <= 0 || window.scrollY > 40);
  }
  window.addEventListener("scroll", updateNavState, { passive: true });
  updateNavState();

  /* ---- Mobile menu ---- */
  const navToggle = document.querySelector(".nav__toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileMenu));

  /* ---- Build work cards from PROJECTS (assets/js/projects.js) ---- */
  const grid = document.getElementById("work-grid");
  const emptyState = document.getElementById("work-empty");
  const filtersEl = document.getElementById("filters");

  function playIconSVG() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>' +
      '<path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor"/>' +
      "</svg>"
    );
  }

  function buildCard(project) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.category = project.category;

    const frame = document.createElement("button");
    frame.type = "button";
    frame.className = "card__frame" + (project.posterImage ? "" : " " + project.thumbClass);
    frame.setAttribute("aria-label", "Play " + project.title);

    if (project.posterImage) {
      const img = document.createElement("img");
      img.src = project.posterImage;
      img.alt = project.title + " — poster frame";
      img.loading = "lazy";
      frame.appendChild(img);
    }

    frame.insertAdjacentHTML(
      "beforeend",
      '<span class="card__corner card__corner--tl"></span>' +
        '<span class="card__corner card__corner--br"></span>' +
        '<span class="card__play">' +
        playIconSVG() +
        "</span>"
    );

    frame.addEventListener("click", () => openModal(project.id));

    const body = document.createElement("div");
    body.className = "card__body";
    body.innerHTML =
      '<h3 class="card__title"></h3>' +
      '<div class="card__meta">' +
      '<span class="card__category"></span>' +
      '<span class="card__frame-range"></span>' +
      "</div>";
    body.querySelector(".card__title").textContent = project.title;
    body.querySelector(".card__category").textContent = project.category;
    body.querySelector(".card__frame-range").textContent = project.frameRange || "";

    card.appendChild(frame);
    card.appendChild(body);
    return card;
  }

  function renderGrid() {
    grid.innerHTML = "";
    PROJECTS.forEach((p) => grid.appendChild(buildCard(p)));
  }
  renderGrid();

  /* ---- Filtering ---- */
  let activeCategory = "All";

  function applyFilter(category, animate) {
    activeCategory = category;
    const cards = Array.from(grid.children);
    const doFilter = () => {
      let visibleCount = 0;
      cards.forEach((card) => {
        const match = category === "All" || card.dataset.category === category;
        card.classList.toggle("is-hidden", !match);
        if (match) visibleCount++;
      });
      emptyState.classList.toggle("is-visible", visibleCount === 0);
      grid.classList.remove("is-transitioning");
    };

    if (animate) {
      grid.classList.add("is-transitioning");
      window.setTimeout(doFilter, 160);
    } else {
      doFilter();
    }
  }

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-tab");
    if (!btn) return;
    filtersEl.querySelectorAll(".filter-tab").forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");
    applyFilter(btn.dataset.category, true);
  });

  applyFilter("All", false);

  /* ---- Modal / lightbox ---- */
  const backdrop = document.getElementById("modal-backdrop");
  const modalFrame = document.getElementById("modal-frame");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalClose = document.getElementById("modal-close");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");

  let lastFocusedEl = null;

  function visibleProjectIds() {
    return PROJECTS.filter((p) => activeCategory === "All" || p.category === activeCategory).map((p) => p.id);
  }

  function videoMarkup(project) {
    const v = project.video || { type: "placeholder" };
    if (v.type === "youtube" && v.id) {
      return (
        '<iframe src="https://www.youtube.com/embed/' +
        v.id +
        '?rel=0" title="' +
        project.title +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      );
    }
    if (v.type === "vimeo" && v.id) {
      return (
        '<iframe src="https://player.vimeo.com/video/' +
        v.id +
        '" title="' +
        project.title +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
      );
    }
    if (v.type === "local" && v.src) {
      return '<video src="' + v.src + '" controls playsinline></video>';
    }
    return (
      '<div class="modal__placeholder">' +
      "<p>No playblast linked yet for this project.</p>" +
      "<p>Add one in <code>assets/js/projects.js</code> — set this project's " +
      "<code>video</code> field to a YouTube, Vimeo, or local file source.</p>" +
      "</div>"
    );
  }

  function openModal(projectId) {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return;

    lastFocusedEl = document.activeElement;
    modalFrame.innerHTML = videoMarkup(project);
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    backdrop.dataset.current = projectId;

    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalFrame.innerHTML = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function stepModal(direction) {
    const ids = visibleProjectIds();
    const currentIndex = ids.indexOf(backdrop.dataset.current);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + ids.length) % ids.length;
    openModal(ids[nextIndex]);
  }

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", () => stepModal(-1));
  modalNext.addEventListener("click", () => stepModal(1));

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!backdrop.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") stepModal(1);
    if (e.key === "ArrowLeft") stepModal(-1);
  });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
