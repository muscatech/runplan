import { useCallback, useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import type { TypographyPropsVariantOverrides } from "@mui/material";
import type { OverridableStringUnion } from '@mui/types';
import type { Variant } from "@mui/material/styles/createTypography";
import type { SxProps } from '@mui/system';
import type { KeyboardEvent } from 'react';

interface Props {
  edit?: boolean,
  onChange: (text: string) => void,
  sx?: SxProps,
  value: string,
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export const EditableText = ({ edit, onChange, sx, value, variant }: Props) => {
  const [isEditing, setEditing] = useState(false);

  const [localValue, setLocalValue] = useState(value);

  useEffect(
    () => {
      setLocalValue(value);
    },
    [value]
  );

  const beginEditing = useCallback(
    () => {
      setLocalValue(value);
      setEditing(true);
    },
    [value]
  );

  useEffect(
    () => {
      if (edit) {
        beginEditing();
      }
    },
    [edit]
  );

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setLocalValue(value);
      setEditing(false);
    }
    else if (e.key === 'Enter') {
      onChange(localValue);
      setEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Typography
        onClick={() => beginEditing()}
        sx={{
          ...sx,
          cursor: 'pointer'
        }}
        variant={variant}
      >
        {value}
      </Typography>
    );
  }
  else {
    return (
      <TextField
        autoFocus
        fullWidth
        margin='none'
        onBlur={() => setEditing(false)}
        onChange={(e) => setLocalValue(e.target.value)}
        onFocus={(e) => e.target.select()}
        onKeyUp={handleKeypress}
        size='small'
        sx={sx}
        value={localValue}
      />
    );
  }

};
