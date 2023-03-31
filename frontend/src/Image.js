import {useEffect,useState} from 'react';
import axios from 'axios';


import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'

const Image = () => {
  
  const [Image, setImage] = useState([]);
  const [ImageID, setImageID] = useState(0);
  const [ImageDescription, setImageDescription] = useState("");
  const [ImageUrl, setImageUrl] = useState("");

  const [ImageIdDelete, setImageIdDelete] = useState(0);

  // -----------------------------------------------------------------------------------------------------
  // Image setters
  // -----------------------------------------------------------------------------------------------------

  const setIdToImage = (event) => {
    setImageID(event.target.value);
  }

  const setdescriptionToImage = (event) => {
    setImageDescription(event.target.value);
  }

  const setUrlToImage = (event) => {
    setImageUrl(event.target.value);
  }

  const setIdDeleteToImage = (event) => {
    setImageIdDelete(event.target.value);
  }


  // -------------------------------------------------------------
  // crea una Imagen
  // -------------------------------------------------------------
  const createImage= async () => {
        var newImage = {
        id: ImageID,
        description: ImageDescription,
        url: ImageUrl
    }
    
    if (newImage.id === 0 || newImage.description === "" || newImage.url === "" ){
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
  /*
  const createImage = async (imageFile) => {
    if (!imageFile) {
      alert("Debe seleccionar una imagen.");
      return;
    }
  
    const newImage = {
      description: imageFile.name,
      url: URL.createObjectURL(imageFile),
      file: imageFile
    };
  
    alert(newImage);

    const serviceUrl = "http://localhost:8080/image";
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    axios
      .post(serviceUrl, newImage, config)
      .then((response) => {
        alert(newImage);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };*/

  // -------------------------------------------------------------
  // borra una imagen
  // -------------------------------------------------------------
  const deleteImage = async () => {
    if (ImageIdDelete === 0 ){
      alert("Debe digitar el id");

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
          console.log(response.data);
          let imagelist = response.data.map((item) => {
            return <li key={item.id}> {item.id}  -  Descrition: {item.description}   -  URL: {item.url} </li>
          });
          setImage(imagelist);
    
        }else{
          setImage(<li>no hay datos</li>);
        }        
    }

    function getImageFile(image) {
      const formData = new FormData();
      formData.append('./images', image);
    
      fetch('/upload-image', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        console.log('Image uploaded successfully:', blob);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }
  
    function deleteImageFile (img) {
      console.log("")
    }

  // -------------------------------------------------------------
  // parte grafica
  // -------------------------------------------------------------

    return(
        <div id="full-page-div">

          <h1> Imagenes </h1>
          <ul> {Image} </ul>
          
          <button onClick={selectImage} > Cargar imagenes </button>     


          <h3> Crear</h3>
            <label >
              ID:   
              <input  onChange={setIdToImage} type="text" />
            </label>
            <br></br><br></br>
            <label >
              Descripcion:   
              <input onChange={setdescriptionToImage} type="text" />
            </label>
            <br></br><br></br>
            <label>
              URL:   
              <input onChange={setUrlToImage} type="text"/>
            </label>
            
            <br></br> <br></br>
            <button onClick={createImage}>
              <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" /> 
              <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
              </svg>
            <span>Guardar </span></button>


            <h3> Borrar Imagen </h3>
            <label>
              ID:   
              <input onChange={setIdDeleteToImage} type="text" />
            </label>
            
            <br></br> <br></br>
            <button class="btn" onClick={deleteImage}> 
              <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" /> 
              <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
              </svg>
            <span>Borrar imagen </span></button> 


            <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={(pictures) => {}}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            onFileAdded={(image) => getImageFile(image)}
            onFileRemoved={(image) => deleteImageFile(image)}
          />

        </div>
    )
}

export default Image;