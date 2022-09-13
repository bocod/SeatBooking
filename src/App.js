import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
import MoviePicker from './components/MoviePicker/MoviePicker';
import SeatPicker from './components/SeatPicker/SeatPicker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MoviePicker/>
        <SeatPicker/>
      </header>
    </div>
  );
}

export default App;
