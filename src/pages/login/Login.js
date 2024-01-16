import React, { useState } from 'react'
import './Login.css'
import AuthService from '../../services/auth/auth.service'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [errorMessages, setErrorMessages] = useState({})
  const [authError, setAuthError] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const errors = {}

    if (email === '') {
      errors.email = 'Please enter your email address'
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (password === '') {
      errors.password = 'Please enter a password'
    }

    setErrorMessages(errors)

    return Object.keys(errors).length === 0
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        await AuthService.login(email, password)
        navigate('/home')
        window.location.reload()
      } catch (error) {
        console.error('Error logging in:', error)
        setAuthError(
          'Error logging in. Please check your credentials and try again.',
        )
      }
    }
  }

  return (
    <div data-testid='login-container' className='login-container'>
      <div>
        <h1 className='login-header'>Login</h1>
      </div>

      <form className='login-form-container'>
        <input
          placeholder='Email'
          data-testid='email-input'
          type='text'
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errorMessages.email && (
          <p data-testid="login-error-email" className='error-message'>{errorMessages.email}</p>
        )}

        <input
          placeholder='Password'
          data-testid='password-input'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errorMessages.password && (
          <p data-testid="login-error-password" className='error-message'>{errorMessages.password}</p>
        )}

        {authError && <p className='error-message'>{authError}</p>}
        <button
          data-testid='login-submit'
          onClick={handleLoginSubmit}
          className='login-submit-button'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
