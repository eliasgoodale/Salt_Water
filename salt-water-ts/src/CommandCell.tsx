import { GridCell } from '@progress/kendo-react-grid';
import * as React from 'react';

export default function cellWithEditing(togglePasswordModal: any, reactivateUser: any) {
	return class extends GridCell {
		public render() {
			const { dataItem } = this.props
			return (
				dataItem.isActive && dataItem.inEdit ? 
				<td>
					<button
						className="k-primary k-button k-grid-edit-command"
						onClick={togglePasswordModal}
					>
						Change Password
          </button>
				</td> : 
				!dataItem.isActive && dataItem.inEdit ?
				<td>
					<button
							className="k-primary k-button k-grid-edit-command"
							onClick={reactivateUser}
					>
						Reactivate User
					</button>
				</td>: <td/>
			);
		}
	};
}