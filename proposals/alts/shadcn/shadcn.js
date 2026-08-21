(function () {
  // Tabs
  document.querySelectorAll(".ui-tablist").forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (!panel) return;
        panel.classList.toggle("on", on);
        if (on) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      });
    }
    list.addEventListener("click", function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (tab && list.contains(tab)) select(tab);
    });
    list.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = e.key === "ArrowRight" ? tabs[(i + 1) % tabs.length]
        : e.key === "ArrowLeft" ? tabs[(i - 1 + tabs.length) % tabs.length]
        : null;
      if (!next) return;
      e.preventDefault();
      next.focus();
      select(next);
    });
  });

  // Dialogs
  function openDlg(id) {
    var d = document.getElementById(id);
    if (d && d.showModal) d.showModal();
    if (id === "jump") {
      var q = document.getElementById("jump-q");
      if (q) setTimeout(function () { q.focus(); }, 0);
    }
  }
  function closeDlg(dlg) {
    if (dlg && dlg.open) dlg.close();
  }
  document.addEventListener("click", function (e) {
    var open = e.target.closest("[data-open]");
    if (open) {
      e.preventDefault();
      openDlg(open.getAttribute("data-open"));
      return;
    }
    var closer = e.target.closest("[data-close]");
    if (closer) {
      var dlg = closer.closest("dialog");
      if (dlg) closeDlg(dlg);
    }
  });
  document.querySelectorAll("dialog.ui-dlg").forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target === d) d.close();
    });
  });

  // Command filter
  var q = document.getElementById("jump-q");
  var list = document.getElementById("jump-list");
  if (q && list) {
    q.addEventListener("input", function () {
      var v = q.value.toLowerCase();
      list.querySelectorAll("a").forEach(function (a) {
        a.hidden = v !== "" && a.textContent.toLowerCase().indexOf(v) === -1;
      });
    });
  }

  // Open accordion when the hash points at it
  function openHash() {
    var id = location.hash.replace("#", "");
    var el = id && document.getElementById(id);
    if (el && el.tagName === "DETAILS") el.open = true;
  }
  window.addEventListener("hashchange", openHash);
  openHash();
})();
