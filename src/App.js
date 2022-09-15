import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Picker from './components/Picker';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header bg-dark">
        <Header />
        <Picker />
      </header>
    </div>
  );
}

export default App;
