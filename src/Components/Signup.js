import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import axios from 'axios';
import { Button, Alert } from 'reactstrap';
import './Signup.css'

class Signup extends React.Component {
    state = {
        name_err: '',
        email_err: '',
        number_err: '',
        password_err: '',
        cpassword_err: '',
        success: 'success',
        alert: 'danger',
        visible: true
    }

    onSubmit = (e) => {
        e.preventDefault();
                const data = {
                    name: this.nameInput.value,
                    email: this.emailInput.value,
                    number: this.numberInput.value,
                    password: this.passwordInput.value,
                    cpassword: this.cpasswordInput.value
                }
                axios.post('http://localhost:5000/user/signup', data).then(res => {
                    if(res.data.code === 10) {
                        // alert('This field(s) is required.')
                        this.setState({
                            err: res.data.message,
                            visible: true
                        })
                    } else if(res.data.code === 11) {
                        alert('Error occured in finding this user.')
                    } else if(res.data.code === 12) {
                        // alert('This user already exist.')
                        this.setState({
                            err: res.data.message,
                            visible: true
                        })
                    } else if(res.data.code === 13) {
                        // alert('The password must consist of at least 6 characters.')
                        this.setState({
                            err: res.data.message,
                            visible: true
                        })
                    } else if(res.data.code === 14) {
                        // alert('Phone Number should contain at least 4 characters.')
                        this.setState({
                            err: res.data.message,
                            visible: true,
                        })
                    } else if(res.data.code === 15) {
                        // alert('Password do not match.')
                        this.setState({
                            err: res.data.message,
                            visible: true
                        })
                    } else if(res.data.code === 16) {
                        this.setState({
                            err: res.data.message,
                            visible: true,
                            alert: 'success'
                        })
                        setTimeout(() => {
                            this.props.history.push('/login')
                        }, 3000)
                    }
                })
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    changeMe = () => {

        if (this.nameInput.value.trim() === '') {
            this.setState({
                name_err: 'Username is required'
            })
        } else {
            this.setState({
                    name_err: '',
            })
        }

        if (this.emailInput.value.trim() === '') {
            this.setState({
                email_err: 'Email is required',
            })
        } else {
            this.setState({
                    email_err: ''
            })
        }

        if (this.numberInput.value.trim() === '') {
            this.setState({
                number_err: 'Phone Number is required'
            })
        } else {
            this.setState({
                    number_err: ''
            })
        }

        if (this.passwordInput.value.trim() === '') {
            this.setState({
               password_err: 'Password is required'
            })
        } else {
            this.setState({
                    password_err: ''
            })
        }

        if (this.cpasswordInput.value.trim() === '') {
            this.setState({
                cpassword_err: 'Confirm Password is required'
            })
        } else {
            this.setState({
                    cpassword_err: ''
            })
        }

    }

    render() {
        var style = {
            marginTop: 13
        }
        return (
            <Fragment>
                <Navbar styleProp={{ backgroungColor: 'black'}}/>
                <div className='signup'>
                {
                        this.state.err &&
                        <Alert color={this.state.alert} isOpen={this.state.visible} toggle={this.onDismiss}>
                            {this.state.err}
                        </Alert>

                    }
                    <form onSubmit={this.onSubmit}>
                        <span className='email'>@</span>
                        <input type='text' placeholder='username' className='input' onChange={this.changeMe} required ref={nameInput => {
                            this.nameInput = nameInput
                        }} /><br />
                        <span className='error_msg'>{this.state.name_err}</span><br /><br />

                        <span className='email'>@</span>
                        <input type='email' placeholder='myemail@example.com' className='input' onChange={this.changeMe} required ref={emailInput => {
                            this.emailInput = emailInput
                        }}/><br />
                        <span className='error_msg'>{this.state.email_err}</span><br /><br />

                        <span className='email'>@</span>
                        <input type='text' placeholder='Phone Number' className='input' onChange={this.changeMe} required ref={numberInput => {
                            this.numberInput = numberInput
                        }}/><br />
                        <span className='error_msg'>{this.state.number_err}</span><br /><br />

                        <span className='email'>@</span>
                        <input type='password' placeholder='Password' className='input' onChange={this.changeMe} required ref={passwordInput => {
                            this.passwordInput = passwordInput
                        }}/><br />
                        <span className='error_msg'>{this.state.password_err}</span><br /><br />

                        <span className='email'>@</span>
                        <input type='password' placeholder='Retype Password' className='input' onChange={this.changeMe} required ref={cpasswordInput => {
                            this.cpasswordInput = cpasswordInput
                        }}/><br />
                        <span className='error_msg'>{this.state.cpassword_err}</span><br /><br />

                        <Button outline color='info' size='xl' style={style}>Register</Button>
                    </form><br /><br />
                    Already registered? <Link to='/login'><span>login</span></Link>
                </div>
            </Fragment>
        );
    }
}

export default Signup;