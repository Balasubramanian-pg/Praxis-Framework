// ==========================================================================
// Praxis Wikipedia Portal - Main Application Logic
// Design: Modern Wikipedia Redesign (Clean Editorial Encyclopedia Architecture)
// ==========================================================================

(function() {
  const data = window.PRAXIS_DATA || { articles: {}, navigation: [] };
  const articles = data.articles;
  const navTree = data.navigation;

  // DOM Elements
  const articleTitle = document.getElementById("articleTitle");
  const articleDisambiguation = document.getElementById("articleDisambiguation");
  const articleContainer = document.getElementById("articleContainer");
  const sidebarTopicHeading = document.getElementById("sidebarTopicHeading");
  const contentsList = document.getElementById("contentsList");
  const vaultNavTree = document.getElementById("vaultNavTree");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  // Infobox DOM Elements
  const infoboxMediaBadge = document.getElementById("infoboxMediaBadge");
  const infoboxMediaTitle = document.getElementById("infoboxMediaTitle");
  const infoboxMediaSubtitle = document.getElementById("infoboxMediaSubtitle");
  const infoboxRows = document.getElementById("infoboxRows");
  const infoboxRelatedList = document.getElementById("infoboxRelatedList");

  // Configure marked if loaded
  if (typeof marked !== "undefined") {
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false
    });
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
  function parseMarkdown(md, relPath) {
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

  // Global Actions
  window.copyCodeSnippet = function(button) {
    const wrapper = button.closest(".code-block-wrapper");
    if (!wrapper) return;
    const codeEl = wrapper.querySelector("pre code");
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.innerText).then(() => {
      button.innerHTML = '<i data-lucide="check"></i> Copied!';
      refreshIcons();
      setTimeout(() => {
        button.innerHTML = '<i data-lucide="copy"></i> Copy';
        refreshIcons();
      }, 2000);
    });
  };

  window.shareCurrentPage = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Page link copied to clipboard!");
    });
  };

  window.bookmarkCurrentPage = function() {
    const title = articleTitle ? articleTitle.textContent : "Praxis Note";
    alert(`Bookmarked "${title}" to your study list.`);
  };

  window.downloadCurrentPage = function() {
    window.print();
  };

  // Render Sidebar Tree (Collapsible Vault Navigation)
  function renderVaultTree() {
    if (!vaultNavTree) return;
    vaultNavTree.innerHTML = "";

    navTree.forEach(group => {
      const groupEl = document.createElement("div");
      groupEl.className = "wiki-vault-folder";

      const header = document.createElement("div");
      header.className = "wiki-vault-folder-title";
      header.innerHTML = `
        <span>${group.clean_name}</span>
        <svg class="lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 13px; height: 13px;"><polyline points="9 18 15 12 9 6"></polyline></svg>
      `;
      header.addEventListener("click", () => {
        groupEl.classList.toggle("expanded");
      });

      const itemsEl = document.createElement("div");
      itemsEl.className = "wiki-vault-folder-items";

      group.articles.forEach(art => {
        const item = document.createElement("a");
        item.className = "wiki-vault-note-link";
        item.href = `#/article/${encodeURIComponent(art.id)}`;
        item.textContent = art.title;
        item.dataset.id = art.id;
        itemsEl.appendChild(item);
      });

      if (group.sub_folders && group.sub_folders.length > 0) {
        group.sub_folders.forEach(sub => {
          const subGroup = document.createElement("div");
          subGroup.className = "wiki-vault-folder";

          const subHeader = document.createElement("div");
          subHeader.className = "wiki-vault-folder-title";
          subHeader.style.fontSize = "11.5px";
          subHeader.innerHTML = `
            <span>${sub.name}</span>
            <svg class="lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;"><polyline points="9 18 15 12 9 6"></polyline></svg>
          `;
          subHeader.addEventListener("click", (e) => {
            e.stopPropagation();
            subGroup.classList.toggle("expanded");
          });

          const subItemsEl = document.createElement("div");
          subItemsEl.className = "wiki-vault-folder-items";

          sub.articles.forEach(subArt => {
            const item = document.createElement("a");
            item.className = "wiki-vault-note-link";
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
      vaultNavTree.appendChild(groupEl);
    });

    refreshIcons();
  }

  // Route Handler
  function route() {
    const hash = window.location.hash || "#/home";
    let targetId = "00 - Praxis Framework Overview";

    if (hash.startsWith("#/article/")) {
      targetId = decodeURIComponent(hash.replace("#/article/", ""));
    }

    displayArticle(targetId);
  }

  // Display Article & Populate 3 Columns
  function displayArticle(articleId) {
    let article = articles[articleId];
    if (!article) {
      const base = articleId.split("/").pop();
      article = articles[base];
    }

    if (!article) {
      article = articles["00 - Praxis Framework Overview"] || Object.values(articles)[0];
    }

    if (!article) return;

    // 1. Column 1: Left Topic Header
    if (sidebarTopicHeading) {
      sidebarTopicHeading.textContent = (article.section || "Praxis Framework").toUpperCase();
    }

    // Set GitHub edit link
    const editBtn = document.getElementById("actionEditBtn");
    if (editBtn) {
      const path = article.rel_path || (article.title + ".md");
      editBtn.href = `https://github.com/Balasubramanian-pg/Praxis-Framework/edit/main/${encodeURIComponent(path)}`;
    }

    // 2. Column 2: Center Editorial Article
    if (articleTitle) {
      articleTitle.textContent = article.title;
    }

    if (articleDisambiguation) {
      articleDisambiguation.innerHTML = `
        This article discusses <strong>${article.title}</strong> within the Praxis Framework, specialized for <strong>Data Engineering, Analytics, and Business Intelligence</strong> project management.
      `;
    }

    const renderedHtml = parseMarkdown(article.body, article.rel_path);
    articleContainer.innerHTML = renderedHtml;

    // Inject Edit Buttons into Section Headings (like Early life in screenshot)
    const h2Elements = articleContainer.querySelectorAll("h2");
    h2Elements.forEach(h2 => {
      const editIcon = document.createElement("a");
      editIcon.className = "wiki-heading-edit-btn";
      editIcon.href = editBtn ? editBtn.href : "#";
      editIcon.target = "_blank";
      editIcon.title = "Edit this section on GitHub";
      editIcon.innerHTML = `<i data-lucide="edit-3"></i>`;
      h2.appendChild(editIcon);
    });

    // 3. Populate Column 1: Dynamic Numbered Table of Contents (CONTENTS)
    buildNumberedTOC();

    // 4. Populate Column 3: Wikipedia Infobox
    buildInfobox(article);

    // 5. Update Vault Nav Active State
    document.querySelectorAll(".wiki-vault-note-link").forEach(link => {
      if (link.dataset && (link.dataset.id === article.id || link.dataset.id === article.base_name)) {
        link.classList.add("active");
        let parent = link.closest(".wiki-vault-folder");
        while (parent) {
          parent.classList.add("expanded");
          parent = parent.parentElement.closest(".wiki-vault-folder");
        }
      } else {
        link.classList.remove("active");
      }
    });

    window.scrollTo(0, 0);
    refreshIcons();

    // Run Mermaid if present
    if (window.mermaid && typeof window.mermaid.run === "function") {
      try {
        window.mermaid.run({ querySelector: ".mermaid" });
      } catch (err) {
        console.warn("Mermaid notice:", err);
      }
    }
  }

  // Build Numbered Table of Contents (1. Early life, 2. Career with dot, 2.1, 2.2)
  function buildNumberedTOC() {
    if (!contentsList) return;
    contentsList.innerHTML = "";

    const headings = articleContainer.querySelectorAll("h2, h3");
    if (headings.length === 0) {
      contentsList.innerHTML = `<li class="wiki-toc-item active"><a href="#">1. Overview</a><div class="wiki-toc-dot"></div></li>`;
      return;
    }

    let h2Count = 0;
    let h3Count = 0;

    headings.forEach((h, idx) => {
      let slug = h.id;
      if (!slug) {
        slug = "section-" + idx;
        h.id = slug;
      }

      const li = document.createElement("li");
      li.className = "wiki-toc-item";

      let numberPrefix = "";
      if (h.tagName.toLowerCase() === "h2") {
        h2Count++;
        h3Count = 0;
        numberPrefix = `${h2Count}. `;
        if (idx === 0) {
          li.classList.add("active");
        }
      } else {
        h3Count++;
        numberPrefix = `${h2Count}.${h3Count} `;
        li.classList.add("sub-item");
      }

      const cleanText = h.textContent.replace(/<[^>]*>?/gm, "").trim();
      const a = document.createElement("a");
      a.href = "#" + slug;
      a.textContent = numberPrefix + cleanText;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelectorAll(".wiki-toc-item").forEach(item => {
          item.classList.remove("active");
          const dot = item.querySelector(".wiki-toc-dot");
          if (dot) dot.remove();
        });
        li.classList.add("active");
        if (!li.querySelector(".wiki-toc-dot")) {
          const dot = document.createElement("div");
          dot.className = "wiki-toc-dot";
          li.appendChild(dot);
        }
      });

      li.appendChild(a);

      if (idx === 0 && !li.classList.contains("sub-item")) {
        const dot = document.createElement("div");
        dot.className = "wiki-toc-dot";
        li.appendChild(dot);
      }

      contentsList.appendChild(li);
    });
  }

  // Build Wikipedia Infobox / Knowledge Card (Right Column)
  function buildInfobox(article) {
    if (!infoboxRows) return;

    // Infobox Header Visual
    if (infoboxMediaBadge) {
      const letters = (article.title.replace(/[^a-zA-Z]/g, "").slice(0, 2) || "PX").toUpperCase();
      infoboxMediaBadge.textContent = letters;
    }
    if (infoboxMediaTitle) {
      infoboxMediaTitle.textContent = article.title;
    }
    if (infoboxMediaSubtitle) {
      infoboxMediaSubtitle.textContent = `${article.pillar || "Knowledge"} Pillar \u2022 Praxis Framework`;
    }

    // Determine Tags & Discipline Pills
    const defaultPills = ["DataOps", "FinOps", "Lakehouse", "P3M"];
    const tagPills = (article.type ? [article.type] : []).concat(defaultPills);

    // Metadata Rows matching screenshot structure
    const rows = [
      { label: "Framework", value: "Praxis Framework" },
      { label: "Pillar", value: `<a href="#/article/1.%20Knowledge" class="wiki-infobox-related-link">${article.pillar || "Knowledge & Method"}</a>` },
      { label: "Section", value: article.section || "General" },
      { label: "Lifecycle", value: "Agile Medallion Sprints" },
      { label: "Discipline", value: "Data & BI Engineering" },
      {
        label: "Tags",
        value: tagPills.map(tag => `<span class="wiki-pill-badge">${tag}</span>`).join("")
      },
      { label: "Maintainer", value: '<a href="https://github.com/Balasubramanian-pg" target="_blank" class="wiki-infobox-related-link">Balasubramanian PG</a>' },
      { label: "License", value: "CC BY-SA 4.0" },
      { label: "Status", value: "Production Reference" }
    ];

    infoboxRows.innerHTML = rows.map(r => `
      <tr class="wiki-infobox-row">
        <td class="wiki-infobox-label">${r.label}</td>
        <td class="wiki-infobox-value">${r.value}</td>
      </tr>
    `).join("");

    // Populate Related Notes in Infobox
    if (infoboxRelatedList) {
      infoboxRelatedList.innerHTML = "";
      const related = [];
      for (const [id, art] of Object.entries(articles)) {
        if (id !== art.id) continue;
        if (art.id === article.id) continue;
        if (art.folder === article.folder && !art.id.endsWith("00 - Overview")) {
          related.push(art);
        }
      }

      const candidates = related.slice(0, 4);
      if (candidates.length > 0) {
        infoboxRelatedList.innerHTML = candidates.map(c => `
          <a href="#/article/${encodeURIComponent(c.id)}" class="wiki-infobox-related-link">
            &bull; ${c.title}
          </a>
        `).join("");
      } else {
        infoboxRelatedList.innerHTML = `
          <a href="#/article/00%20-%20Praxis%20Framework%20Overview" class="wiki-infobox-related-link">&bull; Master Framework MOC</a>
          <a href="#/article/1.%20Knowledge" class="wiki-infobox-related-link">&bull; Knowledge & FinOps Guide</a>
        `;
      }
    }
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
      searchResults.innerHTML = '<div style="padding: 14px; color: var(--text-muted); font-size: 13px;">No encyclopedic entries found.</div>';
      searchResults.style.display = "block";
      return;
    }

    searchResults.innerHTML = matches.slice(0, 8).map(m => `
      <div class="wiki-search-item" onclick="window.location.hash='#/article/${encodeURIComponent(m.article.id)}'; document.getElementById('searchResults').style.display='none'; document.getElementById('searchInput').value='';">
        <div class="wiki-search-item-title">${m.article.title}</div>
        <div class="wiki-search-item-desc">${m.article.section} &bull; ${m.article.type} &bull; ${(m.article.summary || "").slice(0, 75)}...</div>
      </div>
    `).join("");
    searchResults.style.display = "block";
  });

  // Close search on click outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".wiki-search-box")) {
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
  renderVaultTree();
  window.addEventListener("hashchange", route);
  route();
})();
