import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../components/Layout";
import Gallery from "../views/Gallery";







const RoutesManager = ({UploadImageComponent,ImageComponent,NotFound}) => {

    return    <BrowserRouter >
    <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Gallery />} />
                <Route path="image/:id" element={<ImageComponent/>}/>
                <Route path="upload" element={<UploadImageComponent/>} />
                <Route path="*" element={<NotFound />} />

            </Route>


    </Routes>
</BrowserRouter>
}




export default RoutesManager;