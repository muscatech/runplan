import { useState } from 'react';

import { IconButton, MenuItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { default as MUIMenu } from '@mui/material/Menu';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

export const Menu = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <MUIMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          'sx': { width: 320, maxWidth: '100%' }
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>New plan</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘N
          </Typography>
        </MenuItem>
      </MUIMenu>
    </div>
  );
}
