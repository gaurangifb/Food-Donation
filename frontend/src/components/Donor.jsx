import axios from "axios";
import React, { useEffect, useState } from "react";

const Donor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/donor")
      .then((res) => {
        if (res.data.Status === "Success in retrieving donors") {
          console.log(res.data.Result)
          setData(res.data.Result);
        } else {
          alert("Error")
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Donors list</h3>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((emp, ind) => {
          return <tr key={ind}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.address}</td>
              <td className="mx-2">
                <button className="btn btn-sm btn-primary me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Donor;
