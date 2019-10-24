import React, { useEffect, useState } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import axiosWithAuth from "../utils/axiosWithAuth";

const LogForm = styled.div`
  background-color: #333;
  width: 300px;
  color: white;
  margin: auto;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #000;
  padding: 10px;

  input {
    border-radius: 3px;
    padding: 5px;
    margin: 5px;
  }

  button {
    padding: 5px 25px;
    margin: 10px auto;
    background-color: #c7aa8b;
    color: white;
    border-radius: 3px;
  }
`


const AddLog = ({ errors, touched, values, status, history }) => {

  const [locs, setLocs] = useState([])
  useEffect(()=>{  
    axiosWithAuth().get("locations/all")
    .then(res => {
      console.log(res);
     })
    .catch(err => console.log(err))  
},[])

  const checkLoc = () => {
    if (!locs.map(loc => loc.locationname).find(item => item.includes(values.place))) {
    axiosWithAuth()
    .post('locations/add', {
      "locationname": values.place,
      "locationpicurl": "http://tinyimg.io/i/pabHplC.jpg",
      "locationdesc": "Another great lake"})
    .then(response => {
      console.log(response)
      
    })
    .catch(error => {
      console.log(values);
      console.error('Error', error);
    })};
  }

  return (
    <LogForm className='LogForm'>
      <Form className='Formlog'>
        <label>
<<<<<<< HEAD
          Location
          <br></br>
=======
          <span>Location</span>
>>>>>>> 436a384e59845bf5f1f5e0783d9d26b872433671
          <Field className='fields' value={values.place} type='text' name='place' placeholder='Location' />
        </label>
        <br></br>
        <label>
          Bait Type<br></br>
        <Field className='fields' value={values.baittype} type='text' name='baittype' placeholder='Bait' />
        {touched.baittype && errors.baittype && <p className='error'>{errors.baittype}</p>}
        </label><br></br>
        <label>
          Fish Name<br></br>
          <Field className='fields' value={values.fishtypes} type='text' name='fishtypes' placeholder='Fish' />
          {touched.fishtypes && errors.fishtypes && <p className='error'>{errors.fishtypes}</p>}
        </label>
        <br></br>
        <label>
          {' '}
          Fish Count<br></br>
          <Field className='fields' value={values.fishnum} type='number' name='fishnum' placeholder='0' />
          {touched.fishnum && errors.fishnum && <p className='error'>{errors.fishnum}</p>}
        </label>
        <br></br>
        <label>
          Time Spent<br></br>
          <Field className='fields' value={values.timespent} type='text' name='timespent' placeholder='Time Spent' />
        </label>
        <br></br>
        <button onClick={checkLoc} className='logbutton' type='submit'>
          Submit!
        </button>
      </Form>
    </LogForm>
  );
};



export default withFormik({
  mapPropsToValues({ baittype, fishtypes, fishnum, timespent, place}) {
    return {
      place: place || '',
      baittype: baittype || '',
      fishtypes: fishtypes || '',
      fishnum: fishnum || '',
      timespent: timespent || '',
      author: localStorage.getItem('user') || "",
    };
  },

  handleSubmit(values, { resetForm, setStatus }) {
  
      

    axiosWithAuth()
      .post('logs/add', values)
      .then(response => {
        console.log(response)
        resetForm();
      })
      .catch(error => {
        console.log(values);
        
        console.error('Error', error);
      });
  },



})(AddLog);;
