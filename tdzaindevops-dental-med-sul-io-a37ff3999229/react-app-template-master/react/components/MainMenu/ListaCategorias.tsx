import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

// QUERY PARA CONSULTAR CATEGORIAS DO CATALOG
import GET_CATEGORIES from '../../queries/getCategories.graphql'
// COMPONENTES ESTILIZADOS (STYLED-COMPONENTS)
import {
  CategoryContainer,
  CategoryLink,
  CategoryList,
  CategoryItem,
} from './styled'

const ListaCategorias = () => {
  interface Category {
    name: string
    children: {
      name: string
    }
    href: string
  }

  const { data } = useQuery(GET_CATEGORIES)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(data.categories)
  }, [categories, data])

  return (
    <>
      <CategoryItem>
        Todas as categorias
        <CategoryContainer isVisible>
          <CategoryList>
            {categories.map((category) => (
              <>
                <CategoryLink href={category.href}>
                  {category.name}
                </CategoryLink>
              </>
            ))}
          </CategoryList>
        </CategoryContainer>
      </CategoryItem>
    </>
  )
}

export default ListaCategorias
