var map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [115, 0],
    zoom: 4
    });
    
    // event click
    document.getElementById('buttons')
            .addEventListener('click', (event) => {
                // console.log(event)
                var language = event.target.id.substr('button-'.length);
    
                map.setLayoutProperty('label_country', 'text-field', [
                    'get', 'name:' + language
                ])
            })
    
    
    var colors = ['#f2607b','#7daafb','#99014b', '#f2d0ff']
    
    document.getElementById('checkrh').addEventListener('change', (event) => {
    //    console.log()
        colors.forEach((value, i) => {
            if (event.target.checked) {
                map.setLayoutProperty(
                    'rh_layer' + i,
                    'visibility',
                    'visible'
                );
            } else {
                map.setLayoutProperty(
                    'rh_layer' + i,
                    'visibility',
                    'none'
                );
            }
           
    
        })
       
    })
     
    var marker = new maplibregl.Marker()
    .setLngLat([115, 0])
    .addTo(map);
    
    var url = 'https://training-backend-signature-ibf.herokuapp.com/rh'
    fetch(url).then(data => data.json()).then(res => {
        console.log(res)
        res.features.forEach( (value, i) => {
            map.addSource('rh' + i, {
                'type': 'geojson',
                'data': value
            })
            map.addLayer({
                'id': 'rh_layer' + i,
                'type': 'fill',
                'source': 'rh' + i,
                'layout': {},
                'paint': {
                'fill-color': colors[i],
                'fill-opacity': 0.8,
                }
            })
        })
    })
    
    // The 'building' layer in the streets vector source contains building-height
    // data from OpenStreetMap.
    map.on('load', function () {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;
     
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
    labelLayerId = layers[i].id;
    break;
    }
    }
     
    map.addLayer(
    {
    'id': '3d-buildings',
    'source': 'openmaptiles',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
     
    // use an 'interpolate' expression to add a smooth transition effect to the
    // buildings as the user zooms in
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
    }
    },
    labelLayerId
    );
    });
    