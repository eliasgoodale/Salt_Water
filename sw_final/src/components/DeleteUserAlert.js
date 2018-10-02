import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteUserAlert extends React.Component {

	render() {
		const {confirmAction, numSelected, open, close} = this.props
		return (
			<div>
				<Dialog
					open={open}
					onClose={close}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Deactivate Users"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you would like to deactivate {numSelected} users?
            </DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={close} color="primary">
							Cancel
            </Button>
						<Button onClick={confirmAction} color="primary" autoFocus>
							Confirm
            </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default DeleteUserAlert;