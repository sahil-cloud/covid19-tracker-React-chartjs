import React from 'react';
import '../Table.css';
import numeral from 'numeral';

const SideTable = ({ countries }) => {
    return (
      <div className="conatiner my-4">
        <h4 className="mb-3">C🌎untry Wise Data</h4>
        <div className="table">
          {countries.map((country) => (
            <tr>
              <td> {country.country} </td>
              <td>
             
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </div>
      </div>
    );
}

export default SideTable
