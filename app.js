(function () {
  const VAPID = 'BD1g9AgO7Ps9RsKZKXM0EZ-5M9kfj9Hby3wEX4yubRypijess0Vfxtc0ST9zVXBVUk2rrpFM8NHr5-0irBuXvQQ';
  const SUB_TOPIC = '1201daily_zCLkTlzR5c2AjSUv';
  const content = document.getElementById('content');
  const archiveEl = document.getElementById('archive-links');
  const datebar = document.getElementById('datebar');
  const notify = document.getElementById('notify');
  const stamp = Date.now();

  function loadToday() {
    return fetch('today.html?t=' + stamp, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('today'); return r.text(); })
      .then(function (html) { if (content) content.innerHTML = html; });
  }

  function loadArchive() {
    return fetch('archive.json?t=' + stamp, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('archive'); return r.json(); })
      .then(function (data) {
        if (datebar && data.today_label) datebar.textContent = data.today_label;
        if (!archiveEl) return;
        var prev = (data.briefs || []).filter(function (b) { return !b.current; });
        archiveEl.innerHTML = 'Earlier: ' + prev.map(function (b) {
          return '<a href="' + b.href + '">' + b.label + '</a>';
        }).join(' ') + ' <a href="archive.html">All briefs</a>';
      });
  }

  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var raw = atob((base64String + padding).replace(/-/g, '+').replace(/_/g, '/'));
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; ++i) out[i] = raw.charCodeAt(i);
    return out;
  }

  function postSub(sub) {
    return fetch('https://ntfy.sh/' + SUB_TOPIC, {
      method: 'POST',
      headers: { 'Title': '1201-sub', 'Tags': 'push' },
      body: JSON.stringify(sub)
    });
  }

  function setNotifyState(text, showButton) {
    if (!notify) return;
    if (showButton) {
      notify.innerHTML = '<button type="button" id="notify-btn">Turn on notifications</button>';
      var btn = document.getElementById('notify-btn');
      if (btn) btn.addEventListener('click', enablePush);
    } else {
      notify.innerHTML = '<div class="ok">' + text + '</div>';
    }
  }

  function enablePush() {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setNotifyState('This app needs a home-screen install for notifications.', false);
      return;
    }
    Notification.requestPermission().then(function (perm) {
      if (perm !== 'granted') {
        setNotifyState('', true);
        return;
      }
      return navigator.serviceWorker.ready.then(function (reg) {
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID)
        });
      }).then(function (sub) {
        return postSub(sub.toJSON()).then(function () {
          setNotifyState('Notifications on. The page will ping you when a new brief is up.', false);
        });
      });
    }).catch(function () {
      setNotifyState('', true);
    });
  }

  function setupNotify() {
    if (!notify) return;
    if (!('Notification' in window)) {
      notify.innerHTML = '';
      return;
    }
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function (reg) {
        return reg.pushManager.getSubscription();
      }).then(function (sub) {
        if (sub) {
          postSub(sub.toJSON());
          setNotifyState('Notifications on.', false);
        } else {
          setNotifyState('', true);
        }
      }).catch(function () { setNotifyState('', true); });
    } else {
      setNotifyState('', true);
    }
  }

  loadToday().catch(function () {});
  loadArchive().catch(function () {});

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/1201-brief/sw.js').then(setupNotify);
  } else {
    setupNotify();
  }
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) location.reload();
  });
})();
