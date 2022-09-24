import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { EditableText, EditableTextProps } from "./EditableText";
import type { RenderEditableProps } from "./EditableText";
import { TextField } from '@mui/material';

const renderEditable = ({ onChange, onFocus, onKeyUp, sx, value }: RenderEditableProps): JSX.Element => (
  <DesktopDatePicker
    inputFormat="YYYY-MM-DD"
    label="Plan date (optional)"
    onAccept={(newDate) => { onChange(newDate?.unix() || null, true); }}
    onChange={(newDate) => onChange(newDate?.unix() || null)}
    open
    renderInput={
      (params) => (
        <TextField
          autoFocus
          inputProps={{
            style: {
              fontWeight: 'inherit',
              padding: '2px 8px'
            }
          }}
          margin='none'
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          size='small'
          sx={sx}
          {...params}
        />
      )
    }
    value={dayjs(value * 1000)}
  />

);

interface EditableDateProps extends Omit<EditableTextProps, 'value'> {
  dateFormat?: string,
  value: Dayjs | undefined
}

export const EditableDate = ({ dateFormat='YYYY-MM-DD', value, ...props }: EditableDateProps) => {
  return (
    <EditableText
      formatValue={(v: number | undefined) => v ? dayjs(v * 1000).format(dateFormat) : '(No date)'}
      renderEditable={renderEditable}
      value={value?.unix() || null}
      {...props}
    />
  );
};
