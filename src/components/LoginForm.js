import React, { useContext, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { LoginContext } from '../contexts/LoginContext';

import axiosWithAuthLogin from '../utils/axiosWithAuthLogin';

const Center = styled.div`
  margin-top: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
`

const LoginContainer = styled.div`
  width: 300px;
  border-radius: 5px;
  background-color: #333;
  box-shadow: 5px 5px 5px #000;
  padding: 10px;
  
  input {
    padding: 5px;
    border-radius: 3px;
    margin: 10px;
  }

  button {
    padding: 5px 25px;
    margin-top: 10px;
    background-color: #c7aa8b;
    color: white;
    border-radius: 3px;
  }

  a {
    color: white;
  }
`


const LoginForm = ({ values, errors, touched}) => {
  const [inputType, setInputType] = useState('password');
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  function hidePass() {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }
  return (
    <Center className='login'>
      <LoginContainer className='FormContainer'>
        <Form className='Form'>
          <Field
            value={values.username}
            className='login-field'
            type='text'
            name='username'
            placeholder='Username'
          />
          {touched.username && errors.username && <p>{errors.username}</p>}
          <br></br>
          <Field value={values.pass} className='login-field' type={inputType} name='pass' placeholder='Password' />
          {touched.pass && errors.pass && <p>{errors.pass}</p>}
          <div className='buttoncontainer'>
            <button type='submit' value='Submit'>
              Login
            </button>
            <p>Or</p>
            <Link to='/signup' className='link-button'>
              Sign Up
            </Link>
          </div>
        </Form>
      </LoginContainer>
    </Center>
  );
};

export default withFormik({
  
  mapPropsToValues({ username, pass }) {
    return {
      username: username || '',
      pass: pass || '',
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    pass: Yup.string().required('Enter your password'),
  }),
  handleSubmit(values, formikBag) {
    
    const { username, pass } = values;
    const postValues = { username: username, password: pass };
    console.log("LOGIN SUBMITTED", username, pass);
    axiosWithAuthLogin()
      .post('/login', `grant_type=password&username=${postValues.username}&password=${postValues.password}`)
      .then(response => {
        console.log(response);
        console.log(formikBag);
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', postValues.username);
        formikBag.props.history.push("/profile");
      })
      .catch(error => {
        console.log(postValues);
        console.error('Error', error)
      });
  },
})(LoginForm);
