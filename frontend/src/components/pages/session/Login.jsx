import React from 'react'

const Login = () => {
  return (
    <>
      <div>
        <form>
          <label htmlFor="identifier">Username or Email: </label>
          <input 
          type='text' 
          name='identifier' 
          id='identifier' 
          placeholder='Enter your username or email.' 
          />
          <label htmlFor="password">Password: </label>
          <input 
          type="text" 
          name='password' 
          id='password' 
          placeholder='Enter your password.'
          />
        </form>
      </div>
    </>
  )
}

export default Login