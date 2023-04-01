import { useState } from 'react';
import {uploadFile} from './firebase/config'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const Probando = () => {

  const[file,setFile] = useState(null);
  const[Unique,setUnique] = useState([]);

  const [Image, setImage] = useState([]);


  // -------------------------------------------------------------
  // selecciona una imagen con el click y carga los datos
  // -------------------------------------------------------------
  const selectImageByID = async (id) => {
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
          return <img className='' src={item.url} id={item.id} onClick={() => selectImageByID(item.id)}/>
        });
        setImage(imagelist);
  
      }else{
        setImage(<h2>No hay datos</h2>);
      }        
  }

  // -------------------------------------------------------------
  // Guarda la imagen en la base de datos
  // -------------------------------------------------------------
  function createImageBD(id, name, url) {
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
                              selectImageToBD();} )
                              
                              .catch(error => {
                                alert("Error: " + error.message);
                              });;
      }
  }

  // -------------------------------------------------------------
  // Publica La imagen en firebase y le crea un URL
  // ademas llama la funcion createImage que la guarda en la base de datos
  // -------------------------------------------------------------

  const CreateImage = async (e) => {
      e.preventDefault();
      try{
          const result = await uploadFile(file);
          const uniqueID = uuidv4();
          createImageBD(uniqueID, file.name, result);

      } catch (error){
          console.error(error);
      }
  }

  const ChargeAllImages = async (e) => {
    setUnique(null);
    selectImageToBD();
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
              <form onSubmit={CreateImage}>
                  <input type='file' accept='.jpg,.jpeg,.png' onChange={(e) => setFile(e.target.files[0])} />
                  <button>Subir Imagenes</button>
              </form>

              <br></br><br></br><br></br>

              <button onClick={ChargeAllImages}>Cargar Todas Las Imagenes</button>
          </div>
        </div>
    )
}

export default Probando;