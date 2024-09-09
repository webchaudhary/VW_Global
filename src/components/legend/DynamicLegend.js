import React from 'react';

const DynamicLegend = ({ ColorLegendsDataItem, waterType }) => {
    const { Title, Unit, Colors, Value } = ColorLegendsDataItem;

    const reversedColors = [...Colors].reverse();
    const reversedValues = [...Value].reverse();


    return (
        <div className="legend_container">
            <div className="accordion" id="accordionLegend">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button map_layer_collapse_body" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Legend
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionLegend">
                        <div className="accordion-body map_layer_collapse_body">
                            <div className="legend_heading">
                                <p>{waterType.charAt(0).toUpperCase() + waterType.slice(1).toLowerCase()} Virtual Water {Unit}</p>
                            </div>

                            <div className="legend-color-container">
                                {reversedColors.map((color, index) => (
                                    <div key={index} className="legend_item">
                                        <span
                                            className="legend_item_square"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="legend-label">
                                            {index === reversedColors.length - 1 ? `> ${reversedValues[index]/1000000}` :
                                                // index === 0 ? `< ${reversedValues[index]}` :
                                                `${reversedValues[index]/1000000} — ${reversedValues[index + 1]/1000000}`}
                                        </span>
                                    </div>
                                ))}

                                <div className="legend_item">
                                    <span
                                        className="legend_item_square"
                                        style={{ backgroundColor: "yellow" }}
                                    />
                                    <span className="legend-label">
                                        Selected Country
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicLegend;
