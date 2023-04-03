import Image from './views/Image';
import Galery from './views/Galery';
import UploaImage from './views/UploadImage';
import './App.css';
import { BrowserRouter,Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

function App() {
  function NotFound() {
    return (
      <div>
        <h1>La página que busca no existe</h1>
      </div>
    );
  }

  //Referencia las rutas a las que se quiere usar un componente especifico
  return (
    <BrowserRouter> 

    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Galery />}  />
          <Route path="image/:id" element={<Image />}  />
          <Route path="upload" element={<UploaImage />}  />
          <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

    </BrowserRouter>


  );
}

export default App;
