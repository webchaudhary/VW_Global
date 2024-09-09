import React, { useState } from 'react'
import VirtualWaterChart from '../components/VirtualWaterChart'
import { countries } from '../helpers/function';
import { useSelectedFeatureContext } from '../contexts/SelectedFeatureContext';




const VirtualWaterPage = () => {

    const { country, setCountry, tradeType, setTradeType, waterType, setWaterType } = useSelectedFeatureContext();


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
                    <VirtualWaterChart
                        tradeType={tradeType}
                        country={country}
                        waterType={waterType}


                    />


                </div>
            </div>


        </>
    )
}

export default VirtualWaterPage