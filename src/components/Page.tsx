import styled, { createGlobalStyle } from 'styled-components';
import { Statusbar } from "../Statusbar";
import { Controls } from "./Controls";
import { Menubar } from "./Menubar";
import { Preview } from './Preview';


const PageInner = styled.div`

  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-areas: "menu menu" "controls preview" "statusbar statusbar";

  height: 100%;

`;

const GlobalStyle = createGlobalStyle`

  html, body, #root {
    margin: 0;
    padding: 0;

    width: 100vw;
    height: 100vh;

    font-family: ${ props => props.theme.font.family }
  }
`;

export const Page = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <PageInner>
        <Menubar />
        <Controls />
        <Preview />
        <Statusbar />
      </PageInner>
    </>
  );
};
