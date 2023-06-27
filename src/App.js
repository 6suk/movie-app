import Home from './pages/Home';
import Detail from './pages/Detail';
import './style/App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/datail/:id" element={<Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
