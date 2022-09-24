import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { TextField, Typography } from "@mui/material";
import type { TypographyPropsVariantOverrides } from "@mui/material";
import type { OverridableStringUnion } from '@mui/types';
import type { Variant } from "@mui/material/styles/createTypography";
import type { SxProps } from '@mui/system';

export interface EditableTextProps {
  edit?: boolean,
  locked?: boolean,
  formatValue?: (v: any) => string,
  onChange: (value: string | number | null) => void,
  renderEditable?: (props: RenderEditableProps) => JSX.Element,
  sx?: SxProps,
  value: string | number | null,
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export interface RenderEditableProps {
  onBlur: () => void,
  onChange: (e: string | number | null, close?: boolean) => void,
  onFocus: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void,
  onKeyUp: (e: KeyboardEvent) => void,
  sx?: SxProps,
  value: any
}

const defaultRenderEditable = ({ onBlur, onChange, onFocus, onKeyUp, sx, value }: RenderEditableProps): JSX.Element => (
  <TextField
    autoFocus
    inputProps={{
      style: {
        fontWeight: 'inherit',
        padding: '2px 8px'
      }
    }}
    margin='none'
    onBlur={onBlur}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    onFocus={onFocus}
    onKeyUp={onKeyUp}
    size='small'
    sx={sx}
    value={value}
  />
);

export const EditableText = ({ edit, formatValue=(v) => v, locked, onChange, renderEditable=defaultRenderEditable, sx, value, variant }: EditableTextProps) => {
  const [isEditing, setEditing] = useState(false);

  const [localValue, setLocalValue] = useState<string | number | null>(value);

  useEffect(
    () => {
      if (!isEditing) {
        setLocalValue(value);
      }
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
    onChange(localValue);
    setEditing(false);
  };

  const handleChange = (newValue: any, close=false) => {
    if (close) {
      onChange(newValue);
      setEditing(false);
    }
    else {
      setLocalValue(newValue);
    }
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
        {formatValue(value)}
      </Typography>
    );
  }
  else {
    return renderEditable({
      onBlur: handleBlur,
      onChange: (e: string | number | null, close?: boolean) => handleChange(e, close),
      onFocus: (e) => e.target.select(),
      onKeyUp: handleKeypress,
      sx,
      value: localValue
    });
  }

};
