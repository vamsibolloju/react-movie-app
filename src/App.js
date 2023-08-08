import './App.css';
import New from './New';
import Layout from './Layout';
import Hot from './Hot';
import NoPage from './NoPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/new" element={<New />} />
          <Route exact path="hot" element={<Hot />} />
          <Route path="/" element={<Navigate replace to="/new" />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
