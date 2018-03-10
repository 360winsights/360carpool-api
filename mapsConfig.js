const gmc = require('@google/maps').createClient({
  key: 'AIzaSyAt4d1AYJVRO7XvJK2DyPluofs7QGRZVIc',
  Promise: Promise
})

const params = {
  origins: '420 Green Street, Whitby, Ontario',
  destinations: '1269 Concession 3, Uxbridge, Ontario',
  mode: 'driving'
}

gmc.distanceMatrix(params)
  .asPromise()
  .then((resp) => {
    console.log(resp.json.rows[0].elements[0].distance.value)
  })
  .catch((err) => {
    throw err
  })
