import { useState } from 'react';
import {uploadFile} from './firebase/config'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const Probando = () => {

  const[file,setFile] = useState(null);
  const[Unique,setUnique] = useState([]);

  const [Image, setImage] = useState([]);
  const [ImageID, setImageID] = useState("");
  const [ImageDescription, setImageDescription] = useState("");
  const [ImageUrl, setImageUrl] = useState("");

  const [ImageIdDelete, setImageIdDelete] = useState(0);


  // -------------------------------------------------------------
  // crea una Imagen
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
  // borra una imagen
  // -------------------------------------------------------------
  const deleteImage = async () => {
    if (ImageIdDelete === "" ){
      alert("No se selecciono una imagen");

  }else{
      const serviceUrl = `http://localhost:8080/image/`;
      axios.delete(serviceUrl+ImageIdDelete)
      .then(response =>  {alert("Borrado con exito") 
                            selectImage()} )
                            
                            .catch(error => {
                              alert("No se pudo eliminar la imagen: " + error.message);
                            });
  }
  }

  const fulImgBox = document.getElementById("fulImgBox"),
  fulImg = document.getElementById("fulImg");

  function openFulImg(reference){
      fulImgBox.style.display = "flex";
      fulImg.src = reference
  }
  function closeImg(){
      fulImgBox.style.display = "none";
  }

  // -------------------------------------------------------------
  // selecciona todas las imagenes
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
            return <img src={item.url} id={item.id} onClick={() => selectImage(item.id)}/>
          });
          setImage(imagelist);
    
        }else{
          setImage(<h2>no hay datos</h2>);
        }        
    }

    // la vara nueva 

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