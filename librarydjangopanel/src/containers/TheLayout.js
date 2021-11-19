import React from 'react'
import {useState, useEffect} from 'react';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState(false);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (localStorage.getItem('token') !== null) {
  //     window.location.replace('http://localhost:3000/dashboard');
  //   } else {
  //     setLoading(false);
  //     window.location.replace('http://localhost:3000/login')
  //   }
  // }, []);
  //
  //

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
