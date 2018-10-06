import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from "@material-ui/core/Checkbox" 


Checkbox.propTypes = {
	className: PropTypes.object,
	label: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
}

export default UserEntryCheckbox;