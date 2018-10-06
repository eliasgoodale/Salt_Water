import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function CrudButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="raised" color="primary" className={classes.button}>
        Create
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Delete
      </Button>
      <Button variant="contained" color="secondary" disabled className={classes.button}>
        Update
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      </div>
  );
}

CrudButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrudButtons);