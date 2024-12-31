import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export const dataMapping = {
  earlyBird: 'Early Bird',
  general: 'General',
  startup: 'Startup',
  vip: 'Vip',
  standard: 'Standard',
  speaker: 'Speaker',
};

export default function TicketTableRow({ row, selected, onSelectRow, onDeleteRow, onViewDetails }) {
  const {
    event: { name },
    type,
    category,
    price,
    title,
    isActive,
  } = row;

  const confirm = useBoolean();
  const popover = usePopover();

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // const title = `${type} - ${category} (${name})`;

  const handleViewDetails = () => {
    setSelectedTicket(row);
    setDetailsDialogOpen(true);
    if (onViewDetails) {
      onViewDetails(row);
    }
  };

  // Define the color based on the status
  const getStatusColor = (item) => {
    if (item) {
      return 'success';
    }
    return 'error';
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{title}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dataMapping[type]}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dataMapping[category]}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>RM {price.toFixed(2)}</TableCell>

        <TableCell>
          <Label variant="soft" color={getStatusColor(isActive)}>
            {isActive ? 'Active' : 'Inactive'}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="View Details" placement="top" arrow>
            <IconButton onClick={handleViewDetails}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)}>
        <DialogTitle>
          <Typography variant="h4">Ticket Details</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            value={selectedTicket?.event?.name}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            value={selectedTicket?.type}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={selectedTicket?.category}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={`RM ${selectedTicket?.price.toFixed(2)}`}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            value={selectedTicket?.isActive ? 'Active' : 'Inactive'}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={`Are you sure want to delete ${title}?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

TicketTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  onViewDetails: PropTypes.func,
};