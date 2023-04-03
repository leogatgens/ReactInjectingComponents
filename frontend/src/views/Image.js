import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

const Image = () => {
  const { id } = useParams();
  const [Information, setInformation] = useState([]);
  const [Image, setImage] = useState([]);

  // para cambiar la direccion del browser a la inicial
  const navigate = useNavigate();
  function redirectGalery() {
    navigate("/");
  }

  // Trae todas las imagenes cada vez que refresque la pagina
  useEffect(() => {
    selectImageByID();
  }, []);

  // -------------------------------------------------------------
  // Carga los datos de una imagen en especifico
  // -------------------------------------------------------------
  const selectImageByID = async () => {
    const serviceUrl = `http://localhost:8080/image/` + id;
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await axios.get(serviceUrl, config);
    let image = (
      <div className="ful-img">
        <img src={response.data.url} />
      </div>
    );
    setImage(image);
    setInformation(
      <div>
        <p>Descripcion: {response.data.description}</p>
        <p>URL: {response.data.url}</p>
      </div>
    );
  };

  // -------------------------------------------------------------
  // Borra la image y lo redirigue a la galery
  // -------------------------------------------------------------
  const deletePersonaje = async () => {
    const serviceUrl = `http://localhost:8080/image/` + id;
    axios
      .delete(serviceUrl)
      .then(() => {
        NotificationManager.success("Success", "Creado con exito");
      })
      .then(redirectGalery());
  };

  return (
    <div id="full-page-div">
      <div>{Information}</div>

      <div className="img-gallery">{Image}</div>
      <button className="buttonDelete" onClick={deletePersonaje}>
        Borrar Imagen
      </button>
    </div>
  );
};

export default Image;
