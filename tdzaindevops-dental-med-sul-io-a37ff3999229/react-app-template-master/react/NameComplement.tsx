// Notice that this is TypeScript, and this code should be in a .tsx file
import React, { FC } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'


const CSS_HANDLES = ['shortDescriptionContainer', 'shortDescriptionText']
const NameComplement: FC = () => {
  const productContextValue = useProduct()
  const handles = useCssHandles(CSS_HANDLES)

  const nameComplement = productContextValue?.selectedItem?.complementName
  return (
    <div className={`${handles.shortDescriptionContainer}`}>
      <span className={`${handles.shortDescriptionText}`}> {nameComplement}</span>
    </div>
  )
}

export default NameComplement
