var map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [115, 0],
    zoom: 4
    });
    
    map.on('load', function() { 
            map.addSource("contours", {
              type: "vector",
              url: "https://tiles.circlegeo.com/data/indocg.json",
            });
       
        // tunggu map nya di muat sempurna
        map.addSource('ecmwf-1',{
            type: 'raster',
            scheme: "tms",
            tiles: [
                'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/wind/1000/2022112412/2022112509/{z}/{x}/{y}.png?ci=1&overlays=contourf'
            ]
        })
        map.addSource('ecmwf-2',{
            type: 'raster',
            scheme: "tms",
            tiles: [
                'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/wind/1000/2022112412/2022112609/{z}/{x}/{y}.png?ci=1&overlays=contourf'
            ]
        })
        map.addLayer({
                id: "ecmwf-1",
                type: "raster",
                source: "ecmwf-1",
                minzoom: 0,
                maxzoom: 22,
                paint: {
                  "raster-opacity": 1,
                },
        })
    
        map.addLayer({
                id: "ecmwf-2",
                type: "raster",
                source: "ecmwf-2",
                minzoom: 0,
                maxzoom: 22,
                layout: {
                    visibility: 'none'
                },
                paint: {
                  "raster-opacity": 1,
                },
        })
    
             map.addLayer({
              id: "indocg",
              type: "line",
              source: "contours",
              "source-layer": "indocg",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#000",
                "line-width": 1,
              },
            });
    })
    
    // event click
    
    document.getElementById('before').addEventListener('click', (event) => {
        map.setLayoutProperty('ecmwf-2', 'visibility', 'none')
        map.setLayoutProperty('ecmwf-1', 'visibility', 'visible')
    })
    
    document.getElementById('next').addEventListener('click', (event) => {
        map.setLayoutProperty('ecmwf-2', 'visibility', 'visible')
        map.setLayoutProperty('ecmwf-1', 'visibility', 'none')
    })
    
    
    
    
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
    
    var url = 'https://training-backend-signature-ibf.herokuapp.com/rh'
    fetch(url).then(data => data.json()).then(res => {
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
    
    var url2 = 'https://sigi.pu.go.id/portalpupr/rest/services/sigi_postgis/ast_poscurahhujan_fulltable/FeatureServer/2/query?where=1=1&outfields=*&returngeometry=true&orderByFields=objectid ASC&resultOffset=0&resultRecordCount=100&f=geojson'
    fetch(url2).then(data => data.json()).then(res => {
        
        res.features.forEach(value => {
            var popup = new maplibregl.Popup({ offset: 25 }).setText(
                'Provinsi : ' + value.properties.provinsi + ' Kota/Kabupaten : ' + value.properties.kab_kota
            );
            
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'marker';
    
            new maplibregl.Marker()
            .setLngLat(value.geometry.coordinates)
            .setPopup(popup)
            .addTo(map);
        })
    })