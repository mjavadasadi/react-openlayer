import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import ZoomSlider from 'ol/control/ZoomSlider';
import { fromLonLat } from 'ol/proj';

function App() {
    const [map, setMap] = useState(null);
    const mapElement = useRef(null);

    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        });

        const iconFeature = new Feature({
            geometry: new Point(fromLonLat([57.02852587303524,30.281717882913245])),
            name: 'fardup',
            // population: 4000,
            // rainfall: 500,
        });

        const vectorSource = new VectorSource({
            features: [iconFeature],
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        const initialMap = new Map({
            target: mapElement.current,
            layers: [osmLayer, vectorLayer],
            view: new View({
                center: fromLonLat([51.899414, 34.976002]),
                zoom: 5,
            }),
        });

        const zoomSlider = new ZoomSlider();
        initialMap.addControl(zoomSlider);

        setMap(initialMap);
    }, []);

    return (
        <div ref={mapElement} style={{ height: '100vh', width: '100%' }} className="map-container" />
    );
}

export default App;
