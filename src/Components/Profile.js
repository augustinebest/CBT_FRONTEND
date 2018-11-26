import React, { Fragment } from 'react';
import './Profile.css';
import axios from 'axios';
import Navbar from './NavBar';
import SideDrawer from './SideDrawer/SideDrawer';
import BackDrop from './BackDrop/BackDrop';

class Profile extends React.Component {
    state = {
        username: '',
        profile_img: '',
        email: '',
        phone: '',
        password: '',
        sideDrawerOpen: false
    }
    componentWillMount() {
        const token = JSON.parse(sessionStorage.getItem('user'));
        const userId = token.id
        axios.get(`http://localhost:5000/user/profile/${userId}`)
            .then(res => {
                this.setState({
                    username: res.data.message.name,
                    profile_img: res.data.message.profile_img,
                    email: res.data.message.email,
                    phone: res.data.message.number,
                    password: res.data.message.password
                })
                // console.log(res)
            })
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        })
    }

    backDropClickHandler = () => {
        this.setState({
            sideDrawerOpen: false
        })
    }
   

    render() {
        let backDrop;
        if (this.state.sideDrawerOpen) {
            backDrop = <BackDrop click={this.backDropClickHandler} />
        }
        return (
            <Fragment>
                <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backDrop}
                <div>
                    <p>Hello {this.state.username}</p>
                    <p>profile_img: {this.state.profile_img}</p>
                    <p>email: {this.state.email}</p>
                    <p>phone number: {this.state.phone}</p>
                </div>
                <button onClick={this.logout}>logout</button>
            </Fragment>
        )
    }
}

export default Profile;