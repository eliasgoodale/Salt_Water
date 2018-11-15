import React from 'react'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'


class Inspector extends React.Component {
    
    render () {
        const { selected } = this.props;
        const keys = Object.keys(selected);
        const fields = keys.map(key => {
            console.log(key)
            return <TextField type="" id={key} label={key} />
        })
        const test = () => <TextField/>
        console.log(selected, keys, fields, test())
        return (
            <React.Fragment>
            <form >
            {fields}
            </form>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        selected: state.inspector.selected,
    }
  }


  export default connect(mapStateToProps)(Inspector);

  
