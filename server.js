const http = require("http");
const fs = require("fs");
const path = require("path");
const manifest = require("./manifest.json");
const data = require("./catalog.json");
const all = Object.entries(data.catalogs).flatMap(([category, items]) =>
  items.map(item => ({...item, category}))
);
const byId = new Map(all.map(x => ["tu:" + x.id, x]));
const json = (res, obj) => {
  res.writeHead(200, {"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*","Cache-Control":"public, max-age=3600"});
  res.end(JSON.stringify(obj));
};
http.createServer((req,res) => {
  const u = new URL(req.url, "http://localhost");
  if (u.pathname === "/manifest.json") return json(res, manifest);
  const m = u.pathname.match(/^\/catalog\/(movie|series)\/([^/.]+)\.json$/);
  if (m) {
    const [, type, catalogId] = m;
    const category = Object.keys(data.catalogs).find(k => k.toLowerCase().replace(/ /g,"-").replace(/&/g,"and") === catalogId);
    const q = (u.searchParams.get("search") || "").toLowerCase();
    const items = (category ? data.catalogs[category] : all)
      .filter(x => x.type === type && (!q || x.name.toLowerCase().includes(q)))
      .map(x => ({id:"tu:"+x.id, type:x.type, name:x.name, releaseInfo:x.year, description:x.category}));
    return json(res, {metas:items});
  }
  const meta = u.pathname.match(/^\/meta\/(movie|series)\/([^/.]+)\.json$/);
  if (meta) {
    const item = byId.get(decodeURIComponent(meta[2]));
    if (!item) return json(res,{meta:null});
    return json(res,{meta:{id:"tu:"+item.id,type:item.type,name:item.name,releaseInfo:item.year,description:item.category}});
  }
  res.writeHead(404); res.end("Not found");
}).listen(process.env.PORT || 7000, "0.0.0.0", () =>
 console.log("TOKUSATSU UNIVERSE listening on port " + (process.env.PORT || 7000))
);
