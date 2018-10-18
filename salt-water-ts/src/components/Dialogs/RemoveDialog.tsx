import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'

import * as React from 'react'

export default class extends React.Component<any, any>{
	public render() {
		const { toggleRemoveAlert, remove } = this.props
		return (
			<Dialog
				title="Remove User?"
				onClose={toggleRemoveAlert}
			>
				<label>
					Are you sure you want to delete this user? <br />
				</label>
				<DialogActionsBar>
					<button
						className="k-button"
						onClick={toggleRemoveAlert}
					>
						Cancel
                        </button>
					<button
						className="k-button k-primary"
						onClick={remove}
					>
						Confirm
            </button>
				</DialogActionsBar>
			</Dialog>
		)
	}
}