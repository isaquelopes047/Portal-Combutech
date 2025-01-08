import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

export default function OptionsButton({ children, titleOption }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ 
        marginLeft: '-10px', 
        marginBottom: '20px',
        border: '1px solid #ececec',
        borderRadius: '6px',
    }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {titleOption}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { children }
      </Menu>
    </div>
  );
}