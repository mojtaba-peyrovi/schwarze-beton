class CountdownBanner extends HTMLElement {
  connectedCallback() {
    this._endMs = this._parseEnd(this.dataset.end, this.dataset.timezone);
    if (isNaN(this._endMs)) return;
    this._clock = this.querySelector('.countdown-banner__clock');
    this._ended = this.querySelector('[data-ended-message]');
    this._tick();
    this._interval = setInterval(() => this._tick(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this._interval);
  }

  _parseEnd(iso, tz) {
    if (!iso) return NaN;
    try {
      const dt = new Date(`${iso} ${tz || 'UTC'}`.replace(' UTC', 'Z'));
      if (!isNaN(dt)) return dt.getTime();
      const utcMs = new Date(iso).getTime();
      return utcMs;
    } catch {
      return NaN;
    }
  }

  _tick() {
    const remaining = this._endMs - Date.now();
    if (remaining <= 0) {
      clearInterval(this._interval);
      this._showEnded();
      return;
    }

    const totalSec = Math.floor(remaining / 1000);
    const days    = Math.floor(totalSec / 86400);
    const hours   = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    this._set('days',    days);
    this._set('hours',   hours);
    this._set('minutes', minutes);
    this._set('seconds', seconds);
  }

  _set(unit, value) {
    const el = this.querySelector(`[data-unit="${unit}"]`);
    if (el) el.textContent = String(value).padStart(2, '0');
  }

  _showEnded() {
    if (this._clock) this._clock.setAttribute('aria-hidden', 'true');
    if (this._clock) this._clock.style.display = 'none';
    if (this._ended) {
      this._ended.classList.remove('visually-hidden');
      this._ended.removeAttribute('hidden');
    }
    this.setAttribute('aria-live', 'polite');
  }
}

customElements.define('countdown-banner', CountdownBanner);

document.querySelectorAll('.countdown-banner[data-end]').forEach(el => {
  if (!customElements.get('countdown-banner')) return;
  if (el.tagName.toLowerCase() !== 'countdown-banner') {
    const end   = el.dataset.end;
    const tz    = el.dataset.timezone || 'UTC';
    const endMs = parseCountdownEnd(end, tz);
    if (isNaN(endMs)) return;

    const clock  = el.querySelector('.countdown-banner__clock');
    const ended  = el.querySelector('[data-ended-message]');

    function set(unit, val) {
      const node = el.querySelector(`[data-unit="${unit}"]`);
      if (node) node.textContent = String(val).padStart(2, '0');
    }

    function tick() {
      const rem = endMs - Date.now();
      if (rem <= 0) {
        clearInterval(timer);
        if (clock) clock.style.display = 'none';
        if (ended) ended.classList.remove('visually-hidden');
        return;
      }
      const s = Math.floor(rem / 1000);
      set('days',    Math.floor(s / 86400));
      set('hours',   Math.floor((s % 86400) / 3600));
      set('minutes', Math.floor((s % 3600) / 60));
      set('seconds', s % 60);
    }

    tick();
    const timer = setInterval(tick, 1000);
  }
});

function parseCountdownEnd(iso, tz) {
  if (!iso) return NaN;
  try {
    if (tz === 'UTC' || !tz) return new Date(iso.replace(' ', 'T') + (iso.includes('Z') ? '' : 'Z')).getTime();
    const dt = new Date(new Date(iso).toLocaleString('en-US', { timeZone: tz }));
    const offset = new Date(iso) - dt;
    return new Date(iso).getTime() + offset;
  } catch {
    return new Date(iso).getTime();
  }
}
