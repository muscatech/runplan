import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { allItemTypes } from "../../itemTypes/selectors";
import { ItemType as RunplanItemType } from "../../itemTypes";
import { ItemType, ItemTypeMapping } from "../types";
import styled from "styled-components";

interface MappingProps {
  label?: string,
  onChange: (newRunplanType: string) => void,
  runplanType: string | undefined,
}

const Mapping = ({ label, runplanType, onChange }: MappingProps) => {

  const allTypes: RunplanItemType[] = Object.values(allItemTypes());

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth
        label={label}
        onChange={handleChange}
        value={runplanType || 'ignore'}
      >
        <MenuItem
          value='ignore'
        >
          (Ignore)
        </MenuItem>
        {
          allTypes.map(
            t => (
              <MenuItem
                key={t.id}
                value={t.id}
              >
                {t.name}
              </MenuItem>
            )
          )
        }

      </Select>
    </FormControl>
  );

};

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  mapping: ItemTypeMapping,
  setMapping: (mapping: ItemTypeMapping) => void
}

export const ItemMappingControl = ({ mapping, setMapping }: Props) => {
  return (
    <Inner>
      <Typography>
        Map Planning Center item types to:
      </Typography>
      {
        Object.entries(ItemType).map(
          ([name, value]) => (
            <Mapping
              key={value}
              label={name}
              onChange={(newRPT) => setMapping({ ...mapping, [value]: newRPT })}
              runplanType={mapping[value]}
            />
          )
        )
      }
    </Inner>
  );
};
