/* 云端配置 —— 由云服务环境生成，仅含可公开的配置 */
window.WB_CONFIG = {
  endpoint: "https://zaoan-meng.app.workbuddy.host",
  oauthRelayBaseUrl: "https://www.workbuddy.cn/v2/as/genie-baas/oauth",
  publishableKey: "wbpk_e4oDQmmcK29X729XA90rPj_IBJNH6obWRK2urVf0kK0yIYFcJM1ES1G"
};

/* 站点默认文案：还没登录 / 还没改过资料时显示这些 */
window.SITE_DEFAULTS = {
  name: "Zaoan-meng",
  tagline: "A quiet heaven for my memories, ramblings and tiny thoughts.",
  about: "",
  avatar: "assets/avatar.png",
  links: {
    weibo: "https://weibo.com/u/6000251085",
    xhs: "https://xhslink.cn/o/AvTA8NtQ4LP",
    email: "2116058051@qq.com",
    douyin: "https://v.douyin.com/QfA1tsssEOU/",
    place: "China·Henan"
  }
};

/* ==========================================================
   外部托管（如 GitHub Pages）→ 走站点自带的跨域转发入口
   ----------------------------------------------------------
   云数据库只接受本站域名发起的请求，所以在别的域名下打开时，
   把接口地址换到 https://zaoan-meng.app.workbuddy.host/relay，
   并给每个数据请求补上分享码（网关要求）。
   在 WorkBuddy 域名 / 本地预览下这一段不生效，行为完全不变。
   ========================================================== */
(function () {
  var host = location.hostname || "";
  var isLocal = host === "localhost" || host === "127.0.0.1" || host === "";
  var isWb = /(^|\.)workbuddy\.host$/.test(host);
  if (isLocal || isWb) return;

  var BASE = "https://zaoan-meng.app.workbuddy.host";
  var RSC = "sharecode=3L7ECEILFA";

  window.WB_CONFIG.endpoint = BASE + "/relay";
  window.WB_EXTERNAL = true;

  var orig = window.fetch;
  window.fetch = function (input, init) {
    try {
      if (typeof input === "string" && input.indexOf(BASE + "/relay/") === 0) {
        input += (input.indexOf("?") === -1 ? "?" : "&") + RSC;
        /* 托管平台会往请求里塞它自己的 authorization，覆盖掉我们的；
           这里把真正的登录凭证挪到 x-relay-auth，由站点服务还原 */
        var raw = (init && init.headers) || null;
        if (raw) {
          var h = raw instanceof Headers ? raw : new Headers(raw);
          var auth = h.get("Authorization");
          if (auth) {
            h.set("x-relay-auth", auth);
            h.delete("Authorization");
          }
          init = Object.assign({}, init, { headers: h });
        }
      }
    } catch (_) {}
    return orig.call(this, input, init);
  };
})();
