import React, { useState } from 'react'
import './CreateAccount.css'
import AuthService from '../../services/auth/auth.service'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
  const navigate = useNavigate()

  const [acceptanceChecked, setAcceptanceChecked] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
    setSubmitted(false)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
    setSubmitted(false)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setSubmitted(false)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setSubmitted(false)
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      !acceptanceChecked
    ) {
      setError(true)
    } else {
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

      setSubmitted(true)
      setError(false)
    }
  }

  const successMessage = () => {
    return (
      <div
        className='success'
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h1>User {firstName} successfully registered!!</h1>
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
    <div className='register-container'>
      <div>
        <h1 className='register-header'>Registration</h1>
      </div>

      <div className='messages'>
        {errorMessage()}
        {successMessage()}
      </div>

      <form className='register-form-container'>
        <label htmlFor='firstname-input'>First Name:</label>
        <input
          type='text'
          id='firstname-input'
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />

        <label htmlFor='lastname-input'>Last Name:</label>
        <input
          type='text'
          id='lastname-input'
          value={lastName}
          onChange={handleLastNameChange}
          required
        />

        <label htmlFor='email-input'>Email:</label>
        <input
          type='text'
          id='email-input'
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

        <div className='terms-privacy-container'>
          <label>
            <input
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
        </div>

        <button
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
