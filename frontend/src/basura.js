//const express = require('express');
  //const multer = require('multer');
  //const app = express();
  
  //const multer = require('multer')

  /*
  const storage = multer.diskStorage({
    destination: '../images', //path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
      cb(null, Date.now() + ' - ')
    }
  })*/


  /*function getImageFile(image) {
      const formData = new FormData();
      formData.append('image', image);
    
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
        const imageURL = URL.createObjectURL(blob);
        const img = new Image();
        img.src = imageURL;
        img.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = image.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 'image/png');
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }    */






      /*             jmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
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



  <div class="row">
                        <img src={item.url} class="column"/> 
                            <map name={item.ImageUrl}>
                                <area shape='rect' coords='100, 100, 100, 100' href={item.ImageUrl} title={item.description}/></map>
                    </div>