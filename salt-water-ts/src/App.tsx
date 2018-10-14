import { Component, Fragment } from 'react'
import * as React from 'react'

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'

const API_URL: string = "http://localhost:5500/users"

/* Generates a 12 digit hexadecimal string */
function generateID(): string {
  const newID: string = Math.random().toString(16).substring(3)
  return newID
}

interface IUser {
  id: string
  firstName: string
  lastName: string
  password: string
  username: string
  isActive: boolean
  isEntryAdmin: boolean
  isListAdmin: boolean
  isLocationManager: boolean
  isOperatorAdmin: boolean
  isUserAdmin: boolean
}

interface IState {
  editID: string | null
  userData: IUser[]
  
}


class App extends Component<{}, IState>{
  
  /* Refactor later if constructor wont be needed */
  constructor(props: any) {
    super(props)
    this.state = {
      editID: null,
      userData: [],
      
    }
  }

  public async componentDidMount() {
    const localData: IUser[] = await this.getUsers()

    this.setState({
      userData: localData,
    })
  }

  public render() {
    const { userData, editID} = this.state
    return (
      <Fragment>
        <Grid 
          data={ userData.map((user: IUser) =>
            Object.assign({
              inEdit: user.id === editID
            }, user)
          )}
          editField="inEdit"
          onRowClick={this.rowClick}
          onItemChange={this.itemChange}
        >
          <GridToolbar>
            <div onClick={this.closeEdit}>
              <button 
                title="Add new" 
                className="k-button k-primary" 
                onClick={this.addUser}
              >
              Add User
              </button>
            </div>
          </GridToolbar>
          <Column field="firstName" title="First Name" width="200px" />
          <Column field="lastName" title="Last Name" width="200px" />
        </Grid>
      </Fragment>
    );
  }

  /* Not sure if Promise<IUser[]> return type will break my code in some cases */
  private getUsers = async(): Promise<IUser[]> => {
    const request: any = await fetch(API_URL)
    const data: any = await request.json()
    return data
  }

  /* All of these methods need to be refactored to use specific event types */

  private rowClick = (e: any): void => {
    this.setState({
      editID: e.dataItem.id
    })
  }

  private itemChange = (e: any): void => {
    const data: IUser[] = this.state.userData.slice()
    const index: number = data.findIndex( (d: IUser) => d.id === e.dataItem.id )
    
    data[index] = { ...data[index], [e.field]: e.value }
    this.setState({
      userData: data,
    })
  }

  private closeEdit = (e: any): void => {
    if (e.target === e.currentTarget) {
      this.setState({
         editID: null
      })
    }
  }

  /* 
    Currently I will leave this the way it is, in the future we will have to 
    come up with a way to verify that all the fields are correctly entered.
    We can do this either inline (red highlight will prevent user from exiting
    edit mode until all fields are filled) via a Create user form with the same
    criteria. In addition the id generation is only temporary until we start
    getting responses from the production system. 
  */

  private addUser = async(): Promise<void> => {
    const newUser: any = { id: generateID() }
    const data = this.state.userData.slice()

    data.unshift(newUser)
    this.setState({
      editID: newUser.id,
      userData: data,

    })
    /* Have a method that prevents submission until all fields are filled with valid values */
  } 
  
}

export default App;
