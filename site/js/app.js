// ==========================================================================
// Praxis Documentation Portal - Main Application Logic
// Uses: marked.js for GFM parsing, Lucide Icons, Mermaid.js diagrams
// ==========================================================================

(function() {
  const data = window.PRAXIS_DATA || { articles: {}, navigation: [] };
  const articles = data.articles;
  const navTree = data.navigation;

  // DOM Elements
  const dashboardView = document.getElementById("dashboardView");
  const articleView = document.getElementById("articleView");
  const articleContainer = document.getElementById("articleContainer");
  const breadcrumbBar = document.getElementById("breadcrumbBar");
  const sidebarNav = document.getElementById("sidebarNav");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  // Configure marked if loaded
  if (typeof marked !== "undefined") {
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false
    });
  }

  // Helper for Lucide icons rendering
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // Obsidian Callout Icon Map
  const calloutIconMap = {
    note: "info",
    tip: "lightbulb",
    warning: "alert-triangle",
    caution: "shield-alert",
    important: "alert-circle",
    info: "info",
    nav: "compass",
    summary: "file-text",
    abstract: "book-open"
  };

  // Markdown Parser using marked.js + Obsidian Extensions
  function parseMarkdown(md) {
    if (!md) return "";

    // 1. Remove YAML frontmatter
    let text = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

    // 2. Pre-process Obsidian Callouts:
    // > [!TYPE] Title
    // > Body content...
    text = text.replace(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|INFO|CAUTION|NAV|SUMMARY|ABSTRACT)\]\s*([^\r\n]*)\r?\n((?:>[^\r\n]*\r?\n?)+)/gim, function(match, type, title, body) {
      const typeLower = type.toLowerCase();
      const cleanTitle = title.trim() || type.toUpperCase();
      const cleanBody = body.replace(/^>\s?/gm, "").trim();
      const iconName = calloutIconMap[typeLower] || "info";

      return `\n\n<div class="callout callout-${typeLower}"><div class="callout-header"><span class="callout-icon"><i data-lucide="${iconName}"></i></span><span class="callout-title">${cleanTitle}</span></div><div class="callout-body">\n\n${cleanBody}\n\n</div></div>\n\n`;
    });

    // 3. Convert Obsidian Wikilinks: [[Target|Label]] or [[Target]]
    text = text.replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, function(match, target, label) {
      const cleanTarget = target.trim();
      const display = (label || cleanTarget.split("/").pop()).trim();
      return `[${display}](#/article/${encodeURIComponent(cleanTarget)})`;
    });

    // 4. Render through marked.js if available
    let html = "";
    if (typeof marked !== "undefined" && marked.parse) {
      html = marked.parse(text);
    } else {
      // Fallback simple paragraph renderer
      html = text.split(/\n{2,}/).map(p => `<p>${p}</p>`).join("");
    }

    // 5. Transform Mermaid Diagrams
    html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/gi, function(match, code) {
      const unescaped = code.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
      return `<div class="mermaid-container"><div class="mermaid">${unescaped}</div></div>`;
    });

    // 6. Wrap regular code blocks with header & copy button
    html = html.replace(/<pre><code(?: class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi, function(match, lang, code) {
      const language = lang || "text";
      return `
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span>${language}</span>
            <button class="copy-code-btn" type="button" onclick="window.copyCodeSnippet(this)">
              <i data-lucide="copy"></i> Copy
            </button>
          </div>
          <pre><code>${code}</code></pre>
        </div>
      `;
    });

    return html;
  }

  // Global Code Copy Function
  window.copyCodeSnippet = function(button) {
    const wrapper = button.closest(".code-block-wrapper");
    if (!wrapper) return;
    const codeEl = wrapper.querySelector("pre code");
    if (!codeEl) return;
    const text = codeEl.innerText;

    navigator.clipboard.writeText(text).then(() => {
      button.innerHTML = '<i data-lucide="check"></i> Copied!';
      refreshIcons();
      setTimeout(() => {
        button.innerHTML = '<i data-lucide="copy"></i> Copy';
        refreshIcons();
      }, 2000);
    });
  };

  // Render Sidebar Tree Navigation (Matches Screenshot Layout)
  function renderSidebar() {
    sidebarNav.innerHTML = "";

    // 1. Top Section: Overview Root
    const overviewEl = document.createElement("div");
    overviewEl.innerHTML = `
      <a href="#/home" class="sidebar-root-item active" id="sidebarOverviewItem">
        <div class="sidebar-root-icon-box">
          <i data-lucide="home"></i>
        </div>
        <span>Overview</span>
      </a>

      <!-- Tree Branch with Connecting Vertical Line (from screenshot) -->
      <div class="sidebar-tree-branch">
        <a href="#/article/01.%20Core%20Concepts/00%20-%20Overview" class="sidebar-tree-link">01. Core Concepts</a>
        <a href="#/article/02.%20Governance%20%26%20Framework/00%20-%20Overview" class="sidebar-tree-link">02. Governance & Framework</a>
        <a href="#/article/03.%20Processes/00%20-%20Overview" class="sidebar-tree-link">03. Method & Processes</a>
        <a href="#/article/04.%20Management%20Areas/00%20-%20Overview" class="sidebar-tree-link">04. Management Areas</a>
        <a href="#/article/05.%20Competencies%20%26%20Skills/00%20-%20Overview" class="sidebar-tree-link">05. Competencies & Skills</a>
        <a href="#/article/06.%20Documentation%20%26%20Artefacts/00%20-%20Overview" class="sidebar-tree-link">06. Artefacts & Templates</a>
        <a href="#/article/07.%20Portfolio%20Management/00%20-%20Overview" class="sidebar-tree-link">07. Portfolio Management</a>
        <a href="#/article/08.%20Delivery%20%26%20Lifecycle/00%20-%20Overview" class="sidebar-tree-link">08. Delivery & Lifecycle</a>
        <a href="#/article/09.%20Maturity%20Models/00%20-%20Overview" class="sidebar-tree-link">09. Capability Maturity</a>
      </div>
    `;
    sidebarNav.appendChild(overviewEl);

    // 2. Navigation Categories with Lucide Open Source Icons
    const categoriesSection = document.createElement("div");
    categoriesSection.innerHTML = `
      <a href="#/article/00%20-%20Praxis%20Framework%20Overview" class="sidebar-category-item">
        <div class="category-icon"><i data-lucide="compass"></i></div>
        <span>Explore All 22 MOCs</span>
      </a>
      <a href="#/article/1.%20Knowledge" class="sidebar-category-item">
        <div class="category-icon"><i data-lucide="layers"></i></div>
        <span>Knowledge & FinOps</span>
      </a>
      <a href="#/article/04.%20Management%20Areas/00%20-%20Overview" class="sidebar-category-item">
        <div class="category-icon"><i data-lucide="sliders"></i></div>
        <span>10 Management Areas</span>
      </a>
      <a href="#/article/2%20Method" class="sidebar-category-item">
        <div class="category-icon"><i data-lucide="git-branch"></i></div>
        <span>Method & Processes</span>
      </a>
      <a href="#/article/3%20Competence" class="sidebar-category-item">
        <div class="category-icon"><i data-lucide="users"></i></div>
        <span>Competencies & Roles</span>
      </a>
      <a href="#/article/4%20Maturity" class="sidebar-category-item">
        <div class="category-icon"><i data-lucide="award"></i></div>
        <span>Capability Maturity</span>
      </a>
    `;
    sidebarNav.appendChild(categoriesSection);

    // 3. Section Header: DATA & BI SPECIALIZATIONS (like IDENTITY in screenshot)
    const biSection = document.createElement("div");
    biSection.innerHTML = `
      <div class="sidebar-section-header">Data & BI Specialization</div>
      <div style="display: flex; flex-direction: column; gap: 2px;">
        <a href="#/article/Scope%20Management" class="sidebar-tree-link">Data Engineering (Medallion)</a>
        <a href="#/article/General%20Principles%20of%20Financial%20Management" class="sidebar-tree-link">Cloud Data FinOps</a>
        <a href="#/article/General%20Principles%20of%20Risk%20Management" class="sidebar-tree-link">Schema Drift & Risk</a>
        <a href="#/article/Control" class="sidebar-tree-link">DataOps & Quality Gates</a>
        <a href="#/article/Goal%20of%20Change%20Management" class="sidebar-tree-link">Semantic Models & Adoption</a>
      </div>
    `;
    sidebarNav.appendChild(biSection);

    // 4. Complete Vault Folder Hierarchy (Collapsible Navigation Groups)
    const vaultHeader = document.createElement("div");
    vaultHeader.className = "sidebar-section-header";
    vaultHeader.textContent = "Browse Vault Structure";
    sidebarNav.appendChild(vaultHeader);

    navTree.forEach((group) => {
      const groupEl = document.createElement("div");
      groupEl.className = "nav-group";

      const header = document.createElement("div");
      header.className = "nav-group-header";
      header.innerHTML = `
        <span class="nav-group-title">${group.clean_name}</span>
        <svg class="nav-group-arrow lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      `;
      header.addEventListener("click", () => {
        groupEl.classList.toggle("expanded");
      });

      const itemsEl = document.createElement("div");
      itemsEl.className = "nav-group-items";

      // Direct articles in group
      group.articles.forEach(art => {
        const item = document.createElement("a");
        item.className = "sidebar-tree-link";
        item.href = `#/article/${encodeURIComponent(art.id)}`;
        item.textContent = art.title;
        item.dataset.id = art.id;
        itemsEl.appendChild(item);
      });

      // Subfolders (e.g. 04. Management Areas subfolders)
      if (group.sub_folders && group.sub_folders.length > 0) {
        group.sub_folders.forEach(sub => {
          const subGroup = document.createElement("div");
          subGroup.className = "nav-group";

          const subHeader = document.createElement("div");
          subHeader.className = "nav-group-header";
          subHeader.style.fontSize = "12px";
          subHeader.style.padding = "4px 8px";
          subHeader.innerHTML = `
            <span class="nav-group-title">${sub.name}</span>
            <svg class="nav-group-arrow lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          `;
          subHeader.addEventListener("click", (e) => {
            e.stopPropagation();
            subGroup.classList.toggle("expanded");
          });

          const subItemsEl = document.createElement("div");
          subItemsEl.className = "nav-group-items";

          sub.articles.forEach(subArt => {
            const item = document.createElement("a");
            item.className = "sidebar-tree-link";
            item.href = `#/article/${encodeURIComponent(subArt.id)}`;
            item.textContent = subArt.title;
            item.dataset.id = subArt.id;
            subItemsEl.appendChild(item);
          });

          subGroup.appendChild(subHeader);
          subGroup.appendChild(subItemsEl);
          itemsEl.appendChild(subGroup);
        });
      }

      groupEl.appendChild(header);
      groupEl.appendChild(itemsEl);
      sidebarNav.appendChild(groupEl);
    });

    refreshIcons();
  }

  // Routing Handler
  function route() {
    const hash = window.location.hash || "#/home";
    if (hash === "#" || hash === "#/" || hash === "#/home") {
      showDashboard();
    } else if (hash.startsWith("#/article/")) {
      const id = decodeURIComponent(hash.replace("#/article/", ""));
      showArticle(id);
    }
  }

  function showDashboard() {
    dashboardView.style.display = "block";
    articleView.style.display = "none";
    window.scrollTo(0, 0);

    // Active state in sidebar
    document.querySelectorAll(".sidebar-tree-link, .sidebar-category-item").forEach(el => el.classList.remove("active"));
    const overviewItem = document.getElementById("sidebarOverviewItem");
    if (overviewItem) overviewItem.classList.add("active");

    refreshIcons();
  }

  function showArticle(articleId) {
    // Find article (exact match, or base name fallback)
    let article = articles[articleId];
    if (!article) {
      const base = articleId.split("/").pop();
      article = articles[base];
    }

    if (!article) {
      articleContainer.innerHTML = `
        <h1>Document Not Found</h1>
        <p>The requested note <code>${articleId}</code> could not be found in the vault.</p>
        <p><a href="#/home">Return to Overview</a></p>
      `;
      breadcrumbBar.innerHTML = `<a class="breadcrumb-link" href="#/home">Overview</a> <span class="breadcrumb-sep">&gt;</span> <span class="breadcrumb-current">Not Found</span>`;
      dashboardView.style.display = "none";
      articleView.style.display = "block";
      refreshIcons();
      return;
    }

    // Set Breadcrumbs
    const sectionName = article.section || "General";
    breadcrumbBar.innerHTML = `
      <a class="breadcrumb-link" href="#/home">Overview</a>
      <span class="breadcrumb-sep">&gt;</span>
      <a class="breadcrumb-link" href="#/article/${encodeURIComponent(article.folder + '/00 - Overview')}">${sectionName}</a>
      <span class="breadcrumb-sep">&gt;</span>
      <span class="breadcrumb-current">${article.title}</span>
    `;

    // Render Article Body
    const renderedBody = parseMarkdown(article.body);
    articleContainer.innerHTML = renderedBody;

    // Build Related Notes / Backlinks Section
    renderRelatedNotes(article);

    dashboardView.style.display = "none";
    articleView.style.display = "block";
    window.scrollTo(0, 0);

    // Highlight in sidebar & expand parent
    const overviewItem = document.getElementById("sidebarOverviewItem");
    if (overviewItem) overviewItem.classList.remove("active");

    document.querySelectorAll(".sidebar-tree-link").forEach(el => {
      if (el.dataset && (el.dataset.id === article.id || el.dataset.id === article.base_name)) {
        el.classList.add("active");
        let parent = el.closest(".nav-group");
        while (parent) {
          parent.classList.add("expanded");
          parent = parent.parentElement.closest(".nav-group");
        }
      } else {
        el.classList.remove("active");
      }
    });

    // Refresh icons and diagrams
    refreshIcons();
    if (window.mermaid && typeof window.mermaid.run === "function") {
      try {
        window.mermaid.run({ querySelector: ".mermaid" });
      } catch (err) {
        console.warn("Mermaid render notice:", err);
      }
    }
  }

  // Related Notes Renderer
  function renderRelatedNotes(article) {
    // Find candidate notes in same folder or related by pillar
    const candidates = [];
    for (const [id, art] of Object.entries(articles)) {
      if (id !== art.id) continue;
      if (art.id === article.id) continue;
      if (art.folder === article.folder && !art.id.endsWith("00 - Overview")) {
        candidates.push(art);
      }
    }

    if (candidates.length === 0) return;

    const slice = candidates.slice(0, 4);
    const relatedSection = document.createElement("div");
    relatedSection.className = "related-notes-section";
    relatedSection.innerHTML = `
      <div class="related-notes-title">Related Vault Notes</div>
      <div class="related-notes-grid">
        ${slice.map(c => `
          <a href="#/article/${encodeURIComponent(c.id)}" class="related-note-card">
            <div class="related-note-name">${c.title}</div>
            <div class="related-note-desc">${c.section} &bull; ${c.type}</div>
          </a>
        `).join("")}
      </div>
    `;
    articleContainer.appendChild(relatedSection);
  }

  // Live Full-Text Search
  searchInput.addEventListener("input", function() {
    const q = this.value.trim().toLowerCase();
    if (!q) {
      searchResults.style.display = "none";
      return;
    }

    const matches = [];
    for (const [id, art] of Object.entries(articles)) {
      if (id !== art.id) continue;
      const titleMatch = art.title.toLowerCase().includes(q);
      const summaryMatch = (art.summary || "").toLowerCase().includes(q);
      const bodyMatch = (art.body || "").toLowerCase().includes(q);

      if (titleMatch || summaryMatch || bodyMatch) {
        let score = 0;
        if (titleMatch) score += 15;
        if (summaryMatch) score += 6;
        if (bodyMatch) score += 1;
        matches.push({ article: art, score: score });
      }
    }

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      searchResults.innerHTML = '<div style="padding: 16px; color: var(--text-muted); font-size: 13px;">No documents found matching your query.</div>';
      searchResults.style.display = "block";
      return;
    }

    searchResults.innerHTML = matches.slice(0, 8).map(m => `
      <div class="search-result-item" onclick="window.location.hash='#/article/${encodeURIComponent(m.article.id)}'; document.getElementById('searchResults').style.display='none'; document.getElementById('searchInput').value='';">
        <div class="search-result-title">${m.article.title}</div>
        <div class="search-result-meta">${m.article.section} &bull; ${m.article.type} &bull; ${(m.article.summary || "").slice(0, 80)}...</div>
      </div>
    `).join("");
    searchResults.style.display = "block";
  });

  // Close search on click outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".search-container")) {
      searchResults.style.display = "none";
    }
  });

  // Keyboard shortcut (/) to focus search
  document.addEventListener("keydown", function(e) {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === "Escape") {
      searchResults.style.display = "none";
    }
  });

  // Initialize
  renderSidebar();
  window.addEventListener("hashchange", route);
  route();
})();
