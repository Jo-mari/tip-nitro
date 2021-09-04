import {Loader} from "@googlemaps/js-api-loader"

const mapId = document.getElementById('map')
const tipLocation = {lat: 14.62674026710558, lng: 121.06146236441796};

const loader = new Loader({
  apiKey: 'AIzaSyBNqnN4Ko5zt6LjEi_iV6nImZt2OiTCrjs',
  version: 'weekly',
});

loader.load().then(() => {

  map = new google.maps.Map(mapId, {
    center: tipLocation,
    zoom: 18,
  });

  new google.maps.Marker({
    position: tipLocation,
    map,
    animation: google.maps.Animation.BOUNCE
  })
})

