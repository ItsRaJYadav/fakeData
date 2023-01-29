import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Components/Header';

function App() {
  const [state, setState] = useState(1);
  const [data, setData] = useState([]);
  // let num = prompt("enter the string you wanna search :");
  // const [state1, setState2] = useState(0);
  useEffect(() => {
    async function getData() {
      const get = await fetch(`https://hub.dummyapis.com/employee?noofRecords=${state}&idStarts=1001`)
      const res = await get.json();
      setData(res);
      console.log(res);
    }
    getData();
    document.title = (`${state} Employee`);
  }, [state])
  console.log("function body called ")
  return (
    <div className="App">
      <Header />
      {
        // console.log("indside jsx called")
        <div className='data'>

          <button className='btn btn-success' onClick={() => setState(state + 1)}>Number of Employees- {state}</button>
          <p>click on button to get more data </p>
          {
            data.map((element, index) => {
              return (
                <div className='data' key={index}>
                  <ul className="list-group">
                    <li className="list-group-item active" aria-current="true">
                      ID : {element.id}
                    </li>
                    <li className="list-group-item">Name : {element.firstName} {element.lastName}</li>
                    <li className="list-group-item">Email : {element.email}</li>
                    
                    <li className="list-group-item">DOB: {element.dob}</li>
                    <li className="list-group-item">Contact: {element.contactNumber}</li>
<li className="list-group-item">Age: {element.age}</li>
                    <li className="list-group-item">Address: {element.address}</li>
                  </ul>

                </div>
              )
            })
          }
        </div>


      }
    </div>
  );
}

export default App;
