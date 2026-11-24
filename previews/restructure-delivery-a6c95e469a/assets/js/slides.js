/* Present mode for why.html. Without JS the page is a readable stacked deck.
   Deep link: why.html?present#slide-5 opens present mode on slide 5. */
(function () {
  'use strict';

  var deck = document.getElementById('deck');
  if (!deck) return;

  var entries = Array.prototype.slice.call(deck.querySelectorAll('.deck-entry'));
  var total = entries.length;
  var bar = deck.querySelector('.present-bar');
  var status = document.getElementById('deck-status');
  var counter = deck.querySelector('[data-role="current"]');
  var prevBtn = bar.querySelector('[data-action="prev"]');
  var nextBtn = bar.querySelector('[data-action="next"]');
  var notesBtn = bar.querySelector('[data-action="notes"]');
  var fullBtn = bar.querySelector('[data-action="fullscreen"]');
  var outside = document.querySelectorAll('.skip-link, .nav, main > :not(.deck-wrap), .deck-wrap > :not(.deck), .footer');
  var presenting = false;
  var current = 1;
  var opener = null;
  var root = document.documentElement;
  var canFullscreen = !!(root.requestFullscreen && document.fullscreenEnabled);

  if (!canFullscreen) fullBtn.hidden = true;

  Array.prototype.forEach.call(document.querySelectorAll('[data-present-action], .present-from'), function (el) {
    el.hidden = false;
  });

  function titleOf(n) {
    var h = entries[n - 1].querySelector('.slide-title');
    return h ? h.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function setInert(on) {
    Array.prototype.forEach.call(outside, function (el) {
      if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
  }

  function updateUrl() {
    var url = new URL(window.location.href);
    if (presenting) url.searchParams.set('present', '');
    else url.searchParams.delete('present');
    url.hash = 'slide-' + current;
    var href = url.pathname + url.search.replace(/([?&]present)=(?=&|$)/, '$1') + url.hash;
    history.replaceState(null, '', href);
  }

  function show(n, announce) {
    current = Math.min(Math.max(1, n), total);
    entries.forEach(function (entry, i) {
      entry.classList.toggle('is-current', i === current - 1);
    });
    counter.textContent = String(current);
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === total;
    if (announce !== false) status.textContent = 'Slide ' + current + ' of ' + total + ': ' + titleOf(current);
    updateUrl();
  }

  function enter(n, from) {
    opener = from || document.activeElement;
    presenting = true;
    document.body.classList.add('is-presenting');
    bar.hidden = false;
    setInert(true);
    deck.setAttribute('role', 'dialog');
    deck.setAttribute('aria-modal', 'true');
    deck.setAttribute('aria-label', 'Slide presentation');
    deck.setAttribute('tabindex', '-1');
    show(n);
    deck.focus({ preventScroll: true });
  }

  function exit() {
    if (!presenting) return;
    presenting = false;
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    document.body.classList.remove('is-presenting', 'show-notes');
    notesBtn.setAttribute('aria-pressed', 'false');
    bar.hidden = true;
    setInert(false);
    ['role', 'aria-modal', 'aria-label', 'tabindex'].forEach(function (a) { deck.removeAttribute(a); });
    entries.forEach(function (entry) { entry.classList.remove('is-current'); });
    status.textContent = '';
    updateUrl();
    var target = entries[current - 1];
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
  }

  function toggleNotes() {
    var on = document.body.classList.toggle('show-notes');
    notesBtn.setAttribute('aria-pressed', String(on));
  }

  function toggleFullscreen() {
    if (!canFullscreen) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else root.requestFullscreen().catch(function () {});
  }

  document.addEventListener('fullscreenchange', function () {
    fullBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
  });

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-present]');
    if (trigger) { enter(parseInt(trigger.getAttribute('data-present'), 10) || 1, trigger); return; }
    var action = event.target.closest('.present-bar [data-action]');
    if (!action) return;
    var name = action.getAttribute('data-action');
    if (name === 'prev') show(current - 1);
    else if (name === 'next') show(current + 1);
    else if (name === 'notes') toggleNotes();
    else if (name === 'fullscreen') toggleFullscreen();
    else if (name === 'exit') exit();
  });

  document.addEventListener('keydown', function (event) {
    if (!presenting || event.defaultPrevented) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    var t = event.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var onControl = t && t.closest && t.closest('button, a, [tabindex]:not(#deck)');
    var key = event.key;
    var handled = true;
    if (key === 'ArrowRight' || key === 'PageDown' || (key === ' ' && !onControl && !event.shiftKey)) show(current + 1);
    else if (key === 'ArrowLeft' || key === 'PageUp' || (key === ' ' && !onControl && event.shiftKey)) show(current - 1);
    else if (key === 'Home') show(1);
    else if (key === 'End') show(total);
    else if (key === 'n' || key === 'N') toggleNotes();
    else if (key === 'f' || key === 'F') toggleFullscreen();
    else if (key === 'Escape') { if (!document.fullscreenElement) exit(); else handled = false; }
    else if (key === 'Tab') handled = trapFocus(event);
    else handled = false;
    if (handled) event.preventDefault();
  });

  // Keep Tab inside the visible slide and the control bar.
  function trapFocus(event) {
    var nodes = Array.prototype.filter.call(
      deck.querySelectorAll('.deck-entry.is-current a[href], .deck-entry.is-current [tabindex="0"], .deck-entry.is-current button, .present-bar button'),
      function (el) { return !el.disabled && el.offsetParent !== null; }
    );
    if (!nodes.length) return true;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    var active = document.activeElement;
    if (event.shiftKey && (active === first || active === deck || nodes.indexOf(active) === -1)) { last.focus(); return true; }
    if (!event.shiftKey && (active === last || nodes.indexOf(active) === -1)) { first.focus(); return true; }
    return false;
  }

  var touchX = null;
  deck.addEventListener('touchstart', function (event) {
    touchX = presenting && event.touches.length === 1 ? event.touches[0].clientX : null;
  }, { passive: true });
  deck.addEventListener('touchend', function (event) {
    if (touchX === null) return;
    var dx = event.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });

  var params = new URLSearchParams(window.location.search);
  var match = /^#slide-(\d+)$/.exec(window.location.hash);
  if (params.has('present')) {
    enter(match ? parseInt(match[1], 10) : 1, document.querySelector('.present-action [data-present]'));
  }
})();
