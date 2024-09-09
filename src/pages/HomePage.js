import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

import BaseMap from '../components/BaseMap';
import { BaseMapsLayers, mapCenter, maxBounds, setDragging, setInitialMapZoom } from '../helpers/mapFunction';
import Countries_boundaries from "../assets/data/Countries_boundaries.json"
import { ColorLegendsData } from '../assets/data/ColorLegendsData';
import { calculateAverageOfArray, countries, fillDensityColor } from '../helpers/function';
import FiltereredDistrictsFeatures from '../components/FiltereredDistrictsFeatures';
import DynamicLegend from '../components/legend/DynamicLegend';
import { useSelectedFeatureContext } from '../contexts/SelectedFeatureContext';


const HomePage = () => {

  const { country, setCountry, tradeType, setTradeType, waterType, setWaterType } = useSelectedFeatureContext();

  const [data, setData] = useState(null)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/FlowsC2CMatrix/${waterType}/${country}.json`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setData(null);
      }
    };

    if (country && tradeType && waterType) {
      fetchData();
    }


  }, [country, tradeType, waterType]);



  const [selectedBasemapLayer, setSelectedBasemapLayer] = useState(BaseMapsLayers[0]);

  const handleBasemapSelection = (e) => {
    const selectedItem = BaseMapsLayers.find((item) => item.name === e.target.value);
    setSelectedBasemapLayer(selectedItem);
  };


  const ColorLegendsDataItem = ColorLegendsData[tradeType];


  function CountriesOnEachFeature(feature, layer) {
    if (data) {
      layer.on("mouseover", function (e) {
        const DataItem = data.find(
          (item) => item['Country'] === feature.properties['name']
        );
  
        let popupContent;
  
        if (!DataItem) {
          popupContent = `<div>Data not available for ${feature.properties.name}</div>`;
        } else {
          popupContent = `
            <div>
              Country: ${feature.properties.name}<br/>
              VW Water Import: ${DataItem.Import !== "NA" ? parseFloat(calculateAverageOfArray(DataItem.Import)).toLocaleString() + " m³" : "NA"}<br/>
              VW Water Export: ${DataItem.Export !== "NA" ? parseFloat(calculateAverageOfArray(DataItem.Export)).toLocaleString() + " m³" : "NA"}<br/>
            </div>
          `;
        }
  
        layer.bindTooltip(popupContent, { sticky: true });
        layer.openTooltip();
      });
  
      layer.on("mouseout", function () {
        layer.closeTooltip();
      });
    }
  }
  

  const CountriesStyle = (feature) => {
    const getDensityFromData = () => {
      const DataItem = data.find((item) => item['Country'] === feature.properties.name);

      return DataItem && DataItem[tradeType] !== "NA"
        ? calculateAverageOfArray(DataItem[tradeType])
        : null;
    };
    const density = getDensityFromData()


    return {
      // fillColor: DistrictDensity(density),
      fillColor: ColorLegendsDataItem ? fillDensityColor(ColorLegendsDataItem, density) : "none",
      // fillColor: feature.properties.name === country ? 'yellow' : (ColorLegendsDataItem ? fillDensityColor(ColorLegendsDataItem, density) : "none"),
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 1,
    };

  };



  return (
    <>
      <div className='dashboard_container'>

        <div className='left_panel'>
          <label>Select country</label>
          <select className="form-select mb-3" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select </option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <label>Select trade type</label>
          <select className="form-select mb-3" value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
            <option value="">Select</option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>

          <label>Select water type</label>
          <select className="form-select mb-3" value={waterType} onChange={(e) => setWaterType(e.target.value)}>
            <option value="">Select</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>


        </div>



        <div className='right_panel'>

          <MapContainer
            fullscreenControl={true}
            center={mapCenter}
            style={{ width: '100%', height: "100%", backgroundColor: 'white', border: 'none', margin: 'auto' }}
            zoom={setInitialMapZoom()}
            // maxBounds={maxBounds}
            zoomSnap={0.5}
            minZoom={setInitialMapZoom() - 1}
            keyboard={false}
            dragging={setDragging()}
            // attributionControl={false}
            // scrollWheelZoom={false}
            zoomControl={{ position: "topright" }}

            doubleClickZoom={false}
          >

            <div className='map_heading'>
              <p>{country} {waterType.charAt(0).toUpperCase() + waterType.slice(1).toLowerCase()} Virtual Water {tradeType} </p>
            </div>




            <div className='map_layer_manager'>
              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button map_layer_collapse collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                      Base Map
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body map_layer_collapse_body">
                      {BaseMapsLayers.map((option, index) => (
                        <div key={index} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id={option.name}
                            name="data_type"
                            value={option.name}
                            checked={selectedBasemapLayer?.name === option.name}
                            onChange={handleBasemapSelection}
                          />
                          <label htmlFor={option.name}>{option.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {selectedBasemapLayer && selectedBasemapLayer.url && (
              <TileLayer
                key={selectedBasemapLayer.url}
                attribution={selectedBasemapLayer.attribution}
                url={selectedBasemapLayer.url}
                subdomains={selectedBasemapLayer.subdomains}
              />
            )}



            <BaseMap />

            {data ? (
              <GeoJSON
                key={(data && data.length) + tradeType + waterType + country}
                // style={{ fillColor: 'none', weight: 4, color: 'yellow', fillOpacity: "0.4" }}
                data={Countries_boundaries}
                style={CountriesStyle}
                onEachFeature={CountriesOnEachFeature}
              // attribution={attribution}
              />
            ) : (
              <GeoJSON

                // style={{ fillColor: 'none', weight: 4, color: 'yellow', fillOpacity: "0.4" }}
                key={(data && data.length) + tradeType + waterType + country}
                data={Countries_boundaries}
                style={{
                  fillColor: "black",
                  weight: 2,
                  opacity: 1,
                  color: "black",

                  fillOpacity: "0.001",
                }}
              // onEachFeature={CountriesOnEachFeature}
              // attribution={attribution}
              />
            )}


            {ColorLegendsDataItem && data && (
              <DynamicLegend waterType={waterType}
                ColorLegendsDataItem={ColorLegendsDataItem} />
            )}

            <FiltereredDistrictsFeatures
              selectedCountry={country}

              layerKey={(data && data.length) + tradeType + waterType + country}

            />






          </MapContainer>

        </div>



      </div>
    </>
  );
}

export default HomePage;
