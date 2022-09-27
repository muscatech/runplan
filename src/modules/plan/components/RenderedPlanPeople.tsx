import styled from "styled-components";
import { RoleCategory } from "../../roles";
import type { Person } from "../interfaces";
import { RenderedPerson } from "./RenderedPerson";

const PeopleTable = styled.table`

  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  margin-top: ${ props => props.theme.spacing(2) };
  font-family: Arial, sans-serif;

`;

interface Props {
  editable?: boolean,
  people: Person[],
}

export const RenderedPlanPeople = ({ people }: Props) => {

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
          countPerRole[p.role.id] = (countPerRole[p.role.id] || 0) + 1;
        }
      );
    }
  );

  const processedRoles: Record<string, number> = {};

  return (
    <PeopleTable>
      <tbody>
        {
          [...Array(maxPeoplePerCategory)].map(
            (_, idx) => (
              <tr key={idx}>
                {
                  entriesPerCategory.map(
                    ([category, people]) => {
                      const person: Person = people[idx];

                      processedRoles[person?.role.id] = (processedRoles[person?.role.id] || 0) + 1;

                      return (
                        <RenderedPerson
                          key={category}
                          person={person}
                          roleCount={countPerRole[person?.role.id]}
                          roleIndex={processedRoles[person?.role.id]}
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
