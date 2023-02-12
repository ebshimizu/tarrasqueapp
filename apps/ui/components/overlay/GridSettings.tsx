import { GridOn } from '@mui/icons-material';
import { Popover, ToggleButton, Tooltip, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

export const GridSettings: React.FC = observer(() => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'grid-settings-popover' : undefined;

  return (
    <>
      <Tooltip title="Grid Settings" placement="left">
        <ToggleButton value="grid-settings" size="small" onClick={handleClick}>
          <GridOn />
        </ToggleButton>
      </Tooltip>
      <Popover
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Hi Im a settings popover eventually</Typography>
      </Popover>
    </>
  );
});
