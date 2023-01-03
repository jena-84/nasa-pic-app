
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home  from './components/Home';
import About from './components/About';
import Download from './components/Download';
import Gallery from './components/Gallery';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        {/* <div className='container'> */}
          <Switch>
            <Route exact path='/'><Home/></Route>
             <Route path='/gallery'><Gallery/></Route>
             <Route path='/download'> <Download/> </Route>
             <Route path='/about'><About/></Route>
         </Switch>
        {/* </div> */}
        
      </div>
    </Router>
  );
}

export default App;
