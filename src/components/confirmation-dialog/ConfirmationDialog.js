import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function DraggableDialog(props) {
const  { header, contentText, handleActionButton, handleClose, showDialog } = props;
  return (
    <div>      
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#000000b8", marginBottom: 35 }}>  
              {header}
          </div>
          <DialogContentText style={{color: "rgb(0 0 0 / 72%)"}}>
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleActionButton} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
