import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Label } from 'semantic-ui-react';
import styled from "styled-components";
import axios from "axios";

import axiosWithAuth from '../utils/axiosWithAuth';

const FormContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .Form {
    background-color: #333;
    padding: 10px;
    border-radius: 3px;
    color: white;
    box-shadow: 5px 5px 5px #000;

    input {
      padding: 5px;
      margin: 5px;
      border-radius: 3px;
    }

    button {
      padding: 5px 25px;
      margin-top: 10px;
      background-color: #c7aa8b;
      color: white;
      border-radius: 3px;
    }
  }
`

const SignupForm = ({ values, errors, touched, status, history, handleUserObject }) => {
    const [inputType, setInputType] = useState('password');

    function hidePass() {
      if (inputType === 'password') {
        setInputType('text');
      } else {
        setInputType('password');
      }
    }

    return (
      <div className='html'>
        <div className='background'>
          <FormContainer className='FormContainer'>
            <Form className='Form'>
              <Field value={values.username} className='Fields' type='text' name='username' placeholder='Username' />
              {touched.username && errors.username && <p>{errors.username}</p>}<br></br>
              <Field value={values.primaryemail} className='Fields' type='text' name='primaryemail' placeholder='Email' />
              {touched.primaryemail && errors.primaryemail && <p>{errors.primaryemail}</p>}<br></br>
              <Field value={values.pass} className='Fields' type={inputType} name='pass' placeholder='Password' />
              {touched.pass && errors.pass && <p>{errors.pass}</p>}
              <br></br>
              <Field
                value={values.passconf}
                className='Fields'
                type={inputType}
                name='passconf'
                placeholder='Confirm Password'
              />
              {touched.passconf && errors.passconf && <p>{errors.passconf}</p>}

              <div>
                <button type='submit' value='Submit'>
                  Submit
                </button>
              </div>
            </Form>
          </FormContainer>
        </div>
      </div>
    );
  };

export default withFormik({
    mapPropsToValues({ firstName, lastName, username, primaryemail, pass, passconf }) {
      return {
        username: username || '',
        primaryemail: primaryemail || '',
        pass: pass || '',
        passconf: passconf || '',
      };
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      primaryemail: Yup.string().required('Email is required'),
      pass: Yup.string().required('A password is required'),
      passconf: Yup.string().required('Please validate your password')
        .test('', 'Passwords do not match', function(value) {
          return this.parent.pass === value;
        }),
    }),
    handleSubmit(values, formikBag) {
      const {username, primaryemail, pass } = values;
      const postValues = {username, primaryemail, password: pass };
      console.log(postValues);
      axios
        .post('https://fishfriends.herokuapp.com/users/user', postValues)
        .then(response => {
          console.log(formikBag)
          console.log(response);
          formikBag.props.history.push("/login");
        })
        .catch(error => console.error('Error', error));
    },
  })(SignupForm);