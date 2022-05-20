// When we extend a block the content inside disappears

// This javascript will be integreated into html and then runs on client side
// console.log('Hello from mapBox')
// const locations = JSON.parse(document.getElementById('map').dataset.locations)

// console.log(locations);


export const displayMap = locations => {
 mapboxgl.accessToken = 'pk.eyJ1Ijoia2FydGhpa2F0bWFwYm94IiwiYSI6ImNsMzhjZnVlODAwNmEzbnA3bjY5N20zNGgifQ.Zw3uFubdF2IRjg4EKb8B1Q';

 var map = new mapboxgl.Map({
  // This displayes our map in our webpage. The container is set to map, which is our div element which ID map
  container: 'map',
  style: 'mapbox://styles/karthikatmapbox/cl38cklmn000h15nyor3voe5m',
  scrollZoom: false,
  // first longitude and then latitude
  // center: [78.9629, 20.5937], // india
  // zoom: 3
 });

 //1 create a create bounds variable. This bounds object is the area, that  will be displayed in the map. we will extend the bounds with all the locations array , that is coming from the db. 
 const bounds = new mapboxgl.LngLatBounds();

 //2 loop all the locations array and add marker for each of them
 locations.forEach(location => {

  //1 Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //2 Add marker
  new mapboxgl.Marker({
   element: el,
   anchor: 'bottom'
  })
   .setLngLat(location.coordinates)
   .addTo(map);

  //3 Add popup
  new mapboxgl.Popup({
   offset: 30 // the popup overlaps with marker, so set offset
  })
   .setLngLat(location.coordinates)
   .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
   .addTo(map);

  //4 Extend map bounds to include current location
  bounds.extend(location.coordinates);

  // map.fitBounds(bounds)
 });

 // fitBounds is the function helps to move and zoom to the bounds
 map.fitBounds(bounds, {
  padding: {
   top: 200,
   bottom: 150,
   left: 100,
   right: 100
  }
 });
}

// export const displayMap = locations => {
//  mapboxgl.accessToken =
//   'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';

//  var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
//   scrollZoom: false
//   // center: [-118.113491, 34.111745],
//   // zoom: 10,
//   // interactive: false
//  });

//  const bounds = new mapboxgl.LngLatBounds();

//  locations.forEach(loc => {
//   // Create marker
//   const el = document.createElement('div');
//   el.className = 'marker';

//   // Add marker
//   new mapboxgl.Marker({
//    element: el,
//    anchor: 'bottom'
//   })
//    .setLngLat(loc.coordinates)
//    .addTo(map);

//   // Add popup
//   new mapboxgl.Popup({
//    offset: 30
//   })
//    .setLngLat(loc.coordinates)
//    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
//    .addTo(map);

//   // Extend map bounds to include current location
//   bounds.extend(loc.coordinates);
//  });

//  map.fitBounds(bounds, {
//   padding: {
//    top: 200,
//    bottom: 150,
//    left: 100,
//    right: 100
//   }
//  });
// };