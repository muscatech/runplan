import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import styled from "styled-components";
import { RoleCategory } from "../../roles";
import type { Team, TeamCategoryMapping } from "../types";

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.spacing(2)};
`;

interface MappingProps {
  label?: string,
  onChange: (newRunplanCategory: RoleCategory) => void,
  runplanCategory: RoleCategory | undefined,
}

const Mapping = ({ label, runplanCategory, onChange }: MappingProps) => {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as RoleCategory);
  };

  return (
    <FormControl
      size='small'
      sx={{ m: 1 }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth
        label={label}
        onChange={handleChange}
        value={runplanCategory || 'ignore'}
      >
        <MenuItem
          value='ignore'
        >
          (Ignore)
        </MenuItem>
        {
          Object.entries(RoleCategory).map(
            ([k, v]) => (
              <MenuItem
                key={k}
                value={v}
              >
                {k}
              </MenuItem>
            )
          )
        }

      </Select>
    </FormControl>
  );

};

interface Props {
  teams?: Team[],
  mapping: TeamCategoryMapping,
  setMapping: (mapping: TeamCategoryMapping) => void
}

export const TeamMappingControl = ({ mapping, setMapping, teams }: Props) => {

  return (
    <Inner>
      <Typography>
        Map Planning Center teams to:
      </Typography>
      {
        teams?.map(
          team => (
            <Mapping
              key={team.id}
              label={team.name}
              onChange={(newCategory) => setMapping({ ...mapping, [team.id]: newCategory })}
              runplanCategory={mapping[team.id]}
            />
          )
        )
      }
    </Inner>
  );
};
