import React from 'react';
import { sortData, prettyPrintStat } from "./util";
import '../App.css';

const InfoBox = ({ countries, casesType, setCasesType }) => {
    let classgetc;
    let classgetr;
    let classgetd;
    casesType === 'cases' ? classgetc='card cases' : classgetc='card';
    casesType === 'recovered' ? classgetr='card recovered' : classgetr='card';
    casesType === 'deaths' ? classgetd='card deaths' : classgetd='card';
    return (
        <div className='container my-4'>
            <div className="row">
                <div className="col-sm-3 col-md-3">
                    <button className={classgetc} style={{ width: '15rem',backgroundColor:'lightcyan' }}
                    onClick={() => setCasesType('cases')}>

                        <div className="card-body" style={{color:'crimson',fontSize:20,fontWeight:'bold'}}>
                            <h5 className="card-title" >🆕 Cases 😢</h5>
                            <hr/>
    <p className="card-text">{prettyPrintStat(countries.todayCases)}</p>
    <p className="card-text">Total: {prettyPrintStat(countries.cases)}</p>

                        </div>
                    </button>
                </div>
                <div className="col-sm-3 col-md-3 offset-md-1">
                    <button className={classgetr} style={{ width: '15rem',backgroundColor:'lightcyan' }}
                    onClick={() => setCasesType('recovered')}
                    >

                        <div className="card-body" style={{color:'limegreen',fontSize:20,fontWeight:'bold'}}>
                            <h5 className="card-title" >🆕 Recovered 😍</h5>
                            <hr/>

                            <p className="card-text">{prettyPrintStat(countries.todayRecovered)}</p>
                            <p className="card-text">Total: {prettyPrintStat(countries.recovered)}</p>

                        </div>
                    </button>
                </div>
                <div className="col-sm-3 col-md-3 offset-md-1">
                    <button className={classgetd} style={{ width: '15rem',backgroundColor:'lightcyan' }}
                    onClick={() => setCasesType('deaths')}>

                        <div className="card-body" style={{color:'crimson',fontSize:20,fontWeight:'bold'}}>
                            <h5 className="card-title" >🆕 Deaths ⚠</h5>
                            <hr/>

                            <p className="card-text">{prettyPrintStat(countries.todayDeaths)}</p>
                            <p className="card-text">Total: {prettyPrintStat(countries.deaths)}</p>

                        </div>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default InfoBox
