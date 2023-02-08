var CMS_TOKEN = 'a990257a6d0c43ba346ef8adec1064';
var CMS_URL = 'https://graphql.datocms.com';
var CMS_QUERY = `query MyQuery {
  allGames {
    productName
    productHandle
    steps {
      word
      pixelArtSrc
    }
  }
}`

// Call API and return a Promise:
function fetchGames() {
  var headers = {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + CMS_TOKEN,
  }
  var body = JSON.stringify({
    query: CMS_QUERY
  })

  return fetch(CMS_URL, {
    method: 'POST',
    headers,
    body
  })
  .then((res) => res.json())
  .then((result) => result.data)
}
