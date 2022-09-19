import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IconButton, MenuItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { default as MUIMenu } from '@mui/material/Menu';

import { actions } from '../../dialogs';
import { Add, Menu as MenuIcon, Print } from '@mui/icons-material';

export const Menu = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const newPlan = useCallback(
    () => {
      dispatch(actions.show('newPlan'));
      handleClose();
    },
    []
  );

  const sendPrintMessage = useCallback(
    () => {
      window.postMessage({
        type: 'RUNPLAN_PRINT'
      }, '*');
      handleClose();
    },
    []
  );

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        aria-label="menu"
        color="inherit"
        edge="start"
        id="basic-button"
        onClick={handleClick}
        size="large"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <MUIMenu
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          'sx': { width: 320, maxWidth: '100%' }
        }}
        anchorEl={anchorEl}
        id="basic-menu"
        onClose={handleClose}
        open={open}
      >
        <MenuItem onClick={newPlan}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          <ListItemText>New plan</ListItemText>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            ⌘N
          </Typography>
        </MenuItem>
        <MenuItem onClick={sendPrintMessage}>
          <ListItemIcon>
            <Print fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print plan</ListItemText>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            ⌘P
          </Typography>
        </MenuItem>
      </MUIMenu>
    </div>
  );
};
