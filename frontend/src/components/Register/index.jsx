import React from 'react';
import { NavLink, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Menu, Popup, Icon } from 'semantic-ui-react';
import Register from './register';
import ConfirmRegister from './confirmRegister';

const RegisterContent = () => {
    return (
        <BrowserRouter>
            <Container text>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/register/confirm" component={ConfirmRegister} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default RegisterContent;
