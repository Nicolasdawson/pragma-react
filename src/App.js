import { Route, Routes } from 'react-router-dom';
import './App.css';
import UsuarioCreate from './components/UsuarioCreate';
import UsuarioEdit from './components/UsuarioEdit';
import Usuarios from './components/Usuarios';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Usuarios/>}/>
        <Route path="create" element={<UsuarioCreate/>}/>
        <Route path='edit/:id' element={<UsuarioEdit/>}/>
      </Routes>
    </div>
  );
}

export default App;
