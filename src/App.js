import { useContext } from 'react';
import { BrowserRouter as Router, Route ,Routes as Switch} from 'react-router-dom';
import Header from './components/header/Header';
import { ThemeContext } from './context';
import Home from './components/pages/homepage/Homepage'
import './App.css';
import Currencypage from './components/pages/currency/Currencypage';
import Detailpage from './components/pages/detailpage/Detailpage';
import Aboutpage from './components/pages/about/Aboutpage';
import Linechart from './components/linechart/Linechart';
import Choice from './components/pages/choice/Choice';
import Compare from './components/pages/compare/Compare';

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="App" style={{ backgroundColor: darkMode ? "#121212" : "white", color: darkMode && "white" }}>
      <Router>
      <Header />
        <Switch>
          <Route path='/' exact element = {<Home />} />
          <Route path = '/currency' element = {<Currencypage />} />
          <Route path = '/about' element = {<Aboutpage />} />
          <Route path = '/currency/detail/:id' element = {<Detailpage />}/>
          <Route path = '/mock' element = {<Linechart />} />
          <Route path = '/choice' element = {<Choice />} />
          <Route path = '/compare' element = {<Compare />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
