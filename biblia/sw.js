// La Biblia electrónica de /biblia/ ya no existe (los textos viven en /data/biblia/).
// Este archivo solo sirve para que quien la tenía instalada se desinscriba y se borre su caché.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  for(const k of await caches.keys())await caches.delete(k);
  await self.registration.unregister();
  for(const c of await self.clients.matchAll({type:'window'}))c.navigate('/');
})()));
