import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { TextField, Typography } from "@mui/material";
import type { TypographyPropsVariantOverrides } from "@mui/material";
import type { OverridableStringUnion } from '@mui/types';
import type { Variant } from "@mui/material/styles/createTypography";
import type { SxProps } from '@mui/system';

export interface EditableProps<Type> {
  edit?: boolean,
  locked?: boolean,
  formatValue?: (v: Type) => string,
  onChange: (value: Type) => void,
  renderEditable: (props: RenderEditableProps<Type>) => JSX.Element,
  sx?: SxProps,
  value: Type,
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export interface RenderEditableProps<Type> {
  onBlur: () => void,
  onChange: (e: Type, close?: boolean) => void,
  onFocus: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void,
  onKeyUp: (e: KeyboardEvent) => void,
  sx?: SxProps,
  value: Type
}

export const Editable = <Type,>({ edit, formatValue=(v) => String(v), locked, onChange, renderEditable, sx, value, variant }: EditableProps<Type>) => {
  const [isEditing, setEditing] = useState(false);

  const [localValue, setLocalValue] = useState<Type>(value);

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

  const handleChange = (newValue: Type, close=false) => {
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
      onChange: (e: Type, close?: boolean) => handleChange(e, close),
      onFocus: (e) => e.target.select(),
      onKeyUp: handleKeypress,
      sx,
      value: localValue
    });
  }

};

const renderEditableText = ({ onBlur, onChange, onFocus, onKeyUp, sx, value }: RenderEditableProps<string>): JSX.Element => (
  <TextField
    autoFocus
    inputProps={{
      style: {
        fontSize: 'inherit',
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

export const EditableText = (props: Omit<EditableProps<string>, 'renderEditable'>) => {
  const StringEditable = Editable<string>;
  return (
    <StringEditable
      renderEditable={renderEditableText}
      {...props}
    />
  );
};
