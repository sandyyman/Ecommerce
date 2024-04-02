import React from 'react'
import Footer from './Footer'
import Header from './Header';

//Layout , used to load the content here itself
//Hence, their will be no confusions in the App.js file

const Layout = ({ children }) => {
    return (
        <div>
            {
                //header Section
            }
            <Header />
            {
                //main Section
            }
            <main style={{ minHeight: '80vh' }}>
                {children}
            </main>
            {
                //footer Section
            }
            <Footer />
        </div>
    )
}

export default Layout

