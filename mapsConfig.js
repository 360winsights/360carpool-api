const GoogleMapsAPI = require('googlemaps')

const publicConfig = {
  key: 'AIzaSyAt4d1AYJVRO7XvJK2DyPluofs7QGRZVIc',
  stagger_time: 1000, // for elevationPath
  encode_polylines:   false,
  secure: true // use https
}
const gmAPI = new GoogleMapsAPI(publicConfig)

const params = {
  origins: '420 Green Street, Whitby, Ontario',
  destinations: '1269 Concession 3, Uxbridge, Ontario',
  mode: 'driving'
};

gmAPI.distance(params, (err, result)=> {
  console.log(result.rows[0].elements[0].distance.value)
})
