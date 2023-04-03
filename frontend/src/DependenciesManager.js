import "./App.css";
import RoutesManager from "./navigation/RoutesManager";


import UploadImage from "../src/views/UploadImage";
import Image from "../src/views/Image";
import React from "react";

const DefaultUploadImageComponent = () =>
    <UploadImage/>

function NotFound() {
    return (
        <div>
            <h1>La página que busca no existe</h1>
        </div>
    );
}
const DefaultTopLevel = () =>
    <RoutesManager UploadImageComponent={DefaultUploadImageComponent} ImageComponent={Image} NotFound={NotFound} />
export default DefaultTopLevel