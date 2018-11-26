import React from 'react';
import './SideDrawer.css';

const SideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open'
    }
    const ID = JSON.parse(sessionStorage.getItem('user'));
    const logout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li><a href='/questions'>take a test</a></li>
                <li><a href='/blog'>blog</a></li>
                {
                    ID ?
                        <span>
                            <li><a href='/' onClick={logout}>Logout</a></li>
                            <li><a href='/profile' onClick={logout}>Profile</a></li>
                        </span>
                        :
                        <li><a href='/login'>login</a></li>
                }
            </ul>
        </nav>
    )
}

export default SideDrawer;