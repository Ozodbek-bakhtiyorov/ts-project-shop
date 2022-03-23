import styled from 'styled-components';
import { IconButton } from '@mui/material'


export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin:4px;
`

export const StyleButton = styled(IconButton)`
  position:fixed;
  z-index:999;
  right:20px;
  top:20px;
  background:tomato;
  box-shadow:0 2px 3px black;
  padding:1vmax;
  font:500 1vmax sans-serif;
`