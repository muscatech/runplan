import { useContext } from 'react';
import type { ReactNode } from 'react';
import Frame, { FrameContext } from 'react-frame-component';

import { StyleSheetManager } from 'styled-components';

interface StyledFrameProps {
  children: ReactNode,
  innerRef: any // https://github.com/ryanseddon/react-frame-component/issues/225
}

// Based on https://stackoverflow.com/questions/66556752/styled-components-are-not-rendering-in-react-iframe/66557426#66557426

export const StyledFrame = ({ children, innerRef }: StyledFrameProps) => {
  return (
    <Frame ref={innerRef}>
      <InjectFrameStyles>
        {children}
      </InjectFrameStyles>
    </Frame>
  );
};

StyledFrame.displayName = 'StyledFrame';

interface InjectFrameStylesProps {
  children: ReactNode
}

const InjectFrameStyles = ({ children }: InjectFrameStylesProps) => {
  const { document } = useContext(FrameContext);
  return (
    <StyleSheetManager target={document?.head}>
      <>
        {children}
      </>
    </StyleSheetManager>
  );
};
