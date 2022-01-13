import React, {useState} from "react";
import "../style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import {FaCrosshairs} from "@react-icons/all-files/fa/FaCrosshairs";


export default function Dropdown({setWoeid,findLocation}) {

  return (
    <div>
      <div className='dropdown'>
      <Form.Select onChange={(e) =>setWoeid(e.target.value)}>
      <option value="1">WorlWide</option>
      <option value="23424848">New York,US</option>
      <option value="2459115">Los Angeles, US</option>
      <option value="23424901">Malaysia</option>
      <option value="1105779">Sydney, AU</option>
    </Form.Select>
    <FaCrosshairs onClick={findLocation}/>
      </div>
    </div>
  );
}
