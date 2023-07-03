import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';


function App() {
  const [state, setState] = useState();
  const [data, setData] = useState([]);


const handleInputChange = (event) => {
    setState(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    if (!state || state <= 0) {
      alert("Please enter a valid number greater than 0 to display data");
      return;
    }

    const response = await fetch(
      `https://hub.dummyapis.com/employee?noofRecords=${state}&idStarts=1001`
    );

    if (response.ok) {
      const res = await response.json();
      setData(res);
      document.title = `${state} Employee`; // Update the document title
    } else {
      alert("Error occurred while fetching data. Please try again.");
    }
  };

 const handleClear = () => {
    setData([]);
    setState("");
  };

  const handleIncrement = () => {
    setState(state + 1);
  };

  const handleExportJSON = () => {
    if (data.length === 0) {
      alert('Please generate data then export to JSON file')
      return; // Exit if data is empty
    }
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'employees.json');
  };

  const handleExportExcel = () => {
    if (data.length === 0) {
      alert('Please generate data for then export excel file')
      return; // Exit if data is empty
    }
    import('xlsx').then((XLSX) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'employees.xlsx');
    });
  };

  const handleExportPDF = () => {
    if (data.length === 0) {
      alert('Please generate data for export pdf file')
      return; // Exit if data is empty
    }

    const doc = new jsPDF();

    const totalPages = Math.ceil(data.length / 4); // Number of pages needed

    for (let i = 0; i < totalPages; i++) {
      if (i !== 0) {
        doc.addPage();
      }

      const startY = 20; 
      const pageData = data.slice(i * 4, (i + 1) * 4); // Data for the current page

      const renderEmployee = (employee, index) => {
        const { id, firstName, lastName, email, dob, contactNumber, age, address, salary } = employee;
      
        const xPos = 20 + (index % 2) * 100;
        const yPos = startY + Math.floor(index / 2) * 100;
      
        
        doc.text(`ID: ${id}`, xPos, yPos);
        doc.text(`Name: ${firstName} ${lastName}`, xPos, yPos + 10);
      
        // Adjust position for email based on length
        const emailLines = doc.splitTextToSize(email, 90);
        const emailLineHeight = emailLines.length > 1 ? 5 : 0;
        doc.text(emailLines, xPos, yPos + 20 + emailLineHeight);
      
        doc.text(`DOB: ${dob}`, xPos, yPos + 30);
        doc.text(`Contact: ${contactNumber}`, xPos, yPos + 40);
        doc.text(`Age: ${age}`, xPos, yPos + 50);
        doc.text(`Address: ${address}`, xPos, yPos + 60);
        doc.text(`Salary: ${salary}`, xPos, yPos + 70);
      };
      

      pageData.forEach(renderEmployee);
    }

    doc.save('employees.pdf');
  };


  return (
    <div className="App">
      
      <div className='data'>
        <input
          type="number"
          value={state}
          onChange={handleInputChange}
          placeholder="Enter the number of employees"
          style={{ marginTop: '10px', marginBottom: '10px', width: '250px' }}
        />


        <div className="button-container ">
          <button className="btn btn-primary mr-2" style={{ marginRight: '10px' }} onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn btn-danger mr-2" style={{ marginRight: '10px' }} onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-success mr-2" style={{ marginRight: '10px' }} onClick={handleIncrement}>
            Increment
          </button>
          <button className="btn btn-info mr-2" style={{ marginRight: '10px', marginTop: '5px' }} onClick={handleExportJSON}>
            Export JSON
          </button>
          <button className="btn btn-info mr-2" style={{ marginRight: '10px', marginTop: '5px' }} onClick={handleExportExcel}>
            Export Excel
          </button>
          <button className="btn btn-info" style={{ marginRight: '10px', marginTop: '5px' }} onClick={handleExportPDF}>
            Export PDF
          </button>
        </div>



        <p>Click the buttons to perform actions.</p>
        {data.length > 0 ? (
          <div className="container mt-4">
            <div className="row">
              {data.map((employee) => (
                <div className="col-md-6" key={employee.id}>
                  <div className="card mb-4" style={{ border: '1px solid black', marginBottom: '10px' }}>
                    <div className="card-body">
                      <h5 className="card-title">Employee ID: {employee.id}</h5>
                      <p className="card-text">
                        <strong>Name:</strong> {employee.firstName} {employee.lastName}
                      </p>
                      <p className="card-text">
                        <strong>Email:</strong> {employee.email}
                      </p>
                      <p className="card-text">
                        <strong>DOB:</strong> {employee.dob}
                      </p>
                      <p className="card-text">
                        <strong>Contact:</strong> {employee.contactNumber}
                      </p>
                      <p className="card-text">
                        <strong>Age:</strong> {employee.age}
                      </p>
                      <p className="card-text">
                        <strong>Address:</strong> {employee.address}
                      </p>
                      <p className="card-text">
                        <strong>Salary: </strong> {employee.salary}
                      </p>
                      <img
                        src={employee.imageUrl}
                        alt="Employee"
                        className="card-img-top"
                        style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;
