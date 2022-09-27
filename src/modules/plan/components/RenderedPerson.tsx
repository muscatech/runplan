import styled from "styled-components";
import { initialify } from "../functions";
import type { Person } from "../interfaces";

const PersonCell = styled.td`
  border: 1px solid black;
  padding: ${ props => props.theme.spacing(1) };
`;

const RoleCell = styled(PersonCell)`
  text-align: right;
  background-color: #EFEFEF;
  font-weight: bold;
  vertical-align: top;
`;

const EmptyCell = styled.td`
  background-color: white;
  border: none !important;
`;

interface Props {
  editable?: boolean,
  person: Person,
  roleCount: number,
  roleIndex: number
}

export const RenderedPerson = ({ person, roleCount, roleIndex }: Props): JSX.Element => {
  if (person) {

    const shouldRenderRole = roleCount === 1 || roleIndex === 1 || person.role.useInitialsNotRole;
    const shouldSpanRows = roleCount > 1 && !person.role.useInitialsNotRole;

    return (
      <>
        {
          shouldRenderRole && (
            <RoleCell
              rowSpan={shouldSpanRows ? roleCount : undefined}
            >
              {person.role.useInitialsNotRole ? person.initials || initialify(person.name) : person.role.name}
            </RoleCell>
          )
        }

        <PersonCell>{person.name}</PersonCell>
      </>
    );
  }
  else {
    return (
      <>
        <EmptyCell />
        <EmptyCell />
      </>
    );
  }
};
