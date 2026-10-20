// ==========================================================================
// Praxis Framework - Modern Full-Width SaaS Workspace Controller
// Aesthetic: Ultra-Clean Full-Width Edge-to-Edge Canvas
// Typography: 100% Avenir Next Cyr Exclusively (Zero Serif)
// Mathematical Typography: KaTeX Math Engine
// Diagrams: Native Mermaid Flowcharts
// Icons: Lucide Open Source Line Icons (Zero Emojis)
// ==========================================================================

(function() {
  const data = window.PRAXIS_DATA || { articles: {}, navigation: [] };
  const articles = data.articles;
  const navTree = data.navigation;

  // Primary DOM Elements
  const viewHub = document.getElementById("viewHub");
  const viewArticle = document.getElementById("viewArticle");
  const stageContent = document.getElementById("stageContent");

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

  let mermaidCounter = 0;

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

  // Initialize Mermaid with neutral theme and loose security
  function initMermaid() {
    if (window.mermaid && typeof window.mermaid.initialize === "function") {
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
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
      const unescaped = code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      return `<div class="mermaid-diagram-wrap"><div class="mermaid-raw" style="display:none;">${unescaped}</div><div class="mermaid-render-target"></div></div>`;
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
      // Retry in 200ms if KaTeX is still loading asynchronously
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
  async function renderMermaidDiagrams(container) {
    if (!container) return;
    if (!window.mermaid) return;

    const wraps = container.querySelectorAll(".mermaid-diagram-wrap");
    for (let i = 0; i < wraps.length; i++) {
      const wrap = wraps[i];
      const rawEl = wrap.querySelector(".mermaid-raw");
      const targetEl = wrap.querySelector(".mermaid-render-target");
      if (!rawEl || !targetEl || targetEl.getAttribute("data-rendered")) continue;

      const code = rawEl.textContent.trim();
      const chartId = "mermaid-chart-" + (++mermaidCounter);

      try {
        if (typeof window.mermaid.render === "function") {
          const res = await window.mermaid.render(chartId, code);
          const svg = typeof res === "string" ? res : (res && res.svg ? res.svg : "");
          targetEl.innerHTML = svg;
          targetEl.setAttribute("data-rendered", "true");
        } else if (typeof window.mermaid.run === "function") {
          targetEl.innerHTML = `<div class="mermaid">${code}</div>`;
          await window.mermaid.run({ nodes: targetEl.querySelectorAll(".mermaid") });
          targetEl.setAttribute("data-rendered", "true");
        }
      } catch (err) {
        console.warn("Mermaid render error on diagram #" + i + ":", err);
        // Clean up any stray temp elements Mermaid might have appended
        const stray = document.getElementById("d" + chartId) || document.getElementById(chartId);
        if (stray) stray.remove();
        targetEl.innerHTML = `<pre class="mermaid-fallback" style="padding:16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; font-size:12px; overflow-x:auto;"><code>${code}</code></pre>`;
        targetEl.setAttribute("data-rendered", "true");
      }
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

      // Direct articles in group
      (group.articles || []).forEach(art => {
        const link = document.createElement("a");
        link.className = "vault-note-link";
        link.href = `#/article/${encodeURIComponent(art.id)}`;
        link.textContent = art.title;
        link.dataset.id = art.id;
        items.appendChild(link);
      });

      // Subfolders
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
    if (viewArticle) {
      viewArticle.style.display = "block";
      viewArticle.classList.add("active");
    }

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
    if (viewHub) viewHub.style.display = "flex";

    document.title = "Praxis Framework - Modern Data & BI P3M Workspace";

    // Clear active links
    document.querySelectorAll(".vault-note-link, .pinned-item").forEach(link => {
      link.classList.remove("active");
    });

    if (commandSearchDropdown) commandSearchDropdown.classList.add("hidden");

    if (stageContent) stageContent.scrollTo({ top: 0, behavior: "smooth" });
    refreshIcons();
  }

  // Routing Dispatcher
  function route() {
    const hash = window.location.hash || "#/hub";
    if (hash === "#/hub" || hash === "#/" || hash === "#/home" || hash === "") {
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

  // Search Input Event Listeners
  if (commandInput) {
    commandInput.addEventListener("input", function() {
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
