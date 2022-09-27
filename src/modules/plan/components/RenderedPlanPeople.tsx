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

  return (
    <PeopleTable>
      <tbody>
        {
          [...Array(maxPeoplePerCategory)].map(
            (_, idx) => (
              <tr key={idx}>
                {
                  entriesPerCategory.map(
                    ([category, people]) => (
                      <RenderedPerson
                        key={category}
                        person={people[idx]}
                      />
                    )
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
