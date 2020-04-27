import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Register from './pages/register';

import Profile from './pages/profile';
import NewIncident from './pages/newIncident';
import NewNews from './pages/newNews';



export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
                <Route path="/noticias/new" component={NewNews} />

            </Switch>
        </BrowserRouter>
    );
}