import React, { useEffect } from 'react';
import { useOrderGroup } from 'vtex.order-placed/OrderGroupContext'

const OrderCustomData:StorefrontFunctionComponent = () => {
    const orderGroup = useOrderGroup();

    // Acessa todas as informações do pedido
    const order = orderGroup.orders[0];

    // Acessa dados do pedido
    const orderId = order.orderId;
    const email = order.clientProfileData.email;

    // CONSULTA E SALVA CUSTOM DATA DO PEDIDO em uma variável
    async function pegaCustomData(email:string) {
        const resultado =  await fetch(`/api/oms/pvt/orders/${orderId}`)

        const resultadoConvertido = await resultado.json()

        const customFields = resultadoConvertido.customData.customApps[0].fields


        const objCustomField = customFields;

        objCustomField.email = email
        return objCustomField;
    }

    pegaCustomData(email)

    // SALVA CUSTOM DATA DO PEDIDO NO MASTER DATA
    
    async function salvaCustomData(email:string) {
        

        const resultado = await pegaCustomData(email);

        // Objeto com custom fields convertido
        const resultadoConvertido = JSON.stringify(resultado)
        

        const salvarDados =  await fetch(`/api/dataentities/CL/documents`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/vnd.vtex.ds.v10+json",
                "Content-Type": "application/json"
            },
            body: resultadoConvertido
        })

        return salvarDados
    }

    
    useEffect( ()=> {
        salvaCustomData(email)
    })
    return(
        <>
        </>
    )
}

export default OrderCustomData;