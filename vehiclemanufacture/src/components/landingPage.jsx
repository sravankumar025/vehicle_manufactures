import React, { useEffect, useState } from "react";
import "./landingPage.css";
const LandingPage = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [val, setVal] = useState(false);
  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => setVehicleData(data.Results));
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const showContent = () => {
    setVal(true);
  };

  const handleClose = () => {
    setVal(false);
  };

  let result = !searchTerm
    ? vehicleData
    : vehicleData.filter((each) => {
        if (each.Mfr_CommonName != null) {
          return each.Mfr_CommonName.toLowerCase().includes(
            searchTerm.toLowerCase()
          );
        }
      });

  let result2 =
    filter == "All"
      ? vehicleData
      : vehicleData.filter((each) => {
          if (each.VehicleTypes.length > 0) {
            return each.VehicleTypes[0].Name.toLowerCase().includes(
              filter.toLowerCase()
            );
          }
        });

  let finalResult = searchTerm === "" ? result2 : result;
  return (
    <div className={val?"s1":""}>
      <h1 style={{ textAlign: "center" }}>VEHICLE MANUFACTURES</h1>
      <div id="searchBar">
        <div>
          <label>Search :</label>
          <input
            type="text"
            placeholder="enter vehicle name"
            onChange={handleSearch}
            disabled={val?true:false}
          />
        </div>
        <div>
          <label>Filter By Vehicel Type :</label>
          <select onClick={handleFilter} disabled={val?true:false}>
            <option value="All">All</option>
            <option value="Passenger Car">Passenger Car</option>
            <option value="Trailer">Trailer</option>
            <option value="Low Speed Vehicle (LSV)e">
              Low Speed Vehicle (LSV)
            </option>
            <option value="Truck">Truck</option>
            <option value="MotorCycle">MotorCycle</option>
          </select>
        </div>
      </div>
      <div id="table-content">
        <table>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Type</th>
          </tr>
          {finalResult.map((item, index) => {
            if (
              item.Mfr_CommonName != null &&
              item.Country != null &&
              item.VehicleTypes.length > 0
            ) {
              return (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={showContent}
                >
                  <td>{item.Mfr_CommonName}</td>
                  <td>{item.Country}</td>
                  <td>{item.VehicleTypes[0].Name}</td>
                </tr>
              );
            }
          })}
        </table>
        {val ? (
          <div className="modelBox">
            <b
              style={{
                position: "absolute",
                left: "320px",
                top: "10px",
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              X
            </b>
            <div className="content">
              <h2>TESLA, INC.</h2>
              <p>Elon Musk (CEO)</p>
              <p>1Tesla Road</p>
              <p>TEXAS</p>
            </div>
          </div>
        ) : (""
        )}
      </div>
      <div></div>
    </div>
  );
};

export default LandingPage;
