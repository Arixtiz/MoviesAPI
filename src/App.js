import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movie from './components/movies';
//import Login from './components/Login';
//import Actor from './components/actor';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={< Movie />}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
