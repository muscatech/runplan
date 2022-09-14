import styled from "styled-components";

const COLOR_OPTIONS = [
  "#f44336",
  "#e91e63",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#C0C0C0",
  "#ffffff"
];

interface Props {
  colors?: string[],
  onChange: (color: string) => void,
  value: string
}

interface ColorOptionProps {
  $color: string,
  onClick?: () => void,
  selected: boolean
}

const ColorOption = styled.div<ColorOptionProps>`


  background-color: ${ props => props.$color };

  border: 2px solid;
  border-color: ${ props => props.selected ? 'black' : '#C0C0C0' };
  border-radius: ${ props => props.theme.shape.borderRadius }px;

  margin: ${ props => props.theme.spacing(0.25) };

  display: inline-block;

  height: 2em;
  width: 2em;
`;

const Wrapper = styled.div``;

export const ColorPicker = ({ colors=COLOR_OPTIONS, onChange, value }: Props) : JSX.Element => {
  return (
    <Wrapper>
      {
        colors.map(
          (c, idx) => (
            <ColorOption
              $color={c}
              key={idx}
              onClick={() => onChange(c)}
              selected={c === value}
            />
          )
        )
      }
    </Wrapper>
  );
};
