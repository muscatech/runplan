import styled from "styled-components";
import { RoleCategory } from "../../roles";
import type { Person } from "../interfaces";
import { RenderedPerson } from "./RenderedPerson";

const PeopleTable = styled.table`

  width: 100%;
  border-collapse: collapse;

  margin-top: ${ props => props.theme.spacing(2) };
  font-family: Arial, sans-serif;
  font-size: small;

  & > td {
    vertical-align: top;
  }

`;

interface Props {
  editable?: boolean,
  onUpdate: (p: Person) => void,
  people: Person[],
}

export const RenderedPlanPeople = ({ editable, onUpdate, people }: Props) => {

  const peopleByCategory = people.reduce<Record<string, Person[]>>(
    (groups, person) => {
      if (!groups[person.role.category]) {
        groups[person.role.category] = [];
      }
      groups[person.role.category].push(person);
      return groups;
    },
    Object.fromEntries(
      // Ensure "talent" category comes first by using ordering of RoleCategory
      Object.values(RoleCategory).map(c => [c, []])
    )
  );

  const entriesPerCategory = Object.entries(peopleByCategory);

  const maxPeoplePerCategory = Object.values(peopleByCategory).reduce<number>(
    (prev, cat) => Math.max(prev, cat.length),
    0
  );

  const countPerRole: Record<string, number> = {};

  Object.values(peopleByCategory).forEach(
    people => {
      people.sort(
        (a, b) => a.role.name.localeCompare(b.role.name)
      );

      people.forEach(
        p => {
          countPerRole[p.role.name] = (countPerRole[p.role.name] || 0) + 1;
        }
      );
    }
  );

  const processedRoles: Record<string, number> = {};

  return (
    <PeopleTable>
      <colgroup>
        <col style={{ width: '5em' }} />
      </colgroup>
      <tbody>
        {
          [...Array(maxPeoplePerCategory)].map(
            (_, idx) => (
              <tr key={idx}>
                {
                  entriesPerCategory.map(
                    ([category, people]) => {
                      const person: Person = people[idx];

                      processedRoles[person?.role.name] = (processedRoles[person?.role.name] || 0) + 1;

                      return (
                        <RenderedPerson
                          editable={editable}
                          key={category}
                          onChange={onUpdate}
                          person={person}
                          roleCount={countPerRole[person?.role.name]}
                          roleIndex={processedRoles[person?.role.name]}
                        />
                      );
                    }
                  )
                }
              </tr>
            )
          )
        }
      </tbody>
    </PeopleTable>
  );

};
