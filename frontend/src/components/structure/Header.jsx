import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <>
        <div>
            <header>
                {/*TODO: poner logo */}
                <img src="#" alt="Logo AscendEnkai" />
                <h1>ASCEND ENKAI</h1>
                <Link to='/login'>Log in</Link>
            </header>
        </div>
    </>
  )
}

export default Header