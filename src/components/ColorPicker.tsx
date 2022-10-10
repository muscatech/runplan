import styled from "styled-components";

const COLOR_OPTIONS = [
  "#f0d0d1",
  "#f0d0ef",
  "#dcd0f0",
  "#d0eff0",
  "#cbf0df",
  "#d0f0d6",
  "#dbf0ce",
  "#eff0cd",
  "#fffac8",
  "#f0e4c8",
  "#f0D9C9",
  "#F0C8C8",
  "#F0F0F0",
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
