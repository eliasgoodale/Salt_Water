import React from 'react';
import PropTypes from 'prop-types';

const UserEntryCheckbox = ({ className, label, checked=false, onChange }) => (
	<input type={type} label={label} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
	className: PropTypes.object,
	label: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
}

export default UserEntryCheckbox;