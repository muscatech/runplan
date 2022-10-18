import { Box, Checkbox, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import styled from "styled-components";
import type { PlanTime } from "../types";

interface Props {
  setTimeFilter: (filter: number[]) => void,
  timeFilter: number[],
  times: PlanTime[]
}

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.spacing(2)};
`;

export const TimeFilterControl = ({ setTimeFilter, timeFilter, times }: Props) => {

  const serviceTimes = times.filter(t => t.time_type === 'service');

  if (serviceTimes.length === 0) {
    return null;
  }

  const timeMap: Record<number, PlanTime> = Object.fromEntries(times.map(t => [t.id, t]));

  const handleChange = (e: SelectChangeEvent<number[]>) => {
    setTimeFilter(e.target.value as number[]);
  };

  return (
    <Inner>
      <Typography>
        Include roles only from service times:
      </Typography>
      <FormControl
        size='small'
        sx={{ m: 1 }}
      >
        <InputLabel>Service times</InputLabel>
        <Select
          fullWidth
          label='Service times'
          multiple
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={new Date(timeMap[value].starts_at).toTimeString()}
                />
              ))}
            </Box>
          )}
          value={timeFilter}
        >
          {
            times.map(
              t => (
                <MenuItem
                  key={t.id}
                  value={t.id}
                >
                  <Checkbox checked={timeFilter.includes(t.id)} />
                  {new Date(t.starts_at).toTimeString()}
                </MenuItem>
              )
            )
          }

        </Select>
      </FormControl>
    </Inner>
  );
};
