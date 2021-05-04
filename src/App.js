import './App.css';
import Header from './components/Header/header';
import Home from './components/Home/home';
import Footer from './components/Footer/footer';
import Login from './components/Login/login';
import Welcome from './components/Welcom/welcom';
import Signup from './components/Signup/signup';
import Dashboard from './components/Dashboard/dashboard';
import ErrorPage from './components/ErrorPage/errorPage';

// import router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
       
        <Router>
            <Header/>
                  <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/welcom" component={Welcome}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route component={ErrorPage}/>
                  </Switch>
              <Footer/>
        </Router>
      
        
    </div>
  );
}

export default App;
