var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// <define:LOCAL_CONFIG>
var define_LOCAL_CONFIG_default = { entry: "app.psp", bindings: { WEBDYNE_INDEX: "app.psp", WEBDYNE_STATIC: "1" } };

// node_modules/@webdyne/webdyne-zeroperl/js/zeroperl.js
var ie = ((e) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof __require < "u" ? __require : t)[r] }) : e)(function(e) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var o = class _o {
  static WASI_ESUCCESS = 0;
  static WASI_ERRNO_BADF = 8;
  static WASI_ENOSYS = 52;
  static WASI_CLOCK_REALTIME = 0;
  static WASI_CLOCK_MONOTONIC = 1;
  static WASI_ERRNO_ISDIR = 31;
  static WASI_ERRNO_INVAL = 28;
  static WASI_ERRNO_NOTDIR = 54;
  static WASI_ERRNO_NOENT = 44;
  static WASI_ERRNO_EXIST = 20;
  static WASI_ERRNO_IO = 29;
  static WASI_ERRNO_NOTCAPABLE = 76;
  static WASI_FILETYPE_CHARACTER_DEVICE = 2;
  static WASI_FILETYPE_DIRECTORY = 3;
  static WASI_FILETYPE_REGULAR_FILE = 4;
  static IMPORT_FUNCTIONS = ["args_get", "args_sizes_get", "clock_res_get", "clock_time_get", "environ_get", "environ_sizes_get", "fd_advise", "fd_allocate", "fd_close", "fd_datasync", "fd_fdstat_get", "fd_fdstat_set_flags", "fd_fdstat_set_rights", "fd_filestat_get", "fd_filestat_set_size", "fd_filestat_set_times", "fd_pread", "fd_prestat_dir_name", "fd_prestat_get", "fd_pwrite", "fd_read", "fd_readdir", "fd_renumber", "fd_seek", "fd_sync", "fd_tell", "fd_write", "path_create_directory", "path_filestat_get", "path_filestat_set_times", "path_link", "path_open", "path_readlink", "path_remove_directory", "path_rename", "path_symlink", "path_unlink_file", "poll_oneoff", "proc_exit", "proc_raise", "random_get", "sched_yield", "sock_accept", "sock_recv", "sock_send", "sock_shutdown"];
  encoder;
  decoder;
  constructor() {
    this.encoder = new TextEncoder(), this.decoder = new TextDecoder();
  }
  stringArraySize(e) {
    let t = e.length * 4, r = e.reduce((n, s) => n + this.byteLength(s) + 1, 0);
    return { pointerArraySize: t, bufferSize: r, totalSize: t + r };
  }
  writeStringArray(e, t, r, n) {
    let s = r, i = n;
    for (let u of t) e.setUint32(s, i, true), s += 4, i += this.writeString(e, `${u}\0`, i);
    return i - n;
  }
  writeString(e, t, r) {
    let n = this.encoder.encode(t);
    return new Uint8Array(e.buffer, r, n.length).set(n), n.length;
  }
  readString(e, t, r) {
    let n = new Uint8Array(e.buffer, t, r);
    return this.decoder.decode(n);
  }
  byteLength(e) {
    return this.encoder.encode(e).length;
  }
  static iovec_t = { size: 8, bufferOffset: 0, lengthOffset: 4 };
  iovViews(e, t, r) {
    let n = [], s = t;
    for (let i = 0; i < r; i++) {
      let u = e.getUint32(s + _o.iovec_t.bufferOffset, true), a = e.getUint32(s + _o.iovec_t.lengthOffset, true);
      n.push(new Uint8Array(e.buffer, u, a)), s += _o.iovec_t.size;
    }
    return n;
  }
  writeFilestat(e, t, r, n = 0n, s = 0n, i = 0n, u = 0n) {
    e.setBigUint64(t, 0n, true), e.setBigUint64(t + 8, 0n, true), e.setUint8(t + 16, r), e.setBigUint64(t + 24, 1n, true), e.setBigUint64(t + 32, n, true), e.setBigUint64(t + 40, s, true), e.setBigUint64(t + 48, i, true), e.setBigUint64(t + 56, u, true);
  }
  writeFdstat(e, t, r, n, s, i) {
    e.setUint8(t, r), e.setUint16(t + 2, n, true), e.setBigUint64(t + 8, s, true), e.setBigUint64(t + 16, i, true);
  }
};
var W = class {
  code;
  constructor(e) {
    this.code = e;
  }
  get exitCode() {
    return this.code;
  }
};
function J(e, t, r) {
  let n = e.args || [];
  return { args_get: (s, i) => {
    let u = r();
    return t.writeStringArray(u, n, s, i), o.WASI_ESUCCESS;
  }, args_sizes_get: (s, i) => {
    let u = r();
    u.setUint32(s, n.length, true);
    let a = t.stringArraySize(n);
    return u.setUint32(i, a.bufferSize, true), o.WASI_ESUCCESS;
  } };
}
function K(e, t, r) {
  return { clock_res_get: (n, s) => {
    let i;
    switch (n) {
      case o.WASI_CLOCK_MONOTONIC: {
        i = 5e3;
        break;
      }
      case o.WASI_CLOCK_REALTIME: {
        i = 1e6;
        break;
      }
      default:
        return o.WASI_ENOSYS;
    }
    return r().setBigUint64(s, BigInt(i), true), o.WASI_ESUCCESS;
  }, clock_time_get: (n, s, i) => {
    let u = 0;
    switch (n) {
      case o.WASI_CLOCK_MONOTONIC: {
        u = performance.now();
        break;
      }
      case o.WASI_CLOCK_REALTIME: {
        u = Date.now();
        break;
      }
      default:
        return o.WASI_ENOSYS;
    }
    let a = r();
    if (BigInt) {
      let I = BigInt(((l) => {
        let c = Math.trunc(l), m = BigInt(Math.round((l - c) * 1e6));
        return BigInt(c) * BigInt(1e6) + m;
      })(u));
      a.setBigUint64(i, I, true);
    } else {
      let f = Date.now() * 1e6;
      a.setUint32(i, f & 65535, true), a.setUint32(i + 4, f & 4294901760, true);
    }
    return o.WASI_ESUCCESS;
  } };
}
function Z(e, t, r) {
  return { environ_get: (n, s) => {
    let i = n, u = s, a = r();
    for (let f in e.env) {
      let I = e.env[f];
      a.setUint32(i, u, true), i += 4, u += t.writeString(a, `${f}=${I}\0`, u);
    }
    return o.WASI_ESUCCESS;
  }, environ_sizes_get: (n, s) => {
    let i = r();
    return i.setUint32(n, Object.keys(e.env || {}).length, true), i.setUint32(s, Object.entries(e.env || {}).reduce((u, [a, f]) => u + t.byteLength(a) + 1 + t.byteLength(f) + 1, 0), true), o.WASI_ESUCCESS;
  } };
}
var B = class {
  handler;
  outputBuffers;
  decoder = new TextDecoder("utf-8");
  constructor(e, t) {
    this.handler = e;
    this.outputBuffers = t;
  }
  writev(e) {
    let t = e.reduce((s, i) => s + i.byteLength, 0), r = 0, n = new Uint8Array(t);
    for (let s of e) n.set(s, r), r += s.byteLength;
    if (this.outputBuffers) this.handler(n);
    else {
      let s = this.decoder.decode(n, { stream: true });
      this.handler(s);
    }
    return n.length;
  }
  readv(e) {
    return 0;
  }
  close() {
    if (!this.outputBuffers) {
      let e = this.decoder.decode();
      if (e) this.handler(e);
    }
  }
};
var Q = class {
  consume;
  encoder = new TextEncoder();
  pending = null;
  constructor(e) {
    this.consume = e;
  }
  writev(e) {
    return 0;
  }
  consumePending(e, t) {
    if (e.byteLength < t) return this.pending = null, e;
    let r = e.slice(0, t);
    return this.pending = e.slice(t), r;
  }
  readv(e) {
    let t = 0;
    for (let r of e) {
      let n = r.byteLength;
      if (this.pending) {
        let s = this.consumePending(this.pending, n);
        r.set(s, 0), n -= s.byteLength, t += s.byteLength;
      }
      while (n > 0) {
        let s = this.consume(), i;
        if (s instanceof Uint8Array) i = s;
        else i = this.encoder.encode(s);
        if (i.length === 0) return t;
        if (i.length > n) r.set(i.slice(0, n), r.byteLength - n), this.pending = i.slice(n), t += n, n = 0;
        else r.set(i, r.byteLength - n), t += i.length, n -= i.length;
      }
    }
    return t;
  }
  close() {
  }
};
function oe(e = {}) {
  let t = e.outputBuffers || false;
  return [new Q(e.stdin || (() => "")), new B(e.stdout || console.log, t), new B(e.stderr || console.error, t)];
}
var D = class {
  root;
  preopenPaths = [];
  constructor(e) {
    if (this.root = { type: "dir", entries: /* @__PURE__ */ Object.create(null) }, this.ensureDir("/dev"), this.setNode("/dev/null", { type: "character", kind: "devnull" }), e) for (let t of Object.keys(e)) this.ensureDir(t), this.preopenPaths.push(t);
    else this.preopenPaths.push("/");
  }
  removeFile(e) {
    let r = this.normalizePath(e).split("/").filter((u) => u.length > 0), n = r.pop(), s = `/${r.join("/")}`, i = this.ensureDir(s);
    if (n) delete i.entries[n];
  }
  addFile(e, t) {
    if (typeof t === "string") {
      let r = new TextEncoder().encode(t);
      this.createFile(e, r);
      return;
    }
    this.createFile(e, t);
  }
  createFile(e, t) {
    let r = { type: "file", content: t };
    return this.setNode(e, r), r;
  }
  setNode(e, t) {
    let n = this.normalizePath(e).split("/").filter((a) => a.length > 0);
    if (n.length === 0) {
      if (t.type !== "dir") throw Error("Root must be a directory");
      this.root = t;
      return;
    }
    let s = n.pop(), i = `/${n.join("/")}`, u = this.ensureDir(i);
    if (s) u.entries[s] = t;
  }
  getDevNull() {
    let e = this.lookup("/dev/null");
    if (!e) throw Error("/dev/null not found");
    return e;
  }
  getPreopenPaths() {
    return [...this.preopenPaths];
  }
  lookup(e) {
    let t = this.normalizePath(e);
    if (t === "/") return this.root;
    let r = t.split("/").filter((s) => s.length > 0), n = this.root;
    for (let s of r) {
      if (n.type !== "dir") return null;
      if (n = n.entries[s], !n) return null;
    }
    return n;
  }
  resolve(e, t) {
    let n = this.normalizePath(t).split("/").filter((i) => i.length > 0), s = e;
    for (let i of n) {
      if (i === ".") continue;
      if (i === "..") {
        s = this.root;
        continue;
      }
      if (s.type !== "dir") return null;
      if (s = s.entries[i], !s) return null;
    }
    return s;
  }
  ensureDir(e) {
    let r = this.normalizePath(e).split("/").filter((s) => s.length > 0), n = this.root;
    for (let s of r) {
      if (!n.entries[s]) n.entries[s] = { type: "dir", entries: /* @__PURE__ */ Object.create(null) };
      let i = n.entries[s];
      if (i.type !== "dir") throw Error(`"${s}" is not a directory`);
      n = i;
    }
    return n;
  }
  createFileIn(e, t) {
    let n = this.normalizePath(t).split("/").filter((a) => a.length > 0);
    if (n.length === 0) throw Error("Cannot create a file with an empty name");
    let s = n.pop();
    if (!s) throw Error("Cannot create a file with an empty name");
    let i = e;
    for (let a of n) {
      if (!i.entries[a]) i.entries[a] = { type: "dir", entries: /* @__PURE__ */ Object.create(null) };
      let f = i.entries[a];
      if (f.type !== "dir") throw Error(`"${a}" is not a directory`);
      i = f;
    }
    let u = { type: "file", content: new Uint8Array(0) };
    return i.entries[s] = u, u;
  }
  normalizePath(e) {
    let t = [];
    for (let r of e.replace(/\/+/g, "/").split("/")) {
      if (!r || r === ".") continue;
      if (r === "..") t.pop();
      else t.push(r);
    }
    return `/${t.join("/")}`;
  }
  resolvePath(e, t, r) {
    let n = this.normalizePath(r).split("/").filter(Boolean), s = this.normalizePath(e).split("/").filter(Boolean);
    if (n.some((i, u) => s[u] !== i)) return null;
    for (let i of t.replace(/\/+/g, "/").split("/")) {
      if (!i || i === ".") continue;
      if (i === "..") {
        if (s.length <= n.length) return null;
        s.pop();
      } else s.push(i);
    }
    return `/${s.join("/")}`;
  }
};
function M(e = {}) {
  return (t, r, n) => {
    let s = e.withFileSystem || new D(t.preopens), i = {};
    function u(l) {
      if (l.type === "file" && l.content instanceof Blob) {
        let c = BigInt(l.content.lastModified ?? Date.now()) * 1000000n;
        return { atim: c, mtim: c, ctim: c };
      }
      return { atim: 0n, mtim: 0n, ctim: 0n };
    }
    oe(e.withStdIo || {}).forEach((l, c) => {
      i[c] = { node: { type: "character", kind: "stdio", entry: l }, position: 0, isPreopen: false, path: `/dev/fd/${c}`, fd: c };
    });
    let a = 3;
    for (let l of s.getPreopenPaths()) {
      let c = s.lookup(l);
      if (c && c.type === "dir") i[a] = { node: c, position: 0, isPreopen: true, preopenPath: l, path: l, fd: a }, a++;
    }
    function f(l) {
      return i[l] || null;
    }
    function I(l) {
      if (l.content instanceof Blob) return l.content.size;
      return l.content.byteLength;
    }
    return { fd_read: async (l, c, m, h) => {
      let d = n(), _ = r.iovViews(d, c, m), p = f(l);
      if (!p) return o.WASI_ERRNO_BADF;
      if (p.node.type === "character" && p.node.kind === "stdio") {
        let S = p.node.entry.readv(_);
        return d.setUint32(h, S, true), o.WASI_ESUCCESS;
      }
      if (p.node.type === "dir") return o.WASI_ERRNO_ISDIR;
      if (p.node.type === "character" && p.node.kind === "devnull") return d.setUint32(h, 0, true), o.WASI_ESUCCESS;
      let y = p.node, E = y.content, P = I(y) - p.position, g = 0;
      if (P <= 0) return d.setUint32(h, 0, true), o.WASI_ESUCCESS;
      if (y.content instanceof Blob) {
        let S = y.content;
        for (let w of _) {
          if (p.position >= S.size) break;
          let v = Math.min(w.byteLength, S.size - p.position);
          if (v <= 0) break;
          let x = await S.slice(p.position, p.position + v).arrayBuffer();
          w.set(new Uint8Array(x)), g += x.byteLength, p.position += x.byteLength;
        }
      } else if (ArrayBuffer.isView(E)) for (let S of _) {
        if (p.position >= E.byteLength) break;
        let w = Math.min(S.byteLength, E.byteLength - p.position);
        if (w <= 0) break;
        S.set(E.slice(p.position, p.position + w)), g += w, p.position += w;
      }
      return d.setUint32(h, g, true), o.WASI_ESUCCESS;
    }, fd_write: (l, c, m, h) => {
      let d = n(), _ = r.iovViews(d, c, m), p = f(l);
      if (!p) return o.WASI_ERRNO_BADF;
      let y = 0;
      if (p.node.type === "character" && p.node.kind === "stdio") {
        let w = p.node.entry.writev(_);
        return d.setUint32(h, w, true), o.WASI_ESUCCESS;
      }
      if (p.node.type === "dir") return o.WASI_ERRNO_ISDIR;
      if (p.node.type === "character" && p.node.kind === "devnull") {
        let w = _.reduce((v, x) => v + x.byteLength, 0);
        return d.setUint32(h, w, true), o.WASI_ESUCCESS;
      }
      if (p.node.content instanceof Blob) return o.WASI_ERRNO_INVAL;
      let E = p.position, P = _.reduce((w, v) => w + v.byteLength, 0), g = E + P, S;
      if (g > I(p.node)) S = new Uint8Array(g), S.set(p.node.content, 0);
      else S = p.node.content;
      for (let w of _) S.set(w, E), E += w.byteLength, y += w.byteLength;
      return p.node.content = S, p.position = E, d.setUint32(h, y, true), o.WASI_ESUCCESS;
    }, fd_close: (l) => {
      let c = f(l);
      if (!c) return o.WASI_ERRNO_BADF;
      if (c.node.type === "character" && c.node.kind === "stdio") return c.node.entry.close(), o.WASI_ESUCCESS;
      return delete i[l], o.WASI_ESUCCESS;
    }, fd_readdir: (l, c, m, h, d) => {
      let _ = n(), p = f(l);
      if (!p) return o.WASI_ERRNO_BADF;
      if (p.node.type !== "dir") return o.WASI_ERRNO_NOTDIR;
      let y = Number(h);
      if (!Number.isSafeInteger(y) || y < 0) return o.WASI_ERRNO_INVAL;
      let E = Object.entries(p.node.entries), P = 0;
      for (let g = y; g < E.length; g++) {
        let S = E[g];
        if (!S) break;
        let [w, v] = S, x = new TextEncoder().encode(w), R = 24 + x.length;
        if (R > m - P) break;
        let z = c + P;
        _.setBigUint64(z, BigInt(g + 1), true), _.setBigUint64(z + 8, BigInt(g + 1), true), _.setUint32(z + 16, x.length, true), _.setUint8(z + 20, v.type === "dir" ? o.WASI_FILETYPE_DIRECTORY : v.type === "character" ? o.WASI_FILETYPE_CHARACTER_DEVICE : o.WASI_FILETYPE_REGULAR_FILE), _.setUint8(z + 21, 0), _.setUint16(z + 22, 0, true), new Uint8Array(_.buffer, z + 24, x.length).set(x), P += R;
      }
      return _.setUint32(d, P, true), o.WASI_ESUCCESS;
    }, fd_seek: (l, c, m, h) => {
      let d = n(), _ = f(l);
      if (!_) return o.WASI_ERRNO_BADF;
      if (_.node.type === "dir") return o.WASI_ERRNO_ISDIR;
      if (_.node.type === "character") return o.WASI_ERRNO_IO;
      let p = I(_.node), y;
      switch (m) {
        case 0:
          y = Number(c);
          break;
        case 1:
          y = _.position + Number(c);
          break;
        case 2:
          y = p + Number(c);
          break;
        default:
          return o.WASI_ERRNO_INVAL;
      }
      if (y < 0) return o.WASI_ERRNO_INVAL;
      return _.position = y, d.setBigUint64(h, BigInt(y), true), o.WASI_ESUCCESS;
    }, fd_tell: (l, c) => {
      let m = n(), h = f(l);
      if (!h) return o.WASI_ERRNO_BADF;
      if (h.node.type === "dir") return o.WASI_ERRNO_IO;
      if (h.node.type === "character") return o.WASI_ERRNO_IO;
      return m.setBigUint64(c, BigInt(h.position), true), o.WASI_ESUCCESS;
    }, fd_fdstat_get: (l, c) => {
      let m = n(), h = f(l);
      if (!h) return o.WASI_ERRNO_BADF;
      let d;
      switch (h.node.type) {
        case "character":
          d = o.WASI_FILETYPE_CHARACTER_DEVICE;
          break;
        case "dir":
          d = o.WASI_FILETYPE_DIRECTORY;
          break;
        case "file":
          d = o.WASI_FILETYPE_REGULAR_FILE;
          break;
      }
      let _ = 0x1fffffffn;
      return r.writeFdstat(m, c, d, 0, _, _), o.WASI_ESUCCESS;
    }, fd_filestat_get: (l, c) => {
      let m = n(), h = f(l);
      if (!h) return o.WASI_ERRNO_BADF;
      let d, _ = 0;
      switch (h.node.type) {
        case "character":
          d = o.WASI_FILETYPE_CHARACTER_DEVICE;
          break;
        case "dir":
          d = o.WASI_FILETYPE_DIRECTORY;
          break;
        case "file":
          d = o.WASI_FILETYPE_REGULAR_FILE, _ = I(h.node);
          break;
      }
      let { atim: p, mtim: y, ctim: E } = u(h.node);
      return r.writeFilestat(m, c, d, BigInt(_), p, y, E), o.WASI_ESUCCESS;
    }, fd_prestat_get: (l, c) => {
      let m = n();
      if (l < 3) return o.WASI_ERRNO_BADF;
      let h = f(l);
      if (!h || !h.isPreopen) return o.WASI_ERRNO_BADF;
      m.setUint8(c, 0);
      let d = h.preopenPath || "";
      return m.setUint32(c + 4, d.length, true), o.WASI_ESUCCESS;
    }, fd_prestat_dir_name: (l, c, m) => {
      if (l < 3) return o.WASI_ERRNO_BADF;
      let h = f(l);
      if (!h || !h.isPreopen) return o.WASI_ERRNO_BADF;
      let d = h.preopenPath || "", _ = n(), p = Math.min(d.length, m);
      for (let y = 0; y < p; y++) _.setUint8(c + y, d.charCodeAt(y));
      return o.WASI_ESUCCESS;
    }, fd_open: (l, c, m, h, d, _, p, y) => {
      let E = n();
      if (l < 3) return o.WASI_ERRNO_NOTDIR;
      let P = f(l);
      if (!P || P.node.type !== "dir") return o.WASI_ERRNO_NOTDIR;
      let g = r.readString(E, c, m), S = P.preopenPath ?? P.path, w = s.resolvePath(P.path, g, S);
      if (!w) return o.WASI_ERRNO_NOTCAPABLE;
      let v = s.lookup(w), x = 1, R = 2, z = 4, T = 8;
      if (v) {
        if (h & x && h & z) return o.WASI_ERRNO_EXIST;
        if (h & R && v.type !== "dir") return o.WASI_ERRNO_NOTDIR;
        if (h & T) {
          if (v.type !== "file") return o.WASI_ERRNO_INVAL;
          v.content = new Uint8Array(0);
        }
      } else {
        if (!(h & x)) return o.WASI_ERRNO_NOENT;
        if (h & R) return o.WASI_ERRNO_NOENT;
        v = s.createFile(w, new Uint8Array(0));
      }
      return i[a] = { node: v, position: 0, isPreopen: false, preopenPath: S, path: w, fd: a }, E.setUint32(y, a, true), a++, o.WASI_ESUCCESS;
    }, path_open: (l, c, m, h, d, _, p, y, E) => {
      let P = n();
      if (l < 3) return o.WASI_ERRNO_NOTDIR;
      let g = f(l);
      if (!g || g.node.type !== "dir") return o.WASI_ERRNO_NOTDIR;
      let S = r.readString(P, m, h), w = g.preopenPath ?? g.path, v = s.resolvePath(g.path, S, w);
      if (!v) return o.WASI_ERRNO_NOTCAPABLE;
      let x = s.lookup(v), R = 1, z = 2, T = 4, se = 8;
      if (x) {
        if (d & R && d & T) return o.WASI_ERRNO_EXIST;
        if (d & z && x.type !== "dir") return o.WASI_ERRNO_NOTDIR;
        if (d & se) {
          if (x.type !== "file") return o.WASI_ERRNO_INVAL;
          x.content = new Uint8Array(0);
        }
      } else {
        if (!(d & R)) return o.WASI_ERRNO_NOENT;
        if (d & z) return o.WASI_ERRNO_NOENT;
        x = s.createFile(v, new Uint8Array(0));
      }
      return i[a] = { node: x, position: 0, isPreopen: false, preopenPath: w, path: v, fd: a }, P.setUint32(E, a, true), a++, o.WASI_ESUCCESS;
    }, path_filestat_get: (l, c, m, h, d) => {
      let _ = n(), p = f(l);
      if (!p) return o.WASI_ERRNO_BADF;
      if (p.node.type !== "dir") return o.WASI_ERRNO_NOTDIR;
      let y = r.readString(_, m, h), E = p.preopenPath ?? p.path, P = s.resolvePath(p.path, y, E);
      if (!P) return o.WASI_ERRNO_NOTCAPABLE;
      let g = s.lookup(P);
      if (!g) return o.WASI_ERRNO_NOENT;
      if (g.type === "character" && g.kind === "stdio") return o.WASI_ERRNO_INVAL;
      let S, w = 0;
      if (g.type === "dir") S = o.WASI_FILETYPE_DIRECTORY;
      else if (g.type === "character" && g.kind === "devnull") S = o.WASI_FILETYPE_CHARACTER_DEVICE;
      else S = o.WASI_FILETYPE_REGULAR_FILE, w = I(g);
      let { atim: v, mtim: x, ctim: R } = u(g);
      return r.writeFilestat(_, d, S, BigInt(w), v, x, R), o.WASI_ESUCCESS;
    } };
  };
}
function q(e, t, r) {
  return { proc_exit: (n) => {
    throw new W(n);
  }, proc_raise: (n) => o.WASI_ESUCCESS };
}
function ee(e, t, r) {
  return { random_get: (n, s) => {
    let i = r(), u = new Uint8Array(i.buffer, n, s);
    for (let a = 0; a < u.length; a += 65536) crypto.getRandomValues(u.subarray(a, a + 65536));
    return o.WASI_ESUCCESS;
  } };
}
var L = class {
  wasiImport;
  instance = null;
  isStarted = false;
  abi;
  constructor(e) {
    if (this.wasiImport = {}, this.abi = new o(), e?.features) {
      let t = {};
      for (let r of e.features) {
        let n = r.name || "Unknown feature", s = r(e, this.abi, this.view.bind(this));
        for (let i in s) {
          if (i in this.wasiImport) {
            let u = t[i] || "Unknown feature";
            throw Error(`Import conflict: Function '${i}' is already provided by '${u}' and is being redefined by '${n}'`);
          }
          t[i] = n;
        }
        this.wasiImport = { ...this.wasiImport, ...s };
      }
    }
    for (let t of o.IMPORT_FUNCTIONS) if (!(t in this.wasiImport)) this.wasiImport[t] = () => o.WASI_ENOSYS;
  }
  get exports() {
    if (!this.instance) throw Error("wasi.start() or wasi.initialize() has not been called");
    return this.instance.exports;
  }
  view() {
    if (!this.instance) throw Error("wasi.start() or wasi.initialize() has not been called");
    if (!this.instance.exports.memory) throw Error("instance.exports.memory is undefined");
    if (!(this.instance.exports.memory instanceof WebAssembly.Memory)) throw Error("instance.exports.memory is not a WebAssembly.Memory");
    return new DataView(this.instance.exports.memory.buffer);
  }
  async initialize(e) {
    if (this.isStarted) throw Error("wasi.start() or wasi.initialize() has already been called");
    if (this.isStarted = true, this.instance = e, !this.instance.exports._initialize) throw Error("instance.exports._initialize is undefined");
    if (typeof this.instance.exports._initialize !== "function") throw Error("instance.exports._initialize is not a function");
    await this.instance.exports._initialize();
  }
  async start(e) {
    if (this.isStarted) throw Error("wasi.start() or wasi.initialize() has already been called");
    if (this.isStarted = true, this.instance = e, !this.instance.exports._start) throw Error("instance.exports._start is undefined");
    if (typeof this.instance.exports._start !== "function") throw Error("instance.exports._start is not a function");
    try {
      return await this.instance.exports._start(), o.WASI_ESUCCESS;
    } catch (t) {
      if (t instanceof W) return t.code;
      throw t;
    }
  }
};
var k = /* @__PURE__ */ new WeakMap();
var ae = /* @__PURE__ */ new Set(["free", "malloc"]);
function le(e) {
  return !!e && (typeof e === "object" || typeof e === "function") && typeof e.then === "function";
}
function te(e, t) {
  return new Proxy(e, { get: (r, n) => t(r[n]) });
}
var V = class {
  value = void 0;
  suspendedStackPointer;
  exports = null;
  unwrappedExports;
  constructor(e) {
    this.unwrappedExports = /* @__PURE__ */ new Set([...ae, ...e?.unwrappedExports ?? []]);
  }
  getState() {
    if (!this.exports) throw Error("Exports not initialized");
    return this.exports.asyncify_get_state();
  }
  assertNoneState() {
    let e = this.getState();
    if (e !== 0) throw Error(`Invalid async state ${e}, expected 0.`);
  }
  wrapImportFn(e) {
    return (...t) => {
      if (this.getState() === 2) {
        if (!this.exports) throw Error("Exports not initialized");
        this.exports.asyncify_stop_rewind();
        let n = this.exports.__stack_pointer;
        if (n && this.suspendedStackPointer !== void 0) n.value = this.suspendedStackPointer;
        return this.value;
      }
      this.assertNoneState();
      let r = e(...t);
      if (!le(r)) return r;
      if (!this.exports) throw Error("Exports not initialized");
      this.suspendedStackPointer = this.exports.__stack_pointer?.value, this.exports.asyncify_start_unwind(16), this.value = r;
    };
  }
  wrapModuleImports(e) {
    return te(e, (t) => {
      if (typeof t === "function") return this.wrapImportFn(t);
      return t;
    });
  }
  wrapImports(e) {
    if (e === void 0) return;
    return te(e, (t = /* @__PURE__ */ Object.create(null)) => this.wrapModuleImports(t));
  }
  wrapExportFn(e) {
    let t = k.get(e);
    if (t !== void 0) return t;
    return t = (...r) => {
      this.assertNoneState();
      let n = e(...r);
      if (this.getState() !== 1) return this.assertNoneState(), n;
      return this.resumeExport(e, r, n);
    }, k.set(e, t), t;
  }
  async resumeExport(e, t, r) {
    let n = r;
    while (this.getState() === 1) {
      if (!this.exports) throw Error("Exports not initialized");
      this.exports.asyncify_stop_unwind();
      let s = this.exports.__stack_pointer, i = s?.value;
      if (s && this.suspendedStackPointer !== void 0) s.value = this.suspendedStackPointer;
      try {
        if (this.value = await this.value, this.assertNoneState(), s && i !== void 0) s.value = i;
        this.exports.asyncify_start_rewind(16), n = e(...t);
      } finally {
        if (s && i !== void 0) s.value = i;
      }
    }
    return this.assertNoneState(), n;
  }
  wrapExports(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let r in e) {
      let n = e[r];
      if (typeof n === "function" && !r.startsWith("asyncify_") && !this.unwrappedExports.has(r)) n = this.wrapExportFn(n);
      Object.defineProperty(t, r, { enumerable: true, value: n });
    }
    return k.set(e, t), t;
  }
  init(e, t) {
    let r = e.exports, n = r.memory || t?.env && t.env.memory;
    if (!n) throw Error("Memory not found in exports or imports.env");
    let s;
    if (r.__stack_pointer) s = r.__stack_pointer.value;
    else s = 1024;
    new Int32Array(n.buffer, 16).set([24, s]), this.exports = this.wrapExports(r), Object.setPrototypeOf(e, j.prototype);
  }
};
var j = class extends WebAssembly.Instance {
  constructor(e, t, r) {
    let n = new V(r);
    super(e, n.wrapImports(t));
    n.init(this, t);
  }
  get exports() {
    return k.get(super.exports);
  }
};
Object.defineProperty(j.prototype, "exports", { enumerable: true });
async function re(e, t, r) {
  let n = new V(r), s = e instanceof WebAssembly.Module ? e : await WebAssembly.compile(e), i = await WebAssembly.instantiate(s, n.wrapImports(t));
  return n.init(i, t), { instance: i, module: s };
}
var O = "./zeroperl.wasm";
function G(e, t, r) {
  let n = (u) => {
    if (!u) throw new b(r);
  }, s;
  try {
    s = e();
  } catch (u) {
    let a = t();
    if (C(a)) return Promise.resolve(a).then(() => {
      throw u;
    });
    throw u;
  }
  if (C(s)) return Promise.resolve(s).then(n).finally(t);
  let i = t();
  if (C(i)) return Promise.resolve(i).then(() => n(s));
  n(s);
}
var ue = ["zeroperl_last_error", "zeroperl_clear_error", "zeroperl_is_initialized", "zeroperl_can_evaluate", "zeroperl_flush", "zeroperl_new_int", "zeroperl_new_uint", "zeroperl_new_double", "zeroperl_new_string", "zeroperl_new_bool", "zeroperl_new_undef", "zeroperl_to_int", "zeroperl_to_double", "zeroperl_to_string", "zeroperl_to_bool", "zeroperl_is_undef", "zeroperl_get_type", "zeroperl_incref", "zeroperl_new_array", "zeroperl_array_push", "zeroperl_array_pop", "zeroperl_array_get", "zeroperl_array_length", "zeroperl_array_to_value", "zeroperl_value_to_array", "zeroperl_new_hash", "zeroperl_hash_get", "zeroperl_hash_exists", "zeroperl_hash_iter_new", "zeroperl_hash_iter_next", "zeroperl_hash_iter_free", "zeroperl_hash_to_value", "zeroperl_value_to_hash", "zeroperl_new_ref", "zeroperl_deref", "zeroperl_is_ref", "zeroperl_get_var", "zeroperl_get_array_var", "zeroperl_get_hash_var", "zeroperl_register_function", "zeroperl_register_method", "zeroperl_result_get", "zeroperl_set_host_error", "zeroperl_get_host_error", "zeroperl_clear_host_error"];
var b = class _b2 extends Error {
  exitCode;
  perlError;
  constructor(e, t, r) {
    super(e);
    if (this.name = "ZeroPerlError", this.exitCode = t, this.perlError = r, Error.captureStackTrace) Error.captureStackTrace(this, _b2);
  }
};
var U = new TextDecoder();
var Y = new TextEncoder();
function C(e) {
  return typeof e === "object" && e !== null && "then" in e;
}
var H = null;
function pe() {
  return typeof location < "u" && /^https?:$/.test(location.protocol);
}
async function ce(e) {
  if (!e && H) {
    let r = H.deref();
    if (r) return r;
  }
  let t;
  if (e) {
    let r = await e(O);
    if (!r.ok) throw new b(`WASM fetch failed: ${r.status} ${r.statusText}`);
    t = await r.arrayBuffer();
  } else if (pe()) {
    let r = await fetch(O);
    if (!r.ok) throw new b(`WASM fetch failed: ${r.status} ${r.statusText}`);
    t = await r.arrayBuffer();
  } else {
    let r = new URL(O, import.meta.url), n = decodeURIComponent(r.pathname);
    if (typeof Deno < "u") t = (await Deno.readFile(r)).slice().buffer;
    else if (typeof Bun < "u") t = await Bun.file(n).arrayBuffer();
    else {
      let { readFile: s } = await import("node:fs/promises"), i = await s(r);
      t = i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength);
    }
  }
  if (!e) H = new WeakRef(t);
  return t;
}
function he(e) {
  return ["undef", "true", "false", "int", "double", "string", "array", "hash", "code", "ref"][e] || "undef";
}
function ne(e) {
  return { void: 0, scalar: 1, list: 2 }[e];
}
var A = class _A {
  borrowed;
  ptr;
  exports;
  disposed = false;
  constructor(e, t, r = false) {
    this.borrowed = r;
    this.ptr = e, this.exports = t;
  }
  getPtr(e = this.exports) {
    if (this.checkDisposed(), this.exports !== e) throw new b("Cannot use a value from another interpreter");
    return this.ptr;
  }
  transferToHost(e) {
    if (this.getPtr(e), !this.borrowed) this.disposed = true;
    return this.ptr;
  }
  invalidateBorrowed() {
    if (this.borrowed) this.disposed = true;
  }
  checkOwned() {
    if (this.checkDisposed(), this.borrowed) throw new b("Callback arguments are borrowed; they cannot be released or reference-counted");
  }
  toInt() {
    this.checkDisposed();
    let e = this.exports.malloc(4);
    try {
      if (!this.exports.zeroperl_to_int(this.ptr, e)) throw new b("Failed to convert value to int");
      return new DataView(this.exports.memory.buffer).getInt32(e, true);
    } finally {
      this.exports.free(e);
    }
  }
  toDouble() {
    this.checkDisposed();
    let e = this.exports.malloc(8);
    try {
      if (!this.exports.zeroperl_to_double(this.ptr, e)) throw new b("Failed to convert value to double");
      return new DataView(this.exports.memory.buffer).getFloat64(e, true);
    } finally {
      this.exports.free(e);
    }
  }
  toString() {
    this.checkDisposed();
    let e = this.exports.malloc(4);
    try {
      let t = this.exports.zeroperl_to_string(this.ptr, e);
      if (t === 0) return "";
      let r = new DataView(this.exports.memory.buffer).getUint32(e, true);
      return U.decode(new Uint8Array(this.exports.memory.buffer, t, r));
    } finally {
      this.exports.free(e);
    }
  }
  toBoolean() {
    return this.checkDisposed(), this.exports.zeroperl_to_bool(this.ptr) !== 0;
  }
  isUndef() {
    return this.checkDisposed(), this.exports.zeroperl_is_undef(this.ptr) !== 0;
  }
  isRef() {
    return this.checkDisposed(), this.exports.zeroperl_is_ref(this.ptr) !== 0;
  }
  getType() {
    return this.checkDisposed(), he(this.exports.zeroperl_get_type(this.ptr));
  }
  project() {
    if (this.checkDisposed(), this.isUndef()) return null;
    switch (this.getType()) {
      case "true":
        return true;
      case "false":
        return false;
      case "int":
      case "double":
        return this.toDouble();
      case "string":
        return this.toString();
      default:
        return this.toString();
    }
  }
  createRef() {
    this.checkDisposed();
    let e = this.exports.zeroperl_new_ref(this.ptr);
    if (e === 0) throw new b("Failed to create reference");
    return new _A(e, this.exports);
  }
  deref() {
    this.checkDisposed();
    let e = this.exports.zeroperl_deref(this.ptr);
    if (e === 0) throw new b("Failed to dereference value");
    return new _A(e, this.exports);
  }
  incref() {
    this.checkOwned(), this.exports.zeroperl_incref(this.ptr);
  }
  decref() {
    return this.checkOwned(), this.exports.zeroperl_decref(this.ptr);
  }
  dispose() {
    if (this.disposed) return;
    this.checkOwned();
    let e = this.exports.zeroperl_value_free(this.ptr);
    return this.disposed = true, e;
  }
  checkDisposed() {
    if (this.disposed) throw new b("PerlValue has been disposed");
  }
};
var F = class _F {
  ptr;
  exports;
  perl;
  disposed = false;
  constructor(e, t, r) {
    this.ptr = e, this.exports = t, this.perl = r;
  }
  getPtr() {
    return this.checkDisposed(), this.ptr;
  }
  push(e) {
    this.checkDisposed();
    let t = this.perl.toPerlValue(e);
    try {
      this.exports.zeroperl_array_push(this.ptr, t.getPtr(this.exports));
    } finally {
      if (!(e instanceof A)) t.dispose();
    }
  }
  pop() {
    this.checkDisposed();
    let e = this.exports.zeroperl_array_pop(this.ptr);
    return e === 0 ? null : new A(e, this.exports);
  }
  get(e) {
    this.checkDisposed();
    let t = this.exports.zeroperl_array_get(this.ptr, e);
    return t === 0 ? null : new A(t, this.exports);
  }
  set(e, t) {
    this.checkDisposed();
    let r = this.perl.toPerlValue(t);
    return G(() => this.exports.zeroperl_array_set(this.ptr, e, r.getPtr(this.exports)), () => t instanceof A ? void 0 : r.dispose(), `Failed to set array element at index ${e}`);
  }
  getLength() {
    return this.checkDisposed(), this.exports.zeroperl_array_length(this.ptr);
  }
  clear() {
    return this.checkDisposed(), this.exports.zeroperl_array_clear(this.ptr);
  }
  toValue() {
    this.checkDisposed();
    let e = this.exports.zeroperl_array_to_value(this.ptr);
    if (e === 0) throw new b("Failed to convert array to value");
    return new A(e, this.exports);
  }
  project() {
    this.checkDisposed();
    let e = this.getLength(), t = [];
    for (let r = 0; r < e; r++) {
      let n = this.get(r);
      if (n) t.push(n.project()), n.dispose();
      else t.push(null);
    }
    return t;
  }
  static fromValue(e, t) {
    let r = e.exports, n = r.zeroperl_value_to_array(e.getPtr(r));
    return n === 0 ? null : new _F(n, r, t);
  }
  *[Symbol.iterator]() {
    let e = this.getLength();
    for (let t = 0; t < e; t++) {
      let r = this.get(t);
      if (r) yield r;
    }
  }
  dispose() {
    if (this.disposed) return;
    let e = this.exports.zeroperl_array_free(this.ptr);
    return this.disposed = true, e;
  }
  checkDisposed() {
    if (this.disposed) throw new b("PerlArray has been disposed");
  }
};
var N = class _N {
  ptr;
  exports;
  perl;
  disposed = false;
  constructor(e, t, r) {
    this.ptr = e, this.exports = t, this.perl = r;
  }
  getPtr() {
    return this.checkDisposed(), this.ptr;
  }
  set(e, t) {
    this.checkDisposed();
    let r = this.perl.toPerlValue(t), n = this.writeCString(e);
    return G(() => this.exports.zeroperl_hash_set(this.ptr, n, r.getPtr(this.exports)), () => (this.exports.free(n), t instanceof A ? void 0 : r.dispose()), `Failed to set hash key '${e}'`);
  }
  get(e) {
    this.checkDisposed();
    let t = this.writeCString(e);
    try {
      let r = this.exports.zeroperl_hash_get(this.ptr, t);
      return r === 0 ? null : new A(r, this.exports);
    } finally {
      this.exports.free(t);
    }
  }
  has(e) {
    this.checkDisposed();
    let t = this.writeCString(e);
    try {
      return this.exports.zeroperl_hash_exists(this.ptr, t) !== 0;
    } finally {
      this.exports.free(t);
    }
  }
  delete(e) {
    this.checkDisposed();
    let t = this.writeCString(e), r = this.exports.zeroperl_hash_delete(this.ptr, t);
    if (C(r)) return r.then((n) => n !== 0).finally(() => this.exports.free(t));
    return this.exports.free(t), r !== 0;
  }
  clear() {
    return this.checkDisposed(), this.exports.zeroperl_hash_clear(this.ptr);
  }
  toValue() {
    this.checkDisposed();
    let e = this.exports.zeroperl_hash_to_value(this.ptr);
    if (e === 0) throw new b("Failed to convert hash to value");
    return new A(e, this.exports);
  }
  project() {
    this.checkDisposed();
    let e = {};
    for (let [t, r] of this.entries()) Object.defineProperty(e, t, { value: r.project(), enumerable: true, writable: true, configurable: true }), r.dispose();
    return e;
  }
  static fromValue(e, t) {
    let r = e.exports, n = r.zeroperl_value_to_hash(e.getPtr(r));
    return n === 0 ? null : new _N(n, r, t);
  }
  *entries() {
    this.checkDisposed();
    let e = this.exports.zeroperl_hash_iter_new(this.ptr);
    if (e === 0) throw new b("Failed to create hash iterator");
    let t = this.exports.malloc(4), r = this.exports.malloc(4);
    try {
      while (this.exports.zeroperl_hash_iter_next(e, t, r)) {
        let n = new DataView(this.exports.memory.buffer), s = n.getUint32(t, true), i = n.getUint32(r, true);
        yield [this.readCString(s), new A(i, this.exports)];
      }
    } finally {
      this.exports.free(t), this.exports.free(r), this.exports.zeroperl_hash_iter_free(e);
    }
  }
  *keys() {
    for (let [e, t] of this.entries()) t.dispose(), yield e;
  }
  *values() {
    for (let [, e] of this.entries()) yield e;
  }
  dispose() {
    if (this.disposed) return;
    let e = this.exports.zeroperl_hash_free(this.ptr);
    return this.disposed = true, e;
  }
  writeCString(e) {
    let t = Y.encode(`${e}\0`), r = this.exports.malloc(t.length);
    return new Uint8Array(this.exports.memory.buffer).set(t, r), r;
  }
  readCString(e) {
    if (e === 0) return "";
    let t = new Uint8Array(this.exports.memory.buffer), r = 0;
    while (t[e + r] !== 0) r++;
    return U.decode(t.subarray(e, e + r));
  }
  checkDisposed() {
    if (this.disposed) throw new b("PerlHash has been disposed");
  }
};
var X = class _X {
  wasi;
  isDisposed = false;
  hostFunctions = /* @__PURE__ */ new Map();
  nextFuncId = 1;
  constructor(e) {
    this.wasi = e;
  }
  get exports() {
    return this.wasi.exports;
  }
  static async create(e = {}) {
    let t = e.wasmModule ?? await ce(e.fetch), r = e.fileSystem || new D({ "/": "" }), n = { env: e.env || {}, args: ["zeroperl"], features: [Z, J, ee, K, q, M({ withFileSystem: r, withStdIo: { stdout: (I) => e.stdout?.(I), stderr: (I) => e.stderr?.(I) } })] }, s = new L(n), i = new _X(s), u = (I, l, c) => i.handleHostCall(I, l, c), { instance: a } = await re(t, { wasi_snapshot_preview1: s.wasiImport, env: { call_host_function: u } }, { unwrappedExports: ue });
    await s.initialize(a);
    let f = await i.exports.zeroperl_init();
    if (f !== 0) throw new b("Failed to initialize Perl interpreter", f, i.getLastError());
    return i;
  }
  handleHostResult(e) {
    if (e instanceof A) return e.transferToHost(this.exports);
    let t = this.exports.zeroperl_new_undef();
    if (t === 0) return this.setHostError("Failed to allocate return value"), 0;
    return t;
  }
  handleHostCall(e, t, r) {
    let n = this.hostFunctions.get(e);
    if (!n) return this.setHostError(`Host function ${e} not found`), 0;
    let s = [], i = () => s.forEach((a) => a.invalidateBorrowed()), u = false;
    try {
      if (t > 0) {
        let f = new DataView(this.exports.memory.buffer);
        for (let I = 0; I < t; I++) {
          let l = f.getUint32(r + I * 4, true);
          if (l !== 0) s.push(new A(l, this.exports, true));
        }
      }
      let a = n(...s);
      if (C(a)) return u = true, Promise.resolve(a).then((f) => this.handleHostResult(f)).catch((f) => (this.setHostError(f instanceof Error ? f.message : String(f)), 0)).finally(i);
      return this.handleHostResult(a);
    } catch (a) {
      return this.setHostError(a instanceof Error ? a.message : String(a)), 0;
    } finally {
      if (!u) i();
    }
  }
  setHostError(e) {
    let t = this.writeCString(e);
    if (t) this.exports.zeroperl_set_host_error(t), this.exports.free(t);
  }
  createInt(e) {
    this.checkDisposed();
    let t = this.exports.zeroperl_new_int(Math.floor(e));
    if (t === 0) throw new b("Failed to create integer value");
    return new A(t, this.exports);
  }
  createUInt(e) {
    this.checkDisposed();
    let t = this.exports.zeroperl_new_uint(Math.floor(Math.abs(e)));
    if (t === 0) throw new b("Failed to create unsigned integer value");
    return new A(t, this.exports);
  }
  createDouble(e) {
    this.checkDisposed();
    let t = this.exports.zeroperl_new_double(e);
    if (t === 0) throw new b("Failed to create double value");
    return new A(t, this.exports);
  }
  createString(e) {
    this.checkDisposed();
    let t = Y.encode(e), r = this.exports.malloc(t.length);
    new Uint8Array(this.exports.memory.buffer).set(t, r);
    try {
      let n = this.exports.zeroperl_new_string(r, t.length);
      if (n === 0) throw new b("Failed to create string value");
      return new A(n, this.exports);
    } finally {
      this.exports.free(r);
    }
  }
  createBool(e) {
    this.checkDisposed();
    let t = this.exports.zeroperl_new_bool(e ? 1 : 0);
    if (t === 0) throw new b("Failed to create boolean value");
    return new A(t, this.exports);
  }
  createUndef() {
    this.checkDisposed();
    let e = this.exports.zeroperl_new_undef();
    if (e === 0) throw new b("Failed to create undef value");
    return new A(e, this.exports);
  }
  createArray(e) {
    this.checkDisposed();
    let t = this.exports.zeroperl_new_array();
    if (t === 0) throw new b("Failed to create array");
    let r = new F(t, this.exports, this);
    if (e) for (let n of e) r.push(n);
    return r;
  }
  createHash(e) {
    this.checkDisposed();
    let t = this.exports.zeroperl_new_hash();
    if (t === 0) throw new b("Failed to create hash");
    let r = new N(t, this.exports, this);
    if (e) for (let [n, s] of Object.entries(e)) r.set(n, s);
    return r;
  }
  toPerlValue(e) {
    if (e instanceof A) return e.getPtr(this.exports), e;
    if (e === null || e === void 0) return this.createUndef();
    if (typeof e === "boolean") return this.createBool(e);
    if (typeof e === "number") return Number.isInteger(e) && e >= -2147483648 && e <= 2147483647 ? this.createInt(e) : this.createDouble(e);
    if (typeof e === "string") return this.createString(e);
    if (Array.isArray(e)) {
      let t = this.createArray(e), r = t.toValue();
      return t.dispose(), r;
    }
    if (typeof e === "object") {
      let t = this.createHash(e), r = t.toValue();
      return t.dispose(), r;
    }
    throw new b(`Cannot convert value of type ${typeof e} to PerlValue`);
  }
  getVariable(e) {
    this.checkDisposed();
    let t = this.writeCString(e);
    try {
      let r = this.exports.zeroperl_get_var(t);
      return r === 0 ? null : new A(r, this.exports);
    } finally {
      this.exports.free(t);
    }
  }
  getArrayVariable(e) {
    this.checkDisposed();
    let t = this.writeCString(e);
    try {
      let r = this.exports.zeroperl_get_array_var(t);
      return r === 0 ? null : new F(r, this.exports, this);
    } finally {
      this.exports.free(t);
    }
  }
  getHashVariable(e) {
    this.checkDisposed();
    let t = this.writeCString(e);
    try {
      let r = this.exports.zeroperl_get_hash_var(t);
      return r === 0 ? null : new N(r, this.exports, this);
    } finally {
      this.exports.free(t);
    }
  }
  setVariable(e, t) {
    this.checkDisposed();
    let r = this.toPerlValue(t), n = this.writeCString(e);
    return G(() => this.exports.zeroperl_set_var(n, r.getPtr(this.exports)), () => (this.exports.free(n), t instanceof A ? void 0 : r.dispose()), `Failed to set variable '${e}'`);
  }
  registerFunction(e, t) {
    this.checkDisposed();
    let r = this.nextFuncId++;
    this.hostFunctions.set(r, t);
    let n = this.writeCString(e);
    try {
      this.exports.zeroperl_register_function(r, n);
    } finally {
      this.exports.free(n);
    }
  }
  registerMethod(e, t, r) {
    this.checkDisposed();
    let n = this.nextFuncId++;
    this.hostFunctions.set(n, r);
    let s = this.writeCString(e), i = this.writeCString(t);
    try {
      this.exports.zeroperl_register_method(n, s, i);
    } finally {
      this.exports.free(s), this.exports.free(i);
    }
  }
  async call(e, t = [], r = "scalar") {
    this.checkDisposed();
    let n = t.map((a, f) => {
      if (!a) throw new b(`Argument at index ${f} is undefined`);
      return a.getPtr(this.exports);
    }), s = this.writeCString(e), i = ne(r), u = 0;
    if (t.length > 0) {
      u = this.exports.malloc(t.length * 4);
      let a = new DataView(this.exports.memory.buffer);
      for (let f = 0; f < t.length; f++) a.setUint32(u + f * 4, n[f], true);
    }
    try {
      let a = await this.exports.zeroperl_call(s, i, t.length, u);
      if (a === 0) {
        if (r === "void") return;
        if (r === "scalar") return null;
        return [];
      }
      let f = new DataView(this.exports.memory.buffer), I = f.getInt32(a, true), l = [];
      for (let m = 0; m < I; m++) {
        let h = this.exports.zeroperl_result_get(a, m);
        if (h !== 0) l.push(new A(h, this.exports));
      }
      let c = f.getUint32(a + 4, true);
      if (c !== 0) this.exports.free(c);
      if (this.exports.free(a), r === "void") {
        for (let m of l) await m.dispose();
        return;
      }
      if (r === "scalar") return l[0] ?? null;
      return l;
    } catch (a) {
      if (a instanceof W) {
        if (r === "void") return;
        if (r === "scalar") return null;
        return [];
      }
      throw a;
    } finally {
      if (this.exports.free(s), u !== 0) this.exports.free(u);
    }
  }
  async eval(e, t = []) {
    this.checkDisposed();
    let r = this.writeCString(e), n = 0, s = [];
    if (t.length > 0) {
      let i = this.writeStringArray(t);
      n = i.argv, s = i.buffers;
    }
    try {
      let i = await this.exports.zeroperl_eval(r, ne("scalar"), t.length, n);
      if (i !== 0) return { success: false, error: this.getLastError(), exitCode: i };
      return { success: true, exitCode: 0 };
    } catch (i) {
      if (i instanceof W) {
        if (i.code !== 0) return { success: false, error: this.getLastError(), exitCode: i.code };
        return { success: true, exitCode: 0 };
      }
      throw i;
    } finally {
      if (this.exports.free(r), s.length > 0) this.freeStringArray(n, s);
    }
  }
  async runFile(e, t = []) {
    this.checkDisposed();
    let r = this.writeCString(e), n = 0, s = [];
    if (t.length > 0) {
      let i = this.writeStringArray(t);
      n = i.argv, s = i.buffers;
    }
    try {
      let i = await this.exports.zeroperl_run_file(r, t.length, n);
      if (i !== 0) return { success: false, error: this.getLastError(), exitCode: i };
      return { success: true, exitCode: 0 };
    } catch (i) {
      if (i instanceof W) {
        if (i.code !== 0) return { success: false, error: this.getLastError(), exitCode: i.code };
        return { success: true, exitCode: 0 };
      }
      throw i;
    } finally {
      if (this.exports.free(r), s.length > 0) this.freeStringArray(n, s);
    }
  }
  async reset() {
    this.checkDisposed();
    let e = await this.exports.zeroperl_reset();
    if (e !== 0) throw new b("Failed to reset Perl interpreter", e, this.getLastError());
  }
  flush() {
    if (this.checkDisposed(), this.exports.zeroperl_flush() !== 0) throw new b("Failed to flush output buffers");
  }
  getLastError() {
    return this.checkDisposed(), this.readCString(this.exports.zeroperl_last_error());
  }
  clearError() {
    this.checkDisposed(), this.exports.zeroperl_clear_error();
  }
  isInitialized() {
    return this.checkDisposed(), this.exports.zeroperl_is_initialized() !== 0;
  }
  canEvaluate() {
    return this.checkDisposed(), this.exports.zeroperl_can_evaluate() !== 0;
  }
  dispose() {
    if (this.isDisposed) return;
    let e = this.exports.zeroperl_free_interpreter();
    if (this.isDisposed = true, C(e)) return e.finally(() => this.hostFunctions.clear());
    this.hostFunctions.clear();
  }
  shutdown() {
    if (this.isDisposed) return;
    let e = this.exports.zeroperl_shutdown();
    if (this.isDisposed = true, C(e)) return e.finally(() => this.hostFunctions.clear());
    this.hostFunctions.clear();
  }
  writeCString(e) {
    let t = Y.encode(`${e}\0`), r = this.exports.malloc(t.length);
    return new Uint8Array(this.exports.memory.buffer).set(t, r), r;
  }
  readCString(e) {
    if (e === 0) return "";
    let t = new Uint8Array(this.exports.memory.buffer), r = 0;
    while (t[e + r] !== 0) r++;
    return U.decode(t.subarray(e, e + r));
  }
  writeStringArray(e) {
    let t = [], r = this.exports.malloc(e.length * 4);
    for (let n = 0; n < e.length; n++) {
      let s = e[n];
      if (s === void 0) throw new b(`Argument at index ${n} is undefined`);
      let i = this.writeCString(s);
      t.push(i), new DataView(this.exports.memory.buffer).setUint32(r + n * 4, i, true);
    }
    return { argv: r, buffers: t };
  }
  freeStringArray(e, t) {
    for (let r of t) this.exports.free(r);
    this.exports.free(e);
  }
  checkDisposed() {
    if (this.isDisposed) throw new b("ZeroPerl instance has been disposed");
  }
};

// node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b2 = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b2[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b2[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j2 = b2[i]; j2 < b2[i + 1]; ++j2) {
      r[j2] = j2 - b2[i] << 5 | i;
    }
  }
  return { b: b2, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le2 = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le2[i] = le2[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le2[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le2[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
});
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o2 = p / 8 | 0;
  return (d[o2] | d[o2 + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o2 = p / 8 | 0;
  return (d[o2] | d[o2 + 1] << 8 | d[o2 + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b2 = fleb[i];
          add = bits(dat, pos, (1 << b2) - 1) + fl[i];
          pos += b2;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b2 = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b2) - 1, pos += b2;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var gzs = function(d) {
  if (d[0] != 31 || d[1] != 139 || d[2] != 8)
    err(6, "invalid gzip data");
  var flg = d[3];
  var st = 10;
  if (flg & 4)
    st += (d[10] | d[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
    ;
  return st + (flg & 2);
};
var gzl = function(d) {
  var l = d.length;
  return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
function gunzipSync(data, opts) {
  var st = gzs(data);
  if (st + 8 > data.length)
    err(6, "invalid gzip data");
  return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}

// node_modules/modern-tar/dist/packer-kJPaRbFA.js
var FILE = "file";
var LINK = "link";
var SYMLINK = "symlink";
var DIRECTORY = "directory";
var FLAGTYPE = {
  "0": FILE,
  "1": LINK,
  "2": SYMLINK,
  "3": "character-device",
  "4": "block-device",
  "5": DIRECTORY,
  "6": "fifo",
  x: "pax-header",
  g: "pax-global-header",
  L: "gnu-long-name",
  K: "gnu-long-link-name"
};
var EMPTY = /* @__PURE__ */ new Uint8Array(0);
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function readString(view, offset, size) {
  if (view[offset] === 0) return "";
  const end = view.indexOf(0, offset);
  const sliceEnd = end === -1 || end > offset + size ? offset + size : end;
  return decoder.decode(view.subarray(offset, sliceEnd));
}
function readOctal(view, offset, size) {
  let value = 0;
  const end = offset + size;
  for (let i = offset; i < end; i++) {
    const charCode = view[i];
    if (charCode === 0) break;
    if (charCode === 32) continue;
    value = value * 8 + (charCode - 48);
  }
  return value;
}
function readNumeric(view, offset, size) {
  if (view[offset] & 128) {
    let result = 0;
    result = view[offset] & 127;
    for (let i = 1; i < size; i++) result = result * 256 + view[offset + i];
    if (!Number.isSafeInteger(result)) throw new Error("TAR number too large");
    return result;
  }
  return readOctal(view, offset, size);
}
var isBodyless = (header) => header.type === "directory" || header.type === "symlink" || header.type === "link" || header.type === "character-device" || header.type === "block-device" || header.type === "fifo";
var stripPath = (p, n) => {
  const parts = p.split("/").filter(Boolean);
  return n >= parts.length ? "" : parts.slice(n).join("/");
};
function transformHeader(header, options) {
  const { strip, filter, map } = options;
  if (!strip && !filter && !map) return header;
  const h = { ...header };
  if (strip && strip > 0) {
    const newName = stripPath(h.name, strip);
    if (!newName) return null;
    h.name = h.type === "directory" && !newName.endsWith("/") ? `${newName}/` : newName;
    if (h.linkname) {
      const isAbsolute = h.linkname.startsWith("/");
      if (isAbsolute || h.type === "link") {
        const stripped = stripPath(h.linkname, strip);
        h.linkname = isAbsolute ? `/${stripped}` || "/" : stripped;
      }
    }
  }
  if (filter?.(h) === false) return null;
  const result = map ? map(h) : h;
  if (result && (!result.name?.trim() || result.name === "." || result.name === "/")) return null;
  return result;
}
var INITIAL_CAPACITY = 256;
function createChunkQueue() {
  let chunks = new Array(INITIAL_CAPACITY);
  let capacityMask = chunks.length - 1;
  let head = 0;
  let tail = 0;
  let totalAvailable = 0;
  const consumeFromHead = (count) => {
    const chunk = chunks[head];
    if (count === chunk.length) {
      chunks[head] = EMPTY;
      head = head + 1 & capacityMask;
    } else chunks[head] = chunk.subarray(count);
    totalAvailable -= count;
    if (totalAvailable === 0 && chunks.length > INITIAL_CAPACITY) {
      chunks = new Array(INITIAL_CAPACITY);
      capacityMask = 255;
      head = 0;
      tail = 0;
    }
  };
  function pull(bytes2, callback) {
    if (callback) {
      let fed = 0;
      let remaining2 = Math.min(bytes2, totalAvailable);
      while (remaining2 > 0) {
        const chunk = chunks[head];
        const toFeed = Math.min(remaining2, chunk.length);
        const segment = toFeed === chunk.length ? chunk : chunk.subarray(0, toFeed);
        consumeFromHead(toFeed);
        remaining2 -= toFeed;
        fed += toFeed;
        if (!callback(segment)) break;
      }
      return fed;
    }
    if (totalAvailable < bytes2) return null;
    if (bytes2 === 0) return EMPTY;
    const firstChunk = chunks[head];
    if (firstChunk.length >= bytes2) {
      const view = firstChunk.length === bytes2 ? firstChunk : firstChunk.subarray(0, bytes2);
      consumeFromHead(bytes2);
      return view;
    }
    const result = new Uint8Array(bytes2);
    let copied = 0;
    let remaining = bytes2;
    while (remaining > 0) {
      const chunk = chunks[head];
      const toCopy = Math.min(remaining, chunk.length);
      result.set(toCopy === chunk.length ? chunk : chunk.subarray(0, toCopy), copied);
      copied += toCopy;
      remaining -= toCopy;
      consumeFromHead(toCopy);
    }
    return result;
  }
  return {
    push: (chunk) => {
      if (chunk.length === 0) return;
      let nextTail = tail + 1 & capacityMask;
      if (nextTail === head) {
        const oldLen = chunks.length;
        const newLen = oldLen * 2;
        const newChunks = new Array(newLen);
        const count = tail - head + oldLen & oldLen - 1;
        if (head < tail) for (let i = 0; i < count; i++) newChunks[i] = chunks[head + i];
        else {
          const firstPart = oldLen - head;
          for (let i = 0; i < firstPart; i++) newChunks[i] = chunks[head + i];
          for (let i = 0; i < tail; i++) newChunks[firstPart + i] = chunks[i];
        }
        chunks = newChunks;
        capacityMask = newLen - 1;
        head = 0;
        tail = count;
        nextTail = tail + 1 & capacityMask;
      }
      chunks[tail] = chunk;
      tail = nextTail;
      totalAvailable += chunk.length;
    },
    available: () => totalAvailable,
    peek: (bytes2) => {
      if (totalAvailable < bytes2) return null;
      if (bytes2 === 0) return EMPTY;
      const firstChunk = chunks[head];
      if (firstChunk.length >= bytes2) return firstChunk.length === bytes2 ? firstChunk : firstChunk.subarray(0, bytes2);
      const result = new Uint8Array(bytes2);
      let copied = 0;
      let index = head;
      while (copied < bytes2) {
        const chunk = chunks[index];
        const toCopy = Math.min(bytes2 - copied, chunk.length);
        if (toCopy === chunk.length) result.set(chunk, copied);
        else result.set(chunk.subarray(0, toCopy), copied);
        copied += toCopy;
        index = index + 1 & capacityMask;
      }
      return result;
    },
    discard: (bytes2) => {
      if (bytes2 > totalAvailable) throw new Error("Too many bytes consumed");
      if (bytes2 === 0) return;
      let remaining = bytes2;
      while (remaining > 0) {
        const chunk = chunks[head];
        const toConsume = Math.min(remaining, chunk.length);
        consumeFromHead(toConsume);
        remaining -= toConsume;
      }
    },
    pull
  };
}
var CHECKSUM_SPACE = 32;
function validateChecksum(block) {
  const stored = readOctal(block, 148, 8);
  let sum = 0;
  for (let i = 0; i < block.length; i++) if (i >= 148 && i < 156) sum += CHECKSUM_SPACE;
  else sum += block[i];
  return stored === sum;
}
function parseUstarHeader(block, strict) {
  if (strict && !validateChecksum(block)) throw new Error("Invalid tar header checksum.");
  const typeflag = readString(block, 156, 1);
  const header = {
    name: readString(block, 0, 100),
    mode: readOctal(block, 100, 8),
    uid: readNumeric(block, 108, 8),
    gid: readNumeric(block, 116, 8),
    size: readNumeric(block, 124, 12),
    mtime: /* @__PURE__ */ new Date(readNumeric(block, 136, 12) * 1e3),
    type: FLAGTYPE[typeflag] || "file",
    linkname: readString(block, 157, 100)
  };
  const magic = readString(block, 257, 6);
  if (magic.trim() === "ustar") {
    header.uname = readString(block, 265, 32);
    header.gname = readString(block, 297, 32);
  }
  if (magic === "ustar") header.prefix = readString(block, 345, 155);
  return header;
}
var PAX_MAPPING = {
  path: ["name", (v) => v],
  linkpath: ["linkname", (v) => v],
  size: ["size", (v) => /^\d+$/.test(v) && Number.isSafeInteger(+v) ? +v : NaN],
  mtime: ["mtime", parseFloat],
  uid: ["uid", (v) => parseInt(v, 10)],
  gid: ["gid", (v) => parseInt(v, 10)],
  uname: ["uname", (v) => v],
  gname: ["gname", (v) => v]
};
function parsePax(buffer) {
  const overrides = /* @__PURE__ */ Object.create(null);
  const pax = /* @__PURE__ */ Object.create(null);
  let isPax = false;
  let offset = 0;
  while (offset < buffer.length) {
    const spaceIndex = buffer.indexOf(32, offset);
    if (spaceIndex === -1) break;
    const length = parseInt(decoder.decode(buffer.subarray(offset, spaceIndex)), 10);
    if (!(length > 0)) break;
    const recordEnd = offset + length;
    const recordStr = decoder.decode(buffer.subarray(spaceIndex + 1, recordEnd - 1));
    const equalsIndex = recordStr.indexOf("=");
    if (equalsIndex > 0) {
      const key = recordStr.slice(0, equalsIndex);
      const value = recordStr.slice(equalsIndex + 1);
      pax[key] = value;
      isPax = true;
      if (Object.hasOwn(PAX_MAPPING, key)) {
        const [targetKey, parser] = PAX_MAPPING[key];
        const parsedValue = parser(value);
        if (typeof parsedValue === "string" || !Number.isNaN(parsedValue)) overrides[targetKey] = parsedValue;
      }
    }
    offset = recordEnd;
  }
  if (isPax) overrides.pax = pax;
  return overrides;
}
function applyOverrides(header, overrides) {
  if (overrides.name !== void 0) header.name = overrides.name;
  if (overrides.linkname !== void 0) header.linkname = overrides.linkname;
  if (overrides.size !== void 0) header.size = overrides.size;
  if (overrides.mtime !== void 0) header.mtime = /* @__PURE__ */ new Date(overrides.mtime * 1e3);
  if (overrides.uid !== void 0) header.uid = overrides.uid;
  if (overrides.gid !== void 0) header.gid = overrides.gid;
  if (overrides.uname !== void 0) header.uname = overrides.uname;
  if (overrides.gname !== void 0) header.gname = overrides.gname;
  if (overrides.pax) header.pax = Object.assign({}, header.pax ?? {}, overrides.pax);
}
function getMetaParser(type) {
  switch (type) {
    case "pax-global-header":
    case "pax-header":
      return parsePax;
    case "gnu-long-name":
      return (data) => ({ name: readString(data, 0, data.length) });
    case "gnu-long-link-name":
      return (data) => ({ linkname: readString(data, 0, data.length) });
    default:
      return;
  }
}
var STATE_HEADER = 0;
var STATE_BODY = 1;
var MAX_META_SIZE = 8388608;
var truncateErr = /* @__PURE__ */ new Error("Tar archive is truncated.");
function createUnpacker(options = {}) {
  const strict = options.strict ?? false;
  const { available, peek, push, discard, pull } = createChunkQueue();
  let state = STATE_HEADER;
  let ended = false;
  let done = false;
  let eof = false;
  let currentEntry = null;
  const paxGlobals = {};
  let nextEntryOverrides = {};
  const unpacker = {
    isEntryActive: () => state === STATE_BODY,
    isBodyComplete: () => !currentEntry || currentEntry.remaining === 0,
    canFinish: () => !currentEntry || available() >= currentEntry.remaining + currentEntry.padding,
    bodyBytes: () => currentEntry && currentEntry.remaining > 0 ? Math.min(currentEntry.remaining, available()) : 0,
    available,
    write(chunk) {
      if (ended) throw new Error("Archive already ended.");
      push(chunk);
    },
    end() {
      ended = true;
    },
    readHeader() {
      if (state !== STATE_HEADER) throw new Error("Cannot read header while an entry is active");
      if (done) return void 0;
      while (!done) {
        if (available() < 512) {
          if (ended) {
            if (available() > 0 && strict) throw truncateErr;
            done = true;
            return;
          }
          return null;
        }
        const headerBlock = peek(512);
        if (isZeroBlock(headerBlock)) {
          if (available() < 1024) {
            if (ended) {
              if (strict) throw truncateErr;
              done = true;
              return;
            }
            return null;
          }
          if (isZeroBlock(peek(1024).subarray(512))) {
            discard(1024);
            done = true;
            eof = true;
            return;
          }
          if (strict) throw new Error("Invalid tar header.");
          discard(512);
          continue;
        }
        let internalHeader;
        try {
          internalHeader = parseUstarHeader(headerBlock, strict);
        } catch (err2) {
          if (strict) throw err2;
          discard(512);
          continue;
        }
        const metaParser = getMetaParser(internalHeader.type);
        if (metaParser) {
          if (internalHeader.size > MAX_META_SIZE) throw new Error("Tar metadata entry exceeds maximum size.");
          const paddedSize = internalHeader.size + (-internalHeader.size & 511);
          if (available() < 512 + paddedSize) {
            if (ended && strict) throw truncateErr;
            return null;
          }
          discard(512);
          const overrides = metaParser(pull(paddedSize).subarray(0, internalHeader.size));
          if (nextEntryOverrides.pax) nextEntryOverrides = {};
          const target = internalHeader.type === "pax-global-header" ? paxGlobals : nextEntryOverrides;
          for (const key in overrides) target[key] = overrides[key];
          continue;
        }
        discard(512);
        const header = internalHeader;
        if (internalHeader.prefix) header.name = `${internalHeader.prefix}/${header.name}`;
        applyOverrides(header, paxGlobals);
        applyOverrides(header, nextEntryOverrides);
        let archiveSize = header.size;
        if (isBodyless(header)) {
          archiveSize = 0;
          header.size = 0;
        } else if (header.name.endsWith("/") && header.type === "file") {
          header.type = DIRECTORY;
          header.size = 0;
        }
        nextEntryOverrides = {};
        currentEntry = {
          header,
          remaining: archiveSize,
          padding: -archiveSize & 511
        };
        state = STATE_BODY;
        return header;
      }
    },
    streamBody(callback) {
      if (state !== STATE_BODY || !currentEntry || currentEntry.remaining === 0) return 0;
      const bytesToFeed = Math.min(currentEntry.remaining, available());
      if (bytesToFeed === 0) return 0;
      const fed = pull(bytesToFeed, callback);
      currentEntry.remaining -= fed;
      return fed;
    },
    skipPadding() {
      if (state !== STATE_BODY || !currentEntry) return true;
      if (currentEntry.remaining > 0) throw new Error("Body not fully consumed");
      if (available() < currentEntry.padding) return false;
      discard(currentEntry.padding);
      currentEntry = null;
      state = STATE_HEADER;
      return true;
    },
    skipEntry() {
      if (state !== STATE_BODY || !currentEntry) return true;
      const toDiscard = Math.min(currentEntry.remaining, available());
      if (toDiscard > 0) {
        discard(toDiscard);
        currentEntry.remaining -= toDiscard;
      }
      if (currentEntry.remaining > 0) return false;
      return unpacker.skipPadding();
    },
    validateEOF() {
      if (strict) {
        if (!eof) throw truncateErr;
        if (available() > 0) {
          if (pull(available()).some((byte) => byte !== 0)) throw new Error("Invalid EOF.");
        }
      }
    }
  };
  return unpacker;
}
function isZeroBlock(block) {
  if (block[0] !== 0) return false;
  if (block.byteOffset % 8 === 0) {
    const view = new BigUint64Array(block.buffer, block.byteOffset, block.length / 8);
    for (let i = 0; i < view.length; i++) if (view[i] !== 0n) return false;
    return true;
  }
  for (let i = 0; i < block.length; i++) if (block[i] !== 0) return false;
  return true;
}

// node_modules/modern-tar/dist/web/index.js
async function streamToBuffer(stream) {
  const chunks = [];
  const reader = stream.getReader();
  let totalLength = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      totalLength += value.length;
    }
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  } finally {
    reader.releaseLock();
  }
}
var drain = (stream) => stream.pipeTo(new WritableStream());
var BUFFER_LIMIT = 1048576;
var RESUME_LIMIT = BUFFER_LIMIT / 2;
function createTarDecoder(options = {}) {
  const unpacker = createUnpacker(options);
  const strict = options.strict ?? false;
  let controller = null;
  let bodyController = null;
  let pumping = false;
  let blocked = false;
  let resume = null;
  let abortHooked = false;
  let eofReached = false;
  let sourceEnded = false;
  let closed = false;
  const unblock = () => {
    resume?.();
    resume = null;
  };
  const closeBody = () => {
    try {
      bodyController?.close();
    } catch {
    }
    bodyController = null;
  };
  const fail = (reason) => {
    if (closed) return;
    closed = true;
    try {
      bodyController?.error(reason);
    } catch {
    }
    bodyController = null;
    try {
      controller.error(reason);
    } catch {
    }
    controller = null;
    unblock();
  };
  const finish = () => {
    if (closed) return;
    closed = true;
    closeBody();
    try {
      controller.close();
    } catch {
    }
    controller = null;
    unblock();
  };
  const truncateOrFinish = () => {
    if (strict) throw new Error("Tar archive is truncated.");
    finish();
  };
  const pump = () => {
    if (pumping || closed || !controller) return;
    blocked = false;
    pumping = true;
    try {
      while (true) {
        if (eofReached) {
          if (sourceEnded) {
            unpacker.validateEOF();
            finish();
          }
          break;
        }
        if (unpacker.isEntryActive()) {
          if (sourceEnded && !unpacker.canFinish()) {
            truncateOrFinish();
            break;
          }
          if (bodyController) {
            if ((bodyController.desiredSize ?? 1) <= 0) {
              blocked = true;
              break;
            }
            if (unpacker.streamBody((c) => (bodyController.enqueue(c), (bodyController.desiredSize ?? 1) > 0)) === 0 && !unpacker.isBodyComplete()) {
              if (sourceEnded) truncateOrFinish();
              break;
            }
          } else if (!unpacker.skipEntry()) {
            if (sourceEnded) truncateOrFinish();
            break;
          }
          if (unpacker.isBodyComplete()) {
            closeBody();
            if (!unpacker.skipPadding()) {
              if (sourceEnded) truncateOrFinish();
              break;
            }
          }
        } else {
          if ((controller.desiredSize ?? 0) < 0) {
            blocked = true;
            break;
          }
          const header = unpacker.readHeader();
          if (header === null) {
            if (sourceEnded) finish();
            break;
          }
          if (header === void 0) {
            if (sourceEnded) {
              unpacker.validateEOF();
              finish();
              break;
            }
            eofReached = true;
            break;
          }
          controller.enqueue({
            header,
            body: new ReadableStream({
              start(c) {
                if (header.size === 0) c.close();
                else bodyController = c;
              },
              pull: pump,
              cancel() {
                bodyController = null;
                pump();
              }
            })
          });
        }
      }
    } catch (error) {
      fail(error);
      throw error;
    } finally {
      pumping = false;
    }
    if (resume && (!blocked || unpacker.available() < RESUME_LIMIT)) unblock();
  };
  return {
    readable: new ReadableStream({
      start(c) {
        controller = c;
      },
      pull: pump,
      cancel(reason) {
        unpacker.end();
        if (reason !== void 0) fail(reason);
        else finish();
      }
    }, { highWaterMark: 2 }),
    writable: new WritableStream({
      write(chunk, controller2) {
        try {
          if (eofReached && strict && chunk.some((byte) => byte !== 0)) throw new Error("Invalid EOF.");
          unpacker.write(chunk);
          pump();
          if (blocked && unpacker.available() >= BUFFER_LIMIT) {
            if (!abortHooked) {
              controller2.signal.onabort = unblock;
              abortHooked = true;
            }
            return new Promise((resolve) => resume = resolve);
          }
        } catch (error) {
          fail(error);
          throw error;
        }
      },
      close() {
        try {
          sourceEnded = true;
          unpacker.end();
          pump();
        } catch (error) {
          fail(error);
          throw error;
        }
      },
      abort(reason) {
        fail(reason);
      }
    })
  };
}
async function unpackTar(archive, options = {}) {
  if (!(archive instanceof ReadableStream)) return unpackTarBuffer(archive instanceof Uint8Array ? archive : new Uint8Array(archive), options);
  const results = [];
  const reader = archive.pipeThrough(createTarDecoder(options)).getReader();
  try {
    while (true) {
      const { done, value: entry } = await reader.read();
      if (done) break;
      let processedHeader;
      try {
        processedHeader = transformHeader(entry.header, options);
      } catch (error) {
        await entry.body.cancel();
        throw error;
      }
      if (processedHeader === null) {
        await drain(entry.body);
        continue;
      }
      if (isBodyless(processedHeader)) {
        await drain(entry.body);
        results.push({ header: processedHeader });
      } else results.push({
        header: processedHeader,
        data: await streamToBuffer(entry.body)
      });
    }
  } catch (error) {
    await reader.cancel(error).catch(() => {
    });
    throw error;
  } finally {
    reader.releaseLock();
  }
  return results;
}
function unpackTarBuffer(archive, options) {
  const unpacker = createUnpacker(options);
  const strict = options.strict ?? false;
  const results = [];
  unpacker.write(archive);
  unpacker.end();
  while (true) {
    const header = unpacker.readHeader();
    if (header === void 0) break;
    if (header === null) {
      if (strict) throw new Error("Tar archive is truncated.");
      break;
    }
    const processedHeader = transformHeader(header, options);
    if (processedHeader === null) {
      const skipped = unpacker.skipEntry();
      if (!skipped && strict) throw new Error("Tar archive is truncated.");
      if (!skipped) break;
      continue;
    }
    if (isBodyless(processedHeader)) {
      const skipped = unpacker.skipEntry();
      if (!skipped && strict) throw new Error("Tar archive is truncated.");
      results.push({ header: processedHeader });
      if (!skipped) break;
      continue;
    }
    let size = header.size;
    if (size < 0 || !unpacker.canFinish()) {
      if (strict) throw new Error("Tar archive is truncated.");
      size = unpacker.bodyBytes();
    }
    const data = new Uint8Array(size);
    let offset = 0;
    unpacker.streamBody((chunk) => {
      data.set(chunk, offset);
      offset += chunk.length;
      return true;
    });
    const bodyComplete = unpacker.isBodyComplete();
    let paddingComplete = true;
    if (bodyComplete) {
      paddingComplete = unpacker.skipPadding();
      if (!paddingComplete && strict) throw new Error("Tar archive is truncated.");
    }
    results.push({
      header: processedHeader,
      data
    });
    if (!bodyComplete || !paddingComplete) break;
  }
  unpacker.validateEOF();
  return results;
}

// node_modules/@webdyne/webdyne-zeroperl/bin/pagi-runner.pl
var pagi_runner_default = `package Pagi::ZeroPerl::Runner;

use strict;
use warnings;
use Future;
use Future::AsyncAwait;
use Cpanel::JSON::XS ();
use MIME::Base64 qw(decode_base64 encode_base64);
use Encode qw(decode encode FB_CROAK);

#  Reuse the bundled XS codec across synchronous JSON operations. The bridge
#  passes character strings, so leave utf8 disabled and retain canonical keys.
#  No incremental parsing or application callbacks are installed on this codec.
#
my $json_or=Cpanel::JSON::XS->new()->canonical()->allow_nonref();

#  \`/tmp\` is created as a writable directory by the provider-neutral runtime.
#  Keep temporary-file behaviour out of provider configuration and available to
#  modules loaded before the first application request.
#
$ENV{'TMPDIR'}='/tmp' unless defined($ENV{'TMPDIR'});

#  One interpreter serves many sessions; every bridge-owned Future is keyed by
#  Worker-assigned session ID. Applications keep the ordinary PAGI signature.
#
use vars qw(%SESSION $CURRENT_SESSION);


#  Return the session ID active during application startup or a resumed
#  Future. The ZeroPerl Future::IO sleep adapter uses it to associate timers
#  with the calling application; die if called outside an active session.
#
sub current_session_id {

    die "No active PAGI session\\n" unless defined($CURRENT_SESSION);
    return $CURRENT_SESSION;
}


#  Look up the shared state for a session ID. Receive, timer and disconnect
#  registration use the returned hashref to retain their pending Futures;
#  die for an unknown session rather than attach work to missing state.
#
sub session {

    my ($session_id)=@_;
    my $session_hr=$SESSION{$session_id};
    return $session_hr if $session_hr;
    die "Unknown PAGI session $session_id\\n";
}


package Pagi::ZeroPerl::Connection;


#  Create the connection object installed in the PAGI scope by start_session().
#  Return a blessed object holding the session ID, an initially connected
#  state and the callbacks to notify when a disconnect is observed.
#
sub new {

    my ($class, $session_id)=@_;
    my $self=bless({
        session_id => $session_id,
        connected  => 1,
        callbacks  => [],
        reason     => undef,
    }, $class);
    return $self;
}


#  Poll the JavaScript host for current connection state on behalf of the
#  connection accessors and disconnect waiters. Record a newly observed
#  disconnect through disconnect(); callers use the updated object state,
#  not a return value. Already disconnected objects need no further polling.
#
sub refresh {

    my ($self)=@_;
    return unless $self->{'connected'};
    my $state_hr=$json_or->decode(main::worker_connection_status($self->{'session_id'}));
    $self->disconnect($state_hr->{'reason'}) unless $state_hr->{'connected'};
}


#  Latch a disconnect reported by refresh(), deliver_receive() or
#  deliver_disconnect(), retaining the supplied reason or client_disconnect.
#  Notify registered callbacks once, suppressing their exceptions; this
#  updates connection state and has no meaningful return value.
#
sub disconnect {

    my ($self, $reason)=@_;
    return unless $self->{'connected'};
    $self->{'connected'}=0;
    $self->{'reason'}=defined($reason) ? $reason : 'client_disconnect';
    foreach my $callback_cr (@{$self->{'callbacks'}}) {
        eval { $callback_cr->($self->{'reason'}); 1 };
    }
}


#  Refresh the host state and return 1 while the connection remains open,
#  otherwise 0. Applications can query this through pagi.connection, and
#  the send callback uses it to reject output after disconnection.
#
sub is_connected {

    my $self=shift();
    $self->refresh();
    return $self->{'connected'} ? 1 : 0;
}

#  Refresh the connection and return its recorded disconnect reason, or
#  undef while none is recorded. Applications and the send callback use
#  this to explain why the connection has closed.
#
sub disconnect_reason {

    my $self=shift();
    $self->refresh();
    return $self->{'reason'};
}


#  Register an application callback through the scope's pagi.connection
#  object. Refresh first, then retain the coderef while connected or invoke
#  it immediately with the recorded reason if already disconnected. Reject
#  non-coderefs and return no value after successful registration or delivery.
#
sub on_disconnect {

    my ($self, $callback_cr)=@_;
    die "on_disconnect requires a coderef\\n" unless ref($callback_cr) eq 'CODE';
    $self->refresh();
    $self->{'connected'} ? push(@{ $self->{'callbacks'} }, $callback_cr) : $callback_cr->($self->{'reason'});
    return;
}


#  Provide applications with a Future for connection closure. Return an
#  already completed Future with the reason if disconnected; otherwise
#  register a host waiter and retain its Future for deliver_disconnect().
#  Cancelling that Future removes both the Perl and host registrations.
#
sub disconnect_future {

    my ($self)=@_;
    $self->refresh();
    return Future->done($self->{'reason'}) unless $self->{'connected'};
    my $session_hr=Pagi::ZeroPerl::Runner::session($self->{'session_id'});
    my $future_or=Future->new();
    my $id=main::worker_disconnect_register($self->{'session_id'});
    $session_hr->{'disconnect'}{$id}=[$future_or, $self];
    $future_or->on_cancel(sub {
        delete $session_hr->{'disconnect'}{$id};
        main::worker_disconnect_cancel($self->{'session_id'}, $id);
        return;
    });
    return $future_or;
}


#  Handle a JavaScript runtime notification for a registered disconnect
#  waiter. Remove the pending entry, update the connection and resume its
#  Future with the reason under the owning session. Ignore stale session
#  or waiter IDs and return no value.
#
sub deliver_disconnect {

    my ($session_id, $id, $reason)=@_;
    my $session_hr=$Pagi::ZeroPerl::Runner::SESSION{$session_id} or return;
    my $entry_ar=delete $session_hr->{'disconnect'}{$id} or return;
    my ($future_or, $self)=@$entry_ar;
    $self->disconnect($reason);
    Pagi::ZeroPerl::Runner::resume_future($session_id, 'disconnect', sub {
        $future_or->done($reason) unless $future_or->is_ready();
    });
    return;
}


package Pagi::ZeroPerl::Runner;


#  Convert an outgoing PAGI event hashref into canonical JSON for the host.
#  The send callback and send_file_event() use this to preserve byte fields
#  as base64 and encode WebSocket text as UTF-8. Return the wire JSON without
#  modifying the original hash, or die on the validation errors checked here.
#
sub encode_send_event {

    my ($event_hr)=@_;
    die "PAGI \\$send requires an event hashref\\n" unless ref($event_hr) eq 'HASH';
    my %wire=%$event_hr;
    if ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '')=~/\\A(?:http\\.response\\.(?:start|trailers)|sse\\.(?:start|http\\.response\\.start)|websocket\\.http\\.response\\.start)\\z/) {
        my $headers_ar=delete $wire{'headers'};
        $headers_ar=[] unless defined($headers_ar);
        die "PAGI response headers must be an arrayref\\n" unless ref($headers_ar) eq 'ARRAY';
        $wire{'headers_base64'}=[map {
            die "PAGI response header must be a [name, value] pair\\n" unless ref($_) eq 'ARRAY'&&@$_==2;
            [map { encode_base64($_, '') } @$_];
        } @$headers_ar];
    }
    elsif ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '')=~/\\A(?:http\\.response|websocket\\.http\\.response)\\.body\\z/) {
        die "PAGI response body requires body\\n" unless exists($event_hr->{'body'});
        $wire{'body_base64'}=encode_base64(delete $wire{'body'}, '');
    }
    elsif ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '') eq 'sse.send') {
        die "PAGI SSE send requires data\\n" unless exists($event_hr->{'data'});
        foreach my $field (qw(data event id)) {
            next unless exists($wire{$field})&&defined($wire{$field});
            $wire{"\${field}_base64"}=encode_base64(delete $wire{$field}, '');
        }
    }
    elsif ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '') eq 'sse.comment') {
        my $comment=delete $wire{'comment'};
        $wire{'comment_base64'}=encode_base64(defined($comment) ? $comment : '', '');
    }
    elsif ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '') eq 'sse.keepalive') {
        if (exists($wire{'comment'})) {
            my $comment=delete $wire{'comment'};
            $wire{'comment_base64'}=encode_base64(defined($comment) ? $comment : '', '');
        }
    }
    elsif ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '') eq 'websocket.accept'&&exists($wire{'headers'})) {
        my $headers_ar=delete $wire{'headers'};
        die "PAGI WebSocket accept headers must be an arrayref\\n" unless ref($headers_ar) eq 'ARRAY';
        $wire{'headers_base64'}=[map {
            die "PAGI WebSocket accept header must be a [name, value] pair\\n" unless ref($_) eq 'ARRAY'&&@$_==2;
            [map { encode_base64($_, '') } @$_];
        } @$headers_ar];
    }
    elsif ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '') eq 'websocket.send') {
        my $has_text=exists($wire{'text'});
        my $has_bytes=exists($wire{'bytes'});
        die "PAGI WebSocket send requires exactly one of text or bytes\\n" unless $has_text!=$has_bytes;
        $has_text
            ? ($wire{'text_base64'}=encode_base64(encode('UTF-8', delete $wire{'text'}, FB_CROAK), ''))
            : ($wire{'bytes_base64'}=encode_base64(delete $wire{'bytes'}, ''));
    }
    return $json_or->encode(\\%wire);
}


#  Expand a file-backed HTTP body event for the callback built by make_send().
#  Validate the path, offset, length and more flag, read the selected bytes
#  into chunks, then send encoded body events to the host with the requested
#  final more flag. Send an empty body for an empty selection; return no
#  value, or die on invalid input or an open, seek or read failure.
#
sub send_file_event {

    my ($connection_or, $event_hr)=@_;
    die "PAGI response body cannot contain both body and file\\n"
        if exists($event_hr->{'body'})&&exists($event_hr->{'file'});
    die "PAGI response file must be a non-empty path\\n"
        unless defined($event_hr->{'file'})&&!ref($event_hr->{'file'})&&length($event_hr->{'file'});

    my $offset=exists($event_hr->{'offset'}) ? $event_hr->{'offset'} : 0;
    die "PAGI response file offset must be a non-negative integer\\n"
        unless defined($offset)&&$offset=~/\\A\\d+\\z/;
    my $length=$event_hr->{'length'};
    die "PAGI response file length must be a non-negative integer\\n"
        if defined($length)&&$length!~/\\A\\d+\\z/;
    my $final_more=exists($event_hr->{'more'}) ? $event_hr->{'more'} : 0;
    die "PAGI response body more must be 0 or 1\\n"
        unless $final_more==0||$final_more==1;

    open(my $file_fh, '<:raw', $event_hr->{'file'})
        or die "Unable to open PAGI response file $event_hr->{'file'}: $!\\n";
    sysseek($file_fh, $offset, 0)
        or die "Unable to seek PAGI response file $event_hr->{'file'}: $!\\n";

    #  The Fetch response sink currently buffers ordinary HTTP bodies, but
    #  chunking here avoids one second full-file copy inside the Perl bridge and
    #  preserves the native PAGI file/offset/length response semantics.
    #
    my $chunk_size=64*1024;
    my $remaining=$length;
    my @chunk;
    while (!defined($remaining)||$remaining>0) {
        my $wanted=defined($remaining)&&$remaining<$chunk_size ? $remaining : $chunk_size;
        last unless $wanted;
        my $read=read($file_fh, my $bytes, $wanted);
        die "Unable to read PAGI response file $event_hr->{'file'}: $!\\n" unless defined($read);
        last unless $read;
        $remaining-=$read if defined($remaining);
        push(@chunk, $bytes);
    }
    close($file_fh);

    #  A zero-byte file still needs the terminal body event. Copy only the
    #  protocol fields that apply to an ordinary body event; file-specific
    #  fields must not cross the PAGI wire boundary.
    #
    my $chunk_count=@chunk||1;
    foreach my $index (0..$chunk_count-1) {
        my %body_event=%$event_hr;
        delete @body_event{qw(file offset length)};
        $body_event{'body'}=defined($chunk[$index]) ? $chunk[$index] : '';
        $body_event{'more'}=$index<$#chunk ? 1 : $final_more;
        main::worker_send_event($connection_or->{'session_id'}, encode_send_event(\\%body_event));
    }
    return;
}


#  Build the application's PAGI send callback for start_session(). Return a
#  coderef that checks the connection and sends each event through the host,
#  expanding file bodies when needed. Each call returns a completed Future
#  on success or a failed Future for disconnection or a caught send error.
#
sub make_send {

    my ($connection_or)=@_;
    return sub {
        my ($event_hr)=@_;
        my $future_or=Future->new();
        unless ($connection_or->is_connected()) {
            my $reason=$connection_or->disconnect_reason();
            $reason='unknown' unless defined($reason);
            return $future_or->fail('PAGI connection closed: '.$reason, 'pagi.disconnected');
        }
        my $ok=eval {
            if ((defined($event_hr->{'type'}) ? $event_hr->{'type'} : '') eq 'http.response.body'&&exists($event_hr->{'file'})) {
                send_file_event($connection_or, $event_hr);
            }
            else {
                main::worker_send_event($connection_or->{'session_id'}, encode_send_event($event_hr));
            }
            1;
        };
        return $ok ? $future_or->done() : $future_or->fail($@);
    };
}


#  Build the application's PAGI receive callback for start_session(). Return
#  a coderef whose calls register a host receive waiter and return a pending
#  Future for deliver_receive() to complete with an event hashref. Registration
#  errors fail the Future; cancellation removes the Perl and host waiter.
#
sub make_receive {

    my ($connection_or)=@_;
    return sub {
        my $future_or=Future->new();
        my $ok=eval {
            my $session_hr=session($connection_or->{'session_id'});
            my $id=main::worker_receive_register($connection_or->{'session_id'});
            die "Duplicate PAGI receive registration $id\\n" if $session_hr->{'receive'}{$id};
            $session_hr->{'receive'}{$id}=[$future_or, $connection_or];
            $future_or->on_cancel(sub {
                delete $session_hr->{'receive'}{$id};
                main::worker_receive_cancel($connection_or->{'session_id'}, $id);
                return;
            });
            1;
        };
        return $future_or->fail($@) unless $ok;
        return $future_or;
    };
}


#  Retain a timer Future under its host-assigned ID in the owning session.
#  The ZeroPerl Future::IO sleep adapter calls this after host registration
#  so deliver_timer() can find the Future later. Return no value, rejecting
#  unknown sessions, non-Futures and duplicate timer IDs with an exception.
#
sub register_timer {

    my ($session_id, $id, $future_or)=@_;
    my $session_hr=session($session_id);
    die "PAGI timer registration requires a Future\\n" unless $future_or&&$future_or->isa('Future');
    die "Duplicate PAGI timer registration $id\\n" if $session_hr->{'timer'}{$id};
    $session_hr->{'timer'}{$id}=$future_or;
    return;
}


#  Deliver a JavaScript runtime event to the matching pending receive.
#  Remove the waiter, decode wire JSON and base64 payloads, restore UTF-8
#  WebSocket text and record disconnect events on the connection. Resume the
#  Future with the event hashref; report caught errors as session failures.
#  Stale session or waiter IDs are ignored and no value is returned.
#
sub deliver_receive {

    my ($session_id, $id, $event_json)=@_;
    my $session_hr=$SESSION{$session_id} or return;
    my $entry_ar=delete $session_hr->{'receive'}{$id} or return;
    my ($future_or, $connection_or)=@$entry_ar;
    my $ok=eval {
        my $event_hr=$json_or->decode($event_json);
        $event_hr->{'body'}=decode_base64(delete $event_hr->{'body_base64'}) if exists($event_hr->{'body_base64'});
        $event_hr->{'bytes'}=decode_base64(delete $event_hr->{'bytes_base64'}) if exists($event_hr->{'bytes_base64'});
        $event_hr->{'text'}=decode('UTF-8', decode_base64(delete $event_hr->{'text_base64'}), FB_CROAK) if exists($event_hr->{'text_base64'});
        $connection_or->disconnect($event_hr->{'reason'}) if (defined($event_hr->{'type'}) ? $event_hr->{'type'} : '')=~/\\A(?:http|sse|websocket)\\.disconnect\\z/;
        resume_future($session_id, 'receive', sub { $future_or->done($event_hr) unless $future_or->is_ready(); });
        1;
    };
    report_application_failure($session_id, $@, 'receive') unless $ok;
    return;
}


#  Handle a timer expiry from the JavaScript runtime. Remove the registered
#  Future and complete it without result values under its owning session,
#  allowing the awaiting application to continue. Ignore stale session or
#  timer IDs and return no value.
#
sub deliver_timer {

    my ($session_id, $id)=@_;
    my $session_hr=$SESSION{$session_id} or return;
    my $future_or=delete $session_hr->{'timer'}{$id} or return;
    resume_future($session_id, 'timer', sub { $future_or->done() unless $future_or->is_ready(); });
    return;
}

#  Run a completion callback for receive, timer or disconnect delivery with
#  the owning session ID active, so resumed application code registers new
#  work against that session. Future completion can synchronously execute
#  user callbacks; report their exceptions as application failures instead
#  of letting them escape the host call. Return true on success, undef on error.
#
sub resume_future {

    my ($session_id, $phase, $resume_cr)=@_;
    my $ok=eval {
        local $CURRENT_SESSION=$session_id;
        $resume_cr->();
        1;
    };
    report_application_failure($session_id, $@, $phase) unless $ok;
    return $ok;
}


#  Report exceptions caught during startup, receive delivery, Future
#  resumption or completion handling. Remove the session and notify the host
#  once with JSON containing done, error and phase; suppress host callback
#  exceptions so recovery does not create another escaping bridge error.
#  Missing or already reported sessions are ignored; return no value.
#
sub report_application_failure {

    my ($session_id, $error, $phase)=@_;
    my $session_hr=$SESSION{$session_id} or return;
    return if $session_hr->{'failure_reported'}++;
    delete $SESSION{$session_id};
    my %status=(
        done  => Cpanel::JSON::XS::true(),
        error => "$error",
        phase => $phase,
    );
    #  This is a JS host callback, so it must itself not turn a recovered Perl
    #  exception back into an escaping bridge exception.
    #
    eval { main::worker_application_finished($session_id, $json_or->encode(\\%status)); 1 };
    return;
}


#  Handle the application's on_ready callback installed by start_session().
#  Remove the session and send the host a JSON completion status, including
#  an error for a failed or cancelled Future. Return no value for completion
#  or a session already removed; host errors propagate to the caller's guard.
#
sub finish_application {

    my ($session_id, $future_or)=@_;
    return unless $SESSION{$session_id};
    my %status=(done => Cpanel::JSON::XS::true());
    if ($future_or->is_failed()) {
        my ($error)=$future_or->failure();
        $status{'error'}="$error";
        $status{'phase'}='application';
    }
    elsif ($future_or->is_cancelled()) {
        $status{'error'}='PAGI application was cancelled';
    }
    delete $SESSION{$session_id};
    main::worker_application_finished($session_id, $json_or->encode(\\%status));
    return;
}

#  Drop the Perl session state when the JavaScript runtime aborts startup
#  or a bridge operation before normal application cleanup can run. Return
#  no value; this only removes the registry entry, leaving host cleanup to
#  the caller rather than sending an application completion notification.
#
sub abort_session {

    my ($session_id)=@_;
    delete $SESSION{$session_id};
    return;
}

#  Start an application at the JavaScript runtime's request without waiting
#  for completion. Resolve the named entrypoint, decode the scope and create
#  the session, connection and PAGI receive/send callbacks. Retain the returned
#  application Future and arrange for finish_application() when it is ready;
#  later host events resume pending work in this persistent interpreter.
#  Return no value, report caught application startup errors to the host and
#  let validation errors before application invocation propagate to the caller.
#
sub start_session {

    my ($session_id, $scope_json, $entrypoint)=@_;
    die "Duplicate PAGI session $session_id\\n" if $SESSION{$session_id};
    no strict 'refs';
    die "Invalid application entry point\\n"
        unless ($entrypoint=~/\\A[A-Za-z_]\\w*(?:::[A-Za-z_]\\w*)+\\z/);
    unless (*{$entrypoint}{'CODE'}) {
        my $module_fn=$entrypoint;
        $module_fn=~s/::[^:]+$//;
        $module_fn=~s{::}{/}g;
        require "$module_fn.pm";
    }
    my $app_cr=*{$entrypoint}{'CODE'} or die "PAGI application entry point $entrypoint is not defined\\n";
    my $scope_hr=$json_or->decode($scope_json);
    die "PAGI scope must decode to a hash\\n" unless ref($scope_hr) eq 'HASH';
    my $connection_or=Pagi::ZeroPerl::Connection->new($session_id);
    $scope_hr->{'pagi.connection'}=$connection_or;
    my $session_hr=$SESSION{$session_id}={
        connection => $connection_or,
        receive    => {},
        timer      => {},
        disconnect => {},
    };
    local $CURRENT_SESSION=$session_id;
    my $application_or;
    my $ok=eval {
        $application_or=$app_cr->($scope_hr, make_receive($connection_or), make_send($connection_or));
        die "PAGI application must return a Future\\n" unless $application_or&&$application_or->isa('Future');
        1;
    };
    unless ($ok) {
        report_application_failure($session_id, $@, 'start');
        return;
    }
    $session_hr->{'application'}=$application_or;
    $application_or->on_ready(sub {
        my $finish_ok=eval { finish_application($session_id, $application_or); 1 };
        report_application_failure($session_id, $@, 'finish') unless $finish_ok;
    });
    return;
}

1;
`;

// node_modules/@webdyne/webdyne-zeroperl/bin/webdyne-app.pl
var webdyne_app_default = `package Pagi::WebDyne;

use strict;
use warnings;

use Future::IO;
use Future::IO::Impl::ZeroPerl;

#  Install the Worker timer backend before any PSP can call PAGI::SSE->every().
#
Future::IO->override_impl('Future::IO::Impl::ZeroPerl');

#  The Worker sets this package variable before loading this file. It is a
#  runtime-bootstrap binding, intentionally not a per-request application
#  input: one persistent interpreter owns one WebDyne application instance.
#
use vars qw($CONFIG);
$CONFIG={} unless defined($CONFIG);

my $root=defined($CONFIG->{'root'}) ? $CONFIG->{'root'} : '/app';
my $index=defined($CONFIG->{'index'}) ? $CONFIG->{'index'} : 'app.psp';
my $app_cr;
if ($index=~/\\.pagi\\z/) {
    require File::Spec;
    require Scalar::Util;
    my $app_fn=File::Spec->rel2abs($index, $root);
    $app_cr=do $app_fn;
    die "Unable to load PAGI application $app_fn: $@" if $@;
    die "Unable to load PAGI application $app_fn: $!\\n" unless defined($app_cr);
    die "PAGI application $app_fn must return a coderef\\n"
        unless (Scalar::Util::reftype($app_cr) || '') eq 'CODE';
}
else {
    #  Register TMPDIR before WebDyne captures its request environment.
    #
    $ENV{'TMPDIR'}='/tmp' unless defined($ENV{'TMPDIR'});
    $ENV{'WEBDYNE_PAGI'}='1' unless defined($ENV{'WEBDYNE_PAGI'});
    require WebDyne::PAGI::Constant;
    $WebDyne::PAGI::Constant::Constant{'WEBDYNE_PAGI_ENV_SET'}->{'TMPDIR'}=$ENV{'TMPDIR'};
    require WebDyne::PAGI;
    my %callback;
    foreach my $phase (qw(startup shutdown)) {
        next unless defined($CONFIG->{$phase});
        die "Configured lifespan callbacks require updated WebDyne::PAGI; update the WASM runtime or provide a Perl library overlay\\n"
            unless WebDyne::PAGI->can('lifespan_callback');
        $callback{$phase}=resolve_callback($CONFIG->{$phase});
    }
    $app_cr=WebDyne::PAGI->new(
        root   => $root,
        index  => $index,
        static => defined($CONFIG->{'static'}) ? $CONFIG->{'static'} : 1,
        conf   => defined($CONFIG->{'conf'}) ? $CONFIG->{'conf'} : 0,
        %callback,
    )->to_app();
}

sub resolve_callback {

    my ($name)=@_;
    die "Lifespan callback must be a qualified Perl function name without parentheses\\n"
        unless (!ref($name)&&($name=~/\\A([A-Za-z_][A-Za-z0-9_]*(?:::[A-Za-z_][A-Za-z0-9_]*)*)::([A-Za-z_][A-Za-z0-9_]*)\\z/));
    my $module=$1;
    my $module_fn=$module;
    $module_fn=~s{::}{/}g;
    $module_fn.='.pm';
    eval { require $module_fn; 1 } or die "Unable to load lifespan callback $name: $@";
    no strict 'refs';
    my $callback_cr=*{$name}{'CODE'} or die "Lifespan callback $name is not defined\\n";
    return $callback_cr;
}


sub application {

    return $app_cr->(@_);
}

1;
`;

// node_modules/@webdyne/webdyne-zeroperl/lib/Future/IO/Impl/ZeroPerl.pm
var ZeroPerl_default = `package Future::IO::Impl::ZeroPerl;

use strict;
use warnings;
use Future;

# This implementation deliberately supplies only timer support. It is the
# portion PAGI::SSE uses for ->every(); Workers do not expose the filehandles
# or polling primitives required by Future::IO's socket-oriented methods.
# JavaScript owns the timeout and later resumes this Future through the PAGI
# session scheduler, so timer and receive Futures can be pending concurrently.

sub sleep {
    my ($class, $seconds) = @_;
    die "Future::IO sleep duration must be a non-negative number\\n"
        unless defined($seconds) && $seconds =~ /\\A(?:\\d+(?:\\.\\d*)?|\\.\\d+)\\z/ && $seconds >= 0;

    my $session_id = Pagi::ZeroPerl::Runner::current_session_id();
    my $timer_id = main::worker_timer_start($session_id, int($seconds * 1000));
    my $future = Future->new;
    Pagi::ZeroPerl::Runner::register_timer($session_id, $timer_id, $future);

    # Future::wait_any() cancels the losing timer when a disconnect wins. The
    # host owns the actual timeout, so cancellation must be relayed to it.
    $future->on_cancel(sub {
        main::worker_timer_cancel($session_id, $timer_id);
        return;
    });

    return $future;
}

1;
`;

// node_modules/@webdyne/webdyne-zeroperl/js/runtime/perl-filesystem.js
var VIRTUAL_ROOTS = /* @__PURE__ */ new Set(["app", "perl5"]);
function virtualPath(name) {
  const normalized = name.replace(/\/+$/, "");
  if (!normalized || normalized.startsWith("/") || normalized.split("/").includes("..")) {
    throw new Error(`Unsafe Perl VFS archive path: ${name}`);
  }
  if (normalized === "htdocs" || normalized.startsWith("htdocs/")) {
    return `/app${normalized.slice("htdocs".length)}`;
  }
  const legacyLibrary = "app/local/lib/perl5";
  if (normalized === legacyLibrary || normalized.startsWith(`${legacyLibrary}/`)) {
    return `/perl5/lib${normalized.slice(legacyLibrary.length)}`;
  }
  const [root] = normalized.split("/");
  if (!VIRTUAL_ROOTS.has(root)) {
    throw new Error(`Perl VFS archive path must begin with app/ or perl5/: ${name}`);
  }
  return `/${normalized}`;
}
async function unpackPerlVfs(archive, fileSystem) {
  const entries = await unpackTar(gunzipSync(new Uint8Array(archive)), { strict: true });
  for (const { header, data } of entries) {
    const path = virtualPath(header.name);
    if (header.type === "directory") {
      fileSystem.ensureDir(path);
    } else if (header.type === "file" && data) {
      const timestamp = header.mtime instanceof Date ? header.mtime.getTime() : 1;
      fileSystem.addFile(path, new File([data], path.split("/").at(-1), { lastModified: timestamp || 1 }));
    } else {
      throw new Error(`Unsupported Perl VFS tar entry: ${header.name}`);
    }
  }
}
async function createPerlFileSystem({ appVfsArchive, perlLibraryVfsArchive }) {
  const fileSystem = new D({ "/": "", "/zeroperl": "" });
  for (const directory of ["/app", "/dev", "/perl5", "/perl5/bin", "/perl5/lib", "/tmp"]) {
    fileSystem.ensureDir(directory);
  }
  await unpackPerlVfs(perlLibraryVfsArchive, fileSystem);
  await unpackPerlVfs(appVfsArchive, fileSystem);
  fileSystem.addFile("/perl5/lib/Future/IO/Impl/ZeroPerl.pm", ZeroPerl_default);
  fileSystem.addFile("/perl5/bin/pagi-runner.pl", pagi_runner_default);
  fileSystem.addFile("/perl5/bin/webdyne-app.pl", webdyne_app_default);
  return fileSystem;
}

// node_modules/@webdyne/webdyne-zeroperl/js/runtime/config.js
var PERL_LIBRARY_DIR = "/perl5/lib";
function lifespanCallbackName(value, description) {
  if (typeof value !== "string" || value !== value.trim() || !/^[A-Za-z_][A-Za-z0-9_]*(?:::[A-Za-z_][A-Za-z0-9_]*)+$/.test(value)) {
    throw new TypeError(`${description} must be a qualified Perl function name, such as My::App::startup (without parentheses)`);
  }
  return value;
}
function webdynePerlEnvironment(bindings = {}) {
  const environment = Object.fromEntries(
    Object.entries(bindings).filter(([name, value]) => name.startsWith("WEBDYNE_") && typeof value === "string").sort(([left], [right]) => left.localeCompare(right))
  );
  return {
    ...environment,
    PERL5LIB: PERL_LIBRARY_DIR,
    TMPDIR: "/tmp"
  };
}
function webdyneRuntimeConfig(bindings = {}) {
  const callbacks = {};
  for (const phase of ["startup", "shutdown"]) {
    const name = `WEBDYNE_${phase.toUpperCase()}`;
    if (bindings[name] !== void 0) callbacks[phase] = lifespanCallbackName(bindings[name], name);
  }
  const flag = (value, fallback = 0) => {
    if (value === void 0) return fallback;
    return /^(?:1|true|yes|on)$/i.test(String(value)) ? 1 : 0;
  };
  const root = typeof bindings.WEBDYNE_ROOT === "string" && bindings.WEBDYNE_ROOT.startsWith("/") ? bindings.WEBDYNE_ROOT : "/app";
  const index = bindings.WEBDYNE_INDEX === "1" ? 1 : typeof bindings.WEBDYNE_INDEX === "string" && bindings.WEBDYNE_INDEX.length > 0 ? bindings.WEBDYNE_INDEX : "app.psp";
  return {
    root,
    index,
    static: flag(bindings.WEBDYNE_STATIC, 1),
    conf: flag(bindings.WEBDYNE_CONF),
    ...callbacks,
    perlEnv: webdynePerlEnvironment(bindings)
  };
}
function perlJsonExpression(value) {
  const hex = Array.from(
    new TextEncoder().encode(JSON.stringify(value)),
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");
  return `JSON::PP->new->utf8->decode(pack('H*', '${hex}'))`;
}

// node_modules/@webdyne/webdyne-zeroperl/js/runtime/extensions.js
function extensionName(extension, index) {
  return typeof extension.name === "string" && extension.name.length > 0 ? extension.name : `extension-${index + 1}`;
}
function cleanupFunction(value, name) {
  if (value === void 0 || value === null) return void 0;
  if (typeof value === "function") return value;
  if (typeof value.release === "function") return (context) => value.release(context);
  throw new TypeError(`${name}.attachScope() must return a cleanup function, a release object, or nothing`);
}
function createExtensionManager(extensions = [], { cleanupTimeoutMs = 1e4 } = {}) {
  if (!Number.isSafeInteger(cleanupTimeoutMs) || cleanupTimeoutMs < 1 || cleanupTimeoutMs > 2147483647) {
    throw new TypeError("cleanupTimeoutMs must be an integer from 1 to 2147483647");
  }
  if (!Array.isArray(extensions)) throw new TypeError("extensions must be an array");
  const installed = extensions.map((extension, index) => {
    if (!extension || typeof extension !== "object" || Array.isArray(extension)) {
      throw new TypeError(`extension ${index + 1} must be an object`);
    }
    for (const method of ["register", "attachScope"]) {
      if (extension[method] !== void 0 && typeof extension[method] !== "function") {
        throw new TypeError(`${extensionName(extension, index)}.${method} must be a function`);
      }
    }
    return { extension, name: extensionName(extension, index) };
  });
  return {
    register(perl) {
      for (const { extension } of installed) extension.register?.(perl);
    },
    async attachScope(context) {
      const cleanups = [];
      let completion;
      const release = () => {
        if (completion) return completion;
        const controller = new AbortController();
        const errors = [];
        let resolveCompletion;
        let rejectCompletion;
        completion = new Promise((resolve, reject) => {
          resolveCompletion = resolve;
          rejectCompletion = reject;
        });
        void completion.catch(() => void 0);
        const timer = setTimeout(() => {
          const error = new Error(`WebDyne extension cleanup exceeded ${cleanupTimeoutMs} ms`);
          error.name = "ExtensionCleanupTimeoutError";
          controller.abort(error);
          rejectCompletion(errors.length ? new AggregateError([...errors, error], "WebDyne extension cleanup failed") : error);
        }, cleanupTimeoutMs);
        const pending = [];
        for (const cleanup of cleanups.reverse()) {
          try {
            pending.push(Promise.resolve(cleanup({ signal: controller.signal })).catch((error) => {
              errors.push(error);
            }));
          } catch (error) {
            errors.push(error);
          }
        }
        void Promise.all(pending).then(() => {
          clearTimeout(timer);
          if (errors.length === 1) rejectCompletion(errors[0]);
          else if (errors.length > 1) rejectCompletion(new AggregateError(errors, "WebDyne extension cleanup failed"));
          else resolveCompletion();
        });
        return completion;
      };
      try {
        for (const { extension, name } of installed) {
          const cleanup = cleanupFunction(extension.attachScope?.({ ...context, lifecycle: { asyncCleanup: true } }), name);
          if (cleanup) cleanups.push(cleanup);
        }
      } catch (error) {
        try {
          await release();
        } catch (cleanupError) {
          throw new AggregateError([error, cleanupError], "WebDyne extension attachment failed during cleanup");
        }
        throw error;
      }
      return release;
    }
  };
}

// node_modules/@webdyne/webdyne-zeroperl/js/transport/invocation.js
function createInvocationTransport() {
  let closed = false;
  let sent = false;
  let value;
  let disconnect;
  const disconnected = new Promise((resolve) => {
    disconnect = resolve;
  });
  return {
    connection: {
      status: () => ({ connected: !closed, reason: closed ? "invocation_finished" : null }),
      waitForDisconnect: () => disconnected
    },
    receiveSource: { next() {
      throw new Error("Finite invocations do not receive PAGI events");
    } },
    sink: {
      get started() {
        return sent;
      },
      get finished() {
        return sent;
      },
      send(event) {
        if (closed || sent || event.type !== "invocation.result" || !Object.hasOwn(event, "value")) {
          throw new Error("Invalid or duplicate invocation result");
        }
        value = event.value;
        sent = true;
      },
      fail() {
      }
    },
    result() {
      if (!sent) throw new Error("Invocation completed without a result");
      return value;
    },
    close() {
      closed = true;
      disconnect("invocation_finished");
    }
  };
}

// node_modules/@webdyne/webdyne-zeroperl/js/transport/lifespan.js
function createLifespanTransport() {
  let delivered = false;
  let acknowledged = false;
  let responded = false;
  let closed = false;
  let resolveStartup;
  let rejectStartup;
  let releaseReceive;
  let releaseDisconnect;
  const startup = new Promise((resolve, reject) => {
    resolveStartup = resolve;
    rejectStartup = reject;
  });
  const pendingReceive = new Promise((resolve) => {
    releaseReceive = resolve;
  });
  const disconnected = new Promise((resolve) => {
    releaseDisconnect = resolve;
  });
  function close(error) {
    if (closed) return;
    closed = true;
    rejectStartup(error);
    releaseReceive(void 0);
    releaseDisconnect("runtime_retired");
  }
  return {
    scope: { type: "lifespan", pagi: { version: "0.4", spec_version: "0.3" } },
    startup,
    close,
    decline() {
      if (closed || responded) return false;
      resolveStartup(false);
      return true;
    },
    connection: {
      status: () => ({ connected: !closed, reason: closed ? "runtime_retired" : null }),
      waitForDisconnect: () => disconnected
    },
    receiveSource: {
      next() {
        if (delivered) return pendingReceive;
        delivered = true;
        return Promise.resolve({ type: "lifespan.startup" });
      }
    },
    sink: {
      send(event) {
        responded = true;
        if (closed || !delivered || acknowledged) throw new Error("Unexpected PAGI lifespan event");
        if (event.type === "lifespan.startup.failed") {
          throw new Error(`PAGI lifespan startup failed: ${event.message ?? "no message"}`);
        }
        if (event.type !== "lifespan.startup.complete") {
          throw new Error(`Unexpected PAGI lifespan event: ${event.type}`);
        }
        acknowledged = true;
        resolveStartup(true);
      },
      fail: close
    }
  };
}

// node_modules/@webdyne/webdyne-zeroperl/js/transport/fetch-pagi.js
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}
function diagnosticExcerpt(error, limit = 4096) {
  const message = String(error?.message ?? error);
  return message.length > limit ? `${message.slice(0, limit)}
[diagnostic truncated]` : message;
}
function createPagiFailureResponse(error) {
  const errorId = error?.pagiErrorId ?? "pagi-unknown";
  const detail = error?.pagiExpose ? `<pre>${escapeHtml(`[${error.pagiPhase ?? "application"}] ${diagnosticExcerpt(error)}`)}</pre>` : "";
  return new Response(`<!doctype html><title>WebDyne PAGI Runtime Error</title><h1>Internal Server Error</h1><p>Reference: ${escapeHtml(errorId)}</p>${detail}
`, {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function decodePagiPath(rawPath) {
  try {
    return decodeURIComponent(rawPath);
  } catch {
    return rawPath;
  }
}
function buildPagiScope(request) {
  const url = new URL(request.url);
  const rawPath = url.pathname;
  const defaultPort = url.protocol === "https:" ? "443" : "80";
  const acceptsSse = request.headers.get("accept")?.toLowerCase().includes("text/event-stream");
  const websocket = isWebSocketUpgrade(request);
  const subprotocols = (request.headers.get("sec-websocket-protocol") ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  return {
    // An EventSource request is an SSE PAGI connection; its initial ordinary
    // GET remains type=http so WebDyne can render the page itself.
    type: websocket ? "websocket" : acceptsSse ? "sse" : "http",
    pagi: {
      version: "0.4",
      spec_version: "0.3"
    },
    method: request.method,
    path: decodePagiPath(rawPath),
    raw_path: rawPath,
    query_string: url.search.startsWith("?") ? url.search.slice(1) : "",
    headers: [...request.headers].map(([name, value]) => [name, value]),
    scheme: websocket ? url.protocol === "https:" ? "wss" : "ws" : url.protocol.slice(0, -1),
    http_version: "1.1",
    root_path: "",
    server: [url.hostname, Number(url.port || defaultPort)],
    // A Fetch host can return an ordinary HTTP response instead of a 101 before
    // accepting its WebSocketPair, which maps directly to PAGI's denial
    // response extension.
    extensions: websocket ? { "websocket.http.response": {} } : {},
    ...websocket ? { subprotocols } : {}
  };
}
function serializePagiScope(scope) {
  const wireValue = JSON.stringify(scope);
  if (typeof wireValue !== "string") throw new TypeError("PAGI scope is not JSON serializable");
  return wireValue;
}
function isWebSocketUpgrade(request) {
  return request.headers.get("upgrade")?.trim().toLowerCase() === "websocket";
}
function base64Encode(bytes2) {
  let binary = "";
  const chunkSize = 32768;
  for (let offset = 0; offset < bytes2.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes2.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}
function base64Decode(encoded) {
  const binary = atob(encoded);
  const bytes2 = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes2[index] = binary.charCodeAt(index);
  return bytes2;
}
function decodeHeaderBytes(encoded) {
  return new TextDecoder("iso-8859-1").decode(base64Decode(encoded));
}
function createConnectionState(request) {
  let connected = !request.signal.aborted;
  let reason = connected ? null : "client_disconnect";
  const waiters = [];
  function disconnect(nextReason = "client_disconnect") {
    if (!connected) return;
    connected = false;
    reason = nextReason;
    for (const resolve of waiters.splice(0)) resolve(reason);
  }
  request.signal.addEventListener("abort", () => disconnect(), { once: true });
  return {
    status: () => ({ connected, reason }),
    disconnect,
    waitForDisconnect: async () => connected ? new Promise((resolve) => waiters.push(resolve)) : reason
  };
}
function createTimerRegistry(deliver) {
  let nextId = 1;
  const timers = /* @__PURE__ */ new Map();
  function cancel(timer) {
    clearTimeout(timer.handle);
    timers.delete(timer.id);
  }
  return {
    start(milliseconds) {
      if (!Number.isInteger(milliseconds) || milliseconds < 0) {
        throw new Error("Timer delay must be a non-negative integer number of milliseconds");
      }
      const id = nextId++;
      const timer = { id, handle: void 0 };
      timer.handle = setTimeout(() => {
        if (!timers.delete(id)) return;
        void deliver(id).catch(() => {
        });
      }, milliseconds);
      timers.set(id, timer);
      return id;
    },
    cancel(id) {
      const timer = timers.get(id);
      if (timer) cancel(timer);
    },
    cancelAll() {
      for (const timer of timers.values()) cancel(timer);
    }
  };
}
function createHttpReceiveSource(request, connection) {
  let reader = request.body?.getReader();
  let requestEnded = false;
  return {
    async next() {
      if (!requestEnded) {
        if (!reader) {
          requestEnded = true;
          return { type: "http.request", body_base64: "", more: 0 };
        }
        const { done, value } = await reader.read();
        if (done) {
          reader.releaseLock();
          reader = void 0;
          requestEnded = true;
          return { type: "http.request", body_base64: "", more: 0 };
        }
        return { type: "http.request", body_base64: base64Encode(value), more: 1 };
      }
      const reason = await connection.waitForDisconnect();
      return { type: "http.disconnect", reason };
    }
  };
}
function createSseReceiveSource(request, connection) {
  let reader = request.body?.getReader();
  let requestEnded = false;
  return {
    async next() {
      if (!requestEnded) {
        if (!reader) {
          requestEnded = true;
          return { type: "sse.request", body_base64: "", more: 0 };
        }
        const { done, value } = await reader.read();
        if (done) {
          reader.releaseLock();
          reader = void 0;
          requestEnded = true;
          return { type: "sse.request", body_base64: "", more: 0 };
        }
        return { type: "sse.request", body_base64: base64Encode(value), more: 1 };
      }
      return { type: "sse.disconnect", reason: await connection.waitForDisconnect() };
    }
  };
}
function createWebSocketReceiveSource(socket, connection) {
  const events = [{ type: "websocket.connect" }];
  const waiters = [];
  let disconnected = false;
  function push(event) {
    const resolve = waiters.shift();
    if (resolve) resolve(event);
    else events.push(event);
  }
  function disconnect(code, reason) {
    if (disconnected) return;
    disconnected = true;
    push({ type: "websocket.disconnect", code, reason });
    connection.disconnect(reason || "client_closed");
  }
  socket.binaryType = "arraybuffer";
  socket.addEventListener("message", (event) => {
    if (typeof event.data === "string") {
      push({ type: "websocket.receive", text_base64: base64Encode(new TextEncoder().encode(event.data)) });
      return;
    }
    if (event.data instanceof ArrayBuffer) {
      push({ type: "websocket.receive", bytes_base64: base64Encode(new Uint8Array(event.data)) });
      return;
    }
    disconnect(1006, "unsupported_binary_frame");
  });
  socket.addEventListener("close", (event) => {
    disconnect(event.code || 1005, event.reason || "");
  });
  socket.addEventListener("error", () => disconnect(1006, "write_error"));
  void connection.waitForDisconnect().then((reason) => disconnect(1006, reason || "client_closed"));
  return {
    async next() {
      if (events.length > 0) return events.shift();
      return new Promise((resolve) => waiters.push(resolve));
    }
  };
}
function createReceiveDispatcher(receiveSource, deliver, fail) {
  let nextId = 1;
  let pumping = false;
  let stopped = false;
  const pending = [];
  const cancelled = /* @__PURE__ */ new Set();
  const bufferedEvents = [];
  function nextPendingId() {
    while (pending.length > 0) {
      const id = pending.shift();
      if (!cancelled.delete(id)) return id;
    }
    return void 0;
  }
  async function pump() {
    if (pumping || stopped) return;
    pumping = true;
    try {
      while (!stopped && pending.length > 0) {
        const id = nextPendingId();
        if (id === void 0) break;
        const event = bufferedEvents.shift() ?? await receiveSource.next();
        if (stopped) break;
        if (cancelled.delete(id)) {
          bufferedEvents.unshift(event);
          continue;
        }
        await deliver(id, event);
      }
    } catch (error) {
      if (!stopped) fail(error);
    } finally {
      pumping = false;
      if (!stopped && pending.length > 0) void pump();
    }
  }
  return {
    register() {
      const id = nextId++;
      pending.push(id);
      void pump();
      return id;
    },
    cancel(id) {
      cancelled.add(id);
    },
    stop() {
      stopped = true;
      pending.length = 0;
    }
  };
}
function createDisconnectDispatcher(connection, deliver, fail) {
  let nextId = 1;
  let stopped = false;
  const cancelled = /* @__PURE__ */ new Set();
  return {
    register() {
      const id = nextId++;
      void connection.waitForDisconnect().then(
        (reason) => {
          if (!stopped && !cancelled.delete(id)) void deliver(id, reason).catch(fail);
        },
        (error) => {
          if (!stopped) fail(error);
        }
      );
      return id;
    },
    cancel(id) {
      cancelled.add(id);
    },
    stop() {
      stopped = true;
    }
  };
}
function createHttpResponseSink() {
  let started = false;
  let finished = false;
  let status;
  let headers;
  const bodyChunks = [];
  let bodyLength = 0;
  let resolveResponse;
  const response = new Promise((resolve) => {
    resolveResponse = resolve;
  });
  function validateHeaders(headers2) {
    return Array.isArray(headers2) && headers2.every(
      (header) => Array.isArray(header) && header.length === 2 && header.every((value) => typeof value === "string")
    );
  }
  function decodeResponseStart(event) {
    if (!Array.isArray(event.headers_base64)) {
      throw new Error("PAGI response start requires base64 header pairs");
    }
    const headers2 = event.headers_base64.map((header) => {
      if (!Array.isArray(header) || header.length !== 2 || !header.every((value) => typeof value === "string")) {
        throw new Error("PAGI response headers must be [name, value] byte pairs");
      }
      return header.map(decodeHeaderBytes);
    });
    if (!validateHeaders(headers2)) throw new Error("Invalid decoded PAGI response headers");
    return headers2;
  }
  function completeResponse() {
    if (status === 204 || status === 205 || status === 304) {
      resolveResponse(new Response(null, { status, headers }));
      return;
    }
    const body = new Uint8Array(bodyLength);
    let offset = 0;
    for (const chunk of bodyChunks) {
      body.set(chunk, offset);
      offset += chunk.length;
    }
    resolveResponse(new Response(body, { status, headers }));
  }
  return {
    response,
    get started() {
      return started;
    },
    get finished() {
      return finished;
    },
    async send(event) {
      if (!event || typeof event !== "object" || Array.isArray(event)) {
        throw new Error("PAGI $send must receive an event hash");
      }
      if (event.type === "http.response.start") {
        if (started || finished) throw new Error("Invalid duplicate PAGI response start");
        if (!Number.isInteger(event.status) || event.status < 100 || event.status > 599) {
          throw new Error("PAGI response start requires an HTTP status");
        }
        if (event.trailers !== void 0 && event.trailers !== 0 && event.trailers !== 1) {
          throw new Error("PAGI response start trailers must be 0 or 1");
        }
        if (event.trailers === 1) {
          throw new Error("HTTP response trailers are unsupported by the Fetch Response API");
        }
        headers = decodeResponseStart(event);
        status = event.status;
        started = true;
        return;
      }
      if (event.type === "http.response.trailers") {
        decodeResponseStart(event);
        throw new Error("HTTP response trailers are unsupported by the Fetch Response API");
      }
      if (event.type === "http.response.body") {
        if (!started || finished) throw new Error("Invalid PAGI response body sequence");
        if (typeof event.body_base64 !== "string") {
          throw new Error("PAGI response body requires a base64 byte payload");
        }
        if (event.more !== void 0 && event.more !== 0 && event.more !== 1) {
          throw new Error("PAGI response body more must be 0 or 1");
        }
        const chunk = base64Decode(event.body_base64);
        bodyChunks.push(chunk);
        bodyLength += chunk.length;
        if (event.more !== 1) {
          completeResponse();
          finished = true;
        }
        return;
      }
      throw new Error(`Unsupported PAGI send event: ${event.type}`);
    },
    async fail(error) {
      if (!started) {
        started = true;
        finished = true;
        resolveResponse(createPagiFailureResponse(error));
      } else if (!finished) {
        finished = true;
        resolveResponse(createPagiFailureResponse(error));
      }
    }
  };
}
function decodeSseText(event, field, { required = false } = {}) {
  const encoded = event[`${field}_base64`];
  if (encoded === void 0 && !required) return void 0;
  if (typeof encoded !== "string") throw new Error(`PAGI SSE ${field} must be UTF-8 text`);
  return new TextDecoder("utf-8", { fatal: true }).decode(base64Decode(encoded));
}
function formatSseField(name, value) {
  return String(value).split(/\r\n|[\r\n]/).map((line) => `${name}: ${line}
`).join("");
}
function formatSseEvent(event) {
  let text = "";
  const id = decodeSseText(event, "id");
  const name = decodeSseText(event, "event");
  const data = decodeSseText(event, "data", { required: true });
  if (id !== void 0) text += formatSseField("id", id);
  if (name !== void 0) text += formatSseField("event", name);
  if (event.retry !== void 0) {
    if (!Number.isInteger(event.retry) || event.retry < 0) throw new Error("PAGI SSE retry must be a non-negative integer");
    text += formatSseField("retry", event.retry);
  }
  text += formatSseField("data", data);
  return `${text}
`;
}
function createSseResponseSink(connection) {
  const encoder2 = new TextEncoder();
  let started = false;
  let finished = false;
  let writer;
  let keepalive;
  let resolveResponse;
  const response = new Promise((resolve) => {
    resolveResponse = resolve;
  });
  function clearKeepalive() {
    if (keepalive) clearTimeout(keepalive);
    keepalive = void 0;
  }
  function decodeHeaders(event) {
    if (event.headers_base64 === void 0) return [];
    if (!Array.isArray(event.headers_base64)) throw new Error("PAGI SSE headers must be base64 header pairs");
    return event.headers_base64.map((header) => {
      if (!Array.isArray(header) || header.length !== 2 || !header.every((value) => typeof value === "string")) {
        throw new Error("PAGI SSE headers must be [name, value] byte pairs");
      }
      return header.map(decodeHeaderBytes);
    });
  }
  function scheduleKeepalive(interval, comment) {
    clearKeepalive();
    if (interval === 0) return;
    const tick = async () => {
      if (finished) return;
      try {
        const text = comment.split(/\r\n|[\r\n]/).map((line) => `: ${line}
`).join("");
        await writer.write(encoder2.encode(`${text}
`));
        keepalive = setTimeout(tick, interval);
      } catch {
      }
    };
    keepalive = setTimeout(tick, interval);
  }
  return {
    response,
    get started() {
      return started;
    },
    get finished() {
      return finished;
    },
    async send(event) {
      if (!event || typeof event !== "object" || Array.isArray(event)) throw new Error("PAGI $send must receive an event hash");
      if (event.type === "sse.start") {
        if (started || finished) throw new Error("Invalid duplicate PAGI SSE start");
        if (!Number.isInteger(event.status) || event.status < 100 || event.status > 599) {
          throw new Error("PAGI SSE start requires an HTTP status");
        }
        const headers = new Headers(decodeHeaders(event));
        if (!headers.has("content-type")) headers.set("content-type", "text/event-stream; charset=utf-8");
        if (!headers.has("cache-control")) headers.set("cache-control", "no-cache");
        const stream = new TransformStream();
        writer = stream.writable.getWriter();
        void writer.closed.catch(() => connection.disconnect());
        const startedResponse = new Response(stream.readable, { status: event.status, headers });
        started = true;
        resolveResponse(startedResponse);
        return;
      }
      if (!started || finished) throw new Error(`Invalid PAGI SSE event sequence: ${event.type}`);
      if (event.type === "sse.send") {
        await writer.write(encoder2.encode(formatSseEvent(event)));
        return;
      }
      if (event.type === "sse.comment") {
        const comment = decodeSseText(event, "comment", { required: true });
        const text = comment.split(/\r\n|[\r\n]/).map((line) => `: ${line}
`).join("");
        await writer.write(encoder2.encode(`${text}
`));
        return;
      }
      if (event.type === "sse.keepalive") {
        if (!Number.isFinite(event.interval) || event.interval < 0) throw new Error("PAGI SSE keepalive requires a non-negative interval");
        scheduleKeepalive(Math.round(event.interval * 1e3), decodeSseText(event, "comment") ?? "");
        return;
      }
      if (event.type === "sse.close") {
        clearKeepalive();
        finished = true;
        await writer.close();
        return;
      }
      throw new Error(`Unsupported PAGI SSE send event: ${event.type}`);
    },
    async fail(error) {
      clearKeepalive();
      if (!started) {
        started = true;
        finished = true;
        resolveResponse(createPagiFailureResponse(error));
      } else if (!finished) {
        finished = true;
        await writer.abort(error);
      }
    }
  };
}
function decodeWebSocketHeaders(event) {
  if (event.headers_base64 === void 0) return [];
  if (!Array.isArray(event.headers_base64)) throw new Error("PAGI WebSocket headers must be base64 header pairs");
  return event.headers_base64.map((header) => {
    if (!Array.isArray(header) || header.length !== 2 || !header.every((value) => typeof value === "string")) {
      throw new Error("PAGI WebSocket headers must be [name, value] byte pairs");
    }
    return header.map(decodeHeaderBytes);
  });
}
function createWebSocketResponseSink(connection, webSocketAdapter) {
  if (!webSocketAdapter) {
    throw new Error("This provider does not support WebDyne PAGI WebSockets");
  }
  const { client, server } = webSocketAdapter.createPair();
  const receiveSource = createWebSocketReceiveSource(server, connection);
  let accepted = false;
  let started = false;
  let finished = false;
  let denialWriter;
  let resolveResponse;
  const response = new Promise((resolve) => {
    resolveResponse = resolve;
  });
  function rejectHandshake(status = 403, headers = [], body = "") {
    if (started) throw new Error("WebSocket handshake has already completed");
    started = true;
    finished = true;
    resolveResponse(new Response(body, { status, headers }));
  }
  return {
    response,
    receiveSource,
    get started() {
      return started;
    },
    get finished() {
      return finished;
    },
    async send(event) {
      if (!event || typeof event !== "object" || Array.isArray(event)) {
        throw new Error("PAGI $send must receive an event hash");
      }
      if (event.type === "websocket.accept") {
        if (started) throw new Error("Invalid duplicate WebSocket accept");
        const headers = new Headers(decodeWebSocketHeaders(event));
        if (event.subprotocol !== void 0) {
          if (typeof event.subprotocol !== "string") throw new Error("PAGI WebSocket subprotocol must be text");
          headers.set("sec-websocket-protocol", event.subprotocol);
        }
        webSocketAdapter.accept(server);
        accepted = true;
        started = true;
        resolveResponse(webSocketAdapter.createUpgradeResponse(client, headers));
        return;
      }
      if (event.type === "websocket.close") {
        const code = event.code ?? 1e3;
        const reason = event.reason ?? "";
        if (!Number.isInteger(code) || typeof reason !== "string") {
          throw new Error("PAGI WebSocket close requires an integer code and text reason");
        }
        if (!accepted) {
          rejectHandshake();
          return;
        }
        if (finished) throw new Error("Invalid duplicate WebSocket close");
        finished = true;
        server.close(code, reason);
        return;
      }
      if (event.type === "websocket.http.response.start") {
        if (started) throw new Error("Invalid WebSocket denial response after handshake completion");
        if (!Number.isInteger(event.status) || event.status < 100 || event.status > 599) {
          throw new Error("PAGI WebSocket denial response requires an HTTP status");
        }
        const stream = new TransformStream();
        denialWriter = stream.writable.getWriter();
        started = true;
        resolveResponse(new Response(stream.readable, {
          status: event.status,
          headers: decodeWebSocketHeaders(event)
        }));
        return;
      }
      if (event.type === "websocket.http.response.body") {
        if (!started || accepted || finished || !denialWriter) {
          throw new Error("Invalid PAGI WebSocket denial response body sequence");
        }
        if (typeof event.body_base64 !== "string") {
          throw new Error("PAGI WebSocket denial response body requires a base64 byte payload");
        }
        if (event.more !== void 0 && event.more !== 0 && event.more !== 1) {
          throw new Error("PAGI WebSocket denial response body more must be 0 or 1");
        }
        await denialWriter.write(base64Decode(event.body_base64));
        if (event.more !== 1) {
          finished = true;
          await denialWriter.close();
        }
        return;
      }
      if (event.type === "websocket.keepalive") {
        throw new Error("PAGI WebSocket keepalive is unsupported by this provider adapter");
      }
      if (!accepted || finished) throw new Error(`Invalid PAGI WebSocket event sequence: ${event.type}`);
      if (event.type === "websocket.send") {
        const hasText = typeof event.text_base64 === "string";
        const hasBytes = typeof event.bytes_base64 === "string";
        if (hasText === hasBytes) throw new Error("PAGI WebSocket send requires exactly one text or byte payload");
        server.send(hasText ? new TextDecoder("utf-8", { fatal: true }).decode(base64Decode(event.text_base64)) : base64Decode(event.bytes_base64));
        return;
      }
      throw new Error(`Unsupported PAGI WebSocket send event: ${event.type}`);
    },
    async fail(error) {
      if (!started) {
        started = true;
        finished = true;
        resolveResponse(createPagiFailureResponse(error));
      } else if (accepted && !finished) {
        finished = true;
        try {
          server.close(1011, "internal_error");
        } catch {
        }
      } else if (denialWriter && !finished) {
        finished = true;
        await denialWriter.abort(error);
      }
    }
  };
}
function createFetchPagiTransport(scope, request, { webSocketAdapter } = {}) {
  const connection = createConnectionState(request);
  const sink = scope.type === "websocket" ? createWebSocketResponseSink(connection, webSocketAdapter) : scope.type === "sse" ? createSseResponseSink(connection) : createHttpResponseSink();
  const receiveSource = scope.type === "websocket" ? sink.receiveSource : scope.type === "sse" ? createSseReceiveSource(request, connection) : createHttpReceiveSource(request, connection);
  return { connection, sink, receiveSource, response: sink.response };
}

// node_modules/@webdyne/webdyne-zeroperl/js/runtime/webdyne-runtime.js
var decoder2 = new TextDecoder();
var PAGI_RUNNER = "/perl5/bin/pagi-runner.pl";
var WEBDYNE_APPLICATION = "/perl5/bin/webdyne-app.pl";
function showFailureDetails(request) {
  const hostname = new URL(request.url).hostname;
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}
function createWebDyneRuntime({
  zeroperlModule,
  appVfsArchive,
  perlLibraryVfsArchive,
  webSocketAdapter,
  extensions = [],
  mode = "pagi",
  extensionCleanupTimeoutMs = 1e4
}) {
  if (!(zeroperlModule instanceof WebAssembly.Module)) {
    throw new TypeError("zeroperlModule must be an imported WebAssembly.Module");
  }
  if (!(appVfsArchive instanceof ArrayBuffer)) {
    throw new TypeError("appVfsArchive must be an imported ArrayBuffer");
  }
  if (!(perlLibraryVfsArchive instanceof ArrayBuffer)) {
    throw new TypeError("perlLibraryVfsArchive must be an imported ArrayBuffer");
  }
  if (!["pagi", "invocation"].includes(mode)) throw new TypeError("Invalid WebDyne runtime mode");
  const assets = { appVfsArchive, perlLibraryVfsArchive };
  const extensionManager = createExtensionManager(extensions, { cleanupTimeoutMs: extensionCleanupTimeoutMs });
  let perlFileSystemPromise;
  let persistentRuntimePromise;
  let persistentPerl;
  let persistentPerlQueue = Promise.resolve();
  let persistentRuntimeResetPromise;
  let persistentRuntimeGeneration = 1;
  let persistentRuntimeConfigKey;
  let nextPagiSessionId = 1;
  let nextPagiErrorId = 1;
  const pagiSessions = /* @__PURE__ */ new Map();
  function getPerlFileSystem() {
    perlFileSystemPromise ??= createPerlFileSystem(assets);
    return perlFileSystemPromise;
  }
  function describePagiFailure(session, error, phase = "application") {
    const normalized = error instanceof Error ? error : new Error(String(error));
    normalized.pagiErrorId ??= `pagi-${nextPagiErrorId++}`;
    normalized.pagiPhase ??= phase;
    normalized.pagiExpose ??= session?.showFailureDetails === true;
    return normalized;
  }
  function enqueuePersistentPerl(session, name, buildArgs) {
    const generation = session.runtimeGeneration;
    const task = persistentPerlQueue.then(async () => {
      if (session.finished) return;
      if (!persistentPerl || generation !== persistentRuntimeGeneration) return;
      let values;
      try {
        values = buildArgs(persistentPerl);
        await persistentPerl.call(name, values.args, "void");
        const perlError = persistentPerl.getLastError();
        if (perlError) throw new Error(perlError);
        persistentPerl.clearError();
      } finally {
        values?.dispose();
      }
    });
    persistentPerlQueue = task.catch(() => void 0);
    return task.catch((error) => {
      const failure = describePagiFailure(session, error, `perl.${name}`);
      void resetPersistentRuntime(failure);
      throw error;
    });
  }
  function stopPagiSession(session, error) {
    session.receiveDispatcher?.stop();
    session.disconnectDispatcher?.stop();
    session.timers?.cancelAll();
    session.lifespan?.close(error ?? new Error("PAGI lifespan session retired"));
    pagiSessions.delete(session.id);
  }
  function finishPagiSession(session) {
    if (session.finished) return;
    if (session.lifespan) {
      const error = new Error("PAGI lifespan application exited before shutdown");
      failPagiSession(session, error);
      void persistentPerlQueue.then(() => resetPersistentRuntime(error));
      return;
    }
    session.finished = true;
    stopPagiSession(session);
    if (!session.sink.started || !session.sink.finished && session.connection.status().connected) {
      session.reject(new Error("PAGI app completed without a final response event"));
    } else {
      session.resolve();
    }
  }
  function abortPersistentSession(session) {
    if (!persistentPerl || session.runtimeGeneration !== persistentRuntimeGeneration) return;
    const generation = session.runtimeGeneration;
    const task = persistentPerlQueue.then(async () => {
      if (!persistentPerl || generation !== persistentRuntimeGeneration) return;
      const sessionValue = persistentPerl.createInt(session.id);
      try {
        await persistentPerl.call("Pagi::ZeroPerl::Runner::abort_session", [sessionValue], "void");
        const perlError = persistentPerl.getLastError();
        if (perlError) throw new Error(perlError);
        persistentPerl.clearError();
      } finally {
        sessionValue.dispose();
      }
    });
    persistentPerlQueue = task.catch(() => void 0);
    void task.catch((error) => resetPersistentRuntime(describePagiFailure(session, error, "perl.abort_session")));
  }
  function failPagiSession(session, error, { abort = true } = {}) {
    if (session.finished) return;
    session.finished = true;
    stopPagiSession(session, error);
    const normalized = describePagiFailure(session, error);
    if (abort) abortPersistentSession(session);
    console.error("PAGI session failed", {
      errorId: normalized.pagiErrorId,
      phase: normalized.pagiPhase,
      method: session.scope?.method,
      path: session.scope?.raw_path,
      message: diagnosticExcerpt(normalized, 1024)
    });
    session.reject(normalized);
    void session.sink.fail(normalized);
  }
  function resetPersistentRuntime(error) {
    if (persistentRuntimeResetPromise) return persistentRuntimeResetPromise;
    const oldPerl = persistentPerl;
    const poisonedGeneration = persistentRuntimeGeneration;
    persistentPerl = void 0;
    persistentRuntimePromise = void 0;
    persistentRuntimeConfigKey = void 0;
    persistentRuntimeGeneration += 1;
    persistentPerlQueue = Promise.resolve();
    for (const session of [...pagiSessions.values()]) {
      if (session.runtimeGeneration === poisonedGeneration) {
        failPagiSession(session, error, { abort: false });
      }
    }
    persistentRuntimeResetPromise = Promise.resolve().then(async () => {
      try {
        await oldPerl?.dispose();
      } catch (disposeError) {
        console.error("Unable to dispose poisoned ZeroPerl runtime", disposeError);
      }
    }).finally(() => {
      persistentRuntimeResetPromise = void 0;
    });
    return persistentRuntimeResetPromise;
  }
  function sessionForHost(idValue) {
    const session = pagiSessions.get(idValue.toInt());
    if (!session || session.finished) throw new Error("PAGI session is no longer active");
    return session;
  }
  function registerPersistentHostFunctions(perl) {
    perl.registerFunction("worker_send_event", async (sessionId, eventJson) => {
      const session = sessionForHost(sessionId);
      if (!session.connection.status().connected) throw new Error("PAGI client disconnected");
      await session.sink.send(JSON.parse(eventJson.toString()));
      return perl.createUndef();
    });
    perl.registerFunction("worker_receive_register", (sessionId) => perl.createInt(sessionForHost(sessionId).receiveDispatcher.register()));
    perl.registerFunction("worker_receive_cancel", (sessionId, receiveId) => {
      sessionForHost(sessionId).receiveDispatcher.cancel(receiveId.toInt());
      return perl.createUndef();
    });
    perl.registerFunction("worker_disconnect_register", (sessionId) => perl.createInt(sessionForHost(sessionId).disconnectDispatcher.register()));
    perl.registerFunction("worker_disconnect_cancel", (sessionId, disconnectId) => {
      sessionForHost(sessionId).disconnectDispatcher.cancel(disconnectId.toInt());
      return perl.createUndef();
    });
    perl.registerFunction("worker_connection_status", (sessionId) => {
      const session = pagiSessions.get(sessionId.toInt());
      return perl.createString(JSON.stringify(session?.connection.status() ?? {
        connected: false,
        reason: "session_finished"
      }));
    });
    perl.registerFunction("worker_timer_start", (sessionId, milliseconds) => perl.createInt(sessionForHost(sessionId).timers.start(milliseconds.toInt())));
    perl.registerFunction("worker_timer_cancel", (sessionId, timerId) => {
      sessionForHost(sessionId).timers.cancel(timerId.toInt());
      return perl.createUndef();
    });
    perl.registerFunction("worker_application_finished", (sessionId, statusJson) => {
      const session = pagiSessions.get(sessionId.toInt());
      if (!session || session.finished) return perl.createUndef();
      const status = JSON.parse(statusJson.toString());
      if (session.lifespan?.decline()) {
        session.finished = true;
        stopPagiSession(session);
        session.resolve();
        console.info("PAGI lifespan unsupported; continuing startup");
        return perl.createUndef();
      }
      if (status.error) {
        const failure = describePagiFailure(
          session,
          new Error(status.error),
          `application.${status.phase ?? "finish"}`
        );
        failPagiSession(session, failure);
        void persistentPerlQueue.then(() => resetPersistentRuntime(failure));
      } else {
        finishPagiSession(session);
      }
      return perl.createUndef();
    });
  }
  async function createPersistentRuntime(config) {
    const generation = persistentRuntimeGeneration;
    const { perlEnv, ...applicationConfig } = config;
    const perl = await X.create({
      fileSystem: await getPerlFileSystem(),
      wasmModule: zeroperlModule,
      env: perlEnv,
      stdout: (chunk) => console.log("zeroperl:", typeof chunk === "string" ? chunk : decoder2.decode(chunk)),
      stderr: (chunk) => console.error("zeroperl:", typeof chunk === "string" ? chunk : decoder2.decode(chunk))
    });
    try {
      persistentPerl = perl;
      registerPersistentHostFunctions(perl);
      extensionManager.register(perl);
      const bootstrapExpression = perlJsonExpression({ applicationConfig, perlEnv });
      const configure = await perl.eval(
        `require JSON::PP;
         my $bootstrap = ${bootstrapExpression};
         while (my ($name, $value) = each %{$bootstrap->{perlEnv}}) {
           $ENV{$name} = $value;
         }
         for my $library (reverse split(/:/, $bootstrap->{perlEnv}->{PERL5LIB} // '')) {
           unshift @INC, $library if length($library) && !grep { $_ eq $library } @INC;
         }
         $Pagi::WebDyne::CONFIG = $bootstrap->{applicationConfig};`
      );
      if (!configure.success) throw new Error(configure.error);
      for (const file of mode === "pagi" ? [PAGI_RUNNER, WEBDYNE_APPLICATION] : [PAGI_RUNNER]) {
        const load = await perl.runFile(file);
        if (!load.success) throw new Error(load.error);
      }
      if (mode === "invocation") {
        const timers = await perl.eval("require Future::IO; require Future::IO::Impl::ZeroPerl; Future::IO->override_impl('Future::IO::Impl::ZeroPerl');");
        if (!timers.success) throw new Error(timers.error);
      }
      if (mode === "pagi") await startLifespan(generation);
      return { perl, generation };
    } catch (error) {
      if (persistentPerl === perl) await resetPersistentRuntime(error);
      else if (persistentRuntimeResetPromise) await persistentRuntimeResetPromise;
      throw error;
    }
  }
  async function persistentRuntime(config) {
    if (persistentRuntimeResetPromise) await persistentRuntimeResetPromise;
    const configKey = JSON.stringify(config);
    if (persistentRuntimeConfigKey && persistentRuntimeConfigKey !== configKey) {
      throw new Error("WebDyne runtime bindings changed within one provider instance");
    }
    persistentRuntimeConfigKey ??= configKey;
    persistentRuntimePromise ??= createPersistentRuntime(config).catch((error) => {
      persistentRuntimePromise = void 0;
      persistentRuntimeConfigKey = void 0;
      throw error;
    });
    return persistentRuntimePromise;
  }
  function createPagiSession(scope, request, transport) {
    let resolve;
    let reject;
    const session = {
      id: nextPagiSessionId++,
      scope,
      sink: transport.sink,
      connection: transport.connection,
      finished: false,
      runtimeGeneration: void 0,
      showFailureDetails: request ? showFailureDetails(request) : false,
      completion: new Promise((nextResolve, nextReject) => {
        resolve = nextResolve;
        reject = nextReject;
      }),
      resolve: () => resolve(),
      reject: (error) => reject(error)
    };
    session.receiveDispatcher = createReceiveDispatcher(
      transport.receiveSource,
      (receiveId, event) => queueReceive(session, receiveId, event),
      (error) => failPagiSession(session, error)
    );
    session.disconnectDispatcher = createDisconnectDispatcher(
      transport.connection,
      (disconnectId, reason) => queueDisconnect(session, disconnectId, reason),
      (error) => failPagiSession(session, error)
    );
    session.timers = createTimerRegistry((timerId) => queueTimer(session, timerId));
    return session;
  }
  function queueReceive(session, receiveId, event) {
    if (session.finished) return Promise.resolve();
    return enqueuePersistentPerl(session, "Pagi::ZeroPerl::Runner::deliver_receive", (perl) => {
      const sessionValue = perl.createInt(session.id);
      const receiveValue = perl.createInt(receiveId);
      const eventValue = perl.createString(JSON.stringify(event));
      return {
        args: [sessionValue, receiveValue, eventValue],
        dispose: () => {
          sessionValue.dispose();
          receiveValue.dispose();
          eventValue.dispose();
        }
      };
    });
  }
  function queueTimer(session, timerId) {
    if (session.finished) return Promise.resolve();
    return enqueuePersistentPerl(session, "Pagi::ZeroPerl::Runner::deliver_timer", (perl) => {
      const sessionValue = perl.createInt(session.id);
      const timerValue = perl.createInt(timerId);
      return {
        args: [sessionValue, timerValue],
        dispose: () => {
          sessionValue.dispose();
          timerValue.dispose();
        }
      };
    });
  }
  function queueDisconnect(session, disconnectId, reason) {
    if (session.finished) return Promise.resolve();
    return enqueuePersistentPerl(session, "Pagi::ZeroPerl::Connection::deliver_disconnect", (perl) => {
      const sessionValue = perl.createInt(session.id);
      const disconnectValue = perl.createInt(disconnectId);
      const reasonValue = perl.createString(reason);
      return {
        args: [sessionValue, disconnectValue, reasonValue],
        dispose: () => {
          sessionValue.dispose();
          disconnectValue.dispose();
          reasonValue.dispose();
        }
      };
    });
  }
  async function startPersistentSession(scope, request, transport, runtimeConfig, entrypoint) {
    const session = createPagiSession(scope, request, transport);
    session.entrypoint = entrypoint;
    void session.completion.catch(() => void 0);
    pagiSessions.set(session.id, session);
    try {
      const runtime2 = await persistentRuntime(runtimeConfig);
      session.runtimeGeneration = runtime2.generation;
      await invokeApplication(session);
      return session.completion;
    } catch (error) {
      failPagiSession(session, error);
      throw error;
    }
  }
  function invokeApplication(session) {
    return enqueuePersistentPerl(session, "Pagi::ZeroPerl::Runner::start_session", (perl) => {
      const sessionValue = perl.createInt(session.id);
      const scopeValue = perl.createString(serializePagiScope(session.scope));
      const entrypointValue = perl.createString(session.entrypoint ?? "Pagi::WebDyne::application");
      return {
        args: [sessionValue, scopeValue, entrypointValue],
        dispose: () => {
          sessionValue.dispose();
          scopeValue.dispose();
          entrypointValue.dispose();
        }
      };
    });
  }
  async function startLifespan(generation) {
    const transport = createLifespanTransport();
    const session = createPagiSession(transport.scope, null, transport);
    session.lifespan = transport;
    session.runtimeGeneration = generation;
    pagiSessions.set(session.id, session);
    void session.completion.catch((error) => transport.sink.fail(error));
    const ready = transport.startup;
    void ready.catch(() => void 0);
    const timeout = setTimeout(() => {
      failPagiSession(session, new Error("PAGI lifespan startup timed out after 10000 ms"));
    }, 1e4);
    try {
      await invokeApplication(session);
      const supported = await ready;
      await persistentPerlQueue;
      if (!supported) return;
      if (session.finished) throw new Error("PAGI lifespan application failed during startup");
    } finally {
      clearTimeout(timeout);
    }
  }
  function dispatch(request, bindings = {}) {
    if (mode !== "pagi") throw new Error("Invocation runtimes cannot dispatch HTTP requests");
    const runtimeConfig = webdyneRuntimeConfig(bindings);
    const scope = buildPagiScope(request);
    const transport = createFetchPagiTransport(scope, request, { webSocketAdapter });
    const completion = (async () => {
      let releaseExtensions;
      let applicationError;
      try {
        releaseExtensions = await extensionManager.attachScope({ scope, bindings, request });
        await startPersistentSession(scope, request, transport, runtimeConfig);
      } catch (error) {
        applicationError = error;
        if (!error?.pagiErrorId) console.error("PAGI application failed:", error);
        await transport.sink.fail(error);
        throw error;
      } finally {
        if (releaseExtensions) {
          try {
            await releaseExtensions();
          } catch (error) {
            console.error("WebDyne extension cleanup failed", error);
            throw applicationError ? new AggregateError([applicationError, error], "PAGI application and extension cleanup failed", { cause: applicationError }) : error;
          }
        }
      }
    })();
    void completion.catch(() => void 0);
    return { response: transport.response, completion, type: scope.type };
  }
  async function invoke({ scope, bindings = {}, entrypoint, invocation }) {
    if (mode !== "invocation") throw new Error("invoke requires an invocation runtime");
    if (!/^[A-Za-z_]\w*(?:::[A-Za-z_]\w*)+$/.test(entrypoint ?? "")) {
      throw new TypeError("Invocation entrypoint must be a qualified Perl function name");
    }
    const transport = createInvocationTransport();
    let release;
    let failure;
    try {
      release = await extensionManager.attachScope({ scope, bindings, invocation });
      await startPersistentSession(scope, null, transport, webdyneRuntimeConfig(bindings), entrypoint);
      return transport.result();
    } catch (error) {
      failure = error;
      throw error;
    } finally {
      try {
        if (release) await release();
      } catch (error) {
        throw failure ? new AggregateError([failure, error], "Invocation and cleanup failed") : error;
      } finally {
        transport.close();
      }
    }
  }
  async function dispose() {
    await resetPersistentRuntime(new Error("WebDyne runtime disposed"));
  }
  return { dispatch, invoke, dispose };
}

// node_modules/@webdyne/webdyne-zeroperl-browser/browser/channel.js
async function sendResponse(port, handler) {
  const abort = new AbortController();
  let reader;
  let cancelled = false;
  port.onmessage = async ({ data }) => {
    try {
      if (data.type === "cancel") {
        cancelled = true;
        abort.abort();
        await reader?.cancel();
        port.close();
      } else if (data.type === "pull" && reader) {
        const { value, done } = await reader.read();
        if (cancelled) return;
        if (done) {
          port.postMessage({ type: "end" });
          port.close();
        } else {
          const bytes2 = value.slice().buffer;
          port.postMessage({ type: "chunk", bytes: bytes2 }, [bytes2]);
        }
      }
    } catch (error) {
      port.postMessage({ type: "error", message: error.message });
      port.close();
    }
  };
  try {
    const response = await handler(abort.signal);
    if (cancelled) {
      await response.body?.cancel();
      return;
    }
    reader = response.body?.getReader();
    port.postMessage({
      type: "headers",
      status: response.status,
      statusText: response.statusText,
      headers: [...response.headers],
      hasBody: !!reader
    });
    if (!reader) port.close();
  } catch (error) {
    port.postMessage({ type: "error", message: error.message });
    port.close();
  }
}

// node_modules/@webdyne/webdyne-zeroperl-browser/browser/perl-worker.js
var base = new URL("./", import.meta.url);
var runtimePromise;
async function bytes(name) {
  const response = await fetch(new URL(name, base));
  if (!response.ok) throw Error(`Unable to load ${name}: ${response.status}`);
  return response.arrayBuffer();
}
function runtime() {
  runtimePromise ??= Promise.all([bytes("runtime.wasm"), bytes("app-vfs.tar.gz"), bytes("perl-lib-vfs.tar.gz")]).then(async ([wasm, appVfsArchive, perlLibraryVfsArchive]) => createWebDyneRuntime({
    zeroperlModule: await WebAssembly.compile(wasm),
    appVfsArchive,
    perlLibraryVfsArchive
  }));
  return runtimePromise;
}
self.onmessage = ({ data, ports }) => {
  if (data.type !== "request" || !ports[0]) return;
  void sendResponse(ports[0], async (signal) => {
    const host = await runtime();
    const request = new Request(data.request.url, {
      method: data.request.method,
      headers: data.request.headers,
      body: data.request.body,
      signal
    });
    const dispatch = host.dispatch(request, define_LOCAL_CONFIG_default.bindings);
    void dispatch.completion.catch((error) => console.error("Local PAGI completion failed", error));
    return dispatch.response;
  });
};
