import React, {FC} from 'react';
import { useProduct } from 'vtex.product-context'

type props = {
    children:any
}
const ButtonSummary :FC<props> = ({children}) => {
    const productContextValue = useProduct()
    return (
       <>
         {productContextValue?.product?.items.length == undefined ? 0 : productContextValue?.product?.items.length  > 0 && productContextValue?.product?.items.length <= 1   ? children  : null  }
       </>
    )
}

export {ButtonSummary};