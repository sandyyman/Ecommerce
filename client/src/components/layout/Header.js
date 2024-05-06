import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiShoppingBag3Fill } from "react-icons/ri";
//Header Section for the WebPage
const Header = () => {
    return (
        <>
            <header className='head-sec'>
                <nav className='nav-list-1'>
                    <ul className='nav-list-mar nav-list-flex'>
                        <li>
                            <span>
                                <img src="/images/delivery-truck.jpg" alt="Delivery" style={{ width: "25px", height: "25px" }} />
                                Free, Next Day Delivery
                            </span>
                        </li>
                        <li>
                            <span>
                                <img src="/images/recycle-sign.jpg" alt="Recycle" style={{ width: "25px", height: "25px" }} />
                                Free Removal & Recycling of Old Products
                            </span>
                        </li>
                        <li>
                            <span>
                                <img src="/images/coin.jpg" alt="Price Guarantee" style={{ width: "25px", height: "25px" }} />
                                Price Match Guarantee
                            </span>
                        </li>
                        <li>
                            <span>
                                <img src="/images/call.jpg" alt="Customer Support" style={{ width: "25px", height: "25px" }} />
                                24/7 Customer Support
                            </span>
                        </li>
                        <li>
                            <span style={{ color: "#2e69d2" }}>
                                About us
                            </span>
                        </li>
                    </ul>
                </nav>
                <hr />
                <nav className=" nav-list-2">
                    <ul className='nav-list-mar nav-list-flex'>
                        <li>
                            <NavLink to="/" className="nav-logo">
                                <span>
                                    <img src='/images/logo.png' alt='Instamart' />
                                    <h1 className='logo-text'>InstaMart</h1>
                                </span>
                            </NavLink>
                        </li>
                        <li className='search-product'>
                            <NavLink className="nav-search">
                                <span>
                                    <input type='text' placeholder='search for products' />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className="nav-link">
                                <span style={{ color: "#55c7de" }}>
                                    <img src="/images/circle.jpg" alt="Delivery" style={{ width: "25px", height: "25px" }} />
                                    Set your Location
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/myAccount" className="nav-link">
                                <span>
                                    <img src="/images/user.jpg" alt="Account" style={{ width: "25px", height: "25px" }} />
                                    my account
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="nav-link">
                                <span>
                                    <img src="/images/trolley.jpg" alt="cart" style={{ width: "25px", height: "25px" }} />
                                    Cart (0)
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className=" nav-list-3">
                    <ul className='nav-list-mar nav-link-products nav-list-grid-container'>
                        <li>
                            <NavLink to="/" className="nav-link" activeClassName="active" style={{ textDecoration: "none" }}>
                                <span className='main-nav-content'>
                                    SHOP ALL PRODUCTS
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className="nav-link">
                                <span className='main-nav-content'>
                                    Cars
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className="nav-link">
                                <span className='main-nav-content'>
                                    Bikes
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/myAccount" className="nav-link">
                                <span className='main-nav-content'>
                                    Washers & Dryers
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="nav-link">
                                <span className='main-nav-content'>
                                    Fridge & Refrigerators
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="nav-link">
                                <span className='main-nav-content'>
                                    Laptops & Computers
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="nav-link">
                                <span className='main-nav-content'>
                                    Mobile Phones
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="nav-link">
                                <span className='main-nav-content'>
                                    Ovens & Cookings
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

//export header
export default Header;
