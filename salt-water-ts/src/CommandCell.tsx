import * as React from 'react'
import { GridCell } from '@progress/kendo-react-grid'

/* Add password change modal. Add remove functionality */


export default function CommandCell(remove: any, changePassword: any, editID: string) {
	return class extends GridCell {
		render() {
			return (
				<td>
					<button
						className="k-primary k-button k-grid-remove-command"
						onClick={ (e: any) => remove(editID) }

					>
					Remove
					</button>
					<button
						className="k-button k-grid-edit-command"
						onClick={(e: any) => changePassword(editID) }
					>
						Change Password
					</button>
				</td>
			)
		}
	}
}