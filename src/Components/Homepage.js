import React from 'react';
import Navbar from './NavBar';
import SideDrawer from './SideDrawer/SideDrawer';
import BackDrop from './BackDrop/BackDrop';
// import Karousel from './Carousel'
import Loader from './loader/Loader';


class Homepage extends React.Component {

    state = {
        sideDrawerOpen: false,
        loading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 2000);
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
        const userExist = JSON.parse(sessionStorage.getItem('user'));
        let backDrop;
        if (this.state.sideDrawerOpen) {
            backDrop = <BackDrop click={this.backDropClickHandler} />
        }
        const { loading } = this.state;
        return (
            <div style={{ height: '100%' }}>
                {
                    loading &&
                    <Loader />
                }
                <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backDrop}
                <main style={{ marginTop: '56px' }}>
                    <div className='base_image'>
                        <div className='base_image1'>
                            <div className='span'>Hello World!</div><br />
                            <div className='span2'>A Platform for JAMB/UTME apirants where the take computer based test in prepation for their exams</div><br />
                            {
                                userExist
                                    ?
                                    <a href='/questions'><button className='button'>Get started</button></a>
                                    :
                                    <a href='/login'><button className='button'>Get started</button></a>
                            }
                        </div>
                    </div>
                    boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />
                    boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />
                    boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />boy<br />
                    boy<br />
                </main>
            </div>

        );
    }
}

export default Homepage;