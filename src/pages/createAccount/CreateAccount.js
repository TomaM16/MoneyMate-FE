import React, { useState } from 'react'
import './CreateAccount.css'
import AuthService from '../../services/auth/auth.service'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
  const navigate = useNavigate()

  const [acceptanceChecked, setAcceptanceChecked] = useState(false)
  const [errorMessages, setErrorMessages] = useState({})

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    return passwordRegex.test(password)
  }

  const validateForm = () => {
    const errors = {}

    if (firstName === '') {
      errors.firstName = 'Please enter your first name'
    }

    if (lastName === '') {
      errors.lastName = 'Please enter your last name'
    }

    if (email === '') {
      errors.email = 'Please enter your email address'
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (password === '') {
      errors.password = 'Please enter a password'
    } else if (!validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!acceptanceChecked) {
      errors.acceptanceChecked =
        'You must accept the Terms of Service and Privacy Policy'
    }

    setErrorMessages(errors)

    return Object.keys(errors).length === 0
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const registerData = await AuthService.signUp(
          firstName,
          lastName,
          email,
          password,
        )
        console.log('Register data: ', registerData)
        navigate('/login')
        window.location.reload()
      } catch (error) {
        console.error('Error logging in:', error)
      }
    }
  }

  return (
    <div data-testid='register-container' className='register-container'>
      <div>
        <h1 className='register-header'>Registration</h1>
      </div>

      <form className='register-form-container'>
        <input
          data-testid="first-name-input"
          placeholder='First Name'
          type='text'
          id='firstname-input'
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
        {errorMessages.firstName && (
          <p data-testid="register-error-first-name" className='error-message'>{errorMessages.firstName}</p>
        )}

        <input
          data-testid="last-name-input"
          placeholder='Last Name'
          type='text'
          id='lastname-input'
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
        {errorMessages.lastName && (
          <p data-testid="register-error-last-name" className='error-message'>{errorMessages.lastName}</p>
        )}

        <input
          data-testid="email-input"
          placeholder='Email'
          type='text'
          id='email-input'
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errorMessages.email && (
          <p data-testid="register-error-email" className='error-message'>{errorMessages.email}</p>
        )}

        <input
          data-testid="password-input"
          placeholder='Password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errorMessages.password && (
          <p data-testid="register-error-password" className='error-message'>{errorMessages.password}</p>
        )}

        <input
          data-testid="confirm-password-input"
          placeholder='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        {errorMessages.confirmPassword && (
          <p data-testid="register-error-confirm-password" className='error-message'>{errorMessages.confirmPassword}</p>
        )}

        <div className='terms-privacy-container'>
          <label>
            <input
              data-testid="acceptance-input"
              type='checkbox'
              checked={acceptanceChecked}
              onChange={() => setAcceptanceChecked(!acceptanceChecked)}
            />
            {' I accept the '}
            <a href='/terms' target='_blank' rel='noopener noreferrer'>
              Terms of Service
            </a>{' '}
            {' and '}
            <a href='/privacy' target='_blank' rel='noopener noreferrer'>
              Privacy Policy
            </a>
          </label>
          {errorMessages.acceptanceChecked && (
            <p data-testid="register-error-acceptance" className='error-message'>{errorMessages.acceptanceChecked}</p>
          )}
        </div>

        <button
          data-testid='submit'
          onClick={handleRegisterSubmit}
          className='register-submit-button'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default CreateAccount
