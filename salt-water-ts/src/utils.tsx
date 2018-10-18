import * as Joi from 'joi'

export function generateID(): string {
	const newID: string = Math.random().toString(16).substring(3)
	return newID
}

export interface IUser {
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



export interface IState {
	editID: string | null
	tableData: any
	userData: any
	passwordModalOpen: boolean
	showInactive: boolean
	removeAlertOpen: boolean
	lockEdit: boolean
	sort: any
	newPassword: any
	confirmPassword: any
}

export const blankData: IUser = {
	id: "temp",
	firstName: "",
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

export const userSchema: any = Joi.object().keys({
	id: Joi.string(),
	firstName: Joi.string().min(2).max(20).required(),
	lastName: Joi.string().min(2).max(20).required(),
	username: Joi.string().min(5).max(20).required(),
	password: Joi.string().min(6).max(25).required(),
	isActive: Joi.boolean().required(),
	isEntryAdmin: Joi.boolean().required(),
	isListAdmin: Joi.boolean().required(),
	isLocationManager: Joi.boolean().required(),
	isOperatorAdmin: Joi.boolean().required(),
	isUserAdmin: Joi.boolean().required(),
})
