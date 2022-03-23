import styled from 'styled-components';
import { CartItemType } from '../App';
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid lightblue;
  padding-bottom:20px;
  div{
    flex:1;
  }
  .info, .btns{
    display:flex;
    justify-content:space-between;
  }
  img{
    max-width:6vmax;
    object-fit:cover;
    margin-left:40px;
  }
`