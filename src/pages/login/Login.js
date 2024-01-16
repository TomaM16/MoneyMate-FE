import React, { useState } from 'react'
import './Login.css'
import AuthService from '../../services/auth/auth.service'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setSubmitted(false)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setSubmitted(false)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      setError(true)
    } else {
      try {
        const loginData = await AuthService.login(email, password)
        console.log('Login data: ', loginData)
        navigate('/home')
        window.location.reload()
      } catch (error) {
        console.error('Error logging in:', error)
      }

      setSubmitted(true)
      setError(false)
    }
  }

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className='success'
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h1>User successfully logged!!</h1>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div
        className='error'
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    )
  }

  return (
    <div className='login-container'>
      <div>
        <h1 className='login-header'>Login</h1>
      </div>

      <div className='messages'>
        {errorMessage()}
        {successMessage()}
      </div>

      <form className='login-form-container'>
        <label htmlFor='description-input'>Email:</label>
        <input
          type='text'
          id='description-input'
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor='password-input'>Password:</label>
        <input
          type='password'
		  id='password-input'
          value={email}
          onChange={handlePasswordChange}
          required
        />

        <button onClick={handleLoginSubmit} className='login-submit-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
