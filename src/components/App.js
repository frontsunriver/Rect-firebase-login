import React from 'react'
import { Container } from 'react-bootstrap';

import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Signup from './Signup'
import Signin from './Signin'
import Dashboard from './Dashboard'
import PrivateRouter from './PrivateRouter'

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
        <div className="w-100" style={{maxWidth: "500px"}}>
          <Router>
            <Switch>
              <PrivateRouter exact path="/" component={Dashboard}></PrivateRouter>
              <Route path="/login" component={Signin}></Route>
              <Route path="/signup" component={Signup}></Route>
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
