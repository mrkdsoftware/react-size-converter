import React, { useState, useEffect } from 'react';
import ButtonM from './compScripts/buttons.jsx';
import ButtonReturn from "./compScripts/returnButton.jsx";
import ButtonConvert from "./compScripts/convertButton.jsx";

export default function App() {
    const [currentView, setCurrentView] = useState('main');
    const [conversionData, setConversionData] = useState({
        size: 1,
        unit: 'cm',
        conversions: {}
    });

    useEffect(() => {
        convertSize();
    }, []);

    const hideMainMenu = (view) => {
        setCurrentView(view);
    };

    function formatItemDisplay(currNum, divisor, singularLabel, pluralLabel) {
        const value = currNum / divisor;

        const displayValue = value % 1 === 0 || value.toFixed(2).endsWith('00') ?
            Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
            value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        const label = value > 1 ? pluralLabel : singularLabel;
        return `~${displayValue} ${label}`;
    }

    const convertSize = () => {
        let currNum = parseFloat(conversionData.size);

        switch (conversionData.unit) {
            case 'mm':
                currNum *= 0.1;
                break;
            case 'm':
                currNum *= 100;
                break;
            case 'km':
                currNum *= 100000;
                break;
            default:
                currNum *= 1;
                break;
        }

        setConversionData(prev => ({
            ...prev,
            conversions: {
                antNum: formatItemDisplay(currNum, 2.5, 'ant', 'ants'),
                pencilNum: formatItemDisplay(currNum, 19, 'pencil', 'pencils'),
                bananaNum: formatItemDisplay(currNum, 22.86, 'banana', 'bananas'),
                footballNum: formatItemDisplay(currNum, 28.5, 'football', 'footballs'),
                baseballNum: formatItemDisplay(currNum, 106.7, 'baseball bat', 'baseball bats'),
                refrigeratorNum: formatItemDisplay(currNum, 170, 'refrigerator', 'refrigerators'),
                giraffeNum: formatItemDisplay(currNum, 550, 'giraffe', 'giraffes'),
                pyramidNum: formatItemDisplay(currNum, 13880, 'Great Pyramid of Giza', 'Great Pyramids of Giza'),
                libertyNum: formatItemDisplay(currNum, 9300, 'Statue of Liberty', 'Statues of Liberty'),
                eiffelNum: formatItemDisplay(currNum, 33000, 'Eiffel Tower', 'Eiffel Towers'),
                khalifaNum: formatItemDisplay(currNum, 82800, 'Burj Khalifa', 'Burj Khalifas'),
                everestNum: formatItemDisplay(currNum, 884800, 'Mount Everest', 'Mount Everests'),
                marianatrenchNum: formatItemDisplay(currNum, 1100000, 'Mariana Trench', 'Mariana Trenches'),
                airplaneNum: formatItemDisplay(currNum, 1200000, 'commercial airplane altitude', 'commercial airplane altitudes'),
                moonNum: formatItemDisplay(currNum, 347480000, 'Moon diameter', 'Moon diameters'),
                marsNum: formatItemDisplay(currNum, 677900000, 'Mars diameter', 'Mars diameters'),
                earthNum: formatItemDisplay(currNum, 1275600000, 'Earth diameter', 'Earth diameters'),
                jupiterNum: formatItemDisplay(currNum, 14298400000, 'Jupiter diameter', 'Jupiter diameters'),
                sunNum: formatItemDisplay(currNum, 139270000000, 'Sun diameter', 'Sun diameters'),
            }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConversionData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const setPresetValue = (size, unit) => {
        setConversionData(prev => ({ ...prev, size, unit }));
        convertSize();
    };

    return (
        <div className="bg-graybg flex flex-col text-center h-[100vh] w-[100vw]">
            <h1 className="mt-10 break-words select-none">
                Size Converter
            </h1>
            <div className="w-[80vw] h-[0.2vh] bg-black rounded-md my-4 mx-auto"></div>
            <div id="button_container" className={`flex-row sm:flex-col ${currentView !== 'main' ? 'hidden' : ''}`}>
                <ButtonM id="conv" value="WIP Conversion" onClick={() => hideMainMenu('single')} />
                <ButtonM id="convSize" value="Size Conversion" onClick={() => hideMainMenu('table')} />
            </div>

            <div id="single_conv_container" className={`flex flex-col justify-center items-center ${currentView !== 'single' ? 'hidden' : ''}`}>
                <ButtonReturn id="return" value="Return" onClick={() => hideMainMenu('main')} />
                <div className="flex flex-row mb-10">
                    <h1>WIP</h1>
                </div>
            </div>

            <div id="conv_table_container" className={`flex flex-col justify-center items-center ${currentView !== 'table' ? 'hidden' : ''}`}>
                <ButtonReturn id="returnSize" value="Return" onClick={() => hideMainMenu('main')} />
                <h2>Convert:</h2>
                <div className="flex sm:flex-row items-center mb-2 flex-col">
                    <input
                        type="number"
                        id="sizeInput"
                        name="size"
                        value={conversionData.size}
                        onChange={handleInputChange}
                        className="bg-white text-black w-[70vw] sm:w-[10vw] h-[4vh] mr-1"
                        min="0"
                        max="2147483647"
                    />
                    <select
                        id="divisor"
                        name="unit"
                        value={conversionData.unit}
                        onChange={handleInputChange}
                        className="bg-white sm:w-[5vw] w-[30vw] h-[4vh] text-sm mt-1 sm:mt-0"
                    >
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="m">m</option>
                        <option value="km">km</option>
                    </select>
                </div>
                <ButtonConvert id="convertSize" value="Convert" onClick={convertSize} />
                <h2>Converted, it is roughly:</h2>
                <div className="parent mb-20 sm:mb-10">
                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/ant.png?raw=true" alt="Ant"/>
                        </div>
                        <p id="antNum">{conversionData.conversions.antNum}</p>
                        <p>An ant is ~0.25cm long  <a className="cursor-pointer" onClick={() => setPresetValue(25, 'mm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/pencil.png?raw=true" alt="Pencil"/>
                        </div>
                        <p id="pencilNum">{conversionData.conversions.pencilNum}</p>
                        <p>A pencil is ~19cm long  <a className="cursor-pointer" onClick={() => setPresetValue(19, 'cm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/banana.png?raw=true" alt="Banana"/>
                        </div>
                        <p id="bananaNum">{conversionData.conversions.bananaNum}</p>
                        <p>A large banana is ~22.86cm long  <a className="cursor-pointer" onClick={() => setPresetValue(22.86, 'cm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/fball.png?raw=true" alt="Football"/>
                        </div>
                        <p id="footballNum">{conversionData.conversions.footballNum}</p>
                        <p>A football is ~28.5cm long  <a className="cursor-pointer" onClick={() => setPresetValue(28.5, 'cm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/bbat.png?raw=true" alt="Baseball bat"/>
                        </div>
                        <p id="baseballNum">{conversionData.conversions.baseballNum}</p>
                        <p>A baseball bat is ~1.067m long  <a className="cursor-pointer" onClick={() => setPresetValue(1.067, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/fridge.png?raw=true" alt="Refrigerator"/>
                        </div>
                        <p id="refrigeratorNum">{conversionData.conversions.refrigeratorNum}</p>
                        <p>A Refrigerator is ~1.7m tall  <a className="cursor-pointer" onClick={() => setPresetValue(1.7, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/giraffe.png?raw=true" alt="Giraffe"/>
                        </div>
                        <p id="giraffeNum">{conversionData.conversions.giraffeNum}</p>
                        <p>A giraffe is ~5.5m tall  <a className="cursor-pointer" onClick={() => setPresetValue(5.5, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/liberty.png?raw=true" alt="Statue of Liberty"/>
                        </div>
                        <p id="libertyNum">{conversionData.conversions.libertyNum}</p>
                        <p>The Statue of Liberty is ~93m tall  <a className="cursor-pointer" onClick={() => setPresetValue(93, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/pyramid.png?raw=true" alt="Pyramid"/>
                        </div>
                        <p id="pyramidNum">{conversionData.conversions.pyramidNum}</p>
                        <p>The Great Pyramid of Giza is ~138.8m tall  <a className="cursor-pointer" onClick={() => setPresetValue(138.8, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/eiffel.png?raw=true" alt="Eiffel Tower"/>
                        </div>
                        <p id="eiffelNum">{conversionData.conversions.eiffelNum}</p>
                        <p>The Eiffel Tower is ~330m tall  <a className="cursor-pointer" onClick={() => setPresetValue(330, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/khalifa.png?raw=true" alt="Burj Khalifa"/>
                        </div>
                        <p id="khalifaNum">{conversionData.conversions.khalifaNum}</p>
                        <p>The Burj Khalifa is ~828m tall  <a className="cursor-pointer" onClick={() => setPresetValue(828, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/everest.png?raw=true" alt="Mount Everest"/>
                        </div>
                        <p id="everestNum">{conversionData.conversions.everestNum}</p>
                        <p>The Mount Everest is ~8848m tall  <a className="cursor-pointer" onClick={() => setPresetValue(8848, 'm')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/coral.png?raw=true" alt="Mariana Trench"/>
                        </div>
                        <p id="marianatrenchNum">{conversionData.conversions.marianatrenchNum}</p>
                        <p>The Mariana Trench is ~11km deep  <a className="cursor-pointer" onClick={() => setPresetValue(11, 'km')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/airplane.png?raw=true" alt="Airplane"/>
                        </div>
                        <p id="airplaneNum">{conversionData.conversions.airplaneNum}</p>
                        <p>The average cruising altitude of an airplane is ~12 km  <a className="cursor-pointer" onClick={() => setPresetValue(12, 'km')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-10 h-10" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/moon.png?raw=true" alt="Moon"/>
                        </div>
                        <p id="moonNum">{conversionData.conversions.moonNum}</p>
                        <p>The Moon&#39;s diameter is ~3,475 km  <a className="cursor-pointer" onClick={() => setPresetValue(3475, 'km')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/mars.png?raw=true" alt="Mars"/>
                        </div>
                        <p id="marsNum">{conversionData.conversions.marsNum}</p>
                        <p>Mars&#39; diameter is ~6,779 km  <a className="cursor-pointer" onClick={() => setPresetValue(6779, 'km')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-10 h-10" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/earth.png?raw=true" alt="Earth"/>
                        </div>
                        <p id="earthNum">{conversionData.conversions.earthNum}</p>
                        <p>The Earth&#39;s diameter is ~12,756 km  <a className="cursor-pointer" onClick={() => setPresetValue(12756, 'km')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/jupiter.png?raw=true" alt="Jupiter"/>
                        </div>
                        <p id="jupiterNum">{conversionData.conversions.jupiterNum}</p>
                        <p>Jupiter&#39;s diameter is ~142,984 km  <a className="cursor-pointer" onClick={() => setPresetValue(142984, 'km')}>Try this?</a></p>
                    </div>

                    <div className="child rounded-md flex flex-col justify-center items-center">
                        <div className="flex flex-row my-1">
                            <img className="w-8 h-8" src="https://github.com/mrkdsoftware/react-size-converter/blob/main/src/assets/sun.png?raw=true" alt="Sun"/>
                        </div>
                        <p id="sunNum">{conversionData.conversions.sunNum}</p>
                        <p>The Sun&#39;s diameter is ~1,392,700 km  <a className="cursor-pointer" onClick={() => setPresetValue(1392700, 'km')}>Try this?</a></p>
                    </div>
                </div>
            </div>

            <div id="footer" className="w-[100vw] h-[10vh] sm:h-[6vh] absolute left-0 bottom-0 bg-indigo-300">
                <p className="mt-3">made by <a className="cursor-pointer" href="https://github.com/mrkdsoftware" target="_blank" rel="noopener noreferrer">@mrkdsoftware</a></p>
            </div>
        </div>
    );
}