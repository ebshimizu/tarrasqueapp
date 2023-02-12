import { Close, GridOn, Link, Palette, Restore, RotateLeft, SquareFoot, Visibility } from '@mui/icons-material';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  ToggleButton,
  Tooltip,
  Typography,
} from '@mui/material';
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
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{ background: 'rgba(0, 0, 0, 0.4)', width: '340px', display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: '1 0 auto',
              background: 'rgba(0, 0, 0, 0.4)',
              gap: 1,
              p: 1,
            }}
          >
            <GridOn />
            <Typography variant="overline">Grid Settings</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider>
            <Typography variant="overline">Cell</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', px: 1, gap: 1 }}>
            <TextField
              label="Width"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              type="number"
            />
            <Tooltip title="Constrain Cell Proportions">
              <IconButton color="primary">
                <Link />
              </IconButton>
            </Tooltip>
            <TextField
              label="Height"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              type="number"
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', px: 1, gap: 1 }}>
            <TextField
              label="Columns"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              type="number"
            />
            <TextField
              label="Rows"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              type="number"
            />
          </Box>
          <Divider>
            <Typography variant="overline">Placement</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', px: 1, gap: 1 }}>
            <TextField
              label="Left Offset"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              type="number"
            />
            <TextField
              label="Top Offset"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              type="number"
            />
          </Box>
          <Divider>
            <Typography variant="overline">Playable Area</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', px: 1, gap: 1 }}>
            <TextField
              label="Pixel Width"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    px
                    <Tooltip title="Reset to Image Width">
                      <IconButton color="primary">
                        <RotateLeft />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              type="number"
            />
            <TextField
              label="Pixel Height"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    px{' '}
                    <Tooltip title="Reset to Image Height">
                      <IconButton color="primary">
                        <RotateLeft />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              type="number"
            />
          </Box>
          <Divider>
            <Typography variant="overline">Measurement</Typography>
          </Divider>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', px: 1 }} spacing={1}>
            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <TextField
                label="Distance"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">ft</InputAdornment>,
                }}
              />
              <Tooltip title="Snap to Grid">
                <IconButton color="primary">
                  <SquareFoot />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="select-diagonals-label">Diagonals</InputLabel>
                <Select id="select-diagonals" labelId="select-diagonals-label" label="Diagonals" variant="outlined">
                  <MenuItem value={'basic'}>5 ft (Basic Rules)</MenuItem>
                  <MenuItem value={'optional'}>5-10-5 ft (Optional Rules)</MenuItem>
                  <MenuItem value={'real'}>7 ft (Real Distance)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider>
            <Typography variant="overline">Style</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', px: 1, pb: 1, gap: 1 }}>
            <TextField
              label="Line Width"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }}
              type="number"
            />
            <Tooltip title="Visible">
              <IconButton color="primary">
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Color">
              <IconButton color="primary">
                <Palette />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Popover>
    </>
  );
});
