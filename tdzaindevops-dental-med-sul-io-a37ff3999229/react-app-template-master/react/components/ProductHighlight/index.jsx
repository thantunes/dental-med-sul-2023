import { useProduct } from 'vtex.product-context'
const ProductHighLight = () => {
    const {product} = useProduct()
    console.log('Teste', product.clusterHighlights)
    return (
        <div>
        {
            product.clusterHighlights.map(e => {
                return (
                    <div className='' data-highlight-id={`${e.id}`}>
                        <div className='vtex-product-highlights-2-x-productHighlightText'><span>{e.name}</span></div>
                    </div>
                )
            })
        }
        </div>
    )
}
export {ProductHighLight}