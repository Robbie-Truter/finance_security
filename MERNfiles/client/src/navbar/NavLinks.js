import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
    return (
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to='/' >
                        <img src={"app-logo.png"} alt={"test"} className={"App-logo2"}/>
                    </NavLink>
                    <NavLink to='/' >
                        <b className={"navLink"}>Home</b>
                    </NavLink>
                    <NavLink to='/crypto'>
                        <b className={"navLink"}>Crypto Data</b>
                    </NavLink>
                    <NavLink to='/stockData'>
                        <b className={"navLink"}>Stock Data</b>
                    </NavLink>
                    <NavLink to='/marketData'>
                        <b className={"navLink"}>Market Data</b>
                    </NavLink>
                </NavMenu>


                <NavBtn>
                    <img src={"crypto.png"} height={30} className={"App-logo"} alt="https://www.flaticon.com/" />
                    <NavBtnLink to='/sign_in'><b>Sign In</b></NavBtnLink>
                    <NavBtnLink to='/register'><b>Register</b></NavBtnLink>
                </NavBtn>
            </Nav>
    );
};


export default Navbar;
