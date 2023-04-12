import { OrderContext, OrderGroupContext } from 'vtex.order-placed'
const OrderEbit = () => {
    
    // inside your component
    const { useOrderGroup } = OrderGroupContext
    const { useOrder } = OrderContext
    console.log("order", useOrder())
    const Order = useOrder()
    console.log(Order?.clientProfileData?.email)
    // console.log(`storeId=109515&platform=mobile&email=${Order?.clientProfileData?.email}&gender=o&zipCode=${Order?.deliveryParcels?.[0]?.address?.postalCode}&parcels=${Order?.paymentData?.transactions?.[0]?.payments?.[0]?.installments}&deliveryTax=${Order.deliveryParcels[0]?.selectedSlaObj?.price}&deliveryTime=${parseInt(Order.deliveryParcels[0]?.shippingEstimate)}&mktSaleId=0&totalSpent=${(Order?.value / 100)}&value=${Order?.totals?.[0]?.value / 100}&quantity=${Order?.items?.[0]?.quantity}&productName=${Order?.items?.[0]?.name}&transactionId=${Order?.paymentData?.transactions?.[0]?.transactionId}&paymentType=08&sku=${Order?.items?.[0]?.id}`)
    return (
        <div>
            <param id="ebitParam" value={`storeId=109515&platform=mobile&email=${Order?.clientProfileData?.email}&gender=o&zipCode=${Order?.deliveryParcels?.[0]?.address?.postalCode}&parcels=${Order?.paymentData?.transactions?.[0]?.payments?.[0]?.installments}&deliveryTax=${Order.deliveryParcels[0]?.selectedSlaObj?.price}&deliveryTime=${parseInt(Order.deliveryParcels[0]?.shippingEstimate)}&mktSaleId=0&totalSpent=${(Order?.value / 100)}&value=${Order?.totals?.[0]?.value / 100}&quantity=${Order?.items?.[0]?.quantity}&productName=${Order?.items?.[0]?.name}&transactionId=${Order?.paymentData?.transactions?.[0]?.transactionId}&paymentType=08&sku=${Order?.items?.[0]?.id}`} />
            <a id="bannerEbit"></a>
            <script type="text/javascript" id="getSelo" src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js109515&lightbox=true"></script>
        </div>
    )
}

export default OrderEbit