import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Questions from './Components/Questions';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact strict component={Homepage} />
                    <Route path='/questions' exact strict component={Questions} />
                    <Route path='/signup' exact strict component={Signup} />
                    <Route path='/login' exact strict component={Login} />
                    <Route path='/profile' exact strict component={Profile} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default Router;