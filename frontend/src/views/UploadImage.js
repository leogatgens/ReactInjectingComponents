import { useState } from "react";
import { uploadFile } from "../firebase/config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

const UploadImage = () => {
  const [file, setFile] = useState(null);

  // para cambiar la direccion del browser a la inicial
  const navigate = useNavigate();
  function redirectGalery() {
    navigate("/");
  }

  // -------------------------------------------------------------
  // Guarda la imagen en la base de datos
  // -------------------------------------------------------------
  function createImageBD(id, name, url) {
    var newImage = {
      id: id,
      description: name,
      url: url,
    };

    if (
      newImage.id === "" ||
      newImage.description === "" ||
      newImage.url === ""
    ) {
      alert("Debe digitar todos los datos.");
    } else {
      const serviceUrl = `http://localhost:8080/image`;
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(serviceUrl, newImage, config)
        .then(() => {
          NotificationManager.success("Success", "Creado con exito");
        })
        .then(redirectGalery())

        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  }

  // -------------------------------------------------------------
  // Publica La imagen en firebase y le crea un URL
  // ademas llama la funcion createImage que la guarda en la base de datos
  // -------------------------------------------------------------

  const CreateImage = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(file);
      const uniqueID = uuidv4();
      createImageBD(uniqueID, file.name, result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="uploadCSS">
      <h1> Subir Imagen </h1>

      <div>
        <form onSubmit={CreateImage}>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button>Subir Imagenes</button>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
