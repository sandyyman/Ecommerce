import React from 'react'
import Layout from './../components/layout/Layout';

//about page
const About = () => {
    return (
        <Layout>
            <div className='aboutus'>
                <div className='row au-One'>
                    <div className='col-md-6'>
                        <div>
                            <img src='images/aboutus.jpg' alt='Aboutus' style={{ width: "100%" }} />
                        </div>
                    </div>
                    <div className='col-md-6 text-center ex-head'>
                        <div>
                            <h1>
                                <strong>Infinity Cart</strong>, your ultimate destination for all things shopping!
                                Where every <em>item</em> has a <em>story</em>, and every <em>transaction matters</em>. 🛒✨
                            </h1>
                        </div>
                        <h1>

                        </h1>
                    </div>
                </div>
                <div className='au-Two'>
                    <div>
                        <h4 className='bg-dark p-2 text-white' style={{ display: 'inline-block' }}>Our Story</h4>
                        <p>
                            Infinity Cart was born out of a simple idea:
                            <strong> empower individuals to trade seamlessly</strong>.
                            We envisioned a space where people could find value in the things they no longer needed
                            and discover hidden gems at affordable prices. Our journey began in 2024.
                            Since then, we've been committed to providing a safe, user-friendly environment for all.
                        </p>
                    </div>
                    <div>
                        <h4 className='bg-dark p-2 text-white' style={{ display: 'inline-block' }}> Why Choose Infinity Cart?</h4>
                        <p>
                            <h6>1. Buy with Confidence: </h6>Explore a diverse range of products, from electronics to fashion, all vetted by our team. Our sellers are genuine, and we prioritize transparency.

                            <h6>2. Sell Hassle-Free: </h6>Ready to part with your old phone, furniture, or collectibles? List them on Infinity Cart and connect with interested buyers effortlessly.

                            <h6>3. Community-Driven: </h6>We believe in building a strong community. Share your experiences, tips, and stories with fellow users. Together, we create a supportive ecosystem.
                        </p>
                    </div>
                    <div>
                        <h4 className='bg-dark p-2 text-white' style={{ display: 'inline-block' }}>Our Core Values</h4>
                        <p>
                            <h6>1. Customer Focus: </h6>You, our users, are at the heart of everything we do. Your satisfaction drives our innovation.

                            <h6>2. Innovation: </h6>We embrace change and continuously improve our platform to meet your evolving needs.

                            <h6>3. Integrity: </h6>Trust is paramount. We uphold ethical standards, ensuring fair transactions and honest interactions.

                            <h6>4. Collaboration: </h6>Infinity Cart thrives on collaboration. Sellers, buyers, and our team work together to build a thriving marketplace.

                            <h6>5. Quality: </h6>From product listings to customer service, excellence is our standard. We strive to exceed expectations.
                        </p>
                    </div>
                    <div>
                        <h4 className='bg-dark p-2 text-white' style={{ display: 'inline-block' }}>Join the Infinity Cart Community</h4>
                        <p>
                            Whether you're decluttering, hunting for bargains, or simply exploring, Infinity Cart welcomes you. Let's make buying and selling a delightful experience!
                        </p>
                    </div>
                    <div>
                        <h4 className='bg-dark p-2 text-white' style={{ display: 'inline-block' }}>Developers:</h4>
                        <p>
                            Our team of passionate developers—<strong>Naveen, Vijay, Vivith, and Sandeep</strong>—
                            has poured their expertise into creating a seamless online shopping experience.
                        </p>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default About;
