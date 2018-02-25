function initMap() {
  let uluru = { lat: 34.6390136, lng: 50.8743435 };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru,
    disableDefaultUI: true
  });
  let marker = new google.maps.Marker({
    position: uluru,
    map
  });
}
