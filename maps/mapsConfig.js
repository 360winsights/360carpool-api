const gmc = require('@google/maps').createClient({
  // key: 'AIzaSyAt4d1AYJVRO7XvJK2DyPluofs7QGRZVIc',
  key: 'AIzaSyDsYoWhoDJOMHz0rshH1LLWCke9Bj8sZ5g',
  Promise: Promise
})

module.exports = gmc

/*
const params = {
  origin: '420 Green Street, Whitby, Ontario',
  destination: '1269 Concession 3, Uxbridge, Ontario',
  //  waypoints: '127 Planks Ln, Uxbridge, ON L9P 1K5'
  waypoints: '127 Planks Ln, Uxbridge, ON L9P 1K5|620 Pennycross Lane, Carp, Ontario',
  optimize: true
}

gmc.directions(params)
  .asPromise()
  .then((resp) => {
    const data = resp.json.routes[0].legs
    const len = data.length
    let dist = 0;
    for (let i = 0; i < len; ++i) {
      dist += data[i].distance.value
    }

    console.log(dist)
  })
  .catch((err) => {
    throw err
  })

*/
