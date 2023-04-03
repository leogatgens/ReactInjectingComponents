import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../components/Layout";
import Gallery from "../views/Gallery";
import Image from "../views/Image";
import UploaImage from "../views/UploadImage";

function NotFound() {
    return (
        <div>
            <h1>La página que busca no existe</h1>
        </div>
    );
}

const RoutesManager = () => {
    return    <BrowserRouter >
    <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Gallery />} />
            <Route path="image/:id" element={<Image/>} />
            <Route path="upload" element={<UploaImage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
</BrowserRouter>
}




export default RoutesManager;