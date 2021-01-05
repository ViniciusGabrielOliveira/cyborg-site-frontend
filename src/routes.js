import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeSite from './pages/homeSite';

import NewNews from './pages/newNews';
import DetailNoticia from './pages/detailNoticia';
import Biografia from './pages/biografia';
import Contato from './pages/contato';
import EditNews from './pages/editNews';
import AdmNews from './pages/admNews';


import Logon from './pages/logon';

import NewMunicipe from './pages/newMunicipe';
import NewSolicitacao from './pages/newSolicitacao';
import NewTarefa from './pages/newTarefa';
import DetailMunicipe from './pages/detailMunicipe';
import EditMunicipe from './pages/editMunicipe';
import EditTarefa from './pages/editTarefa';
import Home from './pages/home';
import DetailSolicitacao from './pages/detailSolicitacao';
import DetailTarefa from './pages/detailTarefa';
import DetailDemanda from './pages/detailDemanda';
import EditDemanda from './pages/editDemanda';
import Tarefas from './pages/tarefas';
import Demandas from './pages/demandas';
import CadastroJson from './pages/cadastrarJson';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/HomeSite" exact component={HomeSite} />
                <Route path="/biografia" component={Biografia} />
                <Route path="/contato" component={Contato} />
                <Route path="/noticias/:title" component={DetailNoticia} />
                <Route path="/noticia/new" component={NewNews} />
                <Route path="/noticia/edit" component={EditNews} />
                <Route path="/admNews" component={AdmNews} />

                <Route path="/logon" exact component={Logon} />
                <Route path="/municipe/new" component={NewMunicipe} />
                <Route path="/municipe/:id" component={DetailMunicipe} />
                <Route path="/editmunicipe/:id" component={EditMunicipe} />
                <Route path="/solicitacao/new/:id" component={NewSolicitacao} />
                <Route path="/solicitacao/:id" component={DetailSolicitacao} />
                <Route path="/demandas" component={Demandas} />
                <Route path="/demanda/:id" component={DetailDemanda} />
                <Route path="/editdemanda/:id" component={EditDemanda} />
                <Route path="/tarefa/new" component={NewTarefa} />
                <Route path="/tarefa/:id" component={DetailTarefa} />
                <Route path="/edittarefa/:id" component={EditTarefa} />
                <Route path="/tarefas" component={Tarefas} />
                <Route path="/cadastrarJson" component={CadastroJson} />


                <Route path="/" component={Home} />



            </Switch>
        </BrowserRouter>
    );
}