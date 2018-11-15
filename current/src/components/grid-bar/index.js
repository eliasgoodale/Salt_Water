import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import React, { useState } from 'react'
import { Grid as MaterialGrid, Paper } from '@material-ui/core'
import  Inspector  from '../inspector'


const styles = theme => ({

  grid: {
    flexGrow: 1
  },
  paper: {
    maxHeight: 50,
    maxWidth: 60,
		},
})



export const GridContainer = (props) => {
    return (
      <MaterialGrid container >
        <MaterialGrid item lg>
          <Paper >
          {props.children}
          </Paper>
        </MaterialGrid>
        <MaterialGrid item sm>
          <Paper >
            <Inspector/>
          </Paper>
          </MaterialGrid>
      </MaterialGrid>
    );
}

export const GridBar = (props) => {
    const [value, setValue] = useState(0);

    function handleTabSwitch(event, value) {
      setValue(value);
    }
  
    const { grids } = props;
    return (
      <React.Fragment>

          <AppBar position="static">
    
            <Tabs value={value} onChange={handleTabSwitch}>
              {grids.map((grid) => {
                const { id } = grid.props
                return <Tab key={`${id}-grid-tab`} label={id}/>
              })}
            </Tabs>
          </AppBar>
     
        {
          <GridContainer>
            {grids[value]}
          </GridContainer>
        }
 
    </React.Fragment>
    )
  }