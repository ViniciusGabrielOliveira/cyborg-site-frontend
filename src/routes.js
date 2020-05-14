import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';

import NewNews from './pages/newNews';
import DetailNoticia from './pages/detailNoticia';
import Biografia from './pages/biografia';
import Contato from './pages/contato';



export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/biografia" component={Biografia} />
                <Route path="/contato" component={Contato} />
                <Route path="/noticias/:title" component={DetailNoticia} />
                <Route path="/noticias/new" component={NewNews} />
            </Switch>
        </BrowserRouter>
    );
}