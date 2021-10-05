import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-dark text-light py-3' style={{position: 'fixed', width: '100%', left:'0', bottom:'0'}}>
            <h5>Contact us:</h5>
            <p>Email: <Link to="mailto:infoamss7108@gmail.com">infoamss7108@gmail.com</Link></p>
            <p>Contact Number: +91 8877661100</p>
        </div>
    )
}
export default Footer;