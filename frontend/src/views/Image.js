import {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'react-image-upload/dist/index.css'

const Image = () => {

  const {id} = useParams();
  const[Unique,setUnique] = useState([]);
  const [Image, setImage] = useState([]);

  // -------------------------------------------------------------
  // Carga los datos de una imagen en especifico
  // -------------------------------------------------------------
  const selectImageByID = async () => {
    const serviceUrl = `http://localhost:8080/image/` + id;
    let config = {
      headers: {
        "Content-Type": "application/json"    
      }
    };
    let response =  await axios.get(serviceUrl,config);
    let image = <div className='ful-img'><img src={response.data.url}/></div>;
    setImage(image);
    setUnique(<div> <h2>Descripcion: {response.data.description}</h2> 
                    <h2>URL: {response.data.url}</h2>
              </div>)
  
  }
 

    return(

        <div id="full-page-div">

          <h1> Imagen </h1>
          
          <div>
                  {Unique}
          </div>

          <div className="img-gallery">
                  {Image}
          </div>

          <button onClick={selectImageByID}>Cargar Imagen</button>

        </div>
    )
}

export default Image;