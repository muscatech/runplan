import styled from "styled-components";
import { EditableText } from "../../../components/EditableText";
import { initialify } from "../functions";
import type { Person } from "../interfaces";

const PersonCell = styled.td`
  border: 1px solid black;
  padding: ${ props => props.theme.spacing(0.75) };
  vertical-align: top;
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
  onChange: (p: Person) => void,
  person: Person,
  roleCount: number,
  roleIndex: number
}

export const RenderedPerson = ({ editable, onChange, person, roleCount, roleIndex }: Props): JSX.Element => {
  if (person) {

    const shouldRenderRole = roleCount === 1 || roleIndex === 1 || person.role.useInitialsNotRole;
    const shouldSpanRows = roleCount > 1 && !person.role.useInitialsNotRole;

    const roleEditHandler = (newValue: string) => {
      let newPerson: Person;

      if (person.role.useInitialsNotRole) {
        newPerson = { ...person, initials: newValue };
      }
      else {
        newPerson = { ...person, role: { ...person.role, name: newValue } };
      }

      onChange(newPerson);
    };

    return (
      <>
        {
          shouldRenderRole && (
            <RoleCell
              rowSpan={shouldSpanRows ? roleCount : undefined}
            >
              <EditableText
                locked={!editable}
                onChange={roleEditHandler}
                value={person.role.useInitialsNotRole ? (person.initials || initialify(person.name)) : person.role.name}
              />
            </RoleCell>
          )
        }

        <PersonCell>
          <EditableText
            locked={!editable}
            onChange={(newName) => onChange({ ...person, name: newName })}
            value={person.name}
          />
        </PersonCell>
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
