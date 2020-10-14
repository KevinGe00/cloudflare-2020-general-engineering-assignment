const links = [
  { 
    name: 'Personal Website', 
    url: 'http://kevinge.ca/' 
  },
  { 
    name: 'My University', 
    url: 'https://www.utoronto.ca/' 
  },
  { 
    name: 'Create your own game', 
    url: 'https://www.codingame.com/start' 
  },
]

const socialLinks = [
  {
    url: 'https://www.linkedin.com/in/ge-kevin/',
    svg: 'https://simpleicons.org/icons/linkedin.svg',
  },
  {
    url: 'https://github.com/KevinGe00',
    svg: 'https://simpleicons.org/icons/github.svg',
  },
  {
    url: 'https://www.instagram.com/kevnge',
    svg: 'https://simpleicons.org/icons/instagram.svg',
  },
]

//HTMLRewriter Transformer Classes
class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    links.forEach((link) => {
      element.append(`<a href=${link.url} target="_blank">${link.name}</a>`, {
        html: true,
      })
    })
  }
}

class RemoveAttributeTransformer {
  constructor(attribute) {
    this.attribute = attribute
  }

  async element(element) {
    element.removeAttribute(this.attribute)
  }
}

class SetAttributeTransformer {
  constructor(attribute, value) {
    this.attribute = attribute
    this.value = value
  }

  async element(element) {
    element.setAttribute(this.attribute, this.value)
  }
}

class SetInnerContentTransformer {
  constructor(value) {
    this.value = value
  }

  async element(element) {
    element.setInnerContent(this.value)
  }
}
 
class SocialLinksTransformer {
  constructor(socialLinks) {
    this.socialLinks = socialLinks
  }

  async element(element) {
    socialLinks.forEach((social) => {
      element.append
      (
        `
        <a href=${social.url} target="_blank">
          <img src=${social.svg}></img>
        </a>
        `, 
        {html: true,}
      )
    })
  }
}

//HTMLRewriter initialization
const rewriter = new HTMLRewriter()
  .on('div#links', new LinksTransformer(links))
  .on('div#profile', new RemoveAttributeTransformer('style'))
  .on(
    'img#avatar',
    new SetAttributeTransformer(
      'src',
      'https://media-exp1.licdn.com/dms/image/C4E03AQHr2TPeqBpAGQ/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=o29mvmv0XbPu0hoIlRupfC-HNSmgwQBj55MprMAZIU0',
    ),
  )
  .on('h1#name', new SetInnerContentTransformer('Some Links'))
  .on('div#social', new RemoveAttributeTransformer('style'))
  .on('div#social', new SocialLinksTransformer(socialLinks))
  .on('title', new SetInnerContentTransformer('Kevin Ge'))
  .on('body', new SetAttributeTransformer("class", "bg-purple-600"))

  
//Listener and event handling
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.url.endsWith('/links')) {
    const json = JSON.stringify(links)

    return new Response(json, {
      headers: { 'content-type': 'application/json;charset=UTF-8' },
    })
  } else {
    const staticLink = 'https://static-links-page.signalnerve.workers.dev'
    const staticResp = await fetch(staticLink, {
      headers: { 'content-type': 'text/html' },
    })

    return rewriter.transform(staticResp)
  }
}
