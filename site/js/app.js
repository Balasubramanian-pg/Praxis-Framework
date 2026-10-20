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
  const viewExplore = document.getElementById("viewExplore");
  const cardStackViewport = document.getElementById("cardStackViewport");
  const coverflowViewport = document.getElementById("coverflowViewport");
  const stageContent = document.getElementById("stageContent");
  const navHub = document.getElementById("navHub");
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

  window.navigateToHub = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof cardStackTimer !== "undefined" && cardStackTimer) clearTimeout(cardStackTimer);
    if (typeof coverflowTimer !== "undefined" && coverflowTimer) clearTimeout(coverflowTimer);
    window.location.hash = "#/hub";
    showHub();
  };

  window.navigateToLibrary = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof coverflowTimer !== "undefined" && coverflowTimer) clearTimeout(coverflowTimer);
    window.location.hash = "#/library";
    showLibrary();
  };

  window.navigateToExplore = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof cardStackTimer !== "undefined" && cardStackTimer) clearTimeout(cardStackTimer);
    window.location.hash = "#/explore";
    showExplore();
  };

  window.navigateToArticle = function(id) {
    window.location.hash = `#/article/${encodeURIComponent(id)}`;
  };

  window.toggleSidebar = function() {
    if (appSidebar) {
      const isCollapsed = appSidebar.classList.toggle("collapsed");
      const expandBtn = document.getElementById("sidebarExpandBtn");
      if (expandBtn) {
        expandBtn.style.display = isCollapsed ? "inline-flex" : "none";
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
    if (typeof cardStackTimer !== "undefined" && cardStackTimer) clearTimeout(cardStackTimer);
    if (typeof coverflowTimer !== "undefined" && coverflowTimer) clearTimeout(coverflowTimer);
    if (typeof window.stopTts === "function") window.stopTts();

    const art = findArticle(queryId) || articles["00 - Praxis Framework Overview"] || Object.values(articles)[0];
    if (!art) return;

    if (viewHub) viewHub.style.display = "none";
    if (viewLibrary) viewLibrary.style.display = "none";
    if (viewExplore) viewExplore.style.display = "none";
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
    if (typeof cardStackTimer !== "undefined" && cardStackTimer) clearTimeout(cardStackTimer);
    if (typeof coverflowTimer !== "undefined" && coverflowTimer) clearTimeout(coverflowTimer);
    if (typeof window.stopTts === "function") window.stopTts();

    if (viewArticle) {
      viewArticle.style.display = "none";
      viewArticle.classList.remove("active");
    }
    if (viewLibrary) viewLibrary.style.display = "none";
    if (viewExplore) viewExplore.style.display = "none";
    if (viewHub) viewHub.style.display = "flex";

    document.title = "Praxis Framework - Modern Data & BI P3M Workspace";

    // Active nav links
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    if (navHub) navHub.classList.add("active");

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
    if (typeof coverflowTimer !== "undefined" && coverflowTimer) clearTimeout(coverflowTimer);
    if (typeof window.stopTts === "function") window.stopTts();

    if (viewArticle) {
      viewArticle.style.display = "none";
      viewArticle.classList.remove("active");
    }
    if (viewHub) viewHub.style.display = "none";
    if (viewExplore) viewExplore.style.display = "none";
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

  // ==========================================================================
  // VIEW D: EXPLORE NOTE GALLERY & COVERFLOW DRAG ENGINE
  // ==========================================================================

  // Curated vault notes paired with Freepik conceptual technology & cyber portraits
  const exploreNotesData = [
    {
      id: "manage-contracts",
      title: "Manage Contracts",
      subtitle: "Formal data sharing agreements, schema enforcement, and producer-consumer SLAs.",
      tag: "Governance",
      imageSrc: "https://img.freepik.com/free-photo/glowing-hologram-cyberpunk-futuristic-technology-concept_53876-129759.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Manage Contracts"
    },
    {
      id: "manage-configuration",
      title: "Manage The Configuration",
      subtitle: "Configuration identification, version control, baseline audits, and metadata status accounting.",
      tag: "Architecture",
      imageSrc: "https://img.freepik.com/free-photo/abstract-polygonal-space-low-poly-dark-background-with-connecting-dots-lines-connection-structure_1258-26978.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Manage The Configuration"
    },
    {
      id: "investment-appraisal",
      title: "Develop Investment Appraisal",
      subtitle: "Cloud FinOps viability, DCF appraisal techniques, unit economics, and value duty metrics.",
      tag: "Finance",
      imageSrc: "https://img.freepik.com/free-photo/glowing-digital-graph-showing-stock-market-data-financial-investment-success-concept-generative-ai_1258-153381.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Develop Investment Appraisal"
    },
    {
      id: "manage-change",
      title: "Manage Change",
      subtitle: "Kotter alignment, behavioral enablement, stakeholder empathy mapping, and adoption.",
      tag: "Transformation",
      imageSrc: "https://img.freepik.com/free-photo/digital-brain-artificial-intelligence-neural-network-concept_53876-129756.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Manage Change"
    },
    {
      id: "plan-delivery",
      title: "Plan Delivery",
      subtitle: "Agile sprints, milestone boundaries, linear dependency graphs, and automated gate checks.",
      tag: "Execution",
      imageSrc: "https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Plan Delivery"
    },
    {
      id: "praxis-data-bi",
      title: "Praxis for Data and BI",
      subtitle: "Modern data platform orchestration, analytics engineering governance, and CMMI maturity.",
      tag: "Framework",
      imageSrc: "https://img.freepik.com/free-photo/illuminated-geometric-shapes-futuristic-modern-architecture_23-2151624022.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Praxis for Data and BI"
    },
    {
      id: "manage-benefits",
      title: "Manage Benefits",
      subtitle: "Quantifying business telemetry, KPI outcome verification, and ongoing value tracking.",
      tag: "Value Duty",
      imageSrc: "https://img.freepik.com/free-photo/futuristic-hologram-artificial-intelligence-hud-dashboard-display_53876-104337.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Manage Benefits"
    },
    {
      id: "manage-information",
      title: "Manage Information",
      subtitle: "Data stewardship, cataloging, lineage tracking, and information security classification.",
      tag: "Information",
      imageSrc: "https://img.freepik.com/free-photo/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1000&auto=format&fit=crop&q=80",
      articleId: "Manage Information"
    }
  ];

  let coverflowActiveIndex = 2;
  let coverflowInitialized = false;
  let isCoverflowDragging = false;
  let coverflowStartX = 0;
  let coverflowCurrentDeltaX = 0;
  let coverflowTimer = null;
  let coverflowClickCooldownUntil = 0;

  // Available high-res conceptual Freepik assets for dynamic note shuffling
  const freepikStockAssets = [
    { tag: "Architecture", img: "https://img.freepik.com/free-photo/abstract-polygonal-space-low-poly-dark-background-with-connecting-dots-lines-connection-structure_1258-26978.jpg?w=1000&auto=format&fit=crop&q=80" },
    { tag: "Governance", img: "https://img.freepik.com/free-photo/glowing-hologram-cyberpunk-futuristic-technology-concept_53876-129759.jpg?w=1000&auto=format&fit=crop&q=80" },
    { tag: "Finance", img: "https://img.freepik.com/free-photo/glowing-digital-graph-showing-stock-market-data-financial-investment-success-concept-generative-ai_1258-153381.jpg?w=1000&auto=format&fit=crop&q=80" },
    { tag: "Transformation", img: "https://img.freepik.com/free-photo/digital-brain-artificial-intelligence-neural-network-concept_53876-129756.jpg?w=1000&auto=format&fit=crop&q=80" },
    { tag: "Execution", img: "https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?w=1000&auto=format&fit=crop&q=80" },
    { tag: "Framework", img: "https://img.freepik.com/free-photo/illuminated-geometric-shapes-futuristic-modern-architecture_23-2151624022.jpg?w=1000&auto=format&fit=crop&q=80" },
    { tag: "Value Duty", img: "https://img.freepik.com/free-photo/futuristic-hologram-artificial-intelligence-hud-dashboard-display_53876-104337.jpg?w=1000&auto=format&fit=crop&q=80" },
    { tag: "Information", img: "https://img.freepik.com/free-photo/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1000&auto=format&fit=crop&q=80" }
  ];

  window.shuffleExploreNotes = function() {
    const allArticles = Object.values(articles).filter(a => a.title && a.body && a.body.length > 50);
    if (allArticles.length >= 8) {
      const shuffled = [...allArticles].sort(() => 0.5 - Math.random()).slice(0, 8);
      exploreNotesData.length = 0;
      shuffled.forEach((art, i) => {
        const fp = freepikStockAssets[i % freepikStockAssets.length];
        const rawSummary = (art.summary || art.body.substring(0, 140)).replace(/[#*`_\[\]]/g, "").trim();
        exploreNotesData.push({
          id: `note-${i}`,
          title: art.title,
          subtitle: rawSummary.substring(0, 90) + (rawSummary.length > 90 ? "..." : ""),
          tag: art.section || fp.tag,
          imageSrc: fp.img,
          articleId: art.id
        });
      });
      coverflowActiveIndex = 2;
      coverflowInitialized = false;
      initCoverflow();
      scheduleCoverflowAdvance();
    }
  };

  function handleCoverflowInteraction() {
    coverflowClickCooldownUntil = Date.now() + 12000;
    scheduleCoverflowAdvance();
  }

  function updateCoverflowStatus(isPaused) {
    const textEl = document.getElementById("coverflowStatusText");
    const dotEl = document.querySelector(".coverflow-status-dot");
    if (!textEl) return;
    if (isPaused) {
      const remainingSec = Math.max(1, Math.round((coverflowClickCooldownUntil - Date.now()) / 1000));
      textEl.textContent = `User interaction hold (resuming in ${remainingSec}s)`;
      if (dotEl) dotEl.style.background = "#f59e0b";
    } else {
      textEl.textContent = "Autoplay motion active (4.5s interval)";
      if (dotEl) dotEl.style.background = "var(--accent-indigo)";
    }
  }

  function scheduleCoverflowAdvance() {
    if (coverflowTimer) clearTimeout(coverflowTimer);
    if (!viewExplore || viewExplore.style.display === "none") return;

    const now = Date.now();
    if (now < coverflowClickCooldownUntil) {
      const waitRemaining = coverflowClickCooldownUntil - now;
      updateCoverflowStatus(true);
      coverflowTimer = setTimeout(scheduleCoverflowAdvance, Math.min(1000, waitRemaining));
      return;
    }

    updateCoverflowStatus(false);
    coverflowTimer = setTimeout(() => {
      if (!viewExplore || viewExplore.style.display === "none") return;
      coverflowActiveIndex = (coverflowActiveIndex + 1) % exploreNotesData.length;
      updateCoverflowDOM(0);
      scheduleCoverflowAdvance();
    }, 4500);
  }

  // Display Explore 3D Coverflow Gallery View
  function showExplore() {
    if (typeof cardStackTimer !== "undefined" && cardStackTimer) clearTimeout(cardStackTimer);
    if (typeof window.stopTts === "function") window.stopTts();

    if (viewArticle) {
      viewArticle.style.display = "none";
      viewArticle.classList.remove("active");
    }
    if (viewHub) viewHub.style.display = "none";
    if (viewLibrary) viewLibrary.style.display = "none";
    if (viewExplore) {
      viewExplore.style.display = "flex";
    }

    document.title = "Explore Vault Notes - Praxis Framework";

    // Active nav links
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    if (navExplore) navExplore.classList.add("active");

    document.querySelectorAll(".vault-note-link, .pinned-item").forEach(link => {
      link.classList.remove("active");
    });

    if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");
    if (stageContent) stageContent.scrollTo({ top: 0, behavior: "smooth" });

    initCoverflow();
    scheduleCoverflowAdvance();
    refreshIcons();
  }

  function initCoverflow() {
    if (!coverflowViewport) return;
    if (coverflowInitialized) {
      updateCoverflowDOM(0);
      scheduleCoverflowAdvance();
      return;
    }
    coverflowInitialized = true;

    coverflowViewport.innerHTML = `
      <div class="coverflow-stage" id="coverflowStage" tabindex="0" role="region" aria-label="Explore Notes Coverflow Gallery">
        ${exploreNotesData.map((item, idx) => `
          <div class="coverflow-card ${idx === coverflowActiveIndex ? 'active' : ''}" 
               data-index="${idx}" 
               data-article="${item.articleId}"
               role="button"
               tabindex="0"
               aria-label="${item.title}">
            <div class="coverflow-card-img-wrap">
              <img class="coverflow-card-img" src="${item.imageSrc}" alt="${item.title}" loading="lazy" />
              <span class="coverflow-card-badge">${item.tag}</span>
            </div>
            <div class="coverflow-card-body">
              <div>
                <div class="coverflow-card-title">${item.title}</div>
                <div class="coverflow-card-desc">${item.subtitle}</div>
              </div>
              <div class="coverflow-card-footer">
                <span>Praxis Vault Note</span>
                <button class="coverflow-card-action" onclick="event.stopPropagation(); window.navigateToArticle('${item.articleId}');">
                  <span>Inspect</span>
                  <i data-lucide="arrow-up-right" style="width: 12px; height: 12px;"></i>
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="coverflow-controls">
        <button class="coverflow-btn" id="btnCoverflowPrev" title="Previous Note (Left Arrow)" aria-label="Previous Note">
          <i data-lucide="chevron-left" style="width: 18px; height: 18px;"></i>
        </button>

        <div class="coverflow-dots">
          ${exploreNotesData.map((_, idx) => `
            <div class="coverflow-dot ${idx === coverflowActiveIndex ? 'active' : ''}" data-index="${idx}" title="Go to note ${idx + 1}"></div>
          `).join("")}
        </div>

        <button class="coverflow-btn" id="btnCoverflowNext" title="Next Note (Right Arrow)" aria-label="Next Note">
          <i data-lucide="chevron-right" style="width: 18px; height: 18px;"></i>
        </button>
      </div>

      <div class="coverflow-status" id="coverflowStatus">
        <span class="coverflow-status-dot"></span>
        <span id="coverflowStatusText">Autoplay motion active (4.5s interval)</span>
      </div>

      <div class="coverflow-hint">
        <i data-lucide="mouse-pointer" style="width: 13px; height: 13px;"></i>
        <span>Drag or swipe cards horizontally, or use Arrow keys to explore</span>
      </div>
    `;

    const stage = document.getElementById("coverflowStage");
    const cards = coverflowViewport.querySelectorAll(".coverflow-card");

    // Click & Keyboard on cards
    cards.forEach(card => {
      card.addEventListener("click", () => {
        if (Math.abs(coverflowCurrentDeltaX) > 8) return;
        const idx = parseInt(card.dataset.index, 10);
        if (idx === coverflowActiveIndex) {
          const artId = card.dataset.article;
          if (artId) window.navigateToArticle(artId);
        } else {
          coverflowActiveIndex = idx;
          handleCoverflowInteraction();
          updateCoverflowDOM(0);
        }
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const artId = card.dataset.article;
          if (artId) window.navigateToArticle(artId);
        }
      });
    });

    // Prev / Next button clicks
    const btnPrev = document.getElementById("btnCoverflowPrev");
    const btnNext = document.getElementById("btnCoverflowNext");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        coverflowActiveIndex = (coverflowActiveIndex - 1 + exploreNotesData.length) % exploreNotesData.length;
        handleCoverflowInteraction();
        updateCoverflowDOM(0);
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        coverflowActiveIndex = (coverflowActiveIndex + 1) % exploreNotesData.length;
        handleCoverflowInteraction();
        updateCoverflowDOM(0);
      });
    }

    // Dots click
    const dots = coverflowViewport.querySelectorAll(".coverflow-dot");
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        coverflowActiveIndex = parseInt(dot.dataset.index, 10);
        handleCoverflowInteraction();
        updateCoverflowDOM(0);
      });
    });

    // Pointer / Drag Gestures (Mouse & Touch)
    function onPointerDown(e) {
      isCoverflowDragging = true;
      coverflowStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      coverflowCurrentDeltaX = 0;
      if (stage) stage.style.cursor = "grabbing";
    }

    function onPointerMove(e) {
      if (!isCoverflowDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      coverflowCurrentDeltaX = clientX - coverflowStartX;
      updateCoverflowDOM(coverflowCurrentDeltaX, true);
    }

    function onPointerUp() {
      if (!isCoverflowDragging) return;
      isCoverflowDragging = false;
      if (stage) stage.style.cursor = "grab";

      const threshold = 40;
      if (coverflowCurrentDeltaX > threshold) {
        coverflowActiveIndex = (coverflowActiveIndex - 1 + exploreNotesData.length) % exploreNotesData.length;
      } else if (coverflowCurrentDeltaX < -threshold) {
        coverflowActiveIndex = (coverflowActiveIndex + 1) % exploreNotesData.length;
      }
      coverflowCurrentDeltaX = 0;
      handleCoverflowInteraction();
      updateCoverflowDOM(0, false);
    }

    if (stage) {
      stage.addEventListener("mousedown", onPointerDown);
      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("mouseup", onPointerUp);

      stage.addEventListener("touchstart", onPointerDown, { passive: true });
      window.addEventListener("touchmove", onPointerMove, { passive: true });
      window.addEventListener("touchend", onPointerUp);

      // Keyboard navigation
      stage.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          coverflowActiveIndex = (coverflowActiveIndex - 1 + exploreNotesData.length) % exploreNotesData.length;
          handleCoverflowInteraction();
          updateCoverflowDOM(0);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          coverflowActiveIndex = (coverflowActiveIndex + 1) % exploreNotesData.length;
          handleCoverflowInteraction();
          updateCoverflowDOM(0);
        }
      });
    }

    updateCoverflowDOM(0);
    scheduleCoverflowAdvance();
    refreshIcons();
  }

  function updateCoverflowDOM(dragDelta = 0, isLiveDrag = false) {
    if (!coverflowViewport) return;
    const cards = coverflowViewport.querySelectorAll(".coverflow-card");
    const dots = coverflowViewport.querySelectorAll(".coverflow-dot");
    const cardSpacing = 190;
    const dragOffsetRatio = dragDelta / cardSpacing;

    cards.forEach((card, i) => {
      let offset = (i - coverflowActiveIndex) + dragOffsetRatio;

      const absOffset = Math.abs(offset);
      const isActive = Math.abs(offset) < 0.5;

      if (isActive) card.classList.add("active");
      else card.classList.remove("active");

      // Hide distant cards
      if (absOffset > 3.5) {
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        card.style.transform = `translate3d(${offset * 160}px, 0, -400px) scale(0.65)`;
        return;
      }

      card.style.pointerEvents = "auto";
      card.style.transition = isLiveDrag ? "none" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease, opacity 0.45s ease, border-color 0.3s ease, box-shadow 0.3s ease";

      let x = 0;
      let rotateY = 0;
      let z = -absOffset * 100;
      let scale = 1;
      let opacity = 1;
      let brightness = 1;

      if (Math.abs(offset) < 0.1) {
        x = offset * cardSpacing;
        rotateY = 0;
        z = 50;
        scale = 1.05;
        opacity = 1;
        brightness = 1;
      } else if (offset < 0) {
        x = offset * cardSpacing - 30;
        rotateY = Math.min(42, 32 + absOffset * 4);
        scale = Math.max(0.75, 1 - absOffset * 0.1);
        opacity = Math.max(0.25, 1 - absOffset * 0.22);
        brightness = Math.max(0.45, 1 - absOffset * 0.2);
      } else {
        x = offset * cardSpacing + 30;
        rotateY = -Math.min(42, 32 + absOffset * 4);
        scale = Math.max(0.75, 1 - absOffset * 0.1);
        opacity = Math.max(0.25, 1 - absOffset * 0.22);
        brightness = Math.max(0.45, 1 - absOffset * 0.2);
      }

      card.style.zIndex = Math.round(100 - absOffset * 10);
      card.style.opacity = opacity.toFixed(2);
      card.style.filter = brightness < 0.98 ? `brightness(${brightness.toFixed(2)})` : "none";
      card.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(2)})`;
    });

    dots.forEach((dot, idx) => {
      if (idx === coverflowActiveIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }

  // ==========================================================================
  // FREE CLIENT-SIDE TEXT-TO-SPEECH (TTS) AUDIO SYNTHESIZER
  // 8 Distinct Voices (4 Female + 4 Male) via Native Web Speech API (0 API Keys, 100% Free)
  // ==========================================================================

  const ttsDeck = document.getElementById("ttsDeck");
  const ttsPlaybackStatus = document.getElementById("ttsPlaybackStatus");
  const ttsEqualizer = document.getElementById("ttsEqualizer");
  const ttsProgressBar = document.getElementById("ttsProgressBar");
  const ttsActiveVoiceName = document.getElementById("ttsActiveVoiceName");
  const ttsSentenceCounter = document.getElementById("ttsSentenceCounter");
  const btnTtsPlay = document.getElementById("btnTtsPlay");
  const ttsPlayIcon = document.getElementById("ttsPlayIcon");
  const ttsPlayText = document.getElementById("ttsPlayText");
  const ttsFloatingDock = document.getElementById("ttsFloatingDock");
  const ttsDockPlayBtn = document.getElementById("ttsDockPlayBtn");
  const ttsDockPlayIcon = document.getElementById("ttsDockPlayIcon");
  const ttsDockTitle = document.getElementById("ttsDockTitle");
  const ttsDockVoice = document.getElementById("ttsDockVoice");
  const ttsDockEqualizer = document.getElementById("ttsDockEqualizer");

  // 8 Distinct Persona Profiles: 4 Female & 4 Male
  const ttsVoiceProfiles = {
    "female-1": {
      name: "Elena",
      gender: "female",
      persona: "Natural & Articulate",
      pitch: 1.02,
      rate: 1.0,
      keywords: ["female", "zira", "jenny", "aria", "samantha", "victoria", "karen", "susan"]
    },
    "female-2": {
      name: "Sophia",
      gender: "female",
      persona: "Warm Executive",
      pitch: 0.92,
      rate: 0.95,
      keywords: ["female", "jenny", "samantha", "catherine", "karen", "zira"]
    },
    "female-3": {
      name: "Aria",
      gender: "female",
      persona: "Dynamic & Fast",
      pitch: 1.10,
      rate: 1.10,
      keywords: ["female", "aria", "samantha", "zira", "google"]
    },
    "female-4": {
      name: "Victoria",
      gender: "female",
      persona: "Refined British RP",
      pitch: 0.98,
      rate: 0.96,
      keywords: ["en-gb", "uk", "british", "victoria", "george", "female"]
    },
    "male-1": {
      name: "Marcus",
      gender: "male",
      persona: "Deep Executive",
      pitch: 0.82,
      rate: 0.92,
      keywords: ["male", "david", "guy", "daniel", "mark", "alex", "fred"]
    },
    "male-2": {
      name: "Alexander",
      gender: "male",
      persona: "Tech Analytical",
      pitch: 1.0,
      rate: 1.05,
      keywords: ["male", "alexander", "alex", "mark", "david", "guy"]
    },
    "male-3": {
      name: "James",
      gender: "male",
      persona: "British Studio",
      pitch: 0.95,
      rate: 0.96,
      keywords: ["en-gb", "uk", "british", "daniel", "oliver", "male"]
    },
    "male-4": {
      name: "David",
      gender: "male",
      persona: "Calm Professional",
      pitch: 0.92,
      rate: 0.90,
      keywords: ["david", "male", "guy", "mark", "daniel"]
    }
  };

  let selectedVoiceKey = "female-1";
  let activeSystemVoices = [];
  let ttsResolvedVoices = {};
  let ttsSentenceQueue = [];
  let ttsCurrentSentenceIdx = 0;
  let ttsPlayState = "stopped"; // "stopped" | "playing" | "paused"
  let ttsRateMultiplier = 1.0;
  let ttsMode = "full"; // "full" | "summary"
  let currentUtterance = null;
  let ttsCurrentArticleTitle = "";

  function loadAndMapTtsVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    activeSystemVoices = window.speechSynthesis.getVoices() || [];

    const engVoices = activeSystemVoices.filter(v => (v.lang || "").toLowerCase().startsWith("en"));
    const pool = engVoices.length > 0 ? engVoices : activeSystemVoices;

    for (const [key, profile] of Object.entries(ttsVoiceProfiles)) {
      let matchedVoice = null;
      for (const kw of profile.keywords) {
        matchedVoice = pool.find(v => {
          const name = (v.name || "").toLowerCase();
          const lang = (v.lang || "").toLowerCase();
          return name.includes(kw) || lang.includes(kw);
        });
        if (matchedVoice) break;
      }
      if (!matchedVoice && pool.length > 0) {
        const isFemale = profile.gender === "female";
        const genderMatch = pool.find(v => {
          const n = (v.name || "").toLowerCase();
          return isFemale ? (n.includes("female") || n.includes("woman") || n.includes("zira")) : (n.includes("male") || n.includes("man") || n.includes("david"));
        });
        matchedVoice = genderMatch || pool[0];
      }
      ttsResolvedVoices[key] = matchedVoice;
    }
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    loadAndMapTtsVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadAndMapTtsVoices;
    }
  }

  // Clean Markdown & Code for clear spoken narration
  function prepareSpeechText(markdown, mode) {
    if (!markdown) return [];
    let text = markdown;

    // Remove code blocks
    text = text.replace(/```[\s\S]*?```/g, " Code snippet omitted. ");
    // Remove Mermaid diagram blocks
    text = text.replace(/```mermaid[\s\S]*?```/g, " Architecture diagram omitted. ");
    // Remove LaTeX formulas
    text = text.replace(/\$\$[\s\S]*?\$\$/g, " Mathematical equation. ");
    text = text.replace(/\$([^\$]+)\$/g, " $1 ");
    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, " ");
    // Convert Markdown links [text](url) -> text
    text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, " $1 ");
    // Convert headers # Title -> Title.
    text = text.replace(/^#{1,6}\s*(.+)$/gm, "$1. ");
    // Remove bold/italics
    text = text.replace(/[*_~`]/g, "");
    // Remove list markers
    text = text.replace(/^[-*+]\s+/gm, "");
    text = text.replace(/^\d+\.\s+/gm, "");
    // Collapse excess whitespace
    text = text.replace(/\s+/g, " ").trim();

    if (mode === "summary") {
      const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
      text = sentences.slice(0, 3).join(" ");
    }

    // Split into speech chunks (~120-160 chars per utterance for seamless browser compatibility)
    const rawSentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
    const chunks = [];
    rawSentences.forEach(s => {
      const trimmed = s.trim();
      if (trimmed.length > 200) {
        const sub = trimmed.split(/[,;:]\s*/);
        sub.forEach(part => {
          if (part.trim().length > 0) chunks.push(part.trim() + ".");
        });
      } else if (trimmed.length > 1) {
        chunks.push(trimmed);
      }
    });

    return chunks.length > 0 ? chunks : [text];
  }

  window.selectVoice = function(voiceKey) {
    if (!ttsVoiceProfiles[voiceKey]) return;
    selectedVoiceKey = voiceKey;
    const profile = ttsVoiceProfiles[voiceKey];

    // Update active buttons in UI
    document.querySelectorAll(".tts-voice-btn").forEach(btn => {
      if (btn.dataset.voice === voiceKey) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    if (ttsActiveVoiceName) ttsActiveVoiceName.textContent = `${profile.name} (${profile.persona})`;
    if (ttsDockVoice) ttsDockVoice.textContent = `Voice: ${profile.name}`;

    // If already playing, restart current sentence with the new voice smoothly
    if (ttsPlayState === "playing") {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      speakCurrentSentence();
    }
  };

  window.setTtsRate = function(rate) {
    ttsRateMultiplier = rate;
    const rateBtns = [
      { id: "ttsRate08", val: 0.85 },
      { id: "ttsRate10", val: 1.0 },
      { id: "ttsRate12", val: 1.25 },
      { id: "ttsRate15", val: 1.5 }
    ];
    rateBtns.forEach(b => {
      const el = document.getElementById(b.id);
      if (el) {
        if (Math.abs(b.val - rate) < 0.05) el.classList.add("active");
        else el.classList.remove("active");
      }
    });

    if (ttsPlayState === "playing") {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      speakCurrentSentence();
    }
  };

  window.setTtsMode = function(mode) {
    ttsMode = mode;
    const btnFull = document.getElementById("btnTtsModeFull");
    const btnSum = document.getElementById("btnTtsModeSummary");
    if (btnFull) btnFull.classList.toggle("active", mode === "full");
    if (btnSum) btnSum.classList.toggle("active", mode === "summary");

    if (ttsPlayState === "playing") {
      window.stopTts();
      window.toggleTtsPlay();
    }
  };

  function updateTtsUIState(state) {
    ttsPlayState = state;
    const isPlaying = state === "playing";
    const isPaused = state === "paused";

    if (ttsDeck) {
      if (isPlaying) ttsDeck.classList.add("speaking");
      else ttsDeck.classList.remove("speaking");
    }

    if (ttsFloatingDock) {
      if (state !== "stopped") ttsFloatingDock.style.display = "flex";
      else ttsFloatingDock.style.display = "none";
    }

    if (ttsPlayText) {
      if (isPlaying) ttsPlayText.textContent = "Pause Audio";
      else if (isPaused) ttsPlayText.textContent = "Resume Audio";
      else ttsPlayText.textContent = "Listen to Note";
    }

    if (ttsPlayIcon) {
      ttsPlayIcon.setAttribute("data-lucide", isPlaying ? "pause" : "play");
    }
    if (ttsDockPlayIcon) {
      ttsDockPlayIcon.setAttribute("data-lucide", isPlaying ? "pause" : "play");
    }

    if (ttsPlaybackStatus) {
      if (isPlaying) ttsPlaybackStatus.textContent = "Synthesizing audio...";
      else if (isPaused) ttsPlaybackStatus.textContent = "Audio paused";
      else ttsPlaybackStatus.textContent = "Ready to read note";
    }

    refreshIcons();
  }

  function speakCurrentSentence() {
    if (!("speechSynthesis" in window)) return;
    if (ttsCurrentSentenceIdx >= ttsSentenceQueue.length) {
      window.stopTts();
      if (ttsPlaybackStatus) ttsPlaybackStatus.textContent = "Note reading complete";
      return;
    }

    const textChunk = ttsSentenceQueue[ttsCurrentSentenceIdx];
    const profile = ttsVoiceProfiles[selectedVoiceKey] || ttsVoiceProfiles["female-1"];
    const utterance = new SpeechSynthesisUtterance(textChunk);

    if (ttsResolvedVoices[selectedVoiceKey]) {
      utterance.voice = ttsResolvedVoices[selectedVoiceKey];
    }
    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate * ttsRateMultiplier;

    utterance.onstart = function() {
      updateTtsUIState("playing");
      updateTtsProgress();
    };

    utterance.onend = function() {
      if (ttsPlayState === "playing") {
        ttsCurrentSentenceIdx++;
        speakCurrentSentence();
      }
    };

    utterance.onerror = function(err) {
      if (err.error !== "canceled" && err.error !== "interrupted") {
        console.warn("TTS Utterance notice:", err);
      }
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function updateTtsProgress() {
    const total = ttsSentenceQueue.length;
    const current = Math.min(ttsCurrentSentenceIdx + 1, total);
    const pct = total > 0 ? (current / total) * 100 : 0;

    if (ttsProgressBar) ttsProgressBar.style.width = `${pct}%`;
    if (ttsSentenceCounter) {
      ttsSentenceCounter.textContent = `Sentence: ${current} / ${total}`;
    }
  }

  window.toggleTtsPlay = function() {
    if (!("speechSynthesis" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    if (ttsPlayState === "playing") {
      window.speechSynthesis.pause();
      updateTtsUIState("paused");
      return;
    }

    if (ttsPlayState === "paused") {
      window.speechSynthesis.resume();
      updateTtsUIState("playing");
      return;
    }

    // From stopped state: build queue from current article
    const curTitle = articleTitle ? articleTitle.textContent : "Praxis Note";
    ttsCurrentArticleTitle = curTitle;
    if (ttsDockTitle) ttsDockTitle.textContent = curTitle;

    const art = findArticle(curTitle) || articles[curTitle] || Object.values(articles)[0];
    const rawText = (art ? art.title + ". " + (art.body || "") : (articleBody ? articleBody.innerText : ""));

    ttsSentenceQueue = prepareSpeechText(rawText, ttsMode);
    ttsCurrentSentenceIdx = 0;

    if (ttsSentenceQueue.length === 0) return;

    window.speechSynthesis.cancel();
    speakCurrentSentence();
  };

  window.stopTts = function() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    ttsCurrentSentenceIdx = 0;
    currentUtterance = null;
    updateTtsUIState("stopped");
    if (ttsProgressBar) ttsProgressBar.style.width = "0%";
    if (ttsSentenceCounter) ttsSentenceCounter.textContent = "Sentence: 0 / 0";
  };

  // Routing Dispatcher
  function route() {
    const hash = window.location.hash || "#/hub";
    if (hash === "#/library" || hash === "#/gallery") {
      showLibrary();
    } else if (hash === "#/explore") {
      showExplore();
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

  if (navHub) navHub.addEventListener("click", window.navigateToHub);
  if (navExplore) navExplore.addEventListener("click", window.navigateToExplore);
  if (navLibrary) navLibrary.addEventListener("click", window.navigateToLibrary);

  window.addEventListener("hashchange", route);
  route();
})();
