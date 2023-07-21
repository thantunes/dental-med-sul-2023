import React, { FC, useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context'
import './index.global.css'
type props = {
    children: any
}
const PriceDiscount: FC<props> = ({children}) => {
    const [ItemSelected, setItemSelected] = useState(0)
    useEffect(function () {
        const Selec: any = document.getElementsByClassName('ba mb3 pa5 vtex-sku-list-1-x-skuContentWrapper vtex-sku-list-1-x-skuContentWrapper--skuListContent bw1 b--blue vtex-sku-list-1-x-selectedSkuContentWrapper vtex-sku-list-1-x-selectedSkuContentWrapper--skuListContent')
        productContextValue?.product?.items.forEach((e, i) => {
            if (e.itemId == `${Selec[0]?.tabIndex}`) {
                setItemSelected(i)
            }
        })
    })
    const productContextValue = useProduct()
    // console.log({
    //     Produto: productContextValue?.product,
    //     Name: productContextValue?.product?.productName,
    // })
    console.log('Contexto de produto',productContextValue)
    const value = productContextValue?.product?.items[ItemSelected].sellers[0].commertialOffer?.Price == undefined ? 0 : productContextValue?.product?.items[ItemSelected].sellers[0].commertialOffer?.Price
    // const listValue = productContextValue?.product?.items[ItemSelected].sellers[0].commertialOffer?.Price == undefined ? 0 : productContextValue?.product?.items[ItemSelected].sellers[0].commertialOffer?.ListPrice
    // const CalcPrice = (value - (value * 0.03))
    return (
        <>
            <div>
                <p className='vtex-product-price-1-x-sellingPriceValue' style={{ margin: 0, display:'flex' }}>{(value - (value * 0.03)).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}<div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--PIXMSG flex tl items-start justify-start t-body c-on-base"><div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--PIXMSG"><p className="lh-copy vtex-rich-text-0-x-paragraph vtex-rich-text-0-x-paragraph--PIXMSG"><span className="b vtex-rich-text-0-x-strong vtex-rich-text-0-x-strong--PIXMSG">3% OFF</span> no pagamento à  <span className="b vtex-rich-text-0-x-strong vtex-rich-text-0-x-strong--PIXMSG">vista no PIX</span></p></div></div></p>
                <p className='vtex-product-price-1-x-sellingPriceValue' style={{ fontSize: "15px", margin: '5px 0px' , color:'black', fontWeight:'bold'}}>{value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</p>
                {children}
                
                {/* <p className='vtex-product-price-1-x-savings' style={{ margin: "0px", display: `${listValue - value == 0 ? "none" : "flex"}`, gap: "5px", flexDirection: "row" }}>Economize <strong> {(listValue - value).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</strong></p> */}
            </div>
        </>
    )
}

export { PriceDiscount };