/* THARC — light vanilla JS: nav, counters, directory filters, share helpers */

(function () {
  "use strict";

  const SITE_URL = "https://weizheng05.github.io/tharc/";
  const SHARE_TEXT =
    "Join the Trilateral Human–AI Research Collaborative (THARC) — a U.S.–UK–Australia community for human-centered AI research, education, and ethical decision-making.";

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Toast ---------- */
  function showToast(message) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("show");
    }, 2200);
  }

  /* ---------- Country counters from JSON ---------- */
  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  fetch("data/country-counts.json")
    .then(function (r) {
      if (!r.ok) throw new Error("counts fetch failed");
      return r.json();
    })
    .then(function (data) {
      const c = data.countries || {};
      setText("count-us", c.US != null ? c.US : "—");
      setText("count-uk", c.UK != null ? c.UK : "—");
      setText("count-au", c.Australia != null ? c.Australia : "—");
      setText("count-total", data.total != null ? data.total : "—");
      if (data.asOf) setText("counts-asof", data.asOf);
    })
    .catch(function () {
      setText("count-us", "13");
      setText("count-uk", "7");
      setText("count-au", "10");
      setText("count-total", "30");
    });

  /* ---------- Public directory + filters ---------- */
  const listEl = document.getElementById("directory-list");
  const filterCountry = document.getElementById("filter-country");
  const filterDiscipline = document.getElementById("filter-discipline");
  const filterRole = document.getElementById("filter-role");
  const filterSearch = document.getElementById("filter-search");

  let directoryEntries = [];

  function normalize(s) {
    return (s || "").toString().toLowerCase().trim();
  }

  function renderDirectory(entries) {
    if (!listEl) return;
    listEl.innerHTML = "";

    if (!entries.length) {
      const empty = document.createElement("div");
      empty.className = "directory-empty";
      empty.innerHTML =
        "<p><strong>No public listings yet.</strong></p>" +
        "<p>The public directory will show only people who explicitly opt in. " +
        "Expressions of interest remain private until consent is given. " +
        "Filters below will work once consented entries are added to " +
        "<code>data/public-directory.json</code>.</p>";
      listEl.appendChild(empty);
      return;
    }

    entries.forEach(function (p) {
      const card = document.createElement("article");
      card.className = "person-card";
      const title = document.createElement("strong");
      title.textContent = p.displayName || "Community member";
      const meta = document.createElement("div");
      meta.className = "person-meta";
      meta.textContent = [p.institution, p.country, p.discipline]
        .filter(Boolean)
        .join(" · ");
      const roles = document.createElement("div");
      roles.className = "person-meta";
      if (p.roleInterests && p.roleInterests.length) {
        roles.textContent = "Interests: " + p.roleInterests.join(", ");
      }
      card.appendChild(title);
      card.appendChild(meta);
      if (roles.textContent) card.appendChild(roles);
      listEl.appendChild(card);
    });
  }

  function applyFilters() {
    const country = normalize(filterCountry && filterCountry.value);
    const discipline = normalize(filterDiscipline && filterDiscipline.value);
    const role = normalize(filterRole && filterRole.value);
    const q = normalize(filterSearch && filterSearch.value);

    const filtered = directoryEntries.filter(function (p) {
      if (country && normalize(p.country) !== country) return false;
      if (discipline && normalize(p.discipline) !== discipline) return false;
      if (role) {
        const roles = (p.roleInterests || []).map(normalize);
        if (roles.indexOf(role) === -1) return false;
      }
      if (q) {
        const hay = normalize(
          [p.displayName, p.institution, p.country, p.discipline]
            .concat(p.roleInterests || [])
            .join(" ")
        );
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    renderDirectory(filtered);
  }

  function fillSelect(select, values, allLabel) {
    if (!select) return;
    const current = select.value;
    select.innerHTML = "";
    const optAll = document.createElement("option");
    optAll.value = "";
    optAll.textContent = allLabel;
    select.appendChild(optAll);
    values.forEach(function (v) {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
    select.value = current || "";
  }

  fetch("data/public-directory.json")
    .then(function (r) {
      if (!r.ok) throw new Error("directory fetch failed");
      return r.json();
    })
    .then(function (data) {
      directoryEntries = Array.isArray(data.entries) ? data.entries : [];
      const countries = Array.from(
        new Set(directoryEntries.map(function (p) { return p.country; }).filter(Boolean))
      ).sort();
      const disciplines = Array.from(
        new Set(directoryEntries.map(function (p) { return p.discipline; }).filter(Boolean))
      ).sort();
      const roles = Array.from(
        new Set(
          directoryEntries.reduce(function (acc, p) {
            return acc.concat(p.roleInterests || []);
          }, [])
        )
      ).sort();

      fillSelect(filterCountry, countries, "All countries");
      fillSelect(filterDiscipline, disciplines, "All disciplines");
      fillSelect(filterRole, roles, "All role interests");
      applyFilters();
    })
    .catch(function () {
      directoryEntries = [];
      renderDirectory([]);
    });

  [filterCountry, filterDiscipline, filterRole, filterSearch].forEach(function (el) {
    if (!el) return;
    el.addEventListener("change", applyFilters);
    el.addEventListener("input", applyFilters);
  });

  /* ---------- Share helpers ---------- */
  function copyLink() {
    const url = SITE_URL;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () {
          showToast("Link copied");
        },
        function () {
          fallbackCopy(url);
        }
      );
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Link copied");
    } catch (e) {
      showToast("Copy failed — use the URL bar");
    }
    document.body.removeChild(ta);
  }

  document.querySelectorAll("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const kind = btn.getAttribute("data-share");
      if (kind === "copy") {
        e.preventDefault();
        copyLink();
        return;
      }
      if (kind === "linkedin") {
        btn.href =
          "https://www.linkedin.com/sharing/share-offsite/?url=" +
          encodeURIComponent(SITE_URL);
        return;
      }
      if (kind === "x") {
        btn.href =
          "https://twitter.com/intent/tweet?text=" +
          encodeURIComponent(SHARE_TEXT) +
          "&url=" +
          encodeURIComponent(SITE_URL);
        return;
      }
      if (kind === "email") {
        const subject = "Invitation: Trilateral Human–AI Research Collaborative (THARC)";
        const body =
          "I thought you might be interested in THARC — a U.S.–UK–Australia community for human-centered AI research, education, and ethical decision-making.\n\n" +
          SITE_URL +
          "\n\nFounding host: Wei Zheng, Ph.D., P.E. (Jackson State University)\n";
        btn.href =
          "mailto:?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);
      }
    });
  });
})();
