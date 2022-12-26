import styled, { css } from 'styled-components'

export const CategoryContainer = styled.nav<{ isVisible: boolean }>`
  box-sizing: border-box;

  ${(props) => props.isVisible === true && css`visible`}
`

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 10px;
`

export const CategoryItem = styled.li`
  font-size: 13px;
`

export const CategoryLink = styled.a`
  font-size: 13px;
  color: #000;
`
