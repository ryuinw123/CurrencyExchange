import { useContext } from 'react';
import { BrowserRouter as Router, Route ,Routes as Switch} from 'react-router-dom';
import Header from './components/header/Header';
import { ThemeContext } from './context';
import Home from './components/pages/homepage/Homepage'
import './App.css';
import Currencypage from './components/pages/currency/Currencypage';
import Detailpage from './components/pages/detailpage/Detailpage';
import datadetail from "./data/Currency/mock_detail_page.json"

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="App" style={{ backgroundColor: darkMode ? "#222" : "white", color: darkMode && "white" }}>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact element = {<Home />} />
          <Route path = '/currency' element = {<Currencypage />} />
          <Route path = '/detail' element = {<Detailpage props = {datadetail[0]}/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
