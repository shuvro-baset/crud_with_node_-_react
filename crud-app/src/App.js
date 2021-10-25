
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './pages/Header/Header';
import { BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom";
import Home from './pages/Home/Home';
import AddUser from './pages/AddUser/AddUser';
import Users from './pages/Users/Users';
import UpdateUser from './pages/UpdateUser/UpdateUser';
function App() {
  return (
    <>
      <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route  path="/users">
          <Users></Users>
        </Route>
        <Route  path="/add-user">
          <AddUser></AddUser>
        </Route>
        <Route  path="/update-user/:userId">
          <UpdateUser></UpdateUser>
        </Route>
        
      </Switch>
      </Router>
    </>
  );
}

export default App;
