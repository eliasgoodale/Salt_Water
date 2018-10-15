import { Component, Fragment } from 'react'
import * as React from 'react'

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'

import '@progress/kendo-theme-default/dist/all.css'

// import jsonpatch from 'fast-json-patch'

const API_URL: string = "http://localhost:5500/users"

/* Generates a 12 digit hexadecimal string */
function generateID(): string {
  const newID: string = Math.random().toString(16).substring(3)
  return newID
}

interface IUser {
  id?: string 
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

const blankData: IUser = {
  id: "temp",
  firstName:"",
  lastName: "",
  password: "",
  username: "",
  isActive: true,
  isEntryAdmin: false,
  isListAdmin: false,
  isLocationManager: false,
  isOperatorAdmin: false,
  isUserAdmin: false, 
}

interface IState {
  editID: string | null
  tableData: any
  userData: any
}


class App extends Component<{}, IState>{
  
  /* Refactor later if constructor wont be needed */
  constructor(props: any) {
    super(props)
    this.state = {
      editID: null,
      tableData: [],
      userData: [],
      
    }
  }

  public async componentDidMount() {
    const localData: IUser[] = await this.getUsers()

    this.setState({
      tableData: localData,
      userData: localData,
    })
  }

  public render() {
    const { tableData, editID} = this.state
    return (
      <Fragment>
        <Grid
          style={{ height: '500px'}}
          data={ tableData.map((user: IUser) =>
            Object.assign({
              inEdit: user.id === editID
            }, user)
          )}
          editField="inEdit"
          onRowClick={this.rowClick}
          onItemChange={this.itemChange}
        >

          <GridToolbar>
            <div>
              <button 
                title="Add new" 
                className="k-button k-primary" 
                onClick={this.enterInsert}
              >
              Add User
              </button>
              <button 
                className="k-button k-primary" 
                disabled={editID === null || !this.validSubmission(editID)}
            //    onClick={this.save}
              >
                Save
              </button>
              <button
                className="k-button k-primary"
                disabled={editID === null}
                onClick={this.cancel}
              > 
                Cancel
                </button>
            </div>
          </GridToolbar>

          <Column field="firstName" title="First Name" width="200px" />
          <Column field="lastName" title="Last Name" width="200px" />
          <Column field="username" title="Username" width="200px" />
          <Column field="isEntryAdmin" title="Entry Admin" editor="boolean" />
          <Column field="isListAdmin" title="List Admin" editor="boolean" />
          <Column field="isLocationManager" title="Location Manager" editor="boolean" />
          <Column field="isOperatorAdmin" title="Operator Admin" editor="boolean" />
          <Column field="isUserAdmin" title="User Admin" editor="boolean" />

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
/*
  private patchUser = async(updateUser: IUser): Promise<void> => {
    const targetUser: IUser = this.state.userData.find( (u: any) => u.id === updateUser.id)
    const diff: any = jsonpatch.compare(targetUser, updateUser)
    
    const settings: any = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diff)
    }
    const response: any = await fetch(`${API_URL}/${targetUser.id}`)
    const json: any = await response.json()
    
  }

  private postUser = async(newUser: IUser): Promise<void> => {
    const settings: any = {
      methods: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }
    const response: any = await fetch(API_URL, settings)
    const json: any = await response.json()
    
  }
  */
  private validSubmission = (id: string): boolean => {
    
    /* Add form validation */
    return true
  }

  /* All of these methods need to be refactored to use specific event types */

  private rowClick = (e: any): void => {
    this.setState({
      editID: e.dataItem.id
    })
  }

  private itemChange = (e: any): void => {
    const editData: any = this.state.tableData.slice()
    const index: number = editData.findIndex((u: any) => u.id === e.dataItem.id)

    editData[index] = { ...editData[index], [e.field]: e.value }
    this.setState({
      tableData: editData,
    })
  }

  private enterInsert = (): void => {
    const newUser: any = { ...blankData }
    const newData: any = this.state.tableData.slice()

    newData.unshift(newUser)
    this.update(newData, newUser, false)
    this.setState({
      editID: newUser.id, 
      tableData: newData
    })
  }

  // private enterEdit = (selectedUser: any): void => {
  //   this.update(this.state.tableData, selectedUser, false).inEdit = true;
  //   this.setState({
  //     tableData: this.state.tableData.slice()
  //   })
  // }
/*
  private save = (): void => {
    const selectedUser: IUser = this.state.tableData.find( (u: any) => u.id === this.state.editID)

    if(editID === "temp")
      this.postUser(selectedUser)
    else
      this.patchUser(selectedUser)

    selectedUser.id = this.update(this.state.tableData, selectedUser, false).id
    this.setState({
      tableData: this.state.tableData.slice()
    })
  }
*/
  private cancel = (): void => {
    const { editID } = this.state
    const newTableData: any = this.state.tableData.slice()
    const selectedIndex: number = this.state.tableData.findIndex( (u: any) => u.id === editID)

    if(editID === "temp") {
      newTableData.splice(selectedIndex, 1)
    } else {
      const originalUser: IUser = this.state.userData.find( (u: any) => u.id === editID )
      newTableData[selectedIndex] = Object.assign({}, originalUser) 
    }
    console.log(newTableData[selectedIndex])
    this.setState({
      editID: null,
      tableData: newTableData
    })
  }

  // private remove = (selectedUser: any): void => {
  //   selectedUser.inEdit = undefined
  //   this.update(this.state.tableData, selectedUser, true)
  //   this.setState({
  //     tableData: this.state.tableData.slice()
  //   })
  // }

  private update = (data: any, user: any, remove: boolean): any => {
    let updated: any
    let index: number = data.findIndex( (u: any) => u === user || (u.id && u.id === user.id))
    if (index >= 0) {
      updated = {...user}
      data[index] = updated
    } else {
      /* Temporary ID generation */
      const newID: string = generateID()
      updated =  {...user,  id: newID }
      data.unshift(updated)

      index = 0
    }
    if (remove) {
      data = data.splice(index, 1);
    }
    return data[index]
  }
}

export default App;
