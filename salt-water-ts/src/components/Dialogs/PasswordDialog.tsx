import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Input } from '@progress/kendo-react-inputs';

import * as React from 'react'

export default class extends React.Component <any, any>{
	public render() {
		const { newPassword, confirmPassword, handlePasswordInput, togglePasswordModal, savePassword, passwordValid} = this.props
	return (
		<Dialog title="Change Password" onClose={togglePasswordModal}>
			<form >
				<div style={{ marginBottom: '1rem' }}>

					<label>
						New Password<br />
						<Input type="text" name="newPassword"
							value={newPassword} onChange={handlePasswordInput}
						/>
					</label>
					<br />
					<label>
						Confirm Password <br />
						<Input type="text" name="confirmPassword"
							value={confirmPassword} onChange={handlePasswordInput}
						/>
					</label>
				</div>
			</form>

			<DialogActionsBar>
				<button className="k-button" onClick={togglePasswordModal}>
					Cancel
				</button>
				<button className="k-button k-primary" onClick={savePassword}
					disabled={!passwordValid()}
				>
					Save
				</button>
			</DialogActionsBar>

		</Dialog>
		)
	}
}