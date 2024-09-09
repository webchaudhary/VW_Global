import React, { useEffect } from 'react';
import { GeoJSON, Pane, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { mapCenter, setDragging, setInitialMapZoom } from '../helpers/mapFunction';

import Countries_boundaries from "../assets/data/Countries_boundaries.json"

const FiltereredDistrictsFeatures = ({ selectedCountry, layerKey }) => {

    const map = useMap();
    const initialZoom = setInitialMapZoom();


    const selectedFeatureData= Countries_boundaries.features.filter(item => item.properties['name'] === selectedCountry);

    useEffect(() => {
        const geoJsonLayer = L.geoJSON(selectedFeatureData);
        const bounds = geoJsonLayer.getBounds();

        if (bounds.isValid()) {
 
            const center = bounds.getCenter();
            map.setView(center, 4)
        } else {
            map.setView(mapCenter, initialZoom);
        }
    }, [selectedFeatureData, map, initialZoom]);



    return (
        <Pane name="selected_districts">
            <GeoJSON
                key={`${layerKey}`}
                style={{ fillColor: 'yellow', weight: 2, color: 'black', fillOpacity: "1" }}
                data={selectedFeatureData}
                // style={DistrictStyle}
                // onEachFeature={DistrictOnEachfeature}
                // attribution={attribution}
                // interactive={false}
            />
        </Pane>
    );
};

export default FiltereredDistrictsFeatures;
