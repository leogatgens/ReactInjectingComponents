import { useState } from 'react';
import {uploadFile} from './firebase/config'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const Probando = () => {

  const[file,setFile] = useState(null);
  const[Unique,setUnique] = useState([]);

  const [Image, setImage] = useState([]);
  const [ImageID, setImageID] = useState("");


  // -------------------------------------------------------------
  // selecciona una imagen con el click y carga los datos
  // -------------------------------------------------------------
  function seleccionarImagen(id){
    setImageID(id);
    selectImageByID();
  }

  const selectImageByID = async (id) => {
    const serviceUrl = `http://localhost:8080/image/` + id;
    let config = {
      headers: {
        "Content-Type": "application/json"    
      }
    };
    let response =  await axios.get(serviceUrl,config);
    let image = <img src={response.data.url}/>;
    setImage(image);
  
  }

  // -------------------------------------------------------------
  // selecciona todas las imagenes de la base de datos y las pinta en el browser
  // -------------------------------------------------------------
  const selectImage = async () => {
      const serviceUrl = 'http://localhost:8080/image';
      let config = {
        headers: {
          "Content-Type": "application/json"    
        }
      };
      let response =  await axios.get(serviceUrl,config); 

      if(response.data.length > 0){   
        let imagelist = response.data.map((item) => {
          return <img src={item.url} id={item.id} onClick={() => selectImageByID(item.id)}/>
        });
        setImage(imagelist);
  
      }else{
        setImage(<h2>No hay datos</h2>);
      }        
  }

  // -------------------------------------------------------------
  // Manda los datos a la API del back lo que hace que se guarde en la base de datos
  // -------------------------------------------------------------
  function createImage(id, name, url) {
    var newImage = {
    id: id,
    description: name,
    url: url
  }

  if (newImage.id === "" || newImage.description === "" || newImage.url === "" ){
      alert("Debe digitar todos los datos.");

  }else{
      const serviceUrl = `http://localhost:8080/image`;
      let config = {
          headers: {
                  "Content-Type": "application/json"        
          }
      };

      axios.post(serviceUrl,newImage ,config)
      .then(response =>  {alert("Procesado con exito") 
                              selectImage();} )
                              
                              .catch(error => {
                                alert("Error: " + error.message);
                              });;
      }
  }

  // -------------------------------------------------------------
  // Publica La imagen en firebase y le crea un URL
  // ademas llama la funcion createImage que la guarda en la base de datos
  // -------------------------------------------------------------

  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
          const result = await uploadFile(file);
          const uniqueID = uuidv4();
          createImage(uniqueID, file.name, result);

      } catch (error){
          console.error(error);
      }
  }

    return(

        <div id="full-page-div">

          <h1> Imagenes </h1>

          <div>
                  {Unique}
          </div>

          <div class="img-gallery">
                  {Image}
          </div>
          

          <div>
              <form onSubmit={handleSubmit}>
                  <input type='file' accept='.jpg,.jpeg,.png' onChange={(e) => setFile(e.target.files[0])} />
                  <button>Upload</button>
              </form>

              <br></br><br></br><br></br>

              <button onClick={selectImage}>Cargar Imagenes</button>
          </div>
        </div>
    )
}

export default Probando;