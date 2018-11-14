"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = __importStar(require("joi"));
function generateID() {
    var newID = Math.random().toString(16).substring(3);
    return newID;
}
exports.generateID = generateID;
exports.blankData = {
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
};
exports.userSchema = Joi.object().keys({
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
});
