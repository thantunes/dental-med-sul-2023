import React, { FC } from 'react';
import { useProduct } from 'vtex.product-context'

type props = {
    children : any
}
const PriceDiscount: FC <props> = ({children}) => {
    const productContextValue = useProduct()
    console.log({
        Produto: productContextValue?.product,
        Name: productContextValue?.product?.productName
    })
    const value = productContextValue?.product?.items[0].sellers[0].commertialOffer?.Price == undefined ? 0 : productContextValue?.product?.items[0].sellers[0].commertialOffer?.Price
    const listValue = productContextValue?.product?.items[0].sellers[0].commertialOffer?.Price == undefined ? 0 : productContextValue?.product?.items[0].sellers[0].commertialOffer?.ListPrice
    const CalcPrice = (value - (value * 0.03))
    return (
        <>
            <div>
                <p className='vtex-product-price-1-x-sellingPriceValue' style={{margin:0}}>{CalcPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</p>
                <div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--PIXMSG flex tl items-start justify-start t-body c-on-base"><div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--PIXMSG"><p className="lh-copy vtex-rich-text-0-x-paragraph vtex-rich-text-0-x-paragraph--PIXMSG">À vista no PIX com até <span className="b vtex-rich-text-0-x-strong vtex-rich-text-0-x-strong--PIXMSG">3% OFF</span></p></div></div>
                <p className='vtex-product-price-1-x-sellingPriceValue' style={{fontSize:"15px",margin:0}}>{value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</p>
                {children}
                <p className='vtex-product-price-1-x-savings' style={{margin:"0px", display:`${listValue - value == 0 ? "none": "flex"}`, gap:"5px", flexDirection:"row" }}>Economize <strong> {(listValue - value).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</strong></p>
            </div>
        </>
    )
}

export { PriceDiscount };