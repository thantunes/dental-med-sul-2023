import React, {FC} from 'react';
import { useProduct } from 'vtex.product-context'

type props = {
    children:any
}
const Quickview :FC<props> = ({children}) => {
    const productContextValue = useProduct()
    console.log({
        Numeros:productContextValue?.product?.items.length,
        Name:productContextValue?.product?.productName
    })

    function BuyButtonRule () {
        const value = productContextValue?.product?.items.length == undefined ? 0 : productContextValue?.product?.items.length

        if (value <= 3 && value >= 2 && value < 4) {
            return  children
        } else if ( value == 1){
            return null
        } else {
            return <div className='vtex-rich-text-0-x-container--Modal-txt'><div className='vtex-rich-text-0-x-wrapper--Modal-txt'><p>VER OPÇÕES</p></div></div>
        }   
    }
    return (
       <>
         {BuyButtonRule()}
       </>
    )
}

export {Quickview};