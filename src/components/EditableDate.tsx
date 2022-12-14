import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { Editable } from "./EditableText";
import type { EditableProps, RenderEditableProps } from "./EditableText";
import { TextField } from '@mui/material';

const renderEditable = ({ onBlur, onChange, onFocus, onKeyUp, sx, value }: RenderEditableProps<number | null>): JSX.Element => (
  <DesktopDatePicker
    inputFormat="YYYY-MM-DD"
    label="Plan date (optional)"
    onAccept={(newDate) => { onChange(newDate?.unix() || null, true); }}
    onChange={(newDate) => onChange(newDate?.unix() || null)}
    onClose={onBlur}
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
    value={value ? dayjs(value * 1000) : null}
  />

);

interface EditableDateProps extends Omit<EditableProps<number | null>, 'value' | 'renderEditable'> {
  dateFormat?: string,
  value: Dayjs | undefined
}

export const EditableDate = ({ dateFormat='YYYY-MM-DD', locked, value, ...props }: EditableDateProps): JSX.Element | null => {
  const NumberEditable = Editable<number | null>;
  if (!locked || value) {
    return (
      <NumberEditable
        formatValue={(v: number | null) => v ? dayjs(v * 1000).format(dateFormat) : '(No date)'}
        locked={locked}
        renderEditable={renderEditable}
        value={value?.unix() || null}
        {...props}
      />
    );
  }
  return null;
};
