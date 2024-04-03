import React from 'react'
import { Link } from 'react-router-dom'
//Footer Section for the WebPage
const Footer = () => {
    return (
        <>
            {/* Bootstrap class-name ,
                already set in the public folder
                index.html
                */}
            <div className='footer'>
                <h1 className='text-center'>
                    All Right Reserved &copy; InfinityCart
                </h1>
                <p className='text-center mt-3'>
                    <Link to='/about'>About</Link>
                    |
                    <Link to='/contact'>Contact</Link>
                    |
                    <Link to='/policy'>Privacy Policy</Link>

                </p>
            </div>
        </>
    )
}

//export footer
export default Footer
