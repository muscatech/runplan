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
`;

const EmptyCell = styled.td`
  background-color: white;
  border: none !important;
`;

interface Props {
  editable?: boolean,
  person: Person
}

export const RenderedPerson = ({ person }: Props): JSX.Element => {
  if (person) {
    return (
      <>
        <RoleCell>{person.role.useInitialsNotRole ? person.initials || initialify(person.name) : person.role.name}</RoleCell>
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
