import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { yearsArray } from '../helpers/function';



const VirtualWaterChart = ({ tradeType, country, waterType }) => {
  const [data, setData] = useState(null)



  const fetchData = async (tradeType, country, waterType) => {
    try {
      const response = await fetch(`/VirtualWaterData_${tradeType}/${country}_${waterType}.json`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(err);
      setData(null);
    }
  };


  useEffect(() => {
    fetchData(tradeType, country, waterType);
  }, [country, tradeType, waterType]);

console.log(data)

  const series = data && tradeType && data.map(sector => ({
    name: sector.SectorNames,
    data: sector[tradeType],
    color: sector.color
  }));

  return (
    <div style={{ height: "100%", padding: "20px" }}>
      {data ? (
        <ReactApexChart
          options={{
            chart: {
              type: 'bar',
              stacked: true,
              height: '100%',
            },
            xaxis: {
              categories: yearsArray,
              title: {
                text: 'Year'
              }
            },
            yaxis: {
              title: {
                text: `Virtual Water ${tradeType} (in million m³)`
              },
              labels: {
                formatter: function (val) {
                  return (val / 1e6).toFixed(0) + 'M m³';
                }
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
              offsetX: 40
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return (val / 1e6).toFixed(0) + 'M m³';
                }
              }
            },
            plotOptions: {
              bar: {
                horizontal: false,
                dataLabels: {
                  total: {
                    enabled: false,
                  }
                }
              },
            },
          }}
          series={series}
          type="bar"
          height="100%"
        />
      ) : (
        <p>Please select country, Trade type: Import/Export, Water type: Blue/Green</p>
        // <div className="map_loader_container">
        //   <span className="map_loader"></span>

        // </div>

      )}

    </div>
  );
}

export default VirtualWaterChart;
