import React from 'react'
import Layout from './../components/layout/Layout';
import { MdAttachEmail, MdOutlineSupportAgent } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";

//contact page
const Contact = () => {
    return (
       <Layout>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src="/images/contactus.jpg" alt="contactUs" style={{ width: "100%" }} />
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>Contact Us</h1>
                    <p className='text-justify mt-2'>
                        any query and info about product feel free to call anytime,
                        we 24x7 available
                    </p>
                    <p className='mt-3'>
                        <MdAttachEmail /> :help.InfinityCart@gmail.com
                    </p>
                    <p className='mt-3'>
                        <FaPhoneSquareAlt /> : 080-0800-080
                    </p>
                    <p className='mt-3'>
                        <MdOutlineSupportAgent /> : 080-0800-080
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
