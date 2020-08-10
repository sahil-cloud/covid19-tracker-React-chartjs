import React, { useState, useEffect } from 'react';
import './App.css';
// import Header from './components/Header';
import { FormControl, MenuItem, Select, Card, CardContent, } from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import SideTable from './components/SideTable';
import LineGraph from './components/LineGraph';
import { sortData, prettyPrintStat } from "./components/util";
import "leaflet/dist/leaflet.css";

function App() {

   const [country, setInputCountry] = useState("worldwide");
   const [countryInfo, setCountryInfo] = useState({});
   const [countries, setCountries] = useState([]);
   const [mapCountries, setMapCountries] = useState([]);
   const [tableData, setTableData] = useState([]);
   const [casesType, setCasesType] = useState("cases");
   const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
   const [mapZoom, setMapZoom] = useState(3);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    // setInputCountry(countryCode)

    const url =
        countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setInputCountry(countryCode);
            setCountryInfo(data);
            console.log(data)
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setMapZoom(4);
        });
  };

  // for starting the app
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);


  // getting the info of countries
  useEffect(() => {
    const getCountries = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => {

        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        let sortedData = sortData(data);
        setCountries(countries);
        setMapCountries(data);
        setTableData(sortedData);
      });
    };
    getCountries();
    // onCountryChange();
  }, [])

  return (
    <>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-9 col-sm-9">
            <div className="container my-4">
              <div className="row">
                <div className="col-sm-5 col-md-5">
                  <h2 style={{ color: "red" }}>C🍀vid 19 tracker 🌍</h2>
                </div>
                <div className="col-sm-3 col-md-3  offset-md-4 my-1">
                  <FormControl>
                    <Select
                      variant="outlined"
                      value={country}
                      onChange={onCountryChange}
                    >
                      <MenuItem value="worldwide">Worldwide</MenuItem>
                      {countries.map((country) => (
                        <MenuItem value={country.value}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <hr />

            {/* info box here */}

            <InfoBox
              countries={countryInfo}
              casesType={casesType}
              setCasesType={setCasesType}
            />
            <h4 className="container my-4">Worldwide 🆕 {casesType} 🗺 </h4>
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
          <div className="col-sm-3 col-md-3">
            <SideTable countries={tableData} />
            <hr />
            <h5 className="my-3">Worldwide 🆕 {casesType} 📈</h5>
            <LineGraph casesType={casesType} />
          </div>
        </div>
      </div>
      <div className="container mt-4 mb-1 d-flex">
        Developed By &nbsp; <strong> Sahil Jasuja </strong>
        <a className="ml-auto" href="mailto:contact@sahiljasuja.ml" style={{color:'black',}}>contact@sahiljasuja.ml</a>
      </div>
    </>
  );
}

export default App;
