import React from "react";
import "./table.css";
import { MDBDataTable } from "mdbreact";
//import '@fortawesome/fontawesome-free/css/all.min.css'; 
//import 'bootstrap-css-only/css/bootstrap.min.css'; 
//import 'mdbreact/dist/css/mdb.css';

function IntelligentTable({ data = { columns: [], rows: [] } }) {
  return (
    <MDBDataTable btn striped bordered sortable small sorting="true" data={data} />
  );
}
