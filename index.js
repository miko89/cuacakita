


var map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [118.347879, -2],
    zoom: 4.5
});

var marker = new maplibregl.Marker()
    .setLngLat([13.550343, 55.665957])
    .addTo(map);


//SIDEBAR==========================================================================

function openNav() {
    document.getElementById("mySidebar").style.width = "300px";




}

function closeNav() {
    // document.getElementById("mySidebar").style.width = "50px";
    document.getElementById("mySidebar").style.width = "50px";


}

//SIDEBAR==========================================================================

map.on('load', function () {
    map.addSource("contours", {
        type: "vector",
        url: "https://tiles.circlegeo.com/data/kotkab.json",
    });


    // INPUT DATA HUJAN//
    map.addSource('prec-00', {
        type: 'raster',
        scheme: "tms",
        tiles: [
            'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/rr/1000/'+data_d00+'00/'+data_d01+'00/{z}/{x}/{y}.png?ci=1&overlays=contourf'
        ]
    })
    map.addSource('prec-12', {
        type: 'raster',
        scheme: "tms",
        tiles: [
            'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/rr/1000/2022120600/2022120700/{z}/{x}/{y}.png?ci=1&overlays=contourf'
        ]
    })
    map.addLayer({
        id: "prec-00",
        type: "raster",
        source: "prec-00",
        minzoom: 0,
        maxzoom: 22,
        paint: {
            "raster-opacity": 1,
        },

    })

    map.addLayer({
        id: "prec-12",
        type: "raster",
        source: "prec-12",
        minzoom: 0,
        maxzoom: 22,
        layout: {
            visibility: 'none'
        },
        paint: {
            "raster-opacity": 1,
        },
    })



    // INPUT DATA SUHU//
    map.addSource('temp-00', {
        type: 'raster',
        scheme: "tms",
        tiles: [
            'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/temp/1000/'+data_d00+'00/'+data_d01+'00/{z}/{x}/{y}.png?ci=1&overlays=contourf'
        ]
    })
    map.addSource('temp-12', {
        type: 'raster',
        scheme: "tms",
        tiles: [
            'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/temp/1000/2022120600/2022120700/{z}/{x}/{y}.png?ci=1&overlays=contourf'
        ]
    })


    map.addLayer({
        id: "temp-00",
        type: "raster",
        source: "temp-00",
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
        id: "temp-12",
        type: "raster",
        source: "temp-12",
        minzoom: 0,
        maxzoom: 22,
        layout: {
            visibility: 'none'
        },
        paint: {
            "raster-opacity": 1,
        },
    })


    map.addSource('rh-00', {
        type: 'raster',
        scheme: "tms",
        tiles: [
            'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/rh/850/'+data_d00+'00/'+data_d01+'00/{z}/{x}/{y}.png?ci=1&overlays=contourf'
        ]
    })
    map.addSource('rh-12', {
        type: 'raster',
        scheme: "tms",
        tiles: [
            'https://signature.bmkg.go.id/api21/mpl_req/ecmwf/rh/850/2022120600/2022120700/{z}/{x}/{y}.png?ci=1&overlays=contourf'
        ]
    })


    map.addLayer({
        id: "rh-00",
        type: "raster",
        source: "rh-00",
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
        id: "rh-12",
        type: "raster",
        source: "rh-12",
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
        id: "kotkab",
        type: "line",
        source: "contours",
        "source-layer": "kotkab",
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "black",
            "line-width": 1,
        },
    });
})

// event click
document.getElementById('hujan').addEventListener('change', (event) => {
    //    console.log()

    if (event.target.checked) {
        map.setLayoutProperty('prec-00', 'visibility', 'visible')
        

    } else {
        map.setLayoutProperty('prec-00', 'visibility', 'none')
       
    }


})


// document.getElementById('before').addEventListener('click', (event) => {

//     if (event.target.checked) {
//     map.setLayoutProperty('prec-00', 'visibility', 'none')
//     map.setLayoutProperty('prec-00', 'visibility', 'none')

//     } else {
//     map.setLayoutProperty('prec-12', 'visibility', 'none')
//     map.setLayoutProperty('prec-00', 'visibility', 'visible')

//     }
//     })

// document.getElementById('next').addEventListener('click', (event) => {
//     map.setLayoutProperty('prec-00', 'visibility', 'none')
//     map.setLayoutProperty('prec-12', 'visibility', 'visible')


// })


document.getElementById('suhu').addEventListener('change', (event) => {
    //    console.log()

    if (event.target.checked) {
        map.setLayoutProperty('temp-00', 'visibility', 'visible')
        
    } else {

        map.setLayoutProperty('temp-00', 'visibility', 'none')
        
    }


})


document.getElementById('kelembaban').addEventListener('change', (event) => {
    //    console.log()

    if (event.target.checked) {
        map.setLayoutProperty('rh-00', 'visibility', 'visible')
       
    } else {

        map.setLayoutProperty('rh-00', 'visibility', 'none')
      
    }


})


document.getElementById('indonesia').addEventListener('click', function () {
    map.fitBounds([
        [94.85204, 7.01763,],
        [140.80078, -11.09217]
    ]);
});

document.getElementById('sumatera').addEventListener('click', function () {
    map.fitBounds([
        [94.81716, 6.23014],
        [108.45703, -6.92643]]
    );
});

document.getElementById('kalimantan').addEventListener('click', function () {
    map.fitBounds([
        [107.64919, 4.43625],
        [119.00391, -4.34641]]
    );
});

// var url2 = 'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=5011002'
//     fetch(url2).then(data => data.json()).then(res => {

//         res.features.forEach(value => {
//             // var popup = new maplibregl.Popup({ offset: 25 }).setText(
//             //     'Provinsi : ' + value.properties.provinsi + ' Kota/Kabupaten : ' + value.properties.kab_kota
//             // );

//             // create DOM element for the marker
//             var el = document.createElement('div');
//             el.id = 'marker';

//             new maplibregl.Marker()
//             .setLngLat({'data': value.geometry.coordinates}
//                 )
//             // .setPopup(popup)
//             .addTo(map);
//         })
//     })



moment.locale('id')
var d0 = moment.utc().add(0, 'days').add(7, 'hours').format('DD/MM/YYYY');
//     var d1 = moment.utc().add(1, 'days').add(7, 'hours').format('DD/MM/YYYY')
//     var d2 = moment.utc().add(2, 'days').add(7, 'hours').format('DD/MM/YYYY')
//     var d3 = moment.utc().add(3, 'days').add(7, 'hours').format('DD/MM/YYYY')
//     var d4 = moment.utc().add(4, 'days').add(7, 'hours').format('DD/MM/YYYY')
//     var d5 = moment.utc().add(5, 'days').add(7, 'hours').format('DD/MM/YYYY')
//     var d6 = moment.utc().add(6, 'days').add(7, 'hours').format('DD/MM/YYYY')
//     var d7 = moment.utc().add(7, 'days').add(7, 'hours').format('DD/MM/YYYY')


    document.getElementById("date00").innerHTML = d0;
//     document.getElementById("date01").innerHTML = d1;
//     document.getElementById("date02").innerHTML = d2;
//     document.getElementById("date03").innerHTML = d3;
//     document.getElementById("date04").innerHTML = d4;
//     document.getElementById("date05").innerHTML = d5;
//     document.getElementById("date06").innerHTML = d6;
//     document.getElementById("date07").innerHTML = d7;


    var data_d00 = moment.utc().add(0, 'days').add(7, 'hours').format('YYYYMMDD');
    var data_d01 = moment.utc().add(1, 'days').add(7, 'hours').format('YYYYMMDD');
    var data_d02 = moment.utc().add(2, 'days').add(7, 'hours').format('YYYYMMDD');
    var data_d03 = moment.utc().add(3, 'days').add(7, 'hours').format('YYYYMMDD');
    var data_d04 = moment.utc().add(4, 'days').add(7, 'hours').format('YYYYMMDD');
    var data_d05 = moment.utc().add(5, 'days').add(7, 'hours').format('YYYYMMDD');
    var data_d06 = moment.utc().add(6, 'days').add(7, 'hours').format('YYYYMMDD');
    var data_d07 = moment.utc().add(7, 'days').add(7, 'hours').format('YYYYMMDD');







function update() {
    $('#date_wib').html(moment.utc().add(7, 'hours').format('dddd, Do/MMMM/YYYY, LTS [WIB]'));
    $('#date_utc').html(moment.utc().format('dddd, Do/MMMM/YYYY, LTS [UTC]'));
}


setInterval(update, 1000);


function capture () {
    html2canvas(document.map).then((canvas) => {
      let a = document.createElement("a");
      a.download = "infografis.png";
      a.href = canvas.toDataURL("image/png");
      a.click(); // MAY NOT ALWAYS WORK!
    });
  }