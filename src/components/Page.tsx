import styled, { createGlobalStyle } from 'styled-components';
import { PrintablePlan } from '../modules/plan';
import { Controls } from "./Controls";
import { Menubar } from "./Menubar";
import { Preview } from './Preview';


const PageInner = styled.div`

  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-areas: "menu menu" "controls preview";

  height: 100%;

`;

const GlobalStyle = createGlobalStyle`

  html, body, #root {
    margin: 0;
    padding: 0;

    width: 100vw;
    height: 100vh;

    font-family: ${ props => props.theme.typography.fontFamily };
    font-size: ${ props => props.theme.typography.fontSize };

    background-color: rgb(245, 245, 245);
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
      </PageInner>
      <PrintablePlan />
    </>
  );
};
