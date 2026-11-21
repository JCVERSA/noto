(function () {
  "use strict";

  var root = document.documentElement;
  var searchInput = document.getElementById("repo-search");
  var categoryFilter = document.getElementById("category-filter");
  var languageFilter = document.getElementById("language-filter");
  var typeFilter = document.getElementById("type-filter");
  var clearButton = document.getElementById("clear-filters");
  var emptyClearButton = document.getElementById("empty-clear");
  var resultsNode = document.getElementById("repository-results");
  var statusNode = document.getElementById("results-status");
  var countNode = document.getElementById("results-count");
  var emptyNode = document.getElementById("empty-state");
  var errorNode = document.getElementById("error-state");
  var categoryNav = document.getElementById("category-nav");
  var themeButton = document.getElementById("theme-toggle");
  var themeLabel = document.getElementById("theme-label");
  var catalog = null;

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value || "";
  }

  function normalize(value) {
    var text = String(value == null ? "" : value).toLowerCase();
    if (typeof text.normalize === "function") {
      text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    return text;
  }

  function findCategory(id) {
    var i;
    for (i = 0; i < catalog.categories.length; i += 1) {
      if (catalog.categories[i].id === id) return catalog.categories[i];
    }
    return null;
  }

  function appendOptions(select, values, emptyLabel) {
    var options = '<option value="">' + escapeHTML(emptyLabel) + "</option>";
    var i;
    for (i = 0; i < values.length; i += 1) {
      var value = values[i].value;
      var label = values[i].label;
      options += '<option value="' + escapeHTML(value) + '">' + escapeHTML(label) + "</option>";
    }
    select.innerHTML = options;
  }

  function fillFilters() {
    var categoryValues = [];
    var languageValues = [];
    var typeValues = [];
    var seenLanguages = {};
    var seenTypes = {};
    var counts = {};
    var i;

    for (i = 0; i < catalog.categories.length; i += 1) {
      var category = catalog.categories[i];
      categoryValues.push({ value: category.id, label: category.id + " · " + category.name });
      counts[category.id] = 0;
    }

    for (i = 0; i < catalog.repositories.length; i += 1) {
      var repository = catalog.repositories[i];
      counts[repository.categoryId] = (counts[repository.categoryId] || 0) + 1;
      if (!seenLanguages[repository.language]) {
        seenLanguages[repository.language] = true;
        languageValues.push({ value: repository.language, label: repository.language });
      }
      if (!seenTypes[repository.type]) {
        seenTypes[repository.type] = true;
        typeValues.push({ value: repository.type, label: repository.type });
      }
    }

    languageValues.sort(function (a, b) { return a.label.localeCompare(b.label, "fr"); });
    typeValues.sort(function (a, b) { return a.label.localeCompare(b.label, "fr"); });
    appendOptions(categoryFilter, categoryValues, "Tous les domaines");
    appendOptions(languageFilter, languageValues, "Tous les langages");
    appendOptions(typeFilter, typeValues, "Tous les types");

    var navHTML = '<li><button type="button" data-category="" aria-pressed="true"><span class="category-nav__name">Tous les domaines</span><span class="category-nav__count">' + catalog.repositories.length + "</span></button></li>";
    for (i = 0; i < catalog.categories.length; i += 1) {
      var item = catalog.categories[i];
      navHTML += '<li><button type="button" data-category="' + escapeHTML(item.id) + '" aria-pressed="false"><span class="category-nav__name">' + escapeHTML(item.name) + '</span><span class="category-nav__count">' + (counts[item.id] || 0) + "</span></button></li>";
    }
    categoryNav.innerHTML = navHTML;

    var navButtons = categoryNav.querySelectorAll("button[data-category]");
    for (i = 0; i < navButtons.length; i += 1) {
      navButtons[i].addEventListener("click", function () {
        categoryFilter.value = this.getAttribute("data-category");
        updateResults();
        if (window.matchMedia && window.matchMedia("(max-width: 800px)").matches) {
          document.getElementById("results-heading").scrollIntoView();
        }
      });
    }
  }

  function matchesRepository(repository, queryParts) {
    var category = findCategory(repository.categoryId);
    var searchable = normalize([
      repository.name,
      repository.description,
      repository.categoryId,
      category ? category.name : "",
      repository.type,
      repository.language,
      repository.status || ""
    ].join(" "));
    var i;

    if (categoryFilter.value && repository.categoryId !== categoryFilter.value) return false;
    if (languageFilter.value && repository.language !== languageFilter.value) return false;
    if (typeFilter.value && repository.type !== typeFilter.value) return false;
    for (i = 0; i < queryParts.length; i += 1) {
      if (searchable.indexOf(queryParts[i]) === -1) return false;
    }
    return true;
  }

  function statusLabel(type) {
    if (type === "archived") return "Archivé";
    if (type === "historic") return "Projet ancien";
    return "À revérifier";
  }

  function renderRepository(repository) {
    var category = findCategory(repository.categoryId);
    var categoryName = category ? category.name : "";
    var statusHTML = "";
    if (repository.status) {
      statusHTML = '<span class="repo-card__status-label">' + escapeHTML(statusLabel(repository.statusType)) + '</span>';
    }

    return '<article class="repo-card">' +
      '<div class="repo-card__top"><p class="repo-card__category">' + escapeHTML(repository.categoryId + " / " + categoryName) + "</p>" + statusHTML + "</div>" +
      '<h4 class="repo-card__title"><a href="' + escapeHTML(repository.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHTML(repository.name + " — dépôt GitHub, nouvel onglet") + '">' + escapeHTML(repository.name) + '<span class="repo-card__external" aria-hidden="true">↗</span></a></h4>' +
      '<p class="repo-card__description">' + escapeHTML(repository.description) + "</p>" +
      (repository.status ? '<p class="repo-card__status">' + escapeHTML(repository.status) + "</p>" : "") +
      '<dl class="repo-card__meta"><div><dt>Type</dt><dd>' + escapeHTML(repository.type) + '</dd></div><div><dt>Langage principal</dt><dd>' + escapeHTML(repository.language) + "</dd></div></dl>" +
      "</article>";
  }

  function renderCategory(category, repositories) {
    var sectionRepositories = [];
    var i;
    for (i = 0; i < repositories.length; i += 1) {
      if (repositories[i].categoryId === category.id) sectionRepositories.push(repositories[i]);
    }
    if (sectionRepositories.length === 0) return "";

    var noteHTML = "";
    if (category.note) {
      var noteClass = category.id === "08" ? "category-note category-note--sensitive" : "category-note";
      noteHTML = '<p class="' + noteClass + '" role="note">' + escapeHTML(category.note) + "</p>";
    }

    var cardHTML = "";
    for (i = 0; i < sectionRepositories.length; i += 1) {
      cardHTML += renderRepository(sectionRepositories[i]);
    }

    return '<section class="category-block" id="category-' + escapeHTML(category.id) + '" aria-labelledby="category-title-' + escapeHTML(category.id) + '">' +
      '<div class="category-block__heading"><h3 class="category-block__title" id="category-title-' + escapeHTML(category.id) + '"><span class="category-block__index">' + escapeHTML(category.id) + '</span>' + escapeHTML(category.name) + '</h3><span class="category-block__count">' + sectionRepositories.length + (sectionRepositories.length === 1 ? " dépôt" : " dépôts") + "</span></div>" +
      noteHTML + '<div class="repository-grid">' + cardHTML + "</div></section>";
  }

  function updateResults() {
    if (!catalog) return;

    var query = normalize(searchInput.value).trim();
    var queryParts = query ? query.split(/\s+/) : [];
    var filtered = [];
    var i;
    for (i = 0; i < catalog.repositories.length; i += 1) {
      if (matchesRepository(catalog.repositories[i], queryParts)) filtered.push(catalog.repositories[i]);
    }

    var resultHTML = "";
    for (i = 0; i < catalog.categories.length; i += 1) {
      resultHTML += renderCategory(catalog.categories[i], filtered);
    }
    resultsNode.innerHTML = resultHTML;
    resultsNode.setAttribute("aria-busy", "false");
    emptyNode.hidden = filtered.length !== 0;
    errorNode.hidden = true;
    countNode.textContent = filtered.length + " / " + catalog.repositories.length;

    var resultWord = filtered.length === 1 ? "résultat affiché" : "résultats affichés";
    statusNode.textContent = filtered.length + " " + resultWord + " sur " + catalog.repositories.length + " dépôts";
    clearButton.disabled = !(searchInput.value.trim() || categoryFilter.value || languageFilter.value || typeFilter.value);

    var navButtons = categoryNav.querySelectorAll("button[data-category]");
    for (i = 0; i < navButtons.length; i += 1) {
      navButtons[i].setAttribute("aria-pressed", navButtons[i].getAttribute("data-category") === categoryFilter.value ? "true" : "false");
    }
  }

  function clearFilters() {
    searchInput.value = "";
    categoryFilter.value = "";
    languageFilter.value = "";
    typeFilter.value = "";
    updateResults();
  }

  function renderNovay() {
    setText("novay-intro", catalog.novayIntro);

    var recommendationsHTML = "";
    var i;
    for (i = 0; i < catalog.novayRecommendations.length; i += 1) {
      var recommendation = catalog.novayRecommendations[i];
      var linksHTML = "";
      var j;
      for (j = 0; j < recommendation.references.length; j += 1) {
        var reference = recommendation.references[j];
        if (j > 0) linksHTML += '<span aria-hidden="true">, </span>';
        linksHTML += '<a href="' + escapeHTML(reference.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(reference.name) + "</a>";
      }
      recommendationsHTML += '<article class="recommendation-row"><h3 class="recommendation-row__need">' + escapeHTML(recommendation.need) + '</h3><p class="recommendation-row__refs">' + linksHTML + '</p><p class="recommendation-row__why">' + escapeHTML(recommendation.why) + "</p></article>";
    }
    document.getElementById("novay-recommendations").innerHTML = recommendationsHTML;

    var featuresHTML = "";
    for (i = 0; i < catalog.novayFeatures.length; i += 1) {
      featuresHTML += "<li>" + escapeHTML(catalog.novayFeatures[i]) + "</li>";
    }
    document.getElementById("novay-features").innerHTML = featuresHTML;
  }

  function renderSourceNotes() {
    setText("source-objective", "Objectif : " + catalog.objective);
    setText("language-note", catalog.languageNote);
    setText("status-note", catalog.statusNote);
    setText("maintenance-intro", catalog.maintenanceIntro);
    setText("directory-tree-intro", catalog.directoryTreeIntro);
    setText("directory-tree", catalog.directoryTree);
    setText("maintenance-note", catalog.maintenanceNote);

    var sourceLinks = ["source-link-top", "source-document-link"];
    var i;
    for (i = 0; i < sourceLinks.length; i += 1) {
      var link = document.getElementById(sourceLinks[i]);
      link.href = catalog.sourceUrl;
    }

    var duplicateHTML = "";
    for (i = 0; i < catalog.duplicates.length; i += 1) {
      duplicateHTML += "<li>" + escapeHTML(catalog.duplicates[i]) + "</li>";
    }
    document.getElementById("duplicate-list").innerHTML = duplicateHTML;

    var maintenanceHTML = "";
    for (i = 0; i < catalog.maintenance.length; i += 1) {
      var item = catalog.maintenance[i];
      maintenanceHTML += '<tr><td><a href="' + escapeHTML(item.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(item.name) + '</a></td><td>' + escapeHTML(item.status) + "</td></tr>";
    }
    document.getElementById("maintenance-table-body").innerHTML = maintenanceHTML;

    var checksHTML = "";
    for (i = 0; i < catalog.preIntegrationChecks.length; i += 1) {
      checksHTML += "<li>" + escapeHTML(catalog.preIntegrationChecks[i]) + "</li>";
    }
    document.getElementById("checks-list").innerHTML = checksHTML;
  }

  function applyTheme(theme, save) {
    var isDark = theme === "dark";
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    themeButton.setAttribute("aria-pressed", isDark ? "true" : "false");
    themeButton.setAttribute("aria-label", isDark ? "Activer le thème clair" : "Activer le thème sombre");
    themeLabel.textContent = isDark ? "Activer le thème clair" : "Activer le thème sombre";
    if (save) {
      try {
        window.localStorage.setItem("noto-theme", isDark ? "dark" : "light");
      } catch (error) {
        // The theme still works when storage is unavailable.
      }
    }
  }

  function initializeTheme() {
    var theme = "";
    try {
      theme = window.localStorage.getItem("noto-theme") || "";
    } catch (error) {
      theme = "";
    }
    if (theme !== "dark" && theme !== "light") {
      theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(theme, false);
    themeButton.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  function showError() {
    resultsNode.setAttribute("aria-busy", "false");
    resultsNode.innerHTML = "";
    emptyNode.hidden = true;
    errorNode.hidden = false;
    statusNode.textContent = "Le catalogue n'a pas pu être chargé.";
  }

  function initialize(data) {
    catalog = data;
    document.title = catalog.documentTitle + " | Noto";
    setText("catalog-intro", catalog.intro);
    setText("hero-total", catalog.repositoryCount);
    setText("catalog-total", catalog.repositoryCount);
    setText("organized-date", catalog.lastOrganized);
    fillFilters();
    renderNovay();
    renderSourceNotes();
    updateResults();
  }

  function loadCatalog() {
    if (window.fetch) {
      window.fetch("./catalog.json").then(function (response) {
        if (!response.ok) throw new Error("Catalog request failed");
        return response.json();
      }).then(initialize).catch(showError);
      return;
    }

    var request = new XMLHttpRequest();
    request.open("GET", "./catalog.json", true);
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      if (request.status >= 200 && request.status < 300) {
        try {
          initialize(JSON.parse(request.responseText));
        } catch (error) {
          showError();
        }
      } else {
        showError();
      }
    };
    request.send();
  }

  searchInput.addEventListener("input", updateResults);
  categoryFilter.addEventListener("change", updateResults);
  languageFilter.addEventListener("change", updateResults);
  typeFilter.addEventListener("change", updateResults);
  clearButton.addEventListener("click", function () {
    clearFilters();
    searchInput.focus();
  });
  emptyClearButton.addEventListener("click", function () {
    clearFilters();
    searchInput.focus();
  });

  initializeTheme();
  loadCatalog();
}());