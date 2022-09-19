import { useCallback, useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import type { TypographyPropsVariantOverrides } from "@mui/material";
import type { OverridableStringUnion } from '@mui/types';
import type { Variant } from "@mui/material/styles/createTypography";
import type { SxProps } from '@mui/system';
import type { KeyboardEvent } from 'react';

interface Props {
  edit?: boolean,
  locked?: boolean,
  onBlur?: () => void,
  onChange: (text: string) => void,
  sx?: SxProps,
  value: string,
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export const EditableText = ({ edit, locked, onBlur, onChange, sx, value, variant }: Props) => {
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
      if (!locked) {
        setLocalValue(value);
        setEditing(true);
      }
    },
    [locked, value]
  );

  useEffect(
    () => {
      if (edit && !locked) {
        beginEditing();
      }
    },
    [edit, locked]
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

  const handleBlur = () => {
    setEditing(false);
    onBlur && onBlur();
  };

  if (!isEditing) {
    return (
      <Typography
        onClick={() => beginEditing()}
        sx={{
          ...sx,
          cursor: locked ? 'normal' : 'pointer',
          fontWeight: 'inherit',
          minHeight: '1em',
          width: '100%'
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
        onBlur={handleBlur}
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
