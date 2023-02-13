import React, { FC } from 'react';
import { useProduct } from 'vtex.product-context'

type props = {
    children: any
}
const PriceDiscountSummary: FC<props> = () => {
    const productContextValue = useProduct()
    console.log({
        Produto: productContextValue?.product,
        Name: productContextValue?.product?.productName
    })
    const value = productContextValue?.product?.items[0].sellers[0].commertialOffer?.Price == undefined ? 0 : productContextValue?.product?.items[0].sellers[0].commertialOffer?.Price
    const CalcPrice = (value - (value * 0.03))
    return (
        <>
            <span className="vtex-product-price-1-x-sellingPrice vtex-product-price-1-x-sellingPrice--summary vtex-product-price-1-x-sellingPrice--hasListPrice vtex-product-price-1-x-sellingPrice--summary--hasListPrice">
                Por: <span className="vtex-product-price-1-x-sellingPriceValue vtex-product-price-1-x-sellingPriceValue--summary">
                    <span className="vtex-product-price-1-x-currencyContainer vtex-product-price-1-x-currencyContainer--summary">
                        {CalcPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                    </span>
                </span>
            </span>
        </>
    )
}

export { PriceDiscountSummary };