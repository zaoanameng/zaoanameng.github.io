/* ==========================================================
   WELCOME TO MY UNIVERSE — 主逻辑
   两个角落：日记 / 相册。标题保留英文，其余中文。
   ========================================================== */
(function () {
  "use strict";

  /* ---------------- 1. 线稿图标 ---------------- */
  const SW = 'stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';
  const I = {
    diary: '<svg viewBox="0 0 24 24" fill="none" ' + SW + '><rect x="5" y="3.4" width="14" height="17.2"/><path d="M9 3.4v17.2M12.2 9h4M12.2 13h4"/></svg>',
    photo: '<svg viewBox="0 0 24 24" fill="none" ' + SW + '><rect x="3" y="6.2" width="18" height="14"/><circle cx="12" cy="13.2" r="3.7"/><path d="M9 6.2l1.5-2.4h3L15 6.2"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" ' + SW + '><circle cx="12" cy="8.4" r="3.9"/><path d="M4.4 20.2c0-3.7 3.4-5.9 7.6-5.9s7.6 2.2 7.6 5.9"/></svg>',
    guest: '<svg viewBox="0 0 24 24" fill="none" ' + SW + '><path d="M3.8 5.8h16.4v10.9H13l-4.9 3.9v-3.9H3.8z"/><path d="M7.8 10.6h8.4"/></svg>',
    lock: '<svg viewBox="0 0 16 16" fill="none"><rect x="3.2" y="7" width="9.6" height="6.8" stroke="currentColor" stroke-width="1.4"/><path d="M5.4 7V5.1a2.6 2.6 0 0 1 5.2 0V7" stroke="currentColor" stroke-width="1.4"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    weibo: '<svg viewBox="0 0 16 16" fill="none"><path d="M2.9 3.7h10.2v6.4H7.6L4.4 12.6V10H2.9z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><circle cx="6.1" cy="6.9" r="1.3" stroke="currentColor" stroke-width="1.1"/></svg>',
    xhs: '<svg viewBox="0 0 16 16" fill="none"><path d="M4.7 3.2h6.6v9.6L8 10.7l-3.3 2.1z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 16 16" fill="none"><rect x="2.4" y="4.1" width="11.2" height="7.9" rx="1.3" stroke="currentColor" stroke-width="1.25"/><path d="M2.9 4.9 8 8.9l5.1-4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
    douyin: '<svg viewBox="0 0 16 16" fill="none"><path d="M9.8 3v6.6a2.4 2.4 0 1 1-2.4-2.4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path d="M9.8 3.2c.3 1.6 1.3 2.5 2.9 2.6" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
    pin: '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.8s4.3-4.2 4.3-6.7A4.3 4.3 0 0 0 3.7 7.1c0 2.5 4.3 6.7 4.3 6.7Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><circle cx="8" cy="7" r="1.55" stroke="currentColor" stroke-width="1.15"/></svg>',
    dog: '<svg viewBox="0 0 120 120" fill="none"><g stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M34 42c-9.5 4.5-13.5 17-11 28 1.4 6.6 8.6 8 11.4 1.6 2.8-8 4-17 8-22" fill="#fff"/><path d="M86 42c9.5 4.5 13.5 17 11 28-1.4 6.6-8.6 8-11.4 1.6-2.8-8-4-17-8-22" fill="#fff"/><path d="M60 26A11.2 11.2 0 0 1 78 30.8A11.2 11.2 0 0 1 91.2 44A11.2 11.2 0 0 1 96 62A11.2 11.2 0 0 1 91.2 80A11.2 11.2 0 0 1 78 93.2A11.2 11.2 0 0 1 60 98A11.2 11.2 0 0 1 42 93.2A11.2 11.2 0 0 1 28.8 80A11.2 11.2 0 0 1 24 62A11.2 11.2 0 0 1 28.8 44A11.2 11.2 0 0 1 42 30.8A11.2 11.2 0 0 1 60 26Z" fill="#fff"/><ellipse cx="60" cy="78" rx="16" ry="12" fill="#fff"/><path d="M60 76v4"/><path d="M60 80c-3 3.4-8 2.6-9-1"/><path d="M60 80c3 3.4 8 2.6 9-1"/></g><ellipse cx="60" cy="71" rx="5" ry="3.6" fill="currentColor"/><circle cx="47" cy="61" r="3.1" fill="currentColor"/><circle cx="73" cy="61" r="3.1" fill="currentColor"/></svg>'
  };

  /* ---------------- 2. 页面结构 ---------------- */
  const MODULES = [
    { key: "diary", num: "01", name: "Journal", caption: "写给自己的话", unit: "entries", sub: "The little thoughts through zaoanameng's words", icon: I.diary },
    { key: "photo", num: "02", name: "Gallery", caption: "光和时间", unit: "photos", sub: "The little world through zaoanameng's lens", icon: I.photo }
  ];
  const PAGES = MODULES.concat([
    { key: "about", num: "—", name: "about", caption: "这是谁", unit: "", sub: "", icon: I.about },
    { key: "guest", num: "—", name: "guestbook", caption: "留句话", unit: "", sub: "Nonsense left for Meng", icon: I.guest }
  ]);
  const MODMAP = {};
  PAGES.forEach((m) => (MODMAP[m.key] = m));

  /* 目录页的大号手绘小图标 */
  const CAT_ART = {
    diary:
      '<svg viewBox="10.5 10.5 43 45" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="2.7" ' +
      'stroke-linejoin="round" stroke-linecap="round" filter="url(#rough-soft)">' +
      '<path d="M13.5 15.4c0-1.5 1.15-2.6 2.6-2.6h31.8c1.45 0 2.6 1.1 2.6 2.6v34.6c0 1.5-1.15 2.6-2.6 2.6H16.1c-1.45 0-2.6-1.1-2.6-2.6z" fill="#fff"/>' +
      '<path d="M22.6 12.8v39.8"/>' +
      '<path d="M29.6 26.2h13M29.6 33.6h13M29.6 41h8.2"/>' +
      '<path d="M36.6 12.8v11.6l3-2.4 3 2.4V12.8" fill="#fff"/>' +
      "</g></svg>",
    photo:
      '<svg viewBox="7 11 50 41" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="2.7" ' +
      'stroke-linejoin="round" stroke-linecap="round" filter="url(#rough-soft)">' +
      '<rect x="9.6" y="19.4" width="44.8" height="29.6" rx="5.6" fill="#fff"/>' +
      '<path d="M21.9 19.4l3-5.6h14.2l3 5.6"/>' +
      '<circle cx="32" cy="34.4" r="8.8" fill="#fff"/>' +
      '<circle cx="32" cy="34.4" r="3.5" fill="currentColor" stroke="none"/>' +
      '<circle cx="45.6" cy="26.4" r="1.9" fill="currentColor" stroke="none"/>' +
      "</g></svg>"
  };

  /* 手账内页的共用零件：抖动手绘边框 + 中缝 + 三个活页环 */
  const NB_CHROME =
    '<span class="ink-frame a" aria-hidden="true"></span>' +
    '<span class="ink-frame b" aria-hidden="true"></span>' +
    '<div class="spine-col" aria-hidden="true"><svg class="spine" viewBox="0 0 24 800" preserveAspectRatio="none"><path class="sp-1" d="M12.20 6C12.22 39.3 10.40 72.6 11.19 104C9.70 137.3 12.38 170.6 12.77 202C13.03 235.3 11.31 268.6 12.60 300C13.48 333.3 11.34 366.6 12.14 398C11.34 431.3 9.98 464.6 11.35 496C12.84 529.3 13.80 562.6 13.08 594C14.21 627.3 13.47 660.6 13.12 692C11.72 726.7 11.73 761.4 12.24 794"/><path class="sp-2" d="M11.00 6C10.22 39.3 11.95 72.6 11.66 104C11.66 137.3 11.39 170.6 10.62 202C9.58 235.3 11.44 268.6 10.43 300C9.71 333.3 12.40 366.6 11.71 398C11.73 431.3 10.89 464.6 10.15 496C9.45 529.3 10.56 562.6 10.95 594C10.04 627.3 11.74 660.6 11.13 692C11.20 726.7 10.59 761.4 11.24 794"/></svg><span class="rings"><svg viewBox="0 0 84 40"><path d="M12 23.5C6.5 19 9.5 9.5 18.5 9.5C27.5 9.5 33.5 17 41.5 18C49.5 19 56 10 65 9.8C74 9.6 77 19 71.5 23.6C66 28.2 55.5 21 45.5 20.5C35.5 20 20 27 12 23.5Z"/></svg><svg viewBox="0 0 84 40"><path d="M13 24.6C7 20.4 9 10.2 18.2 10C27.4 9.8 32.6 16.4 41 17.4C49.4 18.4 56.6 11.4 65 11C73.4 10.6 76.6 19.8 70.8 24C65 28.2 55 21.6 45 21.2C35 20.8 19.4 28.8 13 24.6Z"/></svg><svg viewBox="0 0 84 40"><path d="M11.5 22.8C6.2 18.2 10 9 19 9.2C28 9.4 34.2 16.8 42 17.8C49.8 18.8 55.4 9.8 64.4 10.4C73.4 11 76.4 20.2 70.6 24.2C64.8 28.2 54.8 20.6 44.8 20.4C34.8 20.2 19.6 28.2 11.5 22.8Z"/></svg></span></div>';

  const DOODLE_FLOWER = '<svg class="doodle-flower" viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke="#D9553F" stroke-width="1.6" stroke-linecap="round"><circle cx="20" cy="12" r="5"/><circle cx="27.6" cy="17.5" r="5"/><circle cx="24.7" cy="26.4" r="5"/><circle cx="15.3" cy="26.4" r="5"/><circle cx="12.4" cy="17.5" r="5"/><circle cx="20" cy="20.4" r="3"/></g></svg>';

  /* ---------------- 3. 小工具 ---------------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function safeUrl(u) {
    if (!u) return "";
    try {
      const x = new URL(String(u).trim(), location.href);
      return /^https?:$/.test(x.protocol) ? x.href : "";
    } catch (_) { return ""; }
  }
  const pad = (n) => String(n).padStart(2, "0");

  function fmtDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.getFullYear() + "." + pad(d.getMonth() + 1) + "." + pad(d.getDate());
  }
  /* journal 用：年 / 月 / 日 / 时:分 */
  function fmtFull(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " +
      pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function fmtAgo(iso) {
    const d = new Date(iso), diff = (Date.now() - d.getTime()) / 1000;
    if (isNaN(diff)) return "";
    if (diff < 60) return "just now";
    if (diff < 3600) return Math.floor(diff / 60) + " min ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " h ago";
    if (diff < 86400 * 7) return Math.floor(diff / 86400) + " d ago";
    return fmtDate(iso);
  }

  /* ---------------- 3.5 访客记录（只有主人能看） ---------------- */
  const VID_KEY = "mh_vid";

  /* 匿名访客 id：存在本地，用来算 UV（同一个浏览器 = 一个人） */
  function visitorId() {
    try {
      let v = localStorage.getItem(VID_KEY);
      if (!v) {
        v = "v" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(VID_KEY, v);
      }
      return v;
    } catch (_) {
      return "anon";
    }
  }

  function pagePath() {
    const h = (location.hash || "").replace(/^#\/?/, "").trim();
    return h || "cover";
  }

  /* 从 UA 里读设备 / 浏览器 / 系统（不精确但够用，且不需要第三方接口） */
  function uaInfo() {
    const ua = navigator.userAgent || "";
    let device = "desktop";
    if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) device = "tablet";
    else if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) device = "mobile";

    let browser = "other";
    if (/MicroMessenger/i.test(ua)) browser = "WeChat";
    else if (/XHS|xiaohongshu/i.test(ua)) browser = "小红书";
    else if (/Edg\//i.test(ua)) browser = "Edge";
    else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
    else if (/Firefox\//i.test(ua)) browser = "Firefox";
    else if (/Chrome\//i.test(ua) || /CriOS/i.test(ua)) browser = "Chrome";
    else if (/Safari\//i.test(ua)) browser = "Safari";

    let os = "other";
    if (/Windows/i.test(ua)) os = "Windows";
    else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
    else if (/Android/i.test(ua)) os = "Android";
    else if (/Mac OS X/i.test(ua)) os = "macOS";
    else if (/Linux/i.test(ua)) os = "Linux";

    return { device, browser, os };
  }

  /* 时区 → 大致地区（只在 IP 接口拿不到时兜底）。
     注意：国内设备几乎全部报 Asia/Shanghai，光靠时区只能得到「上海」。 */
  const TZ_REGION = {
    "Asia/Shanghai": "中国 · 上海",
    "Asia/Chongqing": "中国 · 重庆",
    "Asia/Urumqi": "中国 · 乌鲁木齐",
    "Asia/Hong_Kong": "中国香港",
    "Asia/Macau": "中国澳门",
    "Asia/Taipei": "中国台湾",
    "Asia/Tokyo": "日本",
    "Asia/Seoul": "韩国",
    "Asia/Singapore": "新加坡",
    "Asia/Kuala_Lumpur": "马来西亚",
    "Asia/Bangkok": "泰国",
    "Asia/Jakarta": "印度尼西亚",
    "Asia/Manila": "菲律宾",
    "Asia/Kolkata": "印度",
    "Asia/Dubai": "阿联酋",
    "Europe/London": "英国",
    "Europe/Paris": "法国",
    "Europe/Berlin": "德国",
    "Europe/Madrid": "西班牙",
    "Europe/Rome": "意大利",
    "Europe/Amsterdam": "荷兰",
    "Europe/Moscow": "俄罗斯",
    "America/New_York": "美国 · 东部",
    "America/Chicago": "美国 · 中部",
    "America/Denver": "美国 · 山地",
    "America/Los_Angeles": "美国 · 西部",
    "America/Toronto": "加拿大",
    "America/Vancouver": "加拿大",
    "Australia/Sydney": "澳大利亚",
    "Australia/Melbourne": "澳大利亚",
    "Pacific/Auckland": "新西兰"
  };
  function regionOf(tz) {
    if (!tz) return "未知";
    if (TZ_REGION[tz]) return TZ_REGION[tz];
    if (/^(UTC|Etc\/UTC|Etc\/GMT)$/.test(tz)) return "未知";
    const parts = tz.split("/");
    const city = (parts[1] || parts[0]).replace(/_/g, " ");
    return city;
  }

  /* -------- 真实归属地：查一次 IP 接口，精确到省 / 市 -------- */
  const GEO_KEY = "mh_geo";
  function readGeo() {
    try {
      const o = JSON.parse(localStorage.getItem(GEO_KEY) || "null");
      if (o && o.v && Date.now() - o.t < 12 * 3600 * 1000) return o.v;
    } catch (_) {}
    return "";
  }
  function writeGeo(v) {
    try { localStorage.setItem(GEO_KEY, JSON.stringify({ t: Date.now(), v: v })); } catch (_) {}
  }

  function joinRegion(country, prov, city) {
    const c = String(country || "").trim();
    const p = String(prov || "").trim();
    const t = String(city || "").trim();
    if (/^(中国|china|cn|中华人民共和国)$/i.test(c)) {
      if (!p) return t ? "中国 · " + t : "中国";
      if (!t || t === p) return "中国 · " + p;
      return "中国 · " + p + " " + t;
    }
    return [c, p, t].filter(Boolean).join(" ") || "";
  }

  /* 依次尝试，谁先给出结果用谁 */
  const GEO_APIS = [
    {
      /* 国内手机网络识别最准，能分到地级市 */
      url: "https://myip.ipip.net/json",
      pick: (j) => {
        const L = (j && j.data && j.data.location) || [];
        return joinRegion(L[0], L[1], L[2]);
      }
    },
    {
      /* 备用：国外访客更常命中 */
      url: "https://api.ipapi.is/",
      pick: (j) => (j && !j.error ? joinRegion(j.country, j.region, j.city) : "")
    }
  ];

  function fetchJSON(url, ms) {
    return new Promise((resolve, reject) => {
      let done = false;
      const timer = setTimeout(() => { if (!done) { done = true; reject(new Error("timeout")); } }, ms);
      fetch(url, { mode: "cors", credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store" })
        .then((r) => r.json())
        .then((j) => { if (!done) { done = true; clearTimeout(timer); resolve(j); } })
        .catch((e) => { if (!done) { done = true; clearTimeout(timer); reject(e); } });
    });
  }

  /* force=true：无视本地缓存，重新问一次（主人换城市时用） */
  async function ipRegion(force) {
    if (!force) {
      const c = readGeo();
      if (c) return c;
    }
    for (let i = 0; i < GEO_APIS.length; i++) {
      try {
        const j = await fetchJSON(GEO_APIS[i].url, 1500);
        const v = GEO_APIS[i].pick(j);
        if (v) { writeGeo(v); return v; }
      } catch (_) {}
    }
    return "";
  }

  /* -------- about 页的位置：自动跟着主人所在的城市走 -------- */
  /* 主人用自己的账号打开站点时，悄悄把当前城市写进资料；
     访客看到的就是主人最近一次所在的城市，不需要手填。 */
  let placeSyncing = false;
  function paintPlace(v) {
    const short = String(v || "").replace(/^中国\s*·\s*/, "");
    $$("[data-place]").forEach((el) => { el.textContent = short; });
  }
  async function syncOwnerPlace() {
    if (!S.isOwner || placeSyncing) return;
    placeSyncing = true;
    try {
      const v = await ipRegion(true);
      if (!v) return;
      const links = Object.assign({}, S.profile.links || {});
      if (links.place === v) return;
      links.place = v;
      await API.owner.save({ links: links, updated_at: new Date().toISOString() });
      S.profile.links = links;
      cacheProfile(S.profile);
      paintPlace(v);
    } catch (_) {
      /* 定位失败就沿用上一次的，不影响页面 */
    } finally {
      placeSyncing = false;
    }
  }

  /* 来源分类：直接输入 / 搜索引擎 / 社交平台 / 其他外链 / 站内跳转 */
  const SEARCH_HOSTS = ["google.", "bing.com", "baidu.com", "sogou.com", "so.com", "sm.cn",
    "yahoo.", "duckduckgo.com", "yandex.", "naver.com", "ecosia.org", "brave.com",
    "startpage.com", "qwant.com", "search."];
  const SOCIAL_HOSTS = ["weibo.com", "weibo.cn", "xiaohongshu.com", "xhslink.cn", "douyin.com",
    "iesdouyin.com", "weixin.qq.com", "instagram.com", "threads.net", "twitter.com",
    "x.com", "facebook.com", "reddit.com", "zhihu.com", "bilibili.com", "tiktok.com",
    "pinterest.", "wechat.com"];
  function refKind(ref) {
    if (!ref) return "direct";
    try {
      const h = new URL(ref).hostname;
      if (h === location.hostname) return "internal";
      if (SEARCH_HOSTS.some((s) => h.indexOf(s) !== -1)) return "search";
      if (SOCIAL_HOSTS.some((s) => h.indexOf(s) !== -1)) return "social";
      return "external";
    } catch (_) {
      return "direct";
    }
  }

  /* 记一次访问（主人自己的浏览不计入，免得数据被自己刷） */
  async function trackView() {
    if (S.isOwner) return;
    const cfg = window.WB_CONFIG || {};
    if (!cfg.endpoint || !cfg.publishableKey) return;

    let zone = "";
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (_) {}
    /* 优先用 IP 归属地（能到省 / 市），拿不到再退回时区 */
    let region = "";
    try { region = await ipRegion(); } catch (_) {}
    if (!region) region = regionOf(zone);

    const info = uaInfo();
    const payload = {
      vid: visitorId(),
      path: pagePath().slice(0, 120),
      ref: (document.referrer || "").slice(0, 400) || null,
      ref_type: refKind(document.referrer),
      region: region,
      tz: zone || null,
      lang: (navigator.language || "").slice(0, 20) || null,
      device: info.device,
      browser: info.browser,
      os: info.os,
      screen: window.innerWidth + "×" + window.innerHeight
    };

    /* 直接写 REST、不要返回行 —— 访客没有读权限，带 representation 会被拒 */
    try {
      fetch(cfg.endpoint + "/.cloud/database/rest/pageviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-wb-webapp-access-key": cfg.publishableKey },
        body: JSON.stringify(payload),
        keepalive: true,
        mode: "cors"
      }).catch(function () {});
    } catch (_) { /* 记录失败不影响浏览 */ }
  }

  let toastTimer = null;
  function toast(msg, kind) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.className = "show" + (kind === "err" ? " err" : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.className = ""), 2600);
  }
  function loadingHTML(text) {
    return '<div class="loading"><span class="dot"></span><span class="dot"></span><span class="dot"></span> ' + esc(text || "翻页中") + "</div>";
  }
  /* 提醒用户该点某个按钮：轻轻晃一下 */
  function headShake(el) {
    if (!el) return;
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
    setTimeout(() => { try { el.classList.remove("shake"); } catch (_) {} }, 600);
  }

  /* ---------------- 4. 弹窗 / 大图 ---------------- */
  const modalRoot = $("#modal-root");

  function openModal(html, opts) {
    const o = opts || {};
    modalRoot.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' +
      '<button class="modal-close" id="mClose" type="button" aria-label="关闭">' + I.close + "</button>" + html + "</div>";
    modalRoot.classList.add("show");
    $("#mClose").onclick = closeModal;
    modalRoot.onclick = (e) => { if (e.target === modalRoot && !o.sticky) closeModal(); };
    document.body.style.overflow = "hidden";
    return modalRoot.firstElementChild;
  }
  function closeModal() {
    modalRoot.classList.remove("show");
    modalRoot.innerHTML = "";
    document.body.style.overflow = "";
  }
  function openLightbox(src, isVideo, caption) {
    const lb = $("#lightbox");
    lb.innerHTML = isVideo
      ? '<video src="' + esc(src) + '" controls autoplay playsinline></video>'
      : '<img src="' + esc(src) + '" alt="' + esc(caption || "") + '">';
    lb.classList.add("show");
    lb.onclick = () => { lb.classList.remove("show"); lb.innerHTML = ""; };
  }

  /* ---------------- 5. 状态 ---------------- */
  const SITE_TAGLINE = "A quiet heaven for my memories, ramblings and tiny thoughts.";
  const DEFAULT_PLACE = "China·Henan";

  const S = {
    view: "cover",
    mod: null,
    session: null,
    isOwner: false,
    ownerRow: null,
    profile: Object.assign({}, window.SITE_DEFAULTS),
    counts: {},
    data: {}
  };

  /* ---------------- 6. 身份 ---------------- */
  function authHTML() {
    if (S.session) {
      return '<span class="who">' + (S.isOwner ? "owner" : "visitor") + "</span>" +
        (S.isOwner ? '<button class="mini js-editprofile" type="button">edit profile</button>' : "") +
        (S.isOwner ? '<a class="mini" href="#/stats">visitor log</a>' : "") +
        '<button class="mini js-logout" type="button">log out</button>';
    }
    return '<button class="mini js-login" type="button">log in</button>';
  }
  function updateAuthSlots() {
    const html = authHTML();
    ["#authSlot", "#contentsAuth", "#statsAuth"].forEach((sel) => {
      const el = $(sel);
      if (el) el.innerHTML = html;
    });
    $$(".js-login").forEach((b) => (b.onclick = openLogin));
    $$(".js-logout").forEach((b) => (b.onclick = doLogout));
    $$(".js-editprofile").forEach((b) => (b.onclick = openProfileForm));
  }

  function openLogin() {
    openModal(
      "<h3>Owner log in</h3>" +
      '<p class="hint" style="margin:-12px 0 22px">Only the owner can add or change things. Visitors don\'t need an account.</p>' +
      '<div class="field" style="margin-bottom:18px"><label>Email</label>' +
      '<input class="input" id="loginEmail" type="email" placeholder="you@example.com" autocomplete="email"></div>' +
      '<div class="field"><label>Code</label><div style="display:flex;gap:14px;align-items:flex-end">' +
      '<input class="input" id="loginCode" inputmode="numeric" placeholder="6 digits">' +
      '<button class="btn sm" id="sendCode" type="button" style="flex:none">send code</button></div></div>' +
      '<p class="hint" style="margin:10px 0 0" id="loginTip">Tap “send code” first — we\'ll email you a 6-digit code. No password needed.</p>' +
      '<div class="modal-foot"><button class="btn primary" id="emailLogin" type="button" disabled title="Tap “send code” first">log in</button></div>' +
      '<p class="hint" id="loginMsg" style="margin-top:16px"></p>',
      { sticky: true }
    );

    /* 验证码的“发送凭证”存进 sessionStorage：关掉弹窗、刷新页面都还在，
       免得用户手里有码、却因为 pending 丢了被拦成“请先申请验证码” */
    const OTP_KEY = "mh_otp";
    const OTP_TTL = 8 * 60 * 1000; /* 验证码本身 5 分钟有效，留点余量 */
    const loadPending = () => {
      try {
        const o = JSON.parse(sessionStorage.getItem(OTP_KEY) || "null");
        if (!o || !o.verificationId || !o.email) return null;
        if (Date.now() - (o.ts || 0) > OTP_TTL) return null;
        return o;
      } catch (_) { return null; }
    };
    const savePending = (p) => { try { sessionStorage.setItem(OTP_KEY, JSON.stringify(p)); } catch (_) {} };
    const dropPending = () => { try { sessionStorage.removeItem(OTP_KEY); } catch (_) {} };

    const msg = (t, err) => {
      const el = $("#loginMsg");
      if (!el) return;
      el.textContent = t || "";
      el.style.color = err ? "var(--red)" : "var(--ink-3)";
    };

    let pending = loadPending();
    const emailEl = $("#loginEmail");
    const codeEl = $("#loginCode");
    const sendBtn = $("#sendCode");
    const loginBtn = $("#emailLogin");

    /* 记住上次用过的邮箱，省得每次重打 */
    try {
      const last = localStorage.getItem("mh_email");
      if (last) emailEl.value = last;
    } catch (_) {}

    const setReady = (on) => {
      loginBtn.disabled = !on;
      loginBtn.title = on ? "" : "Tap “send code” first";
    };

    if (pending) {
      if (!emailEl.value) emailEl.value = pending.email;
      $("#loginTip").textContent = "Code already sent to " + pending.email + " — enter it below, or send a new one.";
      setReady(true);
    } else {
      setReady(false);
    }

    sendBtn.onclick = async (e) => {
      const email = emailEl.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return msg("Enter a valid email first.", true);
      e.target.disabled = true;
      e.target.textContent = "sending…";
      try {
        API.auth.resetLocal();   /* 清掉可能过期的旧会话，避免网关把它当成“别人的凭证” */
        pending = Object.assign({ email }, await API.auth.sendEmailCode(email), { ts: Date.now() });
        savePending(pending);
        try { localStorage.setItem("mh_email", email); } catch (_) {}
        msg("Code sent to " + email + " — check your inbox (and the spam folder).");
        $("#loginTip").textContent = "Code sent — it's valid for 5 minutes.";
        setReady(true);
        try { codeEl.focus(); } catch (_) {}
        let n = 60;
        const t = setInterval(() => {
          n -= 1;
          if (n <= 0) { clearInterval(t); e.target.disabled = false; e.target.textContent = "resend"; }
          else e.target.textContent = n + "s";
        }, 1000);
      } catch (err) {
        e.target.disabled = false;
        e.target.textContent = "send code";
        dropPending();
        setReady(false);
        msg("Couldn't send: " + (err.message || err), true);
      }
    };

    /* 输入验证码时按回车直接登录 */
    codeEl.onkeydown = (e) => { if (e.key === "Enter" && !loginBtn.disabled) loginBtn.click(); };
    emailEl.oninput = () => { if (pending) setReady(pending.email === emailEl.value.trim()); };

    loginBtn.onclick = async (e) => {
      const email = emailEl.value.trim();
      const code = codeEl.value.trim();
      if (!pending || pending.email !== email) {
        headShake(sendBtn);
        return msg("Tap “send code” first — we'll email you a 6-digit code.", true);
      }
      if (!code) { try { codeEl.focus(); } catch (_) {} return msg("Enter the code you received.", true); }
      e.target.disabled = true;
      const attempt = async () => {
        API.auth.resetLocal();
        await API.auth.verifyEmailCode(email, pending, code);
      };
      try {
        try {
          await attempt();
        } catch (err) {
          const t = String((err && (err.message || err.code)) || "");
          /* 少数情况下网关仍会拿着旧凭证拦一次，清干净再试一遍就能过 */
          if (!/session is invalid|another client|invalid_grant/i.test(t)) throw err;
          await new Promise((r) => setTimeout(r, 350));
          await attempt();
        }
        dropPending();
        closeModal();
        await onSignedIn();
      } catch (err) {
        e.target.disabled = false;
        const t = String((err && (err.message || err.code)) || "");
        /* 码过期 / 用过了：清掉旧凭证，提示重新发一个，而不是让人对着错码反复点 */
        if (/expired|invalid.*code|code.*invalid|incorrect|not.?found/i.test(t)) {
          dropPending();
          setReady(false);
          sendBtn.textContent = "send code";
          sendBtn.disabled = false;
          headShake(sendBtn);
          return msg("That code didn't work or has expired — tap “send code” for a new one.", true);
        }
        msg("Log in failed: " + (err.message || err), true);
      }
    };
  }

  async function doLogout() {
    await API.auth.signOut();
    S.session = null;
    S.isOwner = false;
    toast("logged out");
    renderCurrent();
  }
  async function onSignedIn() {
    await resolveIdentity();
    toast(S.isOwner ? "welcome back" : "logged in");
    renderCurrent();
    syncOwnerPlace();
  }

  /* 资料本地缓存：先画出来，再悄悄用云端的覆盖，避免先闪一下默认名字 */
  const PROF_KEY = "mh_profile";
  function cachedProfile() {
    try {
      const o = JSON.parse(localStorage.getItem(PROF_KEY) || "null");
      if (!o || typeof o !== "object") return null;
      const p = Object.assign({}, window.SITE_DEFAULTS, o);
      p.links = Object.assign({}, window.SITE_DEFAULTS.links, o.links || {});
      return p;
    } catch (_) { return null; }
  }
  function cacheProfile(p) {
    try { localStorage.setItem(PROF_KEY, JSON.stringify(p)); } catch (_) {}
  }

  async function resolveIdentity() {
    S.session = await API.auth.session();
    S.ownerRow = null;
    S.isOwner = false;

    /* 资料是公开的：没登录也要读一次。
       以前没登录就直接用默认值，于是封面永远显示「早安a孟」和自带头像。 */
    let row = null;
    try { row = await API.owner.get(); } catch (_) {}
    if (S.session && !row) {
      try { row = await API.owner.claim(S.session.user.id, (S.session.user && S.session.user.name) || null); }
      catch (_) { try { row = await API.owner.get(); } catch (__) {} }
    }
    S.ownerRow = row;
    S.isOwner = !!(row && S.session && row.uid === S.session.user.id);

    const p = Object.assign({}, window.SITE_DEFAULTS);
    if (row) {
      if (row.name) p.name = row.name;
      if (row.tagline) p.tagline = row.tagline;
      if (row.about) p.about = row.about;
      if (row.avatar) p.avatar = row.avatar;
      let links = {};
      if (row.links) {
        try { links = typeof row.links === "string" ? JSON.parse(row.links) : row.links; } catch (_) {}
      }
      p.links = Object.assign({}, window.SITE_DEFAULTS.links, links || {});
    }
    S.profile = p;
    cacheProfile(p);
  }

  /* ---------------- 7. 路由 ---------------- */
  function showView(name) {
    $$(".view").forEach((v) => v.classList.remove("active"));
    const el = $("#view-" + name);
    if (el) el.classList.add("active");
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function navHash(view, mod) {
    return view === "module" ? "#/" + mod : "#/" + view;
  }

  /* --- 返回上一页：记录站内浏览轨迹，back-link 优先走 history.back() --- */
  const HIST = [];
  function labelOfHash(h) {
    h = (h || "").replace(/^#\/?/, "").trim();
    if (!h || h === "cover") return "cover";
    if (h === "contents" || h === "home") return "catalog";
    const m = MODMAP[h];
    return m ? m.name.toLowerCase() : "cover";
  }
  function go(view, mod, replace) {
    const h = navHash(view, mod);
    if (location.hash !== h) {
      if (replace) history.replaceState({ view, mod }, "", h);
      else { HIST.push(location.hash || "#/cover"); history.pushState({ view, mod }, "", h); }
    }
    render(view, mod);
    trackView();
  }
  function parseHash() {
    const h = (location.hash || "").replace(/^#\/?/, "").trim();
    if (!h || h === "cover") return { view: "cover" };
    if (h === "contents" || h === "home") return { view: "contents" };
    if (h === "stats") return { view: "stats" };
    if (MODMAP[h]) return { view: "module", mod: h };
    return { view: "cover" };
  }
  function render(view, mod) {
    S.view = view;
    S.mod = mod || null;
    if (view === "contents") { showView("contents"); renderContents(); updateAuthSlots(); }
    else if (view === "module") { showView("module"); renderModule(mod); updateAuthSlots(); }
    else if (view === "stats") { showView("stats"); renderStats(); updateAuthSlots(); }
    else { showView("cover"); renderCover(); }
    /* 返回链接：有轨迹就指向上一个页面，没有就用各自的兜底地址 */
    $$(".back-link").forEach((a) => {
      const fallback = a.getAttribute("href");
      a.textContent = "← " + labelOfHash(HIST.length ? HIST[HIST.length - 1] : fallback);
    });
  }
  function renderCurrent() { render(S.view, S.mod); }

  window.addEventListener("popstate", (e) => {
    if (HIST.length) HIST.pop();
    const st = e.state || parseHash();
    render(st.view || "cover", st.mod);
    trackView();
  });

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    /* 返回链接：站内有点过页面就退回真正的上一页 */
    if (a.classList.contains("back-link") && HIST.length) {
      e.preventDefault();
      history.back();
      return;
    }
    e.preventDefault();
    const h = a.getAttribute("href").replace(/^#\/?/, "");
    if (h === "contents" || h === "home") go("contents");
    else if (h === "stats") go("stats");
    else if (MODMAP[h]) go("module", h);
    else go("cover");
  });

  /* ---------------- 8. 封面 ---------------- */
  function renderCover() {
    const n = $("#mhName");
    if (n) n.textContent = S.profile.name || "";
    const av = $("#coverAva");
    if (av) av.src = avatarSrc();
  }

  /* 头像：优先主人上传的，其次用自带的插画 */
  const DEFAULT_AVATAR = "assets/avatar.png";
  function avatarSrc() {
    const a = S.profile.avatar;
    if (!a) return DEFAULT_AVATAR;
    return /^(data:image\/|https?:\/\/|assets\/)/.test(a) ? a : DEFAULT_AVATAR;
  }

  /* ---------------- 9. 目录 ---------------- */
  /* 数量缓存：进目录页先用上次的数字画出来，再去云端悄悄更新，避免“先空着再蹦出来” */
  const COUNTS_KEY = "mh_counts";
  function cachedCounts() {
    try {
      const o = JSON.parse(localStorage.getItem(COUNTS_KEY) || "null");
      if (!o || !o.v || typeof o.v !== "object") return null;
      return o.v;
    } catch (_) { return null; }
  }
  function cacheCounts(v) {
    try { localStorage.setItem(COUNTS_KEY, JSON.stringify({ t: Date.now(), v: v })); } catch (_) {}
  }

  let countsInflight = null;
  function loadCounts() {
    if (countsInflight) return countsInflight;
    countsInflight = loadCountsOnce().then(
      (v) => { countsInflight = null; return v; },
      (e) => { countsInflight = null; throw e; }
    );
    return countsInflight;
  }

  async function loadCountsOnce() {
    const counts = {};
    const jobs = [
      (async () => { counts.photo = await API.items.count("photo"); })(),
      (async () => {
        const r = await window.cloud.database
          .from("posts").select("id").limit(2000);
        if (!r.error) counts.diary = (r.data || []).length;
      })(),
      (async () => { counts.guest = await API.messages.countAll(); })()
    ];
    await Promise.allSettled(jobs);
    S.counts = Object.assign({}, cachedCounts() || {}, counts);
    if (Object.keys(counts).length) cacheCounts(S.counts);
    return S.counts;
  }

  /* 页面空闲时先把数量取回来存好，等真的点进目录就是现成的 */
  function prefetchCounts() {
    const run = () => { loadCounts().catch(() => {}); };
    if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 3000 });
    else setTimeout(run, 1600);
  }

  /* 数量行永远占位：有数字就写数字，没数字先放三个点，不会因为突然多出一行把图标顶开 */
  function paintCounts(list, counts, done) {
    MODULES.forEach((m) => {
      const el = list.querySelector('[data-count="' + m.key + '"]');
      if (!el) return;
      const n = counts && typeof counts[m.key] === "number" ? counts[m.key] : null;
      if (n === null) {
        el.classList.toggle("is-loading", !done);
        el.textContent = done ? "—" : "· · ·";
        return;
      }
      const txt = n > 0 ? n + " " + m.unit : "empty";
      if (el.classList.contains("is-loading")) {
        el.classList.remove("is-loading");
        el.classList.add("is-settled");
        setTimeout(() => el.classList.remove("is-settled"), 520);
      }
      el.textContent = txt;
    });
  }

  async function renderContents() {
    const list = $("#tocList");
    if (!list) return;

    list.innerHTML = MODULES.map((m) =>
      '<li class="cat-item" data-mod="' + m.key + '" role="button" tabindex="0" aria-label="' + esc(m.name) + '">' +
      '<span class="cat-icon">' + (CAT_ART[m.key] || "") + "</span>" +
      '<span class="cat-name">' + esc(m.name) + "</span>" +
      '<span class="cat-count" data-count="' + m.key + '"></span></li>'
    ).join("");

    list.onclick = (e) => {
      const row = e.target.closest("[data-mod]");
      if (row) go("module", row.dataset.mod);
    };
    list.onkeydown = (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const row = e.target.closest("[data-mod]");
      if (row) { e.preventDefault(); go("module", row.dataset.mod); }
    };

    /* 先画缓存（老访客瞬间就有数字），没有再退成三个点 */
    paintCounts(list, cachedCounts(), false);

    const fresh = await loadCounts();
    if (!list.isConnected) return;   /* 中途切走了就别再写 */
    paintCounts(list, fresh, true);
  }

  /* ---------------- 9.5 访客记录（站主专用） ---------------- */
  const PATH_LABEL = {
    cover: "封面", contents: "catalog", diary: "Journal",
    photo: "Gallery", about: "about", guest: "guestbook", stats: "visitor log"
  };
  const REF_LABEL = {
    direct: "直接访问", search: "搜索引擎", social: "社交平台",
    external: "其他外链", internal: "站内跳转"
  };
  const DEV_LABEL = { desktop: "电脑", mobile: "手机", tablet: "平板" };

  function dayKey(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function shortStamp(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return pad(d.getMonth() + 1) + "." + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  async function renderStats() {
    const body = $("#statsBody");
    if (!body) return;

    if (!S.isOwner) {
      body.innerHTML =
        '<div class="stat-lock">' +
          '<p class="stat-lock-t">Only the owner can see this page.</p>' +
          '<p class="stat-lock-s">登录站主账号后，这里会显示访问量、来源、页面路径和访客设备。</p>' +
          (S.session ? "" : '<button class="btn sm js-login" type="button">log in</button>') +
        "</div>";
      return;
    }

    body.innerHTML = loadingHTML("读记录中");

    let rows = [];
    try { rows = await API.stats.list(); }
    catch (err) { body.innerHTML = emptyState("读不到记录", API.errText(err)); return; }

    if (!rows.length) {
      body.innerHTML = emptyState("还没有访客记录", "把链接分享出去，有人打开后这里就会有数据。");
      return;
    }

    /* ---- 汇总 ---- */
    const uvSet = new Set();
    const today = dayKey(new Date());
    const todaySet = new Set();
    let todayPV = 0;
    const byDay = {};
    const byRef = {};
    const byPath = {};
    const byRegion = {};

    rows.forEach((r) => {
      uvSet.add(r.vid);
      const k = dayKey(new Date(r.created_at));
      byDay[k] = (byDay[k] || 0) + 1;
      byRef[r.ref_type || "direct"] = (byRef[r.ref_type || "direct"] || 0) + 1;
      const p = r.path || "cover";
      byPath[p] = (byPath[p] || 0) + 1;
      byRegion[r.region || "未知"] = (byRegion[r.region || "未知"] || 0) + 1;
      if (k === today) { todayPV += 1; todaySet.add(r.vid); }
    });

    const pv = rows.length;
    const uv = uvSet.size;

    /* 近 14 天 */
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = dayKey(d);
      days.push({ k, n: byDay[k] || 0, label: d.getDate() });
    }
    const maxDay = Math.max(1, ...days.map((d) => d.n));

    const bars = days.map((d) =>
      '<div class="bar-col" title="' + d.k + " · " + d.n + ' 次">' +
        '<span class="bar-n">' + (d.n || "") + "</span>" +
        '<span class="bar-i" style="height:' + Math.round((d.n / maxDay) * 100) + '%"></span>' +
        '<span class="bar-d">' + d.label + "</span>" +
      "</div>"
    ).join("");

    const rank = (obj, labels, total) => Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) =>
        '<li><span class="rk-name">' + esc((labels && labels[k]) || k) + "</span>" +
        '<span class="rk-bar"><i style="width:' + Math.round((n / total) * 100) + '%"></i></span>' +
        '<span class="rk-n">' + n + "</span></li>"
      ).join("");

    const detail = rows.slice(0, 60).map((r) =>
      '<div class="vrow">' +
        '<span class="v-time">' + esc(shortStamp(r.created_at)) + "</span>" +
        '<span class="v-where">' + esc(r.region || "未知") + "</span>" +
        '<span class="v-dev">' + esc(DEV_LABEL[r.device] || r.device || "—") +
          (r.browser ? " · " + esc(r.browser) : "") +
          (r.os ? " · " + esc(r.os) : "") + "</span>" +
        '<span class="v-ref">' + esc(REF_LABEL[r.ref_type] || "直接访问") + "</span>" +
        '<span class="v-path">' + esc(PATH_LABEL[r.path] || r.path || "cover") + "</span>" +
      "</div>"
    ).join("");

    body.innerHTML =
      '<div class="stat-grid">' +
        '<div class="stat"><span class="stat-k">PV</span><strong>' + pv + '</strong><span class="stat-n">页面打开总次数</span></div>' +
        '<div class="stat"><span class="stat-k">UV</span><strong>' + uv + '</strong><span class="stat-n">独立访客（按浏览器计）</span></div>' +
        '<div class="stat"><span class="stat-k">today</span><strong>' + todayPV + '</strong><span class="stat-n">今天的 PV / ' + todaySet.size + " 位访客</span></div>" +
        '<div class="stat"><span class="stat-k">pages</span><strong>' + Object.keys(byPath).length + '</strong><span class="stat-n">被看过的页面数</span></div>' +
      "</div>" +

      '<div class="stat-card">' +
        '<div class="stat-head"><h3>最近 14 天</h3><em>last 14 days</em>' +
          '<button class="mini" id="statRefresh" type="button" style="margin-left:auto">refresh</button></div>' +
        '<div class="bars">' + bars + "</div>" +
      "</div>" +

      '<div class="stat-cols">' +
        '<div class="stat-card"><div class="stat-head"><h3>访客来源</h3><em>traffic sources</em></div>' +
          '<ul class="rank">' + rank(byRef, REF_LABEL, pv) + "</ul></div>" +
        '<div class="stat-card"><div class="stat-head"><h3>页面路径</h3><em>pages</em></div>' +
          '<ul class="rank">' + rank(byPath, PATH_LABEL, pv) + "</ul></div>" +
      "</div>" +

      '<div class="stat-card">' +
        '<div class="stat-head"><h3>访客地区</h3><em>regions · 按 IP 归属地</em></div>' +
        '<ul class="rank">' + rank(byRegion, null, pv) + "</ul>" +
      "</div>" +

      '<div class="stat-card">' +
        '<div class="stat-head"><h3>访客明细</h3><em>最近 60 条</em></div>' +
        '<div class="vlist"><div class="vrow vhead"><span class="v-time">时间</span><span class="v-where">地区</span><span class="v-dev">设备 / 浏览器</span><span class="v-ref">来源</span><span class="v-path">页面</span></div>' +
          detail + "</div>" +
      "</div>";

    const btn = $("#statRefresh");
    if (btn) btn.onclick = () => renderStats();
  }

  /* ---------------- 10. 模块外壳 ---------------- */
  async function renderModule(key) {
    const m = MODMAP[key];
    if (!m) return go("contents");

    const head = $("#view-module .mod-head");
    if (head) head.classList.toggle("is-hidden", key === "about");
    $("#modTitle").textContent = m.name;
    $("#modSub").textContent = m.sub;
    const mini = $("#modMini");
    if (mini) mini.textContent = m.name;

    const actions = $("#modActions");
    if (key === "about") {
      actions.innerHTML = S.isOwner ? '<button class="mini" id="editProfile" type="button">编辑资料</button>' : "";
      if ($("#editProfile")) $("#editProfile").onclick = openProfileForm;
    } else if (key === "guest") {
      actions.innerHTML = "";
    } else {
      actions.innerHTML = S.isOwner
        ? '<button class="mini" id="addBtn" type="button">' + (key === "diary" ? "＋ 写一篇" : "＋ 放张照片") + "</button>"
        : "";
      if ($("#addBtn")) $("#addBtn").onclick = () => (key === "diary" ? openPostForm(null) : openPhotoForm(null));
    }

    const body = $("#modBody");
    body.innerHTML = loadingHTML();
    try {
      if (key === "diary") await viewDiary(body);
      else if (key === "photo") await viewPhoto(body);
      else if (key === "about") await viewAbout(body);
      else if (key === "guest") await viewGuest(body);
    } catch (err) {
      body.innerHTML = emptyState("这个角落暂时打不开", API.errText(err));
    }
  }

  function emptyState(text, sub) {
    return '<div class="empty">' + I.dog + "<p>" + esc(text) + "</p>" +
      (sub ? '<p class="sub">' + esc(sub) + "</p>" : "") + "</div>";
  }
  function ownerHint() { return S.isOwner ? "" : " Log in to add one."; }

  /* --- 日记：固定尺寸的卡片 + 单篇阅读页 --- */
  async function viewDiary(body) {
    const rows = await API.posts.list();
    S.data.diary = rows;
    if (!rows.length) {
      body.innerHTML = emptyState("Nothing written yet", "One line counts." + ownerHint());
      return;
    }
    const sorted = rows.slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    body.innerHTML = '<div class="jgrid">' + sorted.map(jCard).join("") + "</div>";
    $$("[data-open]", body).forEach((el) => (el.onclick = () => {
      const p = rows.find((r) => String(r.id) === String(el.dataset.open));
      if (p) openReader(p);
    }));
  }

  function jCard(p) {
    const txt = String(p.content || "").replace(/\s+/g, " ").trim();
    return '<button class="jcard" type="button" data-open="' + p.id + '">' +
      '<span class="jc-top"><em>Faint Line</em><i></i>' +
        (p.pinned ? '<b class="jc-tag">pinned</b>' : "") +
        (!p.is_public ? '<b class="jc-tag is-lock">' + I.lock + "private</b>" : "") +
      "</span>" +
      (p.title ? '<strong class="jc-title">' + esc(p.title) + "</strong>" : "") +
      '<span class="jc-text">' + esc(txt || "…") + "</span>" +
      '<span class="jc-cat" aria-hidden="true"><img src="assets/dog-poodle.jpg" alt=""></span>' +
      '<span class="jc-time">' + esc(fmtFull(p.created_at)) + "</span>" +
      "</button>";
  }

  /* ---------- 单篇阅读页 ---------- */
  const JI = {
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M13.5 5.5l4 4"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11"/><path d="M8 11l4 4 4-4"/><path d="M4.5 19.5h15"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H12l-5 4v-4H4z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L20 4"/><path d="M20 4h-5.5M20 4v5.5"/><path d="M18 14v5H5V6h5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5"/><path d="M6.5 10.5L12 5l5.5 5.5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10" width="15" height="9.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>',
    del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14"/><path d="M9.5 7V4.5h5V7"/><path d="M6.5 7l1 13h9l1-13"/></svg>'
  };

  function shortDay(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
  }

  function readerHTML(p) {
    const acts = [
      ["edit", "编辑", JI.edit],
      ["save", "保存", JI.save],
      ["note", "留言", JI.note],
      ["share", "分享", JI.share],
      ["pin", p.pinned ? "取消置顶" : "置顶", JI.pin],
      ["lock", p.is_public ? "上锁" : "解锁", JI.lock],
      ["del", "删除", JI.del]
    ].filter((a) => S.isOwner || a[0] === "note" || a[0] === "share");

    return '<div class="jr-bar">' +
      '<button class="jr-back" type="button">← back</button>' +
      '<span class="jr-day">' + esc(shortDay(p.created_at)) + "</span>" +
      '<div class="jr-menu"><button class="jr-dots" type="button" aria-label="menu">⋯</button>' +
        '<div class="jr-drop" hidden>' +
          acts.map((a) => '<button class="jr-mi" type="button" data-act="' + a[0] + '"><span>' + a[1] + "</span>" + a[2] + "</button>").join("") +
        "</div>" +
      "</div>" +
    "</div>" +
    '<div class="jr-scroll">' +
      '<article class="jr-sheet">' +
        '<div class="jr-sheet-head"><span class="jr-kicker">Faint Line</span><span class="jr-when">' +
          esc(fmtFull(p.created_at).replace("日 ", "日　")) + "</span></div>" +
        (p.title ? '<h2 class="jr-h">' + esc(p.title) + "</h2>" : "") +
        '<div class="jr-body">' + esc(p.content || "") + "</div>" +
        '<div class="jr-dog" aria-hidden="true"><img src="assets/dog-poodle.jpg" alt=""></div>' +
        '<div class="jr-meta">' +
          (p.mood ? '<span class="jr-mood">' + esc(p.mood) + "</span>" : "") +
          (!p.is_public ? '<span class="jr-pill">' + I.lock + "private</span>" : "") +
          (p.pinned ? '<span class="jr-pill">pinned</span>' : "") +
          (p.source_url ? '<a class="jr-src" href="' + esc(safeUrl(p.source_url)) + '" target="_blank" rel="noopener">source</a>' : "") +
        "</div>" +
      "</article>" +
      '<section class="jr-notes"><h3 class="jr-notes-h">notes</h3>' +
        '<div class="jr-note-list" data-notes>…</div>' +
        '<div class="jr-note-form">' +
          '<input class="input" id="jrName" maxlength="20" placeholder="your name (optional)">' +
          '<textarea class="textarea" id="jrText" maxlength="400" rows="2" placeholder="leave a note"></textarea>' +
          '<button class="btn sm primary" id="jrSend" type="button">send</button>' +
        "</div></section>" +
    "</div>";
  }

  function openReader(post) {
    const host = $("#reader");
    if (!host) return;
    host.innerHTML = '<div class="jread" role="dialog" aria-modal="true">' + readerHTML(post) + "</div>";
    host.classList.add("show");
    document.body.style.overflow = "hidden";

    const close = () => {
      host.classList.remove("show");
      host.innerHTML = "";
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    const onKey = (e) => { if (e.key === "Escape") close(); };

    host.querySelector(".jr-back").onclick = close;
    const drop = host.querySelector(".jr-drop");
    host.querySelector(".jr-dots").onclick = (e) => {
      e.stopPropagation();
      drop.hidden = !drop.hidden;
    };
    host.querySelector(".jread").addEventListener("click", (e) => {
      if (!e.target.closest(".jr-menu")) drop.hidden = true;
    });
    drop.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      drop.hidden = true;
      await readerAction(b.dataset.act, post, close);
    });
    document.addEventListener("keydown", onKey);

    loadNotes(host, post);
  }

  async function readerAction(act, post, close) {
    if (act === "edit") {
      close();
      openPostForm(post);
      return;
    }
    if (act === "save") {
      const body = (post.title ? post.title + "\n\n" : "") + (post.content || "") +
        "\n\n—— " + fmtFull(post.created_at);
      const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "journal-" + fmtDate(post.created_at).replace(/\./g, "") + ".txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      toast("saved as text");
      return;
    }
    if (act === "note") {
      const box = $("#reader .jr-notes");
      if (box) {
        box.scrollIntoView({ behavior: "smooth", block: "center" });
        const t = $("#jrText");
        if (t) setTimeout(() => t.focus({ preventScroll: true }), 400);
      }
      return;
    }
    if (act === "share") {
      const url = location.origin + location.pathname + "#/diary";
      const text = post.content || "";
      try {
        if (navigator.share) {
          await navigator.share({ title: post.title || "journal", text: text.slice(0, 160), url });
          return;
        }
      } catch (_) {}
      try {
        await navigator.clipboard.writeText((post.title ? post.title + "\n" : "") + text + "\n" + url);
        toast("copied to clipboard");
      } catch (_) { toast("copy failed", "err"); }
      return;
    }
    if (act === "pin") {
      try {
        await API.posts.update(post.id, { pinned: !post.pinned });
        toast(post.pinned ? "unpinned" : "pinned to top");
        close();
        renderModule("diary");
      } catch (err) { toast(API.errText(err), "err"); }
      return;
    }
    if (act === "lock") {
      try {
        await API.posts.update(post.id, { is_public: !post.is_public });
        toast(post.is_public ? "locked" : "unlocked");
        close();
        renderModule("diary");
      } catch (err) { toast(API.errText(err), "err"); }
      return;
    }
    if (act === "del") {
      if (!confirm("Delete this entry? It can't be undone.")) return;
      try {
        await API.posts.remove(post.id);
        toast("deleted");
        close();
        renderModule("diary");
      } catch (err) { toast(API.errText(err), "err"); }
    }
  }

  async function loadNotes(host, post) {
    const box = host.querySelector("[data-notes]");
    if (!box) return;
    let rows = [];
    try { rows = await API.messages.list("post", post.id); } catch (_) {}
    box.innerHTML = rows.length
      ? rows.map((n) => '<div class="jr-note">' +
          '<p>' + esc(n.content) + "</p>" +
          '<div class="jr-note-by"><span>' + esc(n.nickname || "a passerby") + "</span><span>·</span><span>" + esc(fmtAgo(n.created_at)) + "</span>" +
          (S.isOwner ? '<button class="mini" data-delnote="' + n.id + '" type="button">delete</button>' : "") +
          "</div></div>").join("")
      : '<p class="hint">No notes yet — say something.</p>';

    $$("[data-delnote]", box).forEach((b) => (b.onclick = async () => {
      try {
        await API.messages.remove(Number(b.dataset.delnote));
        b.closest(".jr-note").remove();
        toast("deleted");
      } catch (err) { toast(API.errText(err), "err"); }
    }));

    const send = host.querySelector("#jrSend");
    if (send) send.onclick = async () => {
      const text = host.querySelector("#jrText").value.trim();
      if (!text) return toast("nothing to send");
      send.disabled = true;
      try {
        await API.messages.add({
          scope: "post", item_id: post.id,
          nickname: host.querySelector("#jrName").value.trim() || null,
          content: text
        });
        host.querySelector("#jrText").value = "";
        toast("noted, thank you");
        loadNotes(host, post);
      } catch (err) {
        send.disabled = false;
        toast(API.errText(err), "err");
      }
    };
  }

  /* --- 相册 --- */
  async function viewPhoto(body) {
    const rows = await API.items.list("photo");
    S.data.photo = rows;
    if (!rows.length) {
      body.innerHTML = emptyState("No photos yet", "Drop the first one in." + ownerHint());
      return;
    }
    body.innerHTML = '<div class="gallery">' + rows.map((it) => {
      const isVideo = it.url && /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(it.url);
      const img = it.cover && /^data:image\//.test(it.cover)
        ? '<img src="' + esc(it.cover) + '" alt="' + esc(it.title || "") + '" loading="lazy">'
        : "";
      return '<figure class="shot" data-id="' + it.id + '">' +
        '<div class="shot-frame">' + img +
        (isVideo ? '<div class="shot-play"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6z"/></svg></div>' : "") +
        (S.isOwner ? '<div class="shot-tools">' + ownerTools("photo", it.id) + "</div>" : "") +
        "</div>" +
        (it.title ? '<figcaption class="shot-cap">' + esc(it.title) + "</figcaption>" : "") +
        "</figure>";
    }).join("") + "</div>";

    $$(".shot", body).forEach((cell) => cell.addEventListener("click", (e) => {
      if (e.target.closest("[data-edit],[data-del]")) return;
      const it = rows.find((r) => String(r.id) === cell.dataset.id);
      if (!it) return;
      if (it.cover && /^data:image\//.test(it.cover)) openLightbox(it.cover, false, it.title);
      else if (it.url && /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(it.url)) openLightbox(safeUrl(it.url), true);
      else if (safeUrl(it.url)) window.open(safeUrl(it.url), "_blank", "noopener");
    }));
    wireOwnerTools(body, "photo", rows);
  }

  /* --- 关于我：手账活页 --- */
  const SOCIAL = [
    { k: "weibo", emoji: "🧣", label: "能量满满滴阿萌", link: true },
    { k: "xhs", emoji: "🍠", label: "铁冰美式子_", link: true },
    { k: "douyin", emoji: "🫘", label: "谁来剪月光", link: true },
    { k: "email", emoji: "📮", label: "", link: true },
    { k: "place", emoji: "📍", label: "", link: true }
  ];

  /* 就算只填了昵称，也能拼出一个能点的地址 */
  const SOCIAL_HREF = {
    weibo: (v) => "https://weibo.com/n/" + encodeURIComponent(v),
    xhs: (v) => "https://www.xiaohongshu.com/search_result?keyword=" + encodeURIComponent(v),
    douyin: (v) => "https://www.douyin.com/search/" + encodeURIComponent(v),
    place: (v) => "https://uri.amap.com/search?keyword=" + encodeURIComponent(v)
  };

  /* 从一坨粘贴文本里揪出第一个网址 / 邮箱 */
  function firstUrl(v) {
    const m = String(v || "").match(/https?:\/\/[^\s"'<>]+/i);
    return m ? m[0] : "";
  }
  function firstEmail(v) {
    const m = String(v || "").match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    return m ? m[0] : "";
  }

  function chipsHTML() {
    const L = S.profile.links || {};
    return SOCIAL.map((s) => {
      const v = String(L[s.k] || "").trim();

      /* 文字：位置和邮箱直接显示内容，其余显示昵称；填了网址就显示昵称 */
      let text = s.label;
      let href = "";

      if (s.k === "place") {
        /* 位置自动跟着主人所在城市走，显示时去掉「中国 · 」前缀，短一点 */
        const full = v || DEFAULT_PLACE;
        text = full.replace(/^中国\s*·\s*/, "");
        href = SOCIAL_HREF.place(full);
      } else if (s.k === "email") {
        const mail = firstEmail(v);
        text = mail || "email";
        href = mail ? "mailto:" + mail : "";
      } else {
        const url = safeUrl(firstUrl(v));
        text = url ? s.label : (v || s.label);
        href = url || (text ? SOCIAL_HREF[s.k](text) : "");
      }

      const inner = '<span class="emo" aria-hidden="true">' + s.emoji + "</span>" +
        "<span" + (s.k === "place" ? ' data-place=""' : "") + ">" + esc(text) + "</span>";

      if (!href) {
        return '<span class="chip is-text"' + (v ? ' title="' + esc(v) + '"' : "") + ">" + inner + "</span>";
      }
      return '<a class="chip" href="' + esc(href) + '" target="_blank" rel="noopener" title="' + esc(text) + '">' + inner + "</a>";
    }).join("");
  }

  async function viewAbout(body) {
    const p = S.profile;
    body.innerHTML =
      '<div class="notebook-wrap">' +
        '<div class="watermark js-brush" aria-hidden="true">WELCOME TO<br>MY UNIVERSE</div>' +
        '<div class="notebook">' +
          NB_CHROME +
          '<div class="nb-left"><figure class="polaroid">' +
            '<div class="po-img"><img src="' + esc(avatarSrc()) + '" alt="' + esc(p.name || "我") + '"></div>' +
          "</figure></div>" +
          '<div class="nb-right">' +
            '<h2 class="nb-hello">Hello, I\'m <span>' + esc(p.name || "…") + "</span>.</h2>" +
            '<p class="nb-line">' + esc(p.tagline || SITE_TAGLINE) + "</p>" +
            '<div class="chips">' + chipsHTML() + "</div>" +
          "</div>" +
          DOODLE_FLOWER +
        "</div>" +
      "</div>";

    const edit = $(".js-editprofile", body);
    if (edit) edit.onclick = openProfileForm;
    jitterBrush();
    jitterHand();
  }

  /* --- guestbook --- */
  async function viewGuest(body) {
    const rows = await API.messages.list("guest", null);
    body.innerHTML =
      '<div class="gform">' +
      '<div class="row">' +
      '<div class="field"><label class="f-label">Your name<span class="opt">optional</span></label>' +
      '<input class="input" id="gName" maxlength="20" placeholder="a passerby"></div></div>' +
      '<div class="field"><label>Message</label>' +
      '<textarea class="textarea" id="gText" maxlength="600" rows="3" placeholder="just say hi — no account needed."></textarea></div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">' +
      '<span class="hint">anyone can leave a mark here</span>' +
      '<button class="btn sm primary" id="gSend" type="button">sign it</button></div>' +
      "</div>" +
      '<div id="guestList"></div>';

    renderMessages($("#guestList"), rows, "No notes yet", "Yours could be the first.");

    $("#gSend").onclick = async (e) => {
      const content = $("#gText").value.trim();
      if (!content) return toast("Write something first");
      e.target.disabled = true;
      e.target.textContent = "signing…";
      try {
        await API.messages.add({ scope: "guest", item_id: null, nickname: ($("#gName").value.trim() || null), content });
        toast("Got it. Thank you.");
        viewGuest(body);
      } catch (err) {
        e.target.disabled = false;
        e.target.textContent = "sign it";
        toast(API.errText(err), "err");
      }
    };
  }

  function renderMessages(container, rows, emptyText, emptySub) {
    if (!container) return;
    if (!rows.length) {
      container.innerHTML = emptyState(emptyText, emptySub);
      return;
    }
    container.innerHTML = '<div class="quotes">' + rows.map((m) => {
      const name = m.nickname || "a passerby";
      return '<div class="quote">' +
        '<p class="quote-text">' + esc(m.content) + "</p>" +
        '<div class="quote-by"><span>' + esc(name) + "</span><span>·</span><span>" + esc(fmtFull(m.created_at)) + "</span>" +
        (S.isOwner ? '<button class="mini" data-delmsg="' + m.id + '" type="button" style="margin-left:auto">delete</button>' : "") +
        "</div></div>";
    }).join("") + "</div>";

    $$("[data-delmsg]", container).forEach((b) => (b.onclick = async () => {
      if (!confirm("Delete this note?")) return;
      try {
        await API.messages.remove(Number(b.dataset.delmsg));
        b.closest(".quote").remove();
        toast("Deleted");
      } catch (err) { toast(API.errText(err), "err"); }
    }));
  }

  /* ---------------- 11. 主人工具 ---------------- */
  function ownerTools(kind, id) {
    if (!S.isOwner) return "";
    return '<div class="rowtools">' +
      '<button class="mini" data-edit="' + id + '" type="button">编辑</button>' +
      '<button class="mini" data-del="' + id + '" type="button">删除</button></div>';
  }

  function wireOwnerTools(body, kind, rows, isPost) {
    $$("[data-edit]", body).forEach((b) => (b.onclick = (e) => {
      e.stopPropagation();
      const id = Number(b.dataset.edit);
      if (isPost) {
        const p = rows.find((r) => r.id === id);
        if (p) openPostForm(p);
      } else {
        const it = rows.find((r) => r.id === id);
        if (it) openPhotoForm(it);
      }
    }));
    $$("[data-del]", body).forEach((b) => (b.onclick = async (e) => {
      e.stopPropagation();
      if (!confirm("确定删掉吗？删了就找不回来了。")) return;
      const id = Number(b.dataset.del);
      try {
        if (isPost) await API.posts.remove(id);
        else await API.items.remove(id);
        toast("已删除");
        renderModule(kind);
      } catch (err) { toast(API.errText(err), "err"); }
    }));
  }

  /* ---------------- 12. 表单 ---------------- */
  function fieldHTML(f, value) {
    const v = value == null ? "" : String(value);
    if (f.type === "textarea") {
      return '<div class="field">' + labelHTML(f) +
        '<textarea class="textarea" data-f="' + f.k + '" placeholder="' + esc(f.placeholder || "") + '"' + (f.rows ? ' rows="' + f.rows + '"' : "") + ">" + esc(v) + "</textarea>" +
        (f.hint ? '<span class="hint">' + esc(f.hint) + "</span>" : "") + "</div>";
    }
    if (f.type === "image") {
      return '<div class="field">' + labelHTML(f) +
        '<div style="display:flex;gap:14px;align-items:center">' +
        '<div id="imgPrev" style="width:64px;height:64px;border:1px solid var(--line-2);overflow:hidden;background:var(--tan);display:flex;align-items:center;justify-content:center;flex:none;color:var(--ink-3)">' +
        (v && /^data:image\//.test(v) ? '<img src="' + esc(v) + '" style="width:100%;height:100%;object-fit:cover">' : I.dog) +
        "</div>" +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        '<label class="btn sm" style="cursor:pointer">选择图片<input type="file" accept="image/*" id="imgFile" hidden></label>' +
        '<button class="btn sm" id="imgClear" type="button">清除</button></div></div>' +
        '<input type="hidden" data-f="' + f.k + '" value="' + esc(v) + '">' +
        (f.hint ? '<span class="hint">' + esc(f.hint) + "</span>" : "") + "</div>";
    }
    if (f.type === "checkbox") {
      return '<label class="field" style="display:flex;flex-direction:row;align-items:center;gap:10px;cursor:pointer">' +
        '<input type="checkbox" data-f="' + f.k + '" ' + (v === "true" || v === "1" ? "checked" : "") + ' style="width:16px;height:16px;accent-color:#21408C">' +
        '<span style="font-family:var(--sans);font-size:.7rem;letter-spacing:.08em;color:var(--ink-2)">' + esc(f.label) + "</span></label>";
    }
    return '<div class="field">' + labelHTML(f) +
      '<input class="input" data-f="' + f.k + '" value="' + esc(v) + '" placeholder="' + esc(f.placeholder || "") + '"' + (f.inputmode ? ' inputmode="' + f.inputmode + '"' : "") + ">" +
      (f.hint ? '<span class="hint">' + esc(f.hint) + "</span>" : "") + "</div>";
  }

  /* 标签 + 一个淡淡的「可填可不填」小标，代替原来挂在标题后的（可以不填） */
  function labelHTML(f) {
    return '<label class="f-label">' + esc(f.label) +
      (f.optional ? '<span class="opt">可填可不填</span>' : "") + "</label>";
  }

  function openForm(opts) {
    const box = openModal(
      "<h3>" + esc(opts.title) + "</h3>" +
      '<div style="display:grid;gap:20px">' + opts.fields.map((f) => fieldHTML(f, opts.values[f.k])).join("") + "</div>" +
      '<div class="modal-foot"><button class="btn" id="fCancel" type="button">取消</button>' +
      '<button class="btn primary" id="fSave" type="button">' + esc(opts.submitText || "保存") + "</button></div>",
      { sticky: true }
    );
    $("#fCancel").onclick = closeModal;

    const imgField = box.querySelector("#imgFile");
    if (imgField) {
      imgField.onchange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!/^image\//.test(file.type)) return toast("请选一张图片", "err");
        toast("正在压缩…");
        const data = await compressImage(file, opts.maxImage || {});
        if (!data) return toast("这张图太大了，换一张试试", "err");
        box.querySelector('input[type="hidden"][data-f]').value = data;
        box.querySelector("#imgPrev").innerHTML = '<img src="' + data + '" style="width:100%;height:100%;object-fit:cover">';
        toast("图片准备好了");
      };
      const clearBtn = box.querySelector("#imgClear");
      if (clearBtn) clearBtn.onclick = () => {
        box.querySelector('input[type="hidden"][data-f]').value = "";
        box.querySelector("#imgPrev").innerHTML = I.dog;
      };
    }

    $("#fSave").onclick = async (e) => {
      const values = {};
      $$("[data-f]", box).forEach((el) => {
        if (el.type === "checkbox") values[el.dataset.f] = el.checked;
        else values[el.dataset.f] = el.value.trim();
      });
      const missing = (opts.fields || []).find((f) => f.required && !values[f.k]);
      if (missing) return toast("“" + missing.label + "”还没填");
      e.target.disabled = true;
      e.target.textContent = "保存中";
      try {
        await opts.onSubmit(values);
        closeModal();
      } catch (err) {
        e.target.disabled = false;
        e.target.textContent = opts.submitText || "保存";
        toast(API.errText(err), "err");
      }
    };
  }

  function readAsDataURL(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }
  function loadImage(src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = rej;
      im.src = src;
    });
  }
  async function compressImage(file, opt) {
    const o = Object.assign({ maxSide: 1600, quality: 0.82, maxBytes: 760 * 1024 }, opt || {});
    let img;
    try { img = await loadImage(await readAsDataURL(file)); } catch (_) { return null; }
    let side = o.maxSide, q = o.quality;
    for (let i = 0; i < 7; i++) {
      const scale = Math.min(1, side / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      const out = c.toDataURL("image/jpeg", q);
      if (out.length * 0.75 <= o.maxBytes) return out;
      q = Math.max(0.44, q - 0.1);
      side = Math.round(side * 0.82);
    }
    return null;
  }

  function openPhotoForm(item) {
    openForm({
      title: item ? "改一改这张" : "放一张照片",
      fields: [
        { k: "cover", label: "图片", type: "image", hint: "会自动压缩。访客也能看到。" },
        { k: "title", label: "一句话说明", optional: true, placeholder: "这是在哪里？" },
        { k: "url", label: "视频链接", optional: true, placeholder: "mp4 直链，或视频页面地址" }
      ],
      values: item ? { cover: item.cover, title: item.title, url: item.url } : {},
      submitText: item ? "保存" : "放进去",
      onSubmit: async (v) => {
        if (!v.cover && !v.url) throw new Error("至少要有图片或视频链接");
        const payload = {
          /* items.title 在库里是 NOT NULL，空着要写空串，不能写 null */
          title: v.title || "",
          url: v.url || null,
          cover: v.cover || null,
          is_public: true
        };
        if (item) await API.items.update(item.id, payload);
        else await API.items.add("photo", payload);
        toast(item ? "已保存" : "放进去了");
        renderModule("photo");
      }
    });
  }

  function openPostForm(post) {
    openForm({
      title: post ? "改一改这篇" : "写点什么",
      fields: [
        { k: "title", label: "标题", optional: true, placeholder: "给今天起个名字" },
        { k: "content", label: "正文", type: "textarea", rows: 9, placeholder: "今天……", required: true },
        { k: "mood", label: "心情", optional: true, placeholder: "🌤 还不错" },
        { k: "source_url", label: "原文链接", optional: true, placeholder: "https://..." },
        { k: "public", label: "公开这一篇（不勾选只有自己能看到）", type: "checkbox" }
      ],
      values: post ? {
        title: post.title, content: post.content, mood: post.mood,
        source_url: post.source_url, public: post.is_public ? "true" : ""
      } : { public: "true" },
      submitText: post ? "保存" : "写好了",
      onSubmit: async (v) => {
        const payload = {
          kind: v.source_url ? "clip" : "diary",
          title: v.title || null,
          content: v.content,
          mood: v.mood || null,
          source_url: v.source_url || null,
          is_public: !!v.public
        };
        if (post) await API.posts.update(post.id, payload);
        else await API.posts.add(payload);
        toast("记下来了");
        renderModule("diary");
      }
    });
  }

  function openProfileForm() {
    const L = S.profile.links || {};
    openForm({
      title: "编辑资料",
      fields: [
        { k: "name", label: "名字", required: true, placeholder: "你想挂在封面上的名字" },
        { k: "avatar", label: "头像", type: "image", hint: "不选就继续用这张小画。" },
        { k: "tagline", label: "一句话介绍", type: "textarea", rows: 2 },
        { k: "l_weibo", label: "微博（主页链接或昵称）", placeholder: "https://weibo.com/u/… 或 能量满满滴阿萌" },
        { k: "l_xhs", label: "小红书（主页链接或昵称）", placeholder: "主页链接，或直接写昵称" },
        { k: "l_email", label: "邮箱", placeholder: "you@example.com" },
        { k: "l_douyin", label: "抖音（主页链接或昵称）", placeholder: "主页链接，或直接写昵称" }
      ],
      values: {
        name: S.profile.name, avatar: S.profile.avatar,
        tagline: S.profile.tagline,
        l_weibo: L.weibo, l_xhs: L.xhs, l_email: L.email, l_douyin: L.douyin
      },
      submitText: "保存",
      maxImage: { maxSide: 640, quality: 0.86, maxBytes: 240 * 1024 },
      onSubmit: async (v) => {
        await API.owner.save({
          name: v.name,
          avatar: v.avatar || null,
          tagline: v.tagline || null,
          links: {
            weibo: v.l_weibo || "",
            xhs: v.l_xhs || "",
            email: v.l_email || "",
            douyin: v.l_douyin || "",
            /* 位置不再手填，保留自动定位出来的城市 */
            place: L.place || ""
          },
          updated_at: new Date().toISOString()
        });
        await resolveIdentity();
        toast("资料已更新");
        renderCurrent();
        syncOwnerPlace();
      }
    });
  }

  /* ---------------- 13. 手写：逐字高低错落 ---------------- */
  function seeded(seed0) {
    let seed = seed0;
    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  /* 手刷大标题 */
  function jitterBrush() {
    const rnd = seeded(113);
    $$(".js-brush").forEach((el) => {
      if (el.dataset.jittered) return;
      const lines = [];
      let cur = "";
      Array.prototype.forEach.call(el.childNodes, (n) => {
        if (n.nodeType === 1 && n.tagName === "BR") { lines.push(cur); cur = ""; }
        else if (n.nodeType === 1 && n.classList.contains("bl")) lines.push(n.textContent);
        else if (n.nodeType === 3) cur += n.textContent;
      });
      if (cur.trim()) lines.push(cur);
      if (!lines.length) return;
      el.dataset.jittered = "1";

      el.innerHTML = lines.map((line) => {
        const chars = line.trim().split("");
        const inner = chars.map((ch) => {
          if (ch === " ") return '<i class="sp">&nbsp;</i>';
          const rot = (rnd() - 0.5) * 11;      // 每字各歪一点
          const dy = (rnd() - 0.5) * 0.09;     // 高低错落
          const dx = (rnd() - 0.5) * 0.02;
          const sc = 1 + (rnd() - 0.5) * 0.08;
          return '<i style="transform:translate(' + dx.toFixed(3) + "em," + dy.toFixed(3) + "em) rotate(" + rot.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ')">' + esc(ch) + "</i>";
        }).join("");
        return '<span class="bl">' + inner + "</span>";
      }).join("");
    });
  }

  /* 手写小字：轻微错落，幅度更小 */
  function jitterHand() {
    const rnd = seeded(57);
    $$(".js-hand").forEach((el) => {
      if (el.dataset.jittered) return;
      el.dataset.jittered = "1";
      const text = el.textContent;
      el.innerHTML = text.split("").map((ch) => {
        if (ch === " ") return '<i class="sp">&nbsp;</i>';
        const rot = (rnd() - 0.5) * 5;
        const dy = (rnd() - 0.5) * 0.1;
        return '<i style="transform:translateY(' + dy.toFixed(3) + "em) rotate(" + rot.toFixed(2) + "deg)" + '">' + esc(ch) + "</i>";
      }).join("");
    });
  }

  /* ---------------- 14. 登录回跳 ---------------- */
  async function handleOAuthReturn() {
    const url = new URL(location.href);
    if (!url.searchParams.has("code") && !url.searchParams.has("error")) return false;
    const provider = url.searchParams.get("provider");
    if (provider !== "workbuddy" && provider !== "wechat") return false;
    try {
      const fn = provider === "workbuddy" ? window.cloud.auth.handleWorkBuddyCallback : window.cloud.auth.handleWechatWebCallback;
      if (typeof fn !== "function") { toast("登录组件版本不匹配", "err"); return false; }
      const { data: session, error } = await fn.call(window.cloud.auth);
      if (error) { toast(error.message || "登录失败", "err"); return false; }
      if (session) {
        ["code", "state", "provider"].forEach((k) => url.searchParams.delete(k));
        history.replaceState(null, "", url.pathname + url.search + url.hash);
        return true;
      }
    } catch (err) {
      toast(err.message || "登录失败", "err");
    }
    return false;
  }

  async function boot() {
    if (boot.done) return;
    boot.done = true;

    /* 先用上一次缓存的资料把封面画出来，别让人先看到默认名字 */
    const cached = cachedProfile();
    if (cached) S.profile = cached;
    renderCover();
    jitterBrush();
    jitterHand();

    $$("[data-nav]").forEach((b) => (b.onclick = () => {
      const v = b.dataset.nav;
      if (v === "contents") go("contents");
      else go("module", v);
    }));

    const justLoggedIn = await handleOAuthReturn();

    try { await resolveIdentity(); }
    catch (_) { S.profile = cached || Object.assign({}, window.SITE_DEFAULTS); }
    renderCover();
    updateAuthSlots();
    syncOwnerPlace();

    if (justLoggedIn) {
      const back = sessionStorage.getItem("wb_back");
      sessionStorage.removeItem("wb_back");
      const clean = (back || "").replace(/^#\//, "");
      if (clean === "contents") go("contents", null, true);
      else if (MODMAP[clean]) go("module", clean, true);
      else go("contents", null, true);
      toast(S.isOwner ? "欢迎回来" : "已登录");
      return;
    }

    const st = parseHash();
    if (st.view === "module") go("module", st.mod, true);
    else if (st.view === "contents") go("contents", null, true);
    else if (st.view === "stats") go("stats", null, true);
    else { render("cover"); updateAuthSlots(); trackView(); }

    prefetchCounts();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
