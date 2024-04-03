import React from 'react'
import Layout from './../components/layout/Layout';
import { Link } from 'react-router-dom'

//pagenotfound
//if user gives any wrong routes, 
//this page will be appeared in their window
const Pagenotfound = () => {
    return (
        <Layout>
            <div className='pnf'>
                <h1 className='pnf-title'>404</h1>
                <h2 className='pnf-heading'>Oops! Page Not Found</h2>
                <Link to='/' className="pnf-btn">Go Back</Link>
            </div>
        </Layout>
    )
}

export default Pagenotfound
