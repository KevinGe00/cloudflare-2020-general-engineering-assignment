const links = [
  { "name": "Link Name1", "url": "https://linkurl" },
  { "name": "Link Name2", "url": "https://linkurl" },
  { "name": "Link Name3", "url": "https://linkurl" }
]

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.url.endsWith("/links")) {
    const json = JSON.stringify(links)

    return new Response(
      json, 
      {headers: { "content-type": "application/json;charset=UTF-8" }}
    )
  }
}
