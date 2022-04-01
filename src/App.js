import { useContext } from 'react';
import { BrowserRouter as Router, Route ,Routes as Switch} from 'react-router-dom';
import Header from './components/header/Header';
import { ThemeContext } from './context';
import Home from './components/pages/homepage/Homepage'
import './App.css';
import Currencypage from './components/pages/currency/Currencypage';

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="App" style={{ backgroundColor: darkMode ? "#222" : "white", color: darkMode && "white" }}>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact element = {<Home />} />
          <Route path = '/currency' exact element = {<Currencypage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
