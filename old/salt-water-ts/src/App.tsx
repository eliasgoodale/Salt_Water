/* React */
import { Component, Fragment } from 'react'
import * as React from 'react'

/* Kendo */
import { orderBy } from '@progress/kendo-data-query'
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import '@progress/kendo-theme-default/dist/all.css'

/* Helper Modules*/
import * as jsonpatch from 'fast-json-patch'
import * as Joi from 'joi'

/* Component */
import { CheckboxCell, CommandCell } from './components/CustomCells'

import { PasswordDialog, RemoveDialog } from './components/Dialogs'

/* Utilities */
import {blankData, generateID, IState, IUser, userSchema} from './utils'

const API_URL: string = "http://localhost:5500/users"

export default class App extends Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      editID: null,
      tableData: [],
      userData: [],
      passwordModalOpen: false,
      showInactive: false,
      removeAlertOpen: false,
      lockEdit: false,
      sort: [{ field: 'username', dir: 'asc' }],
      newPassword: "",
      confirmPassword: "",
    }
  }

  public async componentDidMount() {
    const localData: IUser[] = await this.getUsers()

    this.setState({
      tableData: localData.slice(),
      userData: localData.slice(),
    })
  }

  public render() {
    const { tableData, editID, showInactive, lockEdit } = this.state
    const filterData = showInactive ?
      tableData.filter((u: any) => !u.isActive) :
      tableData.filter((u: any) => u.isActive)

    return (
      <Fragment>
        <Grid

          style={{ height: '500px' }}
          data={orderBy(filterData.map((user: IUser) =>
            Object.assign({
              inEdit: user.id === editID
            }, user)), this.state.sort)
          }
          editField="inEdit"
          onRowClick={this.rowClick}
          onItemChange={this.userChange}
          reorderable={true}
          sortable={true}
          sort={this.state.sort}
          onSortChange={(e) => {
            this.setState({
              sort: e.sort
            })
          }}
        >
          <GridToolbar>
            <div>

              <button
                title="Add new"
                className="k-button k-primary"
                onClick={this.enterInsert}
                disabled={editID !== null}
              >
                Add User
              </button>

              <button
                className="k-button k-primary"
                disabled={editID === null || !this.validSubmission()}
                onClick={this.save}
              >
                Save
              </button>

              <button
                className="k-primary k-button k-grid-remove-command"
                onClick={this.toggleRemoveAlert}
                disabled={!editID || lockEdit}
              >
                Delete
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
          <Column field="username" title="Username" width="200px" />
          <Column field="firstName" title="First Name" width="200px" />
          <Column field="lastName" title="Last Name" width="200px" />
          <Column field="isEntryAdmin" title="Entry Admin" editor="boolean"
            cell={(props) => <CheckboxCell {...props} />} />
          <Column field="isListAdmin" title="List Admin" editor="boolean"
            cell={(props) => <CheckboxCell {...props} />} />
          <Column field="isLocationManager" title="Location Manager" editor="boolean"
            cell={(props) => <CheckboxCell {...props} />} />
          <Column field="isOperatorAdmin" title="Operator Admin" editor="boolean"
            cell={(props) => <CheckboxCell {...props} />} />
          <Column field="isUserAdmin" title="User Admin" editor="boolean"
            cell={(props) => <CheckboxCell {...props} />} />
          <Column sortable={false}
            cell={CommandCell(this.togglePasswordModal, this.reactivateUser)}
            width="150px"
          />
        </Grid>
     
        { this.state.passwordModalOpen && 
          <PasswordDialog
            newPassword={this.state.newPassword}
            confirmPassword={this.state.confirmPassword}
            handlePasswordInput={this.handlePasswordInput}
            togglePasswordModal={this.togglePasswordModal}
            savePassword={this.savePassword}
            passwordValid={this.passwordValid}

          />
        }

        { this.state.removeAlertOpen && 
          <RemoveDialog
            toggleRemoveAlert={this.toggleRemoveAlert}
            remove={this.remove}
          />
        }
        <button
          className="k-button k-primary "
          onClick={this.toggleInactiveUsers}
        >
          {showInactive ? "Show Active" : "Show Inactive"}
        </button>
      </Fragment>
    );
  }

  private handlePasswordInput = (e: any): void => {
    const name: any = e.target.name
    const value: string = e.target.value
    if (name === 'newPassword') {
      this.setState({ newPassword: value })
    } else if (name === 'confirmPassword') {
      this.setState({ confirmPassword: value })
    }
  }

  private passwordValid = (): boolean => {
    const { newPassword, confirmPassword } = this.state
    const passwordSchema: any = Joi.string().min(6).max(25)
    if (newPassword === confirmPassword) {
      const result: any = Joi.validate(confirmPassword, passwordSchema)
      return !result.error ? true : false
    }
    return false
  }
  private savePassword = (): void => {
    const newTableData: any = this.state.tableData.slice()
    const index: number = newTableData.findIndex((u: any) => u.id === this.state.editID)
    newTableData[index] = { ...newTableData[index], password: this.state.confirmPassword }
    this.togglePasswordModal()
    this.setState({
      tableData: newTableData
    })
  }

  private userChange = (e: any): void => {
    const editData: any = this.state.tableData.slice()
    const index: number = editData.findIndex((u: any) => u.id === e.dataItem.id)

    editData[index] = { ...editData[index], [e.field]: e.value }
    this.setState({
      tableData: editData,
      
    })
  }

  private reactivateUser = (): void => {
    const newTableData = this.state.tableData.slice()
    const index: number = newTableData.findIndex((u: any) => u.id === this.state.editID)
    newTableData[index].isActive = true
    this.setState({
      editID: null,
      tableData: newTableData,
    })
  }

  private clearPassword = (): void => {
    this.setState({
      newPassword: "",
      confirmPassword: ""
    })
  }

  private togglePasswordModal = (): void => {
    this.clearPassword()
    this.setState({
      passwordModalOpen: !this.state.passwordModalOpen
    })
  }

  private toggleRemoveAlert = (): void => {
    this.setState({
      removeAlertOpen: !this.state.removeAlertOpen
    })
  }

  private toggleInactiveUsers = (): void => {
    this.setState({
      showInactive: !this.state.showInactive
    })
  }

  /* Not sure if Promise<IUser[]> return type will break my code in some cases */
  private getUsers = async (): Promise<IUser[]> => {
    const request: any = await fetch(API_URL)
    const data: any = await request.json()
    return data
  }


  private patchUser = async (updateUser: IUser, originalUser: IUser): Promise<void> => {

    const diff: any = jsonpatch.compare(originalUser, updateUser)
    console.log(`PATCH payload:\n`)
    console.table(diff)

    // const settings: any = {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(diff)
    // }
    // const response: any = await fetch(`${API_URL}/${originalUser.id}`)
    // const json: any = await response.json()

  }

  private postUser = async (newUser: IUser): Promise<void> => {
    console.log(`POST payload:\n`)
    delete newUser.id
    console.table(newUser)

    // const settings: any = {
    //   methods: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newUser),
    // }
    // const response: any = await fetch(API_URL, settings)
    // const json: any = await response.json()

  }


  private validSubmission = (): boolean => {
    const { userData, tableData, editID } = this.state
    let changed: boolean = true
    if (editID) {
      const selectedUser: any = tableData.find((u: any) => u.id === editID)
      if (editID !== "temp") {
        const originalUser: IUser = userData.find((u: IUser) => u.id === editID)
        changed = jsonpatch.compare(originalUser, selectedUser).length === 0 ? false : true
      }
      const result: any = Joi.validate({ ...selectedUser }, userSchema)
      return result.error || !changed ? false : true
    }
    return false
  }

  /* All of these methods need to be refactored to use specific event types */

  private enterInsert = (): void => {
    const newUser: any = { ...blankData, password: generateID() }
    const newData: any = this.state.tableData.slice()

    newData.unshift(newUser)
    this.setState({
      lockEdit: true,
      editID: newUser.id,
      
      tableData: newData,
      showInactive: false,
    })
  }

  private rowClick = (e: any): void => {
    if (this.state.lockEdit) {
      return
    }
    const { tableData } = this.state
    const index: number = tableData.findIndex((u: any) => u.id === e.dataItem.id)
    const selectedUser: any = tableData[index]
    if (this.state.editID !== null) {
      this.cancel()
    }
    this.setState({
      editID: selectedUser.id,
      
    })
  }

  private cancel = (): void => {
    if (this.state.passwordModalOpen) {
      this.togglePasswordModal()
    }

    const { editID } = this.state
    if (editID === null) {
      return
    }
    const newTableData: any = this.state.tableData.slice()
    const selectedIndex: number = this.state.tableData.findIndex((u: any) => u.id === editID)
    if (editID === "temp") {
      newTableData.splice(selectedIndex, 1)
    } else {
      const originalUser: IUser = this.state.userData.find((u: any) => u.id === editID)
      newTableData[selectedIndex] = Object.assign({}, originalUser)
    }
    this.setState({
      lockEdit: false,
      editID: null,
      tableData: newTableData
    })
  }

  private clone = (data: any): any => {
    return Object.assign({}, data)
  }

  private save = (): void => {
    const { editID } = this.state
    const newTableData = this.state.tableData.slice()
    const newUserData = this.state.userData.slice()
    const userIndex = newUserData.findIndex((u: any) => u.id === editID)
    const tableIndex: number = newTableData.findIndex((u: any) => u.id === editID)

    if (editID === "temp") {
      this.postUser(newTableData[tableIndex])
      newTableData[tableIndex].id = generateID() // Watch for post return json
      newUserData.unshift(newTableData[tableIndex])
    } else {
      this.patchUser(newTableData[tableIndex], newUserData[userIndex])
      newUserData[userIndex] = this.clone(newTableData[tableIndex])
    }
    this.setState({
      userData: newUserData,
      tableData: newTableData,
      editID: null,
      lockEdit: false,
    })

  }

  private remove = (): void => {
    if (this.state.removeAlertOpen) {
      this.toggleRemoveAlert()
    }
    const newTableData: any = this.state.tableData.slice()
    const newUserData: any = this.state.userData.slice()
    const tableIndex: number = newTableData.findIndex((u: any) => u.id === this.state.editID)
    const userIndex: number = newUserData.findIndex((u: any) => u.id === this.state.editID)
    newTableData[tableIndex].isActive = false
    this.patchUser(newTableData[tableIndex], newUserData[userIndex])
    newUserData[userIndex].isActive = false
    this.setState({
      editID: null,
      tableData: newTableData,
      userData: newUserData
    })
  }
}
