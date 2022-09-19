import { useEffect, useRef } from "react";
import { useFrame } from "react-frame-component";
import styled from "styled-components";
import { StyledFrame } from "../../../components/StyledFrame";
import type { Plan } from "../interfaces";
import { currentPlanSelector } from "../selectors";
import { RenderedPlan } from "./RenderedPlan";


const PrintListener = () => {

  const { window: iframeWindow } = useFrame();

  useEffect(
    () => {
      const listener = (event: MessageEvent) => {
        if (iframeWindow && event.data.type === 'RUNPLAN_PRINT') {
          iframeWindow.print();
        }
      };

      window.addEventListener('message', listener);

      return () => {
        window.removeEventListener('message', listener);
      };
    },
    []
  );

  return null;
};

const Hidden = styled.div`
  display: none;
`;


export const PrintablePlan = () : (JSX.Element | null) => {
  const currentPlan: (Plan | undefined) = currentPlanSelector();
  const iframeRef = useRef(null);

  if (!currentPlan) {
    return null;
  }

  return (
    <Hidden>
      <StyledFrame innerRef={iframeRef}>
        <PrintListener />
        <RenderedPlan
          editable={false}
          plan={currentPlan}
        />
      </StyledFrame>
    </Hidden>
  );
};
