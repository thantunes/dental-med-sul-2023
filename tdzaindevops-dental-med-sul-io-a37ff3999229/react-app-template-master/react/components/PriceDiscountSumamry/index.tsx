import React, { FC } from 'react';
import { useProduct } from 'vtex.product-context'

type props = {
    children: any
}
const PriceDiscountSummary: FC<props> = ({ children }) => {
    const productContextValue = useProduct()
    console.log({
        Produto: productContextValue?.product,
        Name: productContextValue?.product?.productName
    })
    const value = productContextValue?.product?.items[0].sellers[0].commertialOffer?.Price == undefined ? 0 : productContextValue?.product?.items[0].sellers[0].commertialOffer?.Price
    // const CalcPrice = (value - (value * 0.03))
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', position: 'relative', left: '-4px' }}>
            {/* <span className="vtex-product-price-1-x-sellingPrice vtex-product-price-1-x-sellingPrice--summary vtex-product-price-1-x-sellingPrice--hasListPrice vtex-product-price-1-x-sellingPrice--summary--hasListPrice">
                Por: <span className="vtex-product-price-1-x-sellingPriceValue vtex-product-price-1-x-sellingPriceValue--summary">
                    <span className="vtex-product-price-1-x-currencyContainer vtex-product-price-1-x-currencyContainer--summary">
                        {CalcPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                    </span>
                </span>
            </span> */}
            <p className='vtex-product-price-1-x-sellingPriceValue' style={{ fontSize: "17px", margin: '5px 5px', display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#43aadd', }}>
                {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                <div style={{ fontSize: '10px', color: 'black', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '10px' }}>
                    {children}
                    <span style={{paddingTop:'5px'}}>{(value - (value * 0.03)).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</span>
                    <div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--PIXMSG flex tl items-start justify-start t-body c-on-base">
                        <div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--PIXMSG" style={{ marginLeft: '0px' }}>
                            <p style={{ fontSize: '12px', paddingBottom: '7px' }} className="lh-copy vtex-rich-text-0-x-paragraph vtex-rich-text-0-x-paragraph--PIXMSG">
                                <span className="b vtex-rich-text-0-x-strong vtex-rich-text-0-x-strong--PIXMSG">3% OFF </span>
                                 no pagamento à  <span className="b vtex-rich-text-0-x-strong vtex-rich-text-0-x-strong--PIXMSG">vista no PIX</span>
                            </p>
                        </div>
                    </div>
                </div>
            </p>

        </div>
    )
}

export { PriceDiscountSummary };