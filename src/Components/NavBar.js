import React from 'react';
import Hamburger from './SideDrawer/Hamburger';


const Navbar = (props) => {
    const logout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }
    const ID = JSON.parse(sessionStorage.getItem('user'));
    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className='toolbar__toggle-button'>
                    <Hamburger click={props.drawerClickHandler} />
                </div>
                <div className="toolbar__logo"><a href='/'>Best CBT</a></div>
                <div className='spacer' />
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><a href='/questions'>take a quick test</a></li>
                        <li><a href='/'>blog</a></li>
                        {
                            !ID ?
                                <li><a href='/login'>login</a></li> :
                                <ul>
                                    <li><a href='/profile' onClick={logout}>Profile</a></li>
                                    <li><a href='/' onClick={logout}>Logout</a></li>
                                </ul>

                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;