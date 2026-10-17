// Praxis Documentation Portal - Main Application Logic
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

  // Markdown Parser
  function parseMarkdown(md) {
    if (!md) return "";
    let html = md;

    // Remove existing YAML frontmatter if still present in string
    html = html.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

    // Parse Callouts: > [!TYPE] Title \n > Content
    html = html.replace(/>\s*\[!(NOTE|TIP|WARNING|NAV|SUMMARY|INFO|ABSTRACT)\]([^\r\n]*)\r?\n((?:>[^\r\n]*\r?\n?)+)/gi, function(match, type, title, body) {
      const typeLower = type.toLowerCase();
      const cleanTitle = title.trim() || type.toUpperCase();
      const cleanBody = body.replace(/^>\s?/gm, '').trim();
      return `<div class="callout callout-${typeLower}"><div class="callout-title">${cleanTitle}</div><div class="callout-body">${parseInline(cleanBody)}</div></div>`;
    });

    // Parse Tables
    html = html.replace(/(?:^\|.*\|\r?\n)+/gm, function(tableBlock) {
      const rows = tableBlock.trim().split('\n');
      if (rows.length < 2) return tableBlock;
      let tableHtml = '<table>';
      let isHeader = true;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();
        if (row.includes('---')) {
          isHeader = false;
          continue;
        }
        const cells = row.split('|').slice(1, -1);
        tableHtml += '<tr>';
        cells.forEach(cell => {
          const tag = isHeader ? 'th' : 'td';
          tableHtml += `<${tag}>${parseInline(cell.trim())}</${tag}>`;
        });
        tableHtml += '</tr>';
        if (isHeader) {
          isHeader = false;
        }
      }
      tableHtml += '</table>';
      return tableHtml;
    });

    // Headers
    html = html.replace(/^####\s+([^\r\n]+)/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+([^\r\n]+)/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+([^\r\n]+)/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+([^\r\n]+)/gm, '<h1>$1</h1>');

    // Horizontal Rule
    html = html.replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">');

    // Lists
    html = html.replace(/^\s*-\s+([^\r\n]+)/gm, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Paragraphs
    const paras = html.split(/\n{2,}/);
    html = paras.map(p => {
      p = p.trim();
      if (!p) return "";
      if (p.startsWith('<h') || p.startsWith('<table') || p.startsWith('<div') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<hr')) {
        return p;
      }
      return `<p>${parseInline(p)}</p>`;
    }).join('\n');

    return html;
  }

  function parseInline(str) {
    if (!str) return "";
    let s = str;
    // Wikilinks: [[Target|Label]] or [[Target]]
    s = s.replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, function(match, target, label) {
      const display = label || target;
      // Strip folder if present for clean lookup
      const lookup = target.split('/').pop();
      return `<a class="wikilink" href="#/article/${encodeURIComponent(target)}">${display}</a>`;
    });

    // Bold & Italics
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/==([^=]+)==/g, '<mark style="background: #fef08a; padding: 1px 4px; border-radius: 2px;">$1</mark>');
    s = s.replace(/`([^`]+)`/g, '<code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-family: monospace;">$1</code>');
    
    // Markdown links [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: var(--primary); text-decoration: underline;">$1</a>');

    return s;
  }

  // Populate Sidebar Navigation
  function renderSidebar() {
    sidebarNav.innerHTML = '';
    
    // Home button in sidebar
    const homeItem = document.createElement("a");
    homeItem.className = "nav-item";
    homeItem.style.fontWeight = "600";
    homeItem.style.marginBottom = "12px";
    homeItem.innerHTML = "Documentation Home";
    homeItem.href = "#/home";
    sidebarNav.appendChild(homeItem);

    navTree.forEach((group, gIdx) => {
      const groupEl = document.createElement("div");
      groupEl.className = "nav-group";
      if (gIdx === 0) groupEl.classList.add("expanded");

      const header = document.createElement("div");
      header.className = "nav-group-header";
      header.innerHTML = `
        <span class="nav-group-title">${group.clean_name}</span>
        <span class="nav-group-arrow">›</span>
      `;
      header.addEventListener("click", () => {
        groupEl.classList.toggle("expanded");
      });

      const itemsEl = document.createElement("div");
      itemsEl.className = "nav-group-items";

      // Direct articles in group
      group.articles.forEach(art => {
        const item = document.createElement("a");
        item.className = "nav-item";
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
          subGroup.style.marginTop = "6px";

          const subHeader = document.createElement("div");
          subHeader.className = "nav-group-header";
          subHeader.style.fontSize = "12.5px";
          subHeader.style.padding = "4px 8px";
          subHeader.innerHTML = `
            <span class="nav-group-title">${sub.name}</span>
            <span class="nav-group-arrow">›</span>
          `;
          subHeader.addEventListener("click", (e) => {
            e.stopPropagation();
            subGroup.classList.toggle("expanded");
          });

          const subItemsEl = document.createElement("div");
          subItemsEl.className = "nav-group-items";
          subItemsEl.style.paddingLeft = "10px";

          sub.articles.forEach(subArt => {
            const item = document.createElement("a");
            item.className = "nav-item";
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
  }

  // Routing
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

    // Deselect sidebar items
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  }

  function showArticle(articleId) {
    // Find article (try exact id, then base name)
    let article = articles[articleId];
    if (!article) {
      const base = articleId.split('/').pop();
      article = articles[base];
    }

    if (!article) {
      articleContainer.innerHTML = `
        <h1>Document Not Found</h1>
        <p>The requested note <code>${articleId}</code> could not be found in the vault.</p>
        <p><a href="#/home" style="color: var(--primary);">Return to Documentation Home</a></p>
      `;
      breadcrumbBar.innerHTML = `<a class="breadcrumb-link" href="#/home">Documentation</a> &gt; <span>Not Found</span>`;
      dashboardView.style.display = "none";
      articleView.style.display = "block";
      return;
    }

    // Set Breadcrumbs
    breadcrumbBar.innerHTML = `
      <a class="breadcrumb-link" href="#/home">Documentation</a> &gt; 
      <a class="breadcrumb-link" href="#/article/${encodeURIComponent(article.folder + '/00 - Overview')}">${article.section || 'General'}</a> &gt; 
      <span>${article.title}</span>
    `;

    // Render Article
    const renderedBody = parseMarkdown(article.body);
    articleContainer.innerHTML = renderedBody;

    dashboardView.style.display = "none";
    articleView.style.display = "block";
    window.scrollTo(0, 0);

    // Highlight in sidebar & expand parent
    document.querySelectorAll(".nav-item").forEach(el => {
      if (el.dataset.id === article.id || el.dataset.id === article.base_name) {
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
  }

  // Live Search
  searchInput.addEventListener("input", function() {
    const q = this.value.trim().toLowerCase();
    if (!q) {
      searchResults.style.display = "none";
      return;
    }

    const matches = [];
    for (const [id, art] of Object.entries(articles)) {
      if (id !== art.id && id !== art.base_name) continue;
      const titleMatch = art.title.toLowerCase().includes(q);
      const summaryMatch = art.summary.toLowerCase().includes(q);
      const bodyMatch = art.body.toLowerCase().includes(q);

      if (titleMatch || summaryMatch || bodyMatch) {
        let score = 0;
        if (titleMatch) score += 10;
        if (summaryMatch) score += 5;
        if (bodyMatch) score += 1;
        matches.push({ article: art, score: score });
      }
    }

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      searchResults.innerHTML = '<div style="padding: 16px; color: var(--text-muted); font-size: 13px;">No documents found matching your search.</div>';
      searchResults.style.display = "block";
      return;
    }

    searchResults.innerHTML = matches.slice(0, 8).map(m => `
      <div class="search-result-item" onclick="window.location.hash='#/article/${encodeURIComponent(m.article.id)}'; document.getElementById('searchResults').style.display='none'; document.getElementById('searchInput').value='';">
        <div class="search-result-title">${m.article.title}</div>
        <div class="search-result-meta">${m.article.section} &bull; ${m.article.type} &bull; ${m.article.summary.slice(0, 70)}...</div>
      </div>
    `).join('');
    searchResults.style.display = "block";
  });

  // Close search when clicking outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".search-container")) {
      searchResults.style.display = "none";
    }
  });

  // Shortcut key (/) to focus search
  document.addEventListener("keydown", function(e) {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Init
  renderSidebar();
  window.addEventListener("hashchange", route);
  route();
})();
