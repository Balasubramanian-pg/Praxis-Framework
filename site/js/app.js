// ==========================================================================
// Praxis Documentation Portal - Atlas Docs Modern Dark Architecture
// ==========================================================================

(function() {
  const data = window.PRAXIS_DATA || { articles: {}, navigation: [] };
  const articles = data.articles;
  const navTree = data.navigation;

  // DOM Elements
  const dashboardView = document.getElementById("dashboardView");
  const articleView = document.getElementById("articleView");
  const articleContainer = document.getElementById("articleContainer");
  const articleEyebrow = document.getElementById("articleEyebrow");
  const sidebarNav = document.getElementById("sidebarNav");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const tocList = document.getElementById("tocList");

  // Configure marked if loaded
  if (typeof marked !== "undefined") {
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false
    });
  }

  // Configure Mermaid for Dark Theme
  if (typeof mermaid !== "undefined") {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#11141a',
          primaryColor: '#1e293b',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#38bdf8',
          lineColor: '#64748b',
          secondaryColor: '#1e2230',
          tertiaryColor: '#161922'
        }
      });
    } catch (e) {
      console.warn("Mermaid dark theme init notice:", e);
    }
  }

  // Refresh Lucide Icons helper
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

  // Markdown Parser
  function parseMarkdown(md) {
    if (!md) return "";

    // 1. Remove YAML frontmatter
    let text = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

    // 2. Pre-process Obsidian Callouts
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

    // 4. Render through marked.js
    let html = "";
    if (typeof marked !== "undefined" && marked.parse) {
      html = marked.parse(text);
    } else {
      html = text.split(/\n{2,}/).map(p => `<p>${p}</p>`).join("");
    }

    // 5. Wrap Mermaid code blocks
    html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/gi, function(match, code) {
      const unescaped = code.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
      return `<div class="mermaid-container"><div class="mermaid">${unescaped}</div></div>`;
    });

    // 6. Wrap standard code blocks with copy button
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

  // Copy Code Snippet Handler
  window.copyCodeSnippet = function(button) {
    const wrapper = button.closest(".code-block-wrapper") || button.closest(".terminal-box");
    if (!wrapper) return;
    const codeEl = wrapper.querySelector("pre code") || wrapper.querySelector(".terminal-command");
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

  // Copy Current Page Link Handler
  window.copyCurrentPageLink = function(btn) {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i data-lucide="check"></i> Copied URL!';
      refreshIcons();
      setTimeout(() => {
        btn.innerHTML = orig;
        refreshIcons();
      }, 2000);
    });
  };

  // Ask AI Modal or Quick Insights
  window.triggerAskAI = function() {
    searchInput.focus();
    searchInput.placeholder = "Ask AI: e.g. How does Medallion architecture fit into Praxis Scope?";
  };

  // Interactive Code Tabs Switcher on Welcome Page
  const tabCommands = {
    "macos": "curl -sSf https://praxis-framework.org/install.sh | sh",
    "homebrew": "brew install praxis-framework/tap/praxis",
    "docker": "docker run -it -p 8080:8080 ghcr.io/balasubramanian-pg/praxis:latest",
    "databricks": "pip install praxis-databricks-finops",
    "snowflake": "CREATE OR REPLACE RESOURCE MONITOR praxis_finops_monitor WITH CREDIT_QUOTA = 500;",
    "dbt": "dbt run --select tag:praxis_quality_gate",
    "fabric": "Install-Module Microsoft.Fabric.PraxisGovernance"
  };

  window.selectCodeTab = function(tabName, btn) {
    document.querySelectorAll(".code-tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cmdEl = document.getElementById("terminalCommand");
    if (cmdEl && tabCommands[tabName]) {
      cmdEl.textContent = tabCommands[tabName];
    }
  };

  // Render Sidebar Navigation
  function renderSidebar() {
    sidebarNav.innerHTML = "";

    // 1. Core items
    const topNav = document.createElement("div");
    topNav.innerHTML = `
      <a href="#/home" class="sidebar-nav-link active" id="sidebarWelcomeLink">
        <span>Welcome</span>
      </a>
      <a href="#/article/00%20-%20Praxis%20Framework%20Overview" class="sidebar-nav-link">
        <span>Get Started</span>
      </a>
      <a href="#/article/Complexity" class="sidebar-nav-link">
        <span>Praxis vs Others</span>
      </a>
    `;
    sidebarNav.appendChild(topNav);

    // 2. Expandable Pillars & Core Sections
    const pillars = [
      { name: "01. Core Concepts", moc: "01. Core Concepts/00 - Overview" },
      { name: "02. Governance & Framework", moc: "02. Governance & Framework/00 - Overview" },
      { name: "03. Processes & Lifecycle", moc: "03. Processes/00 - Overview" },
      { name: "04. Management Areas (10)", moc: "04. Management Areas/00 - Overview" },
      { name: "05. Competencies & Skills", moc: "05. Competencies & Skills/00 - Overview" },
      { name: "06. Artefacts & Templates", moc: "06. Documentation & Artefacts/00 - Overview" },
      { name: "07. Portfolio Management", moc: "07. Portfolio Management/00 - Overview" },
      { name: "08. Delivery & Lifecycle", moc: "08. Delivery & Lifecycle/00 - Overview" },
      { name: "09. Capability Maturity", moc: "09. Maturity Models/00 - Overview" }
    ];

    pillars.forEach(p => {
      const item = document.createElement("a");
      item.className = "sidebar-nav-link";
      item.href = `#/article/${encodeURIComponent(p.moc)}`;
      item.dataset.id = p.moc;
      item.innerHTML = `
        <span>${p.name}</span>
        <svg class="sidebar-chevron lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      `;
      sidebarNav.appendChild(item);
    });

    // 3. Section Header: DATA & BI SPECIALIZATION
    const biHeader = document.createElement("div");
    biHeader.className = "sidebar-section-header";
    biHeader.textContent = "Data & BI Specialization";
    sidebarNav.appendChild(biHeader);

    const biLinks = [
      { title: "Medallion Architecture", id: "Scope Management" },
      { title: "Data FinOps & Budgets", id: "General Principles of Financial Management" },
      { title: "DataOps & Quality Gates", id: "Control" },
      { title: "Schema Drift & Risk", id: "General Principles of Risk Management" },
      { title: "Semantic Models & BI", id: "Goal of Change Management" }
    ];

    biLinks.forEach(b => {
      const link = document.createElement("a");
      link.className = "sidebar-nav-link";
      link.href = `#/article/${encodeURIComponent(b.id)}`;
      link.dataset.id = b.id;
      link.innerHTML = `<span>${b.title}</span>`;
      sidebarNav.appendChild(link);
    });

    // 4. Complete Vault Folder Hierarchy (Collapsible)
    const vaultHeader = document.createElement("div");
    vaultHeader.className = "sidebar-section-header";
    vaultHeader.textContent = "Vault Structure";
    sidebarNav.appendChild(vaultHeader);

    navTree.forEach(group => {
      const groupEl = document.createElement("div");
      groupEl.className = "sidebar-group";

      const header = document.createElement("div");
      header.className = "sidebar-nav-link";
      header.innerHTML = `
        <span>${group.clean_name}</span>
        <svg class="sidebar-chevron lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      `;
      header.addEventListener("click", () => {
        groupEl.classList.toggle("expanded");
      });

      const subItemsEl = document.createElement("div");
      subItemsEl.className = "sidebar-sub-items";

      group.articles.forEach(art => {
        const item = document.createElement("a");
        item.className = "sidebar-sub-link";
        item.href = `#/article/${encodeURIComponent(art.id)}`;
        item.textContent = art.title;
        item.dataset.id = art.id;
        subItemsEl.appendChild(item);
      });

      if (group.sub_folders && group.sub_folders.length > 0) {
        group.sub_folders.forEach(sub => {
          const subGroup = document.createElement("div");
          subGroup.className = "sidebar-group";

          const subHeader = document.createElement("div");
          subHeader.className = "sidebar-nav-link";
          subHeader.style.fontSize = "12.5px";
          subHeader.innerHTML = `
            <span>${sub.name}</span>
            <svg class="sidebar-chevron lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          `;
          subHeader.addEventListener("click", (e) => {
            e.stopPropagation();
            subGroup.classList.toggle("expanded");
          });

          const subSubItems = document.createElement("div");
          subSubItems.className = "sidebar-sub-items";

          sub.articles.forEach(subArt => {
            const item = document.createElement("a");
            item.className = "sidebar-sub-link";
            item.href = `#/article/${encodeURIComponent(subArt.id)}`;
            item.textContent = subArt.title;
            item.dataset.id = subArt.id;
            subSubItems.appendChild(item);
          });

          subGroup.appendChild(subHeader);
          subGroup.appendChild(subSubItems);
          subItemsEl.appendChild(subGroup);
        });
      }

      groupEl.appendChild(header);
      groupEl.appendChild(subItemsEl);
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
    document.querySelectorAll(".sidebar-nav-link, .sidebar-sub-link").forEach(el => el.classList.remove("active"));
    const welcome = document.getElementById("sidebarWelcomeLink");
    if (welcome) welcome.classList.add("active");

    // Static TOC for Welcome Page (Matches Atlas Docs TOC)
    buildStaticWelcomeTOC();
    refreshIcons();
  }

  function buildStaticWelcomeTOC() {
    if (!tocList) return;
    tocList.innerHTML = `
      <li class="toc-item active"><a href="#welcomeIntro">Quick Introduction</a></li>
      <li class="toc-item"><a href="#installationSec">Installation</a></li>
      <li class="toc-item"><a href="#schemaAsCodeSec">Schema-as-Code</a></li>
      <li class="toc-item h3"><a href="#schemaAsCodeSec">Medallion Lakehouse</a></li>
      <li class="toc-item h3"><a href="#schemaAsCodeSec">Data Contracts & FinOps</a></li>
      <li class="toc-item h3"><a href="#schemaAsCodeSec">DataOps & Semantic Models</a></li>
    `;
  }

  function showArticle(articleId) {
    // Find article
    let article = articles[articleId];
    if (!article) {
      const base = articleId.split("/").pop();
      article = articles[base];
    }

    if (!article) {
      articleContainer.innerHTML = `
        <h1 class="article-title">Document Not Found</h1>
        <p class="article-body-text">The requested note <code>${articleId}</code> could not be found in the vault.</p>
        <p><a href="#/home">Return to Welcome Overview</a></p>
      `;
      if (articleEyebrow) articleEyebrow.textContent = "Error";
      dashboardView.style.display = "none";
      articleView.style.display = "block";
      refreshIcons();
      return;
    }

    if (articleEyebrow) {
      articleEyebrow.textContent = article.section || "Documentation";
    }

    // Render Article Body
    const renderedBody = parseMarkdown(article.body);
    articleContainer.innerHTML = renderedBody;

    dashboardView.style.display = "none";
    articleView.style.display = "block";
    window.scrollTo(0, 0);

    // Dynamic TOC for Article View
    buildArticleTOC();

    // Highlight in sidebar & expand parent
    const welcome = document.getElementById("sidebarWelcomeLink");
    if (welcome) welcome.classList.remove("active");

    document.querySelectorAll(".sidebar-nav-link, .sidebar-sub-link").forEach(el => {
      if (el.dataset && (el.dataset.id === article.id || el.dataset.id === article.base_name)) {
        el.classList.add("active");
        let parent = el.closest(".sidebar-group");
        while (parent) {
          parent.classList.add("expanded");
          parent = parent.parentElement.closest(".sidebar-group");
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

  // Dynamic TOC generator from article headings
  function buildArticleTOC() {
    if (!tocList) return;
    tocList.innerHTML = "";

    const headings = articleContainer.querySelectorAll("h1, h2, h3");
    if (headings.length === 0) {
      tocList.innerHTML = `<li class="toc-item"><a href="#">Overview</a></li>`;
      return;
    }

    headings.forEach((h, idx) => {
      let slug = h.id;
      if (!slug) {
        slug = "heading-" + idx;
        h.id = slug;
      }

      const li = document.createElement("li");
      li.className = "toc-item" + (h.tagName.toLowerCase() === "h3" ? " h3" : "");
      if (idx === 0) li.classList.add("active");

      const a = document.createElement("a");
      a.href = "#" + slug;
      a.textContent = h.textContent.replace(/^#+\s*/, "");
      a.addEventListener("click", (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelectorAll(".toc-item").forEach(item => item.classList.remove("active"));
        li.classList.add("active");
      });

      li.appendChild(a);
      tocList.appendChild(li);
    });
  }

  // Live Search Input Handler
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
      searchResults.innerHTML = '<div style="padding: 14px; color: var(--text-muted); font-size: 13px;">No documentation found.</div>';
      searchResults.style.display = "block";
      return;
    }

    searchResults.innerHTML = matches.slice(0, 8).map(m => `
      <div class="search-result-item" onclick="window.location.hash='#/article/${encodeURIComponent(m.article.id)}'; document.getElementById('searchResults').style.display='none'; document.getElementById('searchInput').value='';">
        <div class="search-result-title">${m.article.title}</div>
        <div class="search-result-meta">${m.article.section} &bull; ${m.article.type} &bull; ${(m.article.summary || "").slice(0, 75)}...</div>
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

  // Shortcut key (/) or (Ctrl+K)
  document.addEventListener("keydown", function(e) {
    if ((e.key === "/" || (e.ctrlKey && e.key === "k") || (e.metaKey && e.key === "k")) && document.activeElement !== searchInput) {
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
