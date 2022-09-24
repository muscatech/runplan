import styled from "styled-components";

export const WrongPrintMessage = styled.div.attrs({
  children: "Select 'Print' from the menu to correctly print the run plan " +
            "without any other user interface elements"
})`

  display: none;

  color: red;
  font-size: large;

  background-color: #FFCACA;
  border-radius: ${ props => props.theme.shape.borderRadius }px;
  margin: ${ props => props.theme.spacing(2) };
  padding: ${ props => props.theme.spacing(2) };

  @media print {
    display: block;
  }

`;
