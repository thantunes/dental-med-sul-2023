// import { useEffect, useState} from "react";
import * as React from 'react';
import ListaCategorias from "./ListaCategorias";
const MainMenu = () => {

    // async function myFetch() {
    //     let response = await fetch('/api/catalog_system/pub/category/tree/1');
      
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
      
    //     let myJson = await response.json();
      
    //     // let objectURL = URL.createObjectURL(myJson);
    //     console.log('meu jason',myJson)
    //   }
      
    //   myFetch()
    //   .catch(e => {
    //     console.log('There has been a problem with your fetch operation: ' + e.message);
    //   });
    // const [menu, setMenu] = useState([])

  
    return (
        <>
        <ListaCategorias />
        </>
    )
}

export default MainMenu;