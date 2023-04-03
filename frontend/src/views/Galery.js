import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Galery = () => {

  // para cambiar la direccion del browser
  const navigate = useNavigate();

  const[Unique,setUnique] = useState([]);
  const [Image, setImage] = useState([]);


  // -------------------------------------------------------------
  // selecciona todas las imagenes de la base de datos y las pinta en el browser
  // -------------------------------------------------------------
  const selectImageToBD = async () => {
      const serviceUrl = 'http://localhost:8080/image';
      let config = {
        headers: {
          "Content-Type": "application/json"    
        }
      };
      let response =  await axios.get(serviceUrl,config); 

      if(response.data.length > 0){   
        let imagelist = response.data.map((item) => {
          return <img className='' src={item.url} id={item.id} onClick={() => navigate('/image' + "/" + item.id)} /> 
        });
        setImage(imagelist);
  
      }else{
        setImage(<h2>No hay datos</h2>);
      }        
  }

    return(

        <div id="full-page-div">

          <h1> Galería </h1>

          <div>
                  {Unique}
          </div>

          <div className="img-gallery">
                  {Image}
          </div>
          

          <div>
              <button onClick={selectImageToBD}>Cargar Todas Las Imagenes</button>
          </div>
        </div>
    )
}

export default Galery;