// ==========================================================================
// Praxis Framework - Modern Full-Width SaaS Workspace Controller
// Features: Dual-Mode Routing, Instant Search, Theme Toggle (Light/Dark),
// Mathematical Typography (KaTeX), Native Mermaid Diagrams
// ==========================================================================

(function() {
  const data = window.PRAXIS_DATA || { articles: {}, navigation: [] };
  const articles = data.articles;
  const navTree = data.navigation;

  // Primary DOM Elements
  const viewHub = document.getElementById("viewHub");
  const viewArticle = document.getElementById("viewArticle");
  const viewLibrary = document.getElementById("viewLibrary");
  const cardStackViewport = document.getElementById("cardStackViewport");
  const stageContent = document.getElementById("stageContent");
  const navLibrary = document.getElementById("navLibrary");
  const navExplore = document.getElementById("navExplore");

  // Article Elements
  const articleTitle = document.getElementById("articleTitle");
  const articleBody = document.getElementById("articleBody");
  const breadcrumbCategory = document.getElementById("breadcrumbCategory");
  const breadcrumbFile = document.getElementById("breadcrumbFile");
  const badgePillar = document.getElementById("badgePillar");
  const badgeSpecialization = document.getElementById("badgeSpecialization");

  // Navigation & Tree
  const pinnedList = document.getElementById("pinnedList");
  const vaultTree = document.getElementById("vaultTree");
  const appSidebar = document.getElementById("appSidebar");

  // Search Elements
  const commandInput = document.getElementById("commandInput");
  const commandSearchDropdown = document.getElementById("commandSearchDropdown");
  const sidebarSearchInput = document.getElementById("sidebarSearchInput");

  // Theme Elements
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeToggleIcon = document.getElementById("themeToggleIcon");
  const themeToggleLabel = document.getElementById("themeToggleLabel");

  // Configure marked.js
  if (typeof marked !== "undefined") {
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false
    });
  }

  // Refresh Lucide line icons
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // --------------------------------------------------------------------------
  // Theme Manager (Dark / Light Mode Toggle)
  // --------------------------------------------------------------------------
  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (themeToggleLabel) {
      themeToggleLabel.textContent = isDark ? "Light" : "Dark";
    }

    if (themeToggleIcon) {
      themeToggleIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
    }

    refreshIcons();
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("praxis-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
    applyTheme(isDark);
  }

  window.toggleTheme = function() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("praxis-theme", isDark ? "dark" : "light");
    applyTheme(isDark);

    // Re-render Mermaid diagrams with updated theme
    if (viewArticle && viewArticle.style.display !== "none" && articleBody) {
      renderMermaidDiagrams(articleBody, true);
    }
  };

  initTheme();

  // --------------------------------------------------------------------------
  // Mermaid Flowchart Renderer
  // --------------------------------------------------------------------------
  function getMermaidTheme() {
    return document.documentElement.classList.contains("dark") ? "dark" : "neutral";
  }

  function initMermaid() {
    if (window.mermaid && typeof window.mermaid.initialize === "function") {
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: getMermaidTheme(),
          securityLevel: "loose",
          fontFamily: "'Avenir Next Cyr', -apple-system, BlinkMacSystemFont, sans-serif"
        });
      } catch (e) {
        console.warn("Mermaid init notice:", e);
      }
    }
  }

  initMermaid();

  // Obsidian Callout Icon Mapping (Strictly Lucide line icons, zero emojis)
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

      return `\n\n<div class="callout callout-${typeLower}"><div class="callout-header"><i data-lucide="${iconName}"></i><span class="callout-title">${cleanTitle}</span></div><div class="callout-body">\n\n${cleanBody}\n\n</div></div>\n\n`;
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

    // 5. Wrap Mermaid code blocks (language-mermaid, lang-mermaid, or class containing mermaid)
    html = html.replace(/<pre><code class="(?:language-|lang-)?mermaid">([\s\S]*?)<\/code><\/pre>/gi, function(match, code) {
      const cleanCode = code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      return `<div class="mermaid-diagram-wrap"><pre class="mermaid">${cleanCode}</pre></div>`;
    });

    // 6. Wrap standard code blocks with copy button
    html = html.replace(/<pre><code(?: class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi, function(match, lang, code) {
      const language = lang || "code";
      return `
        <div class="code-block-wrapper">
          <div class="code-header">
            <span>${language}</span>
            <button class="btn-copy-code" type="button" onclick="window.copyCodeSnippet(this)">
              <i data-lucide="copy" style="width: 12px; height: 12px;"></i> Copy
            </button>
          </div>
          <pre><code>${code}</code></pre>
        </div>
      `;
    });

    return html;
  }

  // Render LaTeX via KaTeX
  function renderLaTeX(container) {
    if (!container) return;
    if (typeof window.renderMathInElement === "function") {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX render error:", err);
      }
    } else {
      setTimeout(() => {
        if (typeof window.renderMathInElement === "function") {
          window.renderMathInElement(container, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true }
            ],
            ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
            throwOnError: false
          });
        }
      }, 250);
    }
  }

  // Render Mermaid Diagrams via Mermaid API
  async function renderMermaidDiagrams(container, force) {
    if (!container) return;
    if (!window.mermaid) return;

    initMermaid();

    const nodes = container.querySelectorAll(".mermaid");
    if (!nodes || nodes.length === 0) return;

    // Cache original code for reliable re-rendering across themes
    nodes.forEach(node => {
      if (!node.dataset.originalMermaid) {
        node.dataset.originalMermaid = node.textContent;
      } else if (force) {
        node.removeAttribute("data-processed");
        node.innerHTML = node.dataset.originalMermaid;
      }
    });

    try {
      if (typeof window.mermaid.run === "function") {
        await window.mermaid.run({
          nodes: Array.from(nodes),
          suppressErrors: true
        });
      } else if (typeof window.mermaid.init === "function") {
        window.mermaid.init(undefined, nodes);
      }
    } catch (err) {
      console.warn("Mermaid batch run notice:", err);
    }
  }

  // Global Helpers for UI interactions
  window.copyCodeSnippet = function(button) {
    const wrapper = button.closest(".code-block-wrapper");
    if (!wrapper) return;
    const codeEl = wrapper.querySelector("pre code");
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.innerText).then(() => {
      button.innerHTML = '<i data-lucide="check" style="width: 12px; height: 12px;"></i> Copied!';
      refreshIcons();
      setTimeout(() => {
        button.innerHTML = '<i data-lucide="copy" style="width: 12px; height: 12px;"></i> Copy';
        refreshIcons();
      }, 2000);
    });
  };

  window.navigateToHub = function() {
    window.location.hash = "#/hub";
  };

  window.navigateToLibrary = function() {
    window.location.hash = "#/library";
  };

  window.navigateToArticle = function(id) {
    window.location.hash = `#/article/${encodeURIComponent(id)}`;
  };

  window.toggleSidebar = function() {
    if (appSidebar) {
      appSidebar.classList.toggle("collapsed");
      if (appSidebar.classList.contains("collapsed")) {
        appSidebar.style.display = "none";
      } else {
        appSidebar.style.display = "flex";
      }
    }
  };

  window.quickSearch = function(query) {
    if (commandInput) {
      commandInput.value = query;
      commandInput.focus();
      triggerSearch(query, commandSearchDropdown);
    }
  };

  window.handleCommandSubmit = function() {
    if (!commandInput) return;
    const q = commandInput.value.trim();
    if (q) {
      triggerSearch(q, commandSearchDropdown);
    }
  };

  // Pinned Strategic Topics
  const pinnedTopicIds = [
    "Manage The Configuration",
    "Manage Contracts",
    "Manage Change",
    "Goal of Change Management",
    "Manage Information",
    "Plan Delivery",
    "Identify A Project Or Programme",
    "Define A Project Or Programme",
    "Deliver A Project Or Programme",
    "Develop Investment Appraisal",
    "Manage Benefits",
    "Praxis for Data and BI"
  ];

  function renderPinnedTopics() {
    if (!pinnedList) return;
    pinnedList.innerHTML = "";

    pinnedTopicIds.forEach(id => {
      const art = findArticle(id);
      const title = art ? art.title : id;
      const a = document.createElement("a");
      a.className = "pinned-item";
      a.href = `#/article/${encodeURIComponent(art ? art.id : id)}`;
      a.textContent = title;
      a.dataset.id = art ? art.id : id;
      pinnedList.appendChild(a);
    });
  }

  // Render Collapsible Vault Navigation Tree
  function renderVaultTree() {
    if (!vaultTree) return;
    vaultTree.innerHTML = "";

    navTree.forEach(group => {
      const folder = document.createElement("div");
      folder.className = "vault-folder";

      const title = document.createElement("div");
      title.className = "vault-folder-title";
      title.innerHTML = `
        <span>${group.clean_name}</span>
        <i data-lucide="chevron-right" style="width: 13px; height: 13px; transition: transform 0.15s ease;"></i>
      `;

      title.addEventListener("click", () => {
        folder.classList.toggle("expanded");
        const chevron = title.querySelector("i");
        if (chevron) {
          chevron.style.transform = folder.classList.contains("expanded") ? "rotate(90deg)" : "rotate(0deg)";
        }
      });

      const items = document.createElement("div");
      items.className = "vault-folder-items";

      (group.articles || []).forEach(art => {
        const link = document.createElement("a");
        link.className = "vault-note-link";
        link.href = `#/article/${encodeURIComponent(art.id)}`;
        link.textContent = art.title;
        link.dataset.id = art.id;
        items.appendChild(link);
      });

      (group.sub_folders || []).forEach(sub => {
        const subFolder = document.createElement("div");
        subFolder.className = "vault-folder";

        const subTitle = document.createElement("div");
        subTitle.className = "vault-folder-title";
        subTitle.style.fontSize = "11.5px";
        subTitle.innerHTML = `
          <span>${sub.name}</span>
          <i data-lucide="chevron-right" style="width: 12px; height: 12px; transition: transform 0.15s ease;"></i>
        `;

        subTitle.addEventListener("click", (e) => {
          e.stopPropagation();
          subFolder.classList.toggle("expanded");
          const chevron = subTitle.querySelector("i");
          if (chevron) {
            chevron.style.transform = subFolder.classList.contains("expanded") ? "rotate(90deg)" : "rotate(0deg)";
          }
        });

        const subItems = document.createElement("div");
        subItems.className = "vault-folder-items";

        (sub.articles || []).forEach(subArt => {
          const subLink = document.createElement("a");
          subLink.className = "vault-note-link";
          subLink.href = `#/article/${encodeURIComponent(subArt.id)}`;
          subLink.textContent = subArt.title;
          subLink.dataset.id = subArt.id;
          subItems.appendChild(subLink);
        });

        subFolder.appendChild(subTitle);
        subFolder.appendChild(subItems);
        items.appendChild(subFolder);
      });

      folder.appendChild(title);
      folder.appendChild(items);
      vaultTree.appendChild(folder);
    });

    refreshIcons();
  }

  // Article Resolver
  function findArticle(queryId) {
    if (!queryId) return null;
    let art = articles[queryId];
    if (art) return art;

    const decoded = decodeURIComponent(queryId).trim();
    if (articles[decoded]) return articles[decoded];

    const base = decoded.split("/").pop().replace(/\.md$/i, "").trim().toLowerCase();
    for (const [id, a] of Object.entries(articles)) {
      if (a.base_name && a.base_name.toLowerCase() === base) return a;
      if (a.title && a.title.toLowerCase() === base) return a;
      if (a.id && a.id.toLowerCase() === base) return a;
    }
    return null;
  }

  // Display Article View
  async function showArticle(queryId) {
    const art = findArticle(queryId) || articles["00 - Praxis Framework Overview"] || Object.values(articles)[0];
    if (!art) return;

    if (viewHub) viewHub.style.display = "none";
    if (viewLibrary) viewLibrary.style.display = "none";
    if (viewArticle) {
      viewArticle.style.display = "block";
      viewArticle.classList.add("active");
    }

    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

    document.title = `${art.title} - Praxis Framework`;

    // Breadcrumb
    if (breadcrumbCategory) breadcrumbCategory.textContent = art.section || art.folder || "Knowledge";
    if (breadcrumbFile) breadcrumbFile.textContent = art.title;

    // Title & Badges
    if (articleTitle) articleTitle.textContent = art.title;
    if (badgePillar) badgePillar.textContent = `Pillar: ${art.pillar || "Knowledge & Methods"}`;
    if (badgeSpecialization) badgeSpecialization.textContent = `Type: ${art.type || "P3M DataOps"}`;

    // Render Body Markdown
    const renderedHtml = parseMarkdown(art.body);
    if (articleBody) articleBody.innerHTML = renderedHtml;

    // Render LaTeX equations via KaTeX
    renderLaTeX(articleBody);

    // Render Mermaid flowcharts
    await renderMermaidDiagrams(articleBody);

    // Highlight active tree links
    document.querySelectorAll(".vault-note-link, .pinned-item").forEach(link => {
      if (link.dataset && (link.dataset.id === art.id || link.dataset.id === art.base_name)) {
        link.classList.add("active");
        let parent = link.closest(".vault-folder");
        while (parent) {
          parent.classList.add("expanded");
          const chevron = parent.querySelector(".vault-folder-title i");
          if (chevron) chevron.style.transform = "rotate(90deg)";
          parent = parent.parentElement.closest(".vault-folder");
        }
      } else {
        link.classList.remove("active");
      }
    });

    // Scroll to top
    if (stageContent) stageContent.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });

    refreshIcons();
  }

  // Display Hub View
  function showHub() {
    if (viewArticle) {
      viewArticle.style.display = "none";
      viewArticle.classList.remove("active");
    }
    if (viewLibrary) viewLibrary.style.display = "none";
    if (viewHub) viewHub.style.display = "flex";

    document.title = "Praxis Framework - Modern Data & BI P3M Workspace";

    // Active nav links
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    if (navExplore) navExplore.classList.add("active");

    // Clear active links
    document.querySelectorAll(".vault-note-link, .pinned-item").forEach(link => {
      link.classList.remove("active");
    });

    if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");

    if (stageContent) stageContent.scrollTo({ top: 0, behavior: "smooth" });
    refreshIcons();
  }

  // Display Library 3D Gallery View
  function showLibrary() {
    if (viewArticle) {
      viewArticle.style.display = "none";
      viewArticle.classList.remove("active");
    }
    if (viewHub) viewHub.style.display = "none";
    if (viewLibrary) {
      viewLibrary.style.display = "flex";
    }

    document.title = "Framework Library Gallery - Praxis Framework";

    // Active nav links
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    if (navLibrary) navLibrary.classList.add("active");

    document.querySelectorAll(".vault-note-link, .pinned-item").forEach(link => {
      link.classList.remove("active");
    });

    if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");
    if (stageContent) stageContent.scrollTo({ top: 0, behavior: "smooth" });

    initCardStack();
    refreshIcons();
  }

  // 11 Framework Repository Categories with Stock Assets
  const libraryCategories = [
    {
      id: "core-concepts",
      title: "Core Concepts",
      description: "Foundational P3M principles, governance paradigms, and systemic alignment across data ecosystems.",
      imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      tag: "Foundation",
      articleId: "General Principles of Funding"
    },
    {
      id: "governance-framework",
      title: "Governance & Framework",
      description: "Strategic sponsorship, organizational controls, data contracts, and board-level compliance.",
      imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      tag: "Control",
      articleId: "Manage The Configuration"
    },
    {
      id: "processes",
      title: "Processes",
      description: "End-to-end delivery phases, gate reviews, and continuous life-cycle orchestration.",
      imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      tag: "Workflow",
      articleId: "Identify A Project Or Programme"
    },
    {
      id: "management-areas",
      title: "Management Areas",
      description: "Deep domain control across scope, schedule, finance, risk, quality, and change management.",
      imageSrc: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      tag: "Operations",
      articleId: "Manage Change"
    },
    {
      id: "competencies-skills",
      title: "Competencies & Skills",
      description: "Professional capability frameworks, role matrices, behavioral proficiencies, and study tracks.",
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      tag: "People",
      articleId: "Manage Change Competency"
    },
    {
      id: "documentation-artefacts",
      title: "Documentation & Artefacts",
      description: "Standardized business cases, charters, risk registers, and telemetry schemas.",
      imageSrc: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
      tag: "Templates",
      articleId: "00 - Overview"
    },
    {
      id: "portfolio-management",
      title: "Portfolio Management",
      description: "Strategic balance, investment screening, resource capacity, and multi-program prioritization.",
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      tag: "Strategy",
      articleId: "Portfolio Management"
    },
    {
      id: "delivery-lifecycle",
      title: "Delivery & Lifecycle",
      description: "Agile sprints, linear milestones, hybrid transitions, stage boundaries, and benefits realization.",
      imageSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      tag: "Execution",
      articleId: "Plan Delivery"
    },
    {
      id: "maturity-models",
      title: "Maturity Models",
      description: "CMMI capability assessments, gap analysis, and structured pathway progression.",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      tag: "Assessment",
      articleId: "Capability Maturity"
    },
    {
      id: "general-principles",
      title: "General Principles",
      description: "Ethical standards, sustainability, value duty, and foundational project governance ethos.",
      imageSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      tag: "Ethics",
      articleId: "General Principles"
    },
    {
      id: "investment-benefits",
      title: "Investment & Benefits",
      description: "DCF, NPV, and IRR appraisal techniques, optimism bias adjustments, and ROI realization.",
      imageSrc: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
      tag: "FinOps",
      articleId: "Develop Investment Appraisal"
    }
  ];

  let cardStackActiveIndex = 0;
  let cardStackClickCooldownUntil = 0;
  let cardStackTimer = null;
  let cardStackInitialized = false;

  function initCardStack() {
    if (!cardStackViewport) return;
    if (cardStackInitialized) {
      updateCardStackDOM();
      scheduleCardStackAdvance();
      return;
    }
    cardStackInitialized = true;

    cardStackViewport.innerHTML = `
      <div class="card-stack-stage" id="cardStackStage">
        ${libraryCategories.map((cat, i) => `
          <div class="fan-card" data-index="${i}" data-article="${cat.articleId}">
            <img class="fan-card-bg" src="${cat.imageSrc}" alt="${cat.title}" loading="lazy" />
            <div class="fan-card-gradient"></div>
            <div class="fan-card-content">
              <span class="fan-card-tag">${cat.tag}</span>
              <div class="fan-card-title">${cat.title}</div>
              <div class="fan-card-desc">${cat.description}</div>
              <button class="fan-card-action" onclick="event.stopPropagation(); window.navigateToArticle('${cat.articleId}');">
                <span>Explore Category</span>
                <i data-lucide="arrow-right" style="width: 13px; height: 13px;"></i>
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="card-stack-controls">
        <button class="card-stack-nav-btn" id="btnCardPrev" title="Previous Card">
          <i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i>
        </button>

        <div class="card-stack-dots">
          ${libraryCategories.map((_, idx) => `
            <div class="card-stack-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
          `).join("")}
        </div>

        <button class="card-stack-nav-btn" id="btnCardNext" title="Next Card">
          <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
        </button>
      </div>

      <div class="card-stack-status" id="cardStackStatus">
        <span class="card-stack-status-dot"></span>
        <span id="cardStackStatusText">Autoplay active (5-10s random interval)</span>
      </div>
    `;

    // Click events on cards
    const cards = cardStackViewport.querySelectorAll(".fan-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const idx = parseInt(card.dataset.index, 10);
        if (idx === cardStackActiveIndex) {
          const artId = card.dataset.article;
          if (artId) window.navigateToArticle(artId);
        } else {
          cardStackActiveIndex = idx;
          handleCardStackInteraction();
          updateCardStackDOM();
        }
      });
    });

    // Prev / Next button clicks
    const btnPrev = document.getElementById("btnCardPrev");
    const btnNext = document.getElementById("btnCardNext");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        cardStackActiveIndex = (cardStackActiveIndex - 1 + libraryCategories.length) % libraryCategories.length;
        handleCardStackInteraction();
        updateCardStackDOM();
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        cardStackActiveIndex = (cardStackActiveIndex + 1) % libraryCategories.length;
        handleCardStackInteraction();
        updateCardStackDOM();
      });
    }

    // Dots click
    const dots = cardStackViewport.querySelectorAll(".card-stack-dot");
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        cardStackActiveIndex = parseInt(dot.dataset.index, 10);
        handleCardStackInteraction();
        updateCardStackDOM();
      });
    });

    updateCardStackDOM();
    scheduleCardStackAdvance();
    refreshIcons();
  }

  function handleCardStackInteraction() {
    // Wait for 15 seconds after a user click before animation resumes
    cardStackClickCooldownUntil = Date.now() + 15000;
    scheduleCardStackAdvance();
  }

  function updateCardStackStatus(isPaused) {
    const textEl = document.getElementById("cardStackStatusText");
    const dotEl = document.querySelector(".card-stack-status-dot");
    if (!textEl) return;
    if (isPaused) {
      const remainingSec = Math.max(1, Math.round((cardStackClickCooldownUntil - Date.now()) / 1000));
      textEl.textContent = `User interaction hold (resuming in ${remainingSec}s)`;
      if (dotEl) dotEl.style.background = "#f59e0b";
    } else {
      textEl.textContent = "Autoplay active (5-10s random interval)";
      if (dotEl) dotEl.style.background = "#10b981";
    }
  }

  function scheduleCardStackAdvance() {
    if (cardStackTimer) clearTimeout(cardStackTimer);

    const now = Date.now();
    if (now < cardStackClickCooldownUntil) {
      const waitRemaining = cardStackClickCooldownUntil - now;
      updateCardStackStatus(true);
      cardStackTimer = setTimeout(scheduleCardStackAdvance, Math.min(1000, waitRemaining));
      return;
    }

    updateCardStackStatus(false);
    // Random 5000ms - 10000ms interval
    const randomInterval = Math.floor(5000 + Math.random() * 5000);
    cardStackTimer = setTimeout(() => {
      cardStackActiveIndex = (cardStackActiveIndex + 1) % libraryCategories.length;
      updateCardStackDOM();
      scheduleCardStackAdvance();
    }, randomInterval);
  }

  function updateCardStackDOM() {
    if (!cardStackViewport) return;
    const cards = cardStackViewport.querySelectorAll(".fan-card");
    const dots = cardStackViewport.querySelectorAll(".card-stack-dot");
    const len = libraryCategories.length;
    const maxOffset = 3;

    cards.forEach((card, i) => {
      let off = i - cardStackActiveIndex;
      if (off > len / 2) off -= len;
      if (off < -len / 2) off += len;

      const abs = Math.abs(off);
      const isVisible = abs <= maxOffset;

      if (!isVisible) {
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        card.style.transform = `translate3d(${off * 150}px, 60px, -450px) scale(0.82)`;
        card.classList.remove("active");
        return;
      }

      card.style.pointerEvents = "auto";
      card.style.opacity = "1";
      const isActive = off === 0;

      if (isActive) card.classList.add("active");
      else card.classList.remove("active");

      const cardSpacing = 135;
      const x = off * cardSpacing;
      const y = abs * 12 + (isActive ? -24 : 0);
      const z = -abs * 110;
      const rotateZ = off * 7;
      const rotateX = isActive ? 0 : 12;
      const scale = isActive ? 1.04 : (1 - abs * 0.05);

      card.style.zIndex = 100 - abs;
      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg) scale(${scale})`;
    });

    dots.forEach((dot, idx) => {
      if (idx === cardStackActiveIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }

  // Routing Dispatcher
  function route() {
    const hash = window.location.hash || "#/hub";
    if (hash === "#/library" || hash === "#/gallery") {
      showLibrary();
    } else if (hash === "#/hub" || hash === "#/" || hash === "#/home" || hash === "") {
      showHub();
    } else if (hash.startsWith("#/article/")) {
      const id = hash.replace("#/article/", "");
      showArticle(id);
    } else {
      showArticle(hash.replace(/^#\/?/, ""));
    }
  }

  // Live Instant Search Engine
  function triggerSearch(query, dropdownEl) {
    if (!dropdownEl) return;
    const q = (query || "").trim().toLowerCase();
    if (!q) {
      dropdownEl.classList.add("hidden");
      dropdownEl.innerHTML = "";
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
        if (titleMatch) score += 20;
        if (summaryMatch) score += 8;
        if (bodyMatch) score += 2;
        matches.push({ article: art, score: score });
      }
    }

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      dropdownEl.innerHTML = '<div style="padding: 12px 14px; font-size: 12px; color: var(--text-muted);">No matching framework notes found.</div>';
      dropdownEl.classList.remove("hidden");
      return;
    }

    dropdownEl.innerHTML = matches.slice(0, 7).map(m => `
      <div class="search-result-item" onclick="window.navigateToArticle('${encodeURIComponent(m.article.id)}'); document.getElementById('commandSearchDropdown').classList.add('hidden'); document.getElementById('commandInput').value='';">
        <div class="search-result-title">${m.article.title}</div>
        <div class="search-result-meta">${m.article.pillar || 'Knowledge'} &bull; ${m.article.section || 'General'}</div>
      </div>
    `).join("");

    dropdownEl.classList.remove("hidden");
  }

  // J.A.R.V.I.S. Core Interactive Handlers & Search Input Listeners
  const jarvisCore = document.getElementById("jarvisCore");
  if (jarvisCore && commandInput) {
    jarvisCore.addEventListener("click", function() {
      jarvisCore.classList.add("active");
      commandInput.focus();
    });
  }

  if (commandInput) {
    commandInput.addEventListener("focus", function() {
      if (jarvisCore) jarvisCore.classList.add("active");
    });

    commandInput.addEventListener("blur", function() {
      if (jarvisCore && !this.value.trim()) {
        jarvisCore.classList.remove("active");
      }
    });

    commandInput.addEventListener("input", function() {
      if (jarvisCore) {
        if (this.value.trim().length > 0) {
          jarvisCore.classList.add("active");
        }
      }
      triggerSearch(this.value, commandSearchDropdown);
    });

    commandInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        window.handleCommandSubmit();
      } else if (e.key === "Escape") {
        if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");
      }
    });
  }

  if (sidebarSearchInput) {
    sidebarSearchInput.addEventListener("input", function() {
      triggerSearch(this.value, commandSearchDropdown);
    });

    sidebarSearchInput.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");
      }
    });
  }

  // Global Keyboard Shortcuts (⌘K, Ctrl+K, /)
  document.addEventListener("keydown", function(e) {
    if ((e.key === "/" || (e.ctrlKey && e.key === "k") || (e.metaKey && e.key === "k")) && document.activeElement !== commandInput && document.activeElement !== sidebarSearchInput) {
      e.preventDefault();
      if (viewHub && viewHub.style.display !== "none" && commandInput) {
        commandInput.focus();
      } else if (sidebarSearchInput) {
        sidebarSearchInput.focus();
      }
    } else if (e.key === "Escape") {
      if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");
    }
  });

  // Close search dropdown on click outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".command-card-wrapper") && !e.target.closest(".sidebar-search-box")) {
      if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");
    }
  });

  // App Initialization
  renderPinnedTopics();
  renderVaultTree();
  window.addEventListener("hashchange", route);
  route();
})();
