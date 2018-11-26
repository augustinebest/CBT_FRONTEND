import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Alert } from 'reactstrap';
import Navbar from './NavBar';
import './Signup.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email_err: '',
            password_err: '',
            err: '',
            success: 'success',
            alert: 'danger',
            visible: true
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.emailInput.value,
            password: this.passwordInput.value
        }
        axios.post('http://localhost:5000/user/login', data).then(res => {

            if (res.data.code === 10) {
                this.setState({
                    err: res.data.message,
                    visible: true
                })
            } else if (res.data.code === 11) {
                this.setState({
                    err: res.data.message,
                    visible: true
                })
            } else if (res.data.code === 12) {
                this.setState({
                    err: res.data.message,
                    visible: true
                })
            } else if (res.data.code === 13) {
                this.setState({
                    err: res.data.message,
                    visible: true
                })
            } else if (res.data.code === 14) {
                this.setState({
                    err: res.data.message,
                    visible: true,
                    alert: 'success'
                })
                sessionStorage.setItem('user', JSON.stringify(res.data.token));
                JSON.parse(sessionStorage.getItem('user'));
                setTimeout(() => {
                    this.props.history.push("/profile");
                }, 2000)
            }
        })
    }

    handleChange = () => {
        if (this.emailInput.value.trim() === '') {
            this.setState({
                email_err: 'Email is required'
            })
        } else {
            this.setState({
                email_err: '',
            })
        }

        if (this.passwordInput.value.trim() === '') {
            this.setState({
                password_err: 'Password is required',
            })
        } else {
            this.setState({
                password_err: ''
            })
        }
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        var style = {
            marginTop: 13,
            fontSize: '16px'
        }
        return (
            <Fragment>
                <Navbar />
                <div className='signup' >
                    {
                        this.state.err &&
                        <Alert color={this.state.alert} isOpen={this.state.visible} toggle={this.onDismiss}>
                            {this.state.err}
                        </Alert>

                    }
                    <form onSubmit={this.onSubmit}>

                        <span className='email'><i className="fa fa-at"></i></span>
                        <input className='input' placeholder='myemail@example.com' type='email' onChange={this.handleChange} required ref={emailInput => {
                            this.emailInput = emailInput
                        }} /><br />
                        <span className='error_msg'>{this.state.email_err}</span><br /><br />


                        <span className='email'><i className="fa fa-hone fa-unlock-alt"></i></span>
                        <input className='input' placeholder='******' type='password' onChange={this.handleChange} required ref={passwordInput => {
                            this.passwordInput = passwordInput
                        }} /><br />
                        <span className='error_msg'>{this.state.password_err}</span><br />


                        <Button outline color='info' size='sm' style={style}>Login</Button>
                    </form><br /><br />
                    Don't have an account? <Link to='/signup'><span>Signup</span></Link>
                </div>
            </Fragment>
        )
    }
}

export default Login;