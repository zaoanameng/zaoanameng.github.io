/* ==========================================================
   云端数据层：登录 / 收藏 / 日记 / 留言
   ========================================================== */
(function () {
  const cfg = window.WB_CONFIG;
  const SDK = window.WorkBuddyCloud;

  /* 登录/验证码接口不带任何身份头：
     浏览器里可能残留过期或别处签发的会话，云网关见到就会直接回
     “the session is invalid, expired or issued for another client”。
     这些接口本来就只靠 body 里的验证码 / verification_token 认证。 */
  const AUTH_ONLY = /\/auth\/v1\/(verification|signin|signup|token|reset)/;
  const rawFetch = (window.fetch || function () {}).bind(window);
  function cleanFetch(url, init) {
    try {
      if (AUTH_ONLY.test(String(url))) {
        const h = new Headers((init && init.headers) || {});
        ["authorization", "x-relay-auth", "apikey"].forEach((k) => h.delete(k));
        init = Object.assign({}, init, { headers: h });
      }
    } catch (_) {}
    return rawFetch(url, init);
  }

  const cloud = SDK
    ? SDK.createWorkBuddyCloud({
        endpoint: cfg.endpoint,
        oauthRelayBaseUrl: cfg.oauthRelayBaseUrl,
        publishableKey: cfg.publishableKey,
        fetch: cleanFetch
      })
    : new Proxy({}, { get() { throw new Error("云端组件没加载出来，刷新一下页面再试"); } });
  window.cloud = cloud;

  function unwrap(res) {
    if (res && res.error) throw res.error;
    return res ? res.data : null;
  }
  function errText(e) {
    if (!e) return "出了点小状况，稍后再试试";
    if (e.code === "23505") return "这个已经存在了";
    if (e.code === "42501") return "没有权限这么做（可能还没登录）";
    if (e.code === "42P01") return "数据表还没准备好";
    return e.message || String(e);
  }

  /* ---------------- 登录 ---------------- */
  const auth = {
    async session() {
      try {
        const { data, error } = await cloud.auth.getSession();
        if (error) return null;
        return data || null;
      } catch (_) {
        return null;
      }
    },
    async sendEmailCode(email) {
      const r = await cloud.auth.sendOtp({ email });
      if (r.error) throw r.error;
      return r.data;
    },
    async verifyEmailCode(email, pending, token) {
      const r = await cloud.auth.verifyOtp({
        email,
        verificationId: pending.verificationId,
        isExistingUser: pending.isExistingUser,
        token
      });
      if (r.error) throw r.error;
      return r.data;
    },
    async signOut() {
      try { await cloud.auth.signOut(); } catch (_) {}
    },
    /* 把本机残留的云端凭证全部清掉（会话 + PKCE），登录前先净一次身 */
    resetLocal() {
      try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.indexOf("workbuddy-cloud.") === 0) keys.push(k);
        }
        keys.forEach((k) => localStorage.removeItem(k));
      } catch (_) {}
      try {
        const keys = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const k = sessionStorage.key(i);
          if (k && k.indexOf("workbuddy-cloud.") === 0) keys.push(k);
        }
        keys.forEach((k) => sessionStorage.removeItem(k));
      } catch (_) {}
    }
  };

  /* ---------------- 站点主人 ---------------- */
  const owner = {
    async get() {
      const { data, error } = await cloud.database
        .from("site_owner").select("*").eq("id", 1).maybeSingle();
      if (error && error.code !== "PGRST116") throw error;
      return data || null;
    },
    async claim(uid, name) {
      const { data, error } = await cloud.database
        .from("site_owner")
        .insert({ id: 1, uid, name: name || null })
        .select();
      if (error) throw error;
      return (data && data[0]) || null;
    },
    async save(patch) {
      const { data, error } = await cloud.database
        .from("site_owner").update(patch).eq("id", 1).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("没能保存（这个账号不是看管人）");
      return data[0];
    }
  };

  /* ---------------- 收藏卡片 ---------------- */
  const items = {
    async list(kind) {
      const { data, error } = await cloud.database
        .from("items").select("*").eq("kind", kind)
        .order("created_at", { ascending: false }).limit(400);
      if (error) throw error;
      return data || [];
    },
    /* 只要数量：只取 id，不下载图片 base64，快几十倍 */
    async count(kind) {
      const { data, error } = await cloud.database
        .from("items").select("id").eq("kind", kind).limit(2000);
      if (error) throw error;
      return (data || []).length;
    },
    async all() {
      const { data, error } = await cloud.database
        .from("items").select("id,kind,created_at").limit(1000);
      if (error) return [];
      return data || [];
    },
    async add(kind, payload) {
      const { data, error } = await cloud.database
        .from("items").insert({ kind, ...payload }).select();
      if (error) throw error;
      return (data && data[0]) || null;
    },
    async update(id, patch) {
      const { data, error } = await cloud.database
        .from("items").update(patch).eq("id", id).select();
      if (error) throw error;
      if (!data || !data.length) throw new Error("没能保存（这条不是你的内容）");
      return data[0];
    },
    async remove(id) {
      const { data, error } = await cloud.database
        .from("items").delete().eq("id", id).select();
      if (error) throw error;
      if (!data || !data.length) throw new Error("没能删除");
      return true;
    }
  };

  /* ---------------- 日记 / 摘录 ---------------- */
  const posts = {
    async list(limit = 200) {
      const { data, error } = await cloud.database
        .from("posts").select("*")
        .order("created_at", { ascending: false }).limit(limit);
      if (error) throw error;
      return data || [];
    },
    async add(payload) {
      const { data, error } = await cloud.database
        .from("posts").insert(payload).select();
      if (error) throw error;
      return (data && data[0]) || null;
    },
    async update(id, patch) {
      const { data, error } = await cloud.database
        .from("posts").update(patch).eq("id", id).select();
      if (error) throw error;
      if (!data || !data.length) throw new Error("没能保存");
      return data[0];
    },
    async remove(id) {
      const { data, error } = await cloud.database
        .from("posts").delete().eq("id", id).select();
      if (error) throw error;
      return true;
    }
  };

  /* ---------------- 留言 / 发言 ---------------- */
  const messages = {
    async list(scope, itemId) {
      let q = cloud.database.from("messages").select("*").eq("scope", scope);
      if (itemId != null) q = q.eq("item_id", itemId);
      else q = q.is("item_id", null);
      const { data, error } = await q.order("created_at", { ascending: true }).limit(400);
      if (error) throw error;
      return data || [];
    },
    async add(payload) {
      const { data, error } = await cloud.database
        .from("messages").insert(payload).select();
      if (error) throw error;
      return (data && data[0]) || null;
    },
    async remove(id) {
      const { data, error } = await cloud.database
        .from("messages").delete().eq("id", id).select();
      if (error) throw error;
      return true;
    },
    async countAll() {
      const { count, error } = await cloud.database
        .from("messages").select("*", { count: "exact", head: true }).eq("scope", "guest");
      if (error) return 0;
      return count || 0;
    }
  };

  /* ---------------- 访客记录 ---------------- */
  const stats = {
    async track(payload) {
      const { error } = await cloud.database.from("pageviews").insert(payload);
      if (error) throw error;
      return true;
    },
    async list(limit = 5000) {
      const { data, error } = await cloud.database
        .from("pageviews").select("*")
        .order("created_at", { ascending: false }).limit(limit);
      if (error) throw error;
      return data || [];
    }
  };

  window.API = { auth, owner, items, posts, messages, stats, errText };
})();
