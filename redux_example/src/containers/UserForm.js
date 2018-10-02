import React from "react";
import { Field, reduxForm } from "redux-form";

const CreateUserForm = props => {
	const { handleSubmit, pristine, reset, submitting } = props;

	props.initialize({
		isActive: true,
		isListAdmin: false,
		isUserAdmin: false,
		isEntryAdmin: false,
		isLocationManager: false,
		isOperatorAdmin: false
	});

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>First Name</label>
				<div>
					<Field
						name="firstName"
						component="input"
						type="text"
						placeholder="First Name"
					/>
				</div>
			</div>

			<div>
				<label>Last Name</label>
				<div>
					<Field
						name="lastName"
						component="input"
						type="text"
						placeholder="Last Name"
					/>
				</div>
			</div>

			<div>
				<label>Username</label>
				<div>
					<Field
						name="username"
						component="input"
						type="text"
						placeholder="Username"
					/>
				</div>
			</div>

			<div>
				<label>Password</label>
				<div>
					<Field
						name="password"
						component="input"
						type="password"
						placeholder="Password"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="active">Active</label>
				<div>
					<Field
						name="isActive"
						id="isActive"
						component="input"
						type="checkbox"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="list-admin">List Admin</label>
				<div>
					<Field
						name="isListAdmin"
						id="isListAdmin"
						component="input"
						type="checkbox"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="user-admin">User Admin</label>
				<div>
					<Field
						name="isUserAdmin"
						id="isUserAdmin"
						component="input"
						type="checkbox"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="entry-admin">Entry Admin</label>
				<div>
					<Field
						name="isEntryAdmin"
						id="isEntryAdmin"
						component="input"
						type="checkbox"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="location-manager">Location Manager</label>
				<div>
					<Field
						name="isLocationManager"
						id="isLocationManager"
						value="false"
						component="input"
						type="checkbox"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="operator-admin">Operator Admin</label>
				<div>
					<Field
						name="isOperatorAdmin"
						id="isOperatorAdmin"
						component="input"
						type="checkbox"
					/>
				</div>
			</div>

			<div>
				<button type="submit" disabled={pristine || submitting}>
					Submit
				</button>
				<button type="button" disabled={pristine || submitting} onClick={reset}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default reduxForm({
	form: "simple"
})(CreateUserForm);