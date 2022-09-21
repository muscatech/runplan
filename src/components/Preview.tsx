import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RenderedPlan } from '../modules/plan';
import { currentPlanSelector } from '../modules/plan/selectors';
import { deletePlanItem } from '../modules/plan/slice';

const Inner = styled(Box)`
  grid-area: preview;
  padding: ${ props => props.theme.spacing(4) } ${ props => props.theme.spacing(16) };
  position: relative;
  overflow-y: auto;
`;

interface DropDeleteTargetProps {
  children: ReactNode,
  currentPlanID?: string
}

interface DroppedItem {
  index: number
}

interface CollectedProps {
  isOver: boolean,
  canDrop: boolean
}

const DeleteMessage = styled.div.attrs({
  children: 'Drop to delete item'
})`
  position: absolute;
  top: 3em;
  right: 0;
  left: 0;
  color: red;
  text-align: center;
  font-size: x-large;
`;

const DropDeleteTarget = ({ children, currentPlanID }: DropDeleteTargetProps) => {

  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop<DroppedItem, void, CollectedProps>({
    accept: 'EXISTING_ITEM',
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: DroppedItem, monitor) => {
      if (currentPlanID && monitor.isOver({ shallow: true })) {
        dispatch(deletePlanItem({ planID: currentPlanID, index: item.index }));
      }
    }
  });

  return (
    <Inner
      ref={drop}
      sx={{
        backgroundColor: isOver && canDrop ? '#FF8080' : 'transparent'
      }}
    >
      { children }
      { isOver && canDrop && <DeleteMessage /> }
    </Inner>
  );
};

export const Preview = (): JSX.Element => {

  const currentPlan = currentPlanSelector();

  return (
    <DropDeleteTarget currentPlanID={currentPlan?.id}>
      { currentPlan ?
        <RenderedPlan
          editable
          plan={currentPlan}
        />
      : null }
    </DropDeleteTarget>
  );
};
