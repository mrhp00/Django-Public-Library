import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = (props) => {


  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      props.history.push('http://localhost:3000/dashboard')
      // window.location.replace('http://localhost:3000/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2
    };
    // console.log(JSON.stringify(user))
    fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          props.history.push('http://localhost:3000/dashboard')
          // window.location.replace('http://localhost:3000/dashboard');
        } else {
          setEmail('');
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm method="post" onSubmit={onSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  {/*<CInputGroup className="mb-3">*/}
                  {/*  <CInputGroupPrepend>*/}
                  {/*    <CInputGroupText>*/}
                  {/*      <CIcon name="cil-user"/>*/}
                  {/*    </CInputGroupText>*/}
                  {/*  </CInputGroupPrepend>*/}
                  {/*  <CInput type="text" placeholder="Username" autoComplete="username"/>*/}
                  {/*</CInputGroup>*/}

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name='email' type='email' onChange={(e) => {setEmail(e.target.value)}} required
                            placeholder="Email" autoComplete="email"/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name='password1' type='password' value={password1}
                            onChange={(e) => {setPassword1(e.target.value)}} required placeholder="Password"
                            autoComplete="new-password"/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name='password2' type='password' value={password2}
                            onChange={(e) => {setPassword2(e.target.value)}} required placeholder="Repeat password"
                            autoComplete="new-password"/>
                  </CInputGroup>
                  <CButton color="success" type="submit" block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
