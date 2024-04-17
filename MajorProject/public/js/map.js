


mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style:"mapbox://style/mapbox/streets-v12", // container ID
        center: coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });



    console.log(coordinates);
    const marker= new mapboxgl.Marker({color:"red"})
        .setLngLat(coordinates) // Listing.geometry.cooridnates
        .setPopup(new mapboxgl.Popup({offset:25, })
      
        .setHTML("<h4><i><b>Location Provided By Owner</b><i></h4><p><i>Exact location will be probided after booking<i></p>")
        .setMaxWidth("300px"))
        .addTo(map);





