(function () {
  var KEY = "1201-system-picks";
  var picks = {};

  function load() {
    try {
      picks = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
    } catch (e) {
      picks = {};
    }
    if (typeof picks !== "object" || Array.isArray(picks) || picks === null) {
      picks = {};
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(picks));
  }

  function shortPick(val) {
    if (val === "proposed") return "P";
    if (val === "a") return "A";
    if (val === "b") return "B";
    if (val === "c") return "C";
    return val;
  }

  function apply() {
    document.querySelectorAll("section[data-family][data-pick]").forEach(function (sec) {
      var fam = sec.getAttribute("data-family");
      var pk = sec.getAttribute("data-pick");
      var on = picks[fam] === pk;
      sec.classList.toggle("picked", on);
      var btn = sec.querySelector(".usebtn");
      if (btn) {
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        btn.textContent = on ? "Using" : "Use this";
      }
    });
    renderTray();
  }

  function renderTray() {
    var list = document.getElementById("picks-list");
    if (!list) return;
    var bits = [];
    document.querySelectorAll(".fam[data-family]").forEach(function (el) {
      var fam = el.getAttribute("data-family");
      if (!picks[fam]) return;
      var title = el.getAttribute("data-title") || fam;
      bits.push(title + " " + shortPick(picks[fam]));
    });
    list.textContent = bits.length ? bits.join(" · ") : "No picks yet";
  }

  function markdown() {
    var lines = [];
    document.querySelectorAll(".fam[data-family]").forEach(function (el) {
      var fam = el.getAttribute("data-family");
      var pk = picks[fam];
      if (!pk) return;
      var title = el.getAttribute("data-title") || fam;
      var sec = el.querySelector(
        'section[data-family="' + fam + '"][data-pick="' + pk + '"]'
      );
      var name = sec ? sec.getAttribute("data-label") || "" : "";
      var hint = sec ? sec.getAttribute("data-hint") || "" : "";
      var line = "**" + title + "** — " + name;
      if (hint) line += " (" + hint + ")";
      lines.push(line);
    });
    return lines.join("\n");
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function copiedFlash(btn) {
    var prev = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(function () {
      btn.textContent = prev;
    }, 1400);
  }

  function copyPicks(btn) {
    var text = markdown();
    if (!text) text = "No picks yet";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          copiedFlash(btn);
        },
        function () {
          fallbackCopy(text);
          copiedFlash(btn);
        }
      );
    } else {
      fallbackCopy(text);
      copiedFlash(btn);
    }
  }

  document.addEventListener("click", function (e) {
    var use = e.target.closest(".usebtn");
    if (use) {
      var sec = use.closest("section[data-family][data-pick]");
      if (!sec) return;
      picks[sec.getAttribute("data-family")] = sec.getAttribute("data-pick");
      save();
      apply();
      return;
    }
    var copy = e.target.closest("#copy-picks");
    if (copy) copyPicks(copy);
  });

  load();
  apply();
})();
