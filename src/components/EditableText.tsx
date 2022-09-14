import { useCallback, useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import type { TypographyPropsVariantOverrides } from "@mui/material";
import type { OverridableStringUnion } from '@mui/types';
import type { Variant } from "@mui/material/styles/createTypography";
import type { SxProps } from '@mui/system';
import type { KeyboardEvent } from 'react';

interface Props {
  onChange: (text: string) => void,
  sx?: SxProps,
  value: string,
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export const EditableText = ({ onChange, sx, value, variant }: Props) => {
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
    []
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
        onBlur={() => setEditing(false)}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyUp={handleKeypress}
        sx={sx}
        value={localValue}
      />
    );
  }

};
