(function () {
  "use strict";
  var API = "https://api.github.com/repos/JCVERSA/p/releases/latest";
  var card = document.getElementById("release-card");
  var versionHero = document.getElementById("hero-version");
  var year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function formatSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "";
    return bytes >= 1073741824 ? (bytes / 1073741824).toFixed(2) + " Go" : (bytes / 1048576).toFixed(1) + " Mo";
  }
  function formatDate(value) {
    if (!value) return "Date non indiquée";
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date non indiquée";
    return new Intl.DateTimeFormat("fr-FR", {day:"numeric",month:"long",year:"numeric"}).format(date);
  }
  function assetLink(asset, label, secondary) {
    return '<a class="asset-button' + (secondary ? ' asset-button--secondary' : '') + '" href="' + escapeHTML(asset.browser_download_url) + '" rel="noopener noreferrer"><span aria-hidden="true">↓</span><span>' + label + '<small> · ' + formatSize(asset.size) + '</small></span></a>';
  }
  function showNoRelease() {
    versionHero.textContent = "Bientôt disponible";
    card.innerHTML = '<div class="release-error"><b>Aucune version officielle publiée pour le moment.</b><p>La prochaine version apparaîtra ici automatiquement dès qu’une GitHub Release NoVaY contiendra son APK.</p><a href="https://github.com/JCVERSA/p/releases" target="_blank" rel="noopener noreferrer">Voir les Releases sur GitHub ↗</a></div>';
  }
  function showError(message) {
    card.innerHTML = '<div class="release-error"><b>Impossible de récupérer les informations de la version.</b><p>' + escapeHTML(message || "Vérifie ta connexion puis réessaie.") + '</p><a href="https://github.com/JCVERSA/p/releases" target="_blank" rel="noopener noreferrer">Ouvrir les Releases GitHub ↗</a></div>';
  }
  function renderRelease(release) {
    if (!release || release.message === "Not Found" || !Array.isArray(release.assets)) {
      showNoRelease();
      return;
    }
    var assets = release.assets;
    var apk = assets.find(function (a) { return /\.apk$/i.test(a.name) && /universal/i.test(a.name); }) ||
      assets.find(function (a) { return /\.apk$/i.test(a.name); });
    var archive = assets.find(function (a) { return /\.7z$/i.test(a.name) && /universal/i.test(a.name); }) ||
      assets.find(function (a) { return /\.7z$/i.test(a.name); });
    if (!apk) {
      showNoRelease();
      return;
    }
    var tag = release.tag_name || release.name || "Dernière version";
    var notes = String(release.body || "").trim();
    if (notes.length > 420) notes = notes.slice(0, 417) + "…";
    var buttons = assetLink(apk, "Télécharger l'APK", false);
    if (archive) buttons += assetLink(archive, "Version compressée .7z", true);
    card.innerHTML =
      '<div class="release-topline"><div><span class="release-label">DERNIÈRE VERSION OFFICIELLE</span><h3 class="release-version">' + escapeHTML(tag) + '</h3></div><span class="release-label">✓ PUBLIÉE</span></div>' +
      '<div class="release-meta"><span>Publiée le ' + formatDate(release.published_at) + '</span><span>' + Number(apk.download_count || 0).toLocaleString("fr-FR") + ' téléchargements APK</span></div>' +
      '<div class="release-assets">' + buttons + '</div>' +
      (notes ? '<p class="release-notes">' + escapeHTML(notes) + '</p>' : '');
    versionHero.textContent = tag;
  }
  function loadRelease() {
    fetch(API, {headers:{"Accept":"application/vnd.github+json"},cache:"no-store"})
      .then(function (response) {
        if (response.status === 404) return null;
        if (!response.ok) throw new Error("GitHub a répondu avec le statut " + response.status + ".");
        return response.json();
      })
      .then(function (release) { if (release) renderRelease(release); else showNoRelease(); })
      .catch(function (error) { showError(error && error.message); });
  }
  loadRelease();
}());
