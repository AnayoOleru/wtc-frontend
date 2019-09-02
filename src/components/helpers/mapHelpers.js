
export const setMapCenter = (map, mapsObj, icon) => {
  new mapsObj.Marker({
    map: map,
    icon: icon,
    position: map.getCenter()
  });
};

export const modalInit = (mapsObj, location) => {
  // InfoWindow accept only strings as content
  const content =
    `<h1 style="font-size: 2rem; text-align: center">${location.name}</h1>` +
    `<p style="text-align: center">${location.description}</p>` +
    `<p style="text-align: center">${location.address}</p>`;

  return new mapsObj.InfoWindow({
    content: content,
    maxWidth: 200
  });
}

export const markerInit = (map, mapsObj, location, icon) => {
  return new mapsObj.Marker({
    map: map,
    icon: icon,
    position: {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    }
  });
}

export const mapInit = (mapsObj, defaultPos, icon) => {
  const isGeolocated = navigator.geolocation
  // We initialize a map
  const map = new mapsObj.Map(document.getElementById('map'), {
    zoom: 13,
    center: defaultPos
  });
  
  // if user is GeoLocated
  // and defaultPos match with the one declared in Map.js
  // we set center based on geolocation
  if (isGeolocated && defaultPos.lat === 51.504831314) {
    isGeolocated.getCurrentPosition(position => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos)
      setMapCenter(map, mapsObj, icon)
    });
  } else { // otherwise we use the default position for it
    setMapCenter(map, mapsObj, icon)
  }

  //we return the map
  return map;
}