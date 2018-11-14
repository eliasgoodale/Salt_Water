"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* React */
var react_1 = require("react");
var React = __importStar(require("react"));
/* Kendo */
var kendo_data_query_1 = require("@progress/kendo-data-query");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
require("@progress/kendo-theme-default/dist/all.css");
/* Helper Modules*/
var jsonpatch = __importStar(require("fast-json-patch"));
var Joi = __importStar(require("joi"));
/* Component */
var CustomCells_1 = require("./components/CustomCells");
var Dialogs_1 = require("./components/Dialogs");
/* Utilities */
var utils_1 = require("./utils");
var API_URL = "http://localhost:5500/users";
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.handlePasswordInput = function (e) {
            var name = e.target.name;
            var value = e.target.value;
            if (name === 'newPassword') {
                _this.setState({ newPassword: value });
            }
            else if (name === 'confirmPassword') {
                _this.setState({ confirmPassword: value });
            }
        };
        _this.passwordValid = function () {
            var _a = _this.state, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword;
            var passwordSchema = Joi.string().min(6).max(25);
            if (newPassword === confirmPassword) {
                var result = Joi.validate(confirmPassword, passwordSchema);
                return !result.error ? true : false;
            }
            return false;
        };
        _this.savePassword = function () {
            var newTableData = _this.state.tableData.slice();
            var index = newTableData.findIndex(function (u) { return u.id === _this.state.editID; });
            newTableData[index] = __assign({}, newTableData[index], { password: _this.state.confirmPassword });
            _this.togglePasswordModal();
            _this.setState({
                tableData: newTableData
            });
        };
        _this.userChange = function (e) {
            var _a;
            var editData = _this.state.tableData.slice();
            var index = editData.findIndex(function (u) { return u.id === e.dataItem.id; });
            editData[index] = __assign({}, editData[index], (_a = {}, _a[e.field] = e.value, _a));
            _this.setState({
                tableData: editData,
            });
        };
        _this.reactivateUser = function () {
            var newTableData = _this.state.tableData.slice();
            var index = newTableData.findIndex(function (u) { return u.id === _this.state.editID; });
            newTableData[index].isActive = true;
            _this.setState({
                editID: null,
                tableData: newTableData,
            });
        };
        _this.clearPassword = function () {
            _this.setState({
                newPassword: "",
                confirmPassword: ""
            });
        };
        _this.togglePasswordModal = function () {
            _this.clearPassword();
            _this.setState({
                passwordModalOpen: !_this.state.passwordModalOpen
            });
        };
        _this.toggleRemoveAlert = function () {
            _this.setState({
                removeAlertOpen: !_this.state.removeAlertOpen
            });
        };
        _this.toggleInactiveUsers = function () {
            _this.setState({
                showInactive: !_this.state.showInactive
            });
        };
        /* Not sure if Promise<IUser[]> return type will break my code in some cases */
        _this.getUsers = function () { return __awaiter(_this, void 0, void 0, function () {
            var request, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(API_URL)];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, request.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); };
        _this.patchUser = function (updateUser, originalUser) { return __awaiter(_this, void 0, void 0, function () {
            var diff;
            return __generator(this, function (_a) {
                diff = jsonpatch.compare(originalUser, updateUser);
                console.log("PATCH payload:\n");
                console.table(diff);
                return [2 /*return*/];
            });
        }); };
        _this.postUser = function (newUser) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("POST payload:\n");
                delete newUser.id;
                console.table(newUser);
                return [2 /*return*/];
            });
        }); };
        _this.validSubmission = function () {
            var _a = _this.state, userData = _a.userData, tableData = _a.tableData, editID = _a.editID;
            var changed = true;
            if (editID) {
                var selectedUser = tableData.find(function (u) { return u.id === editID; });
                if (editID !== "temp") {
                    var originalUser = userData.find(function (u) { return u.id === editID; });
                    changed = jsonpatch.compare(originalUser, selectedUser).length === 0 ? false : true;
                }
                var result = Joi.validate(__assign({}, selectedUser), utils_1.userSchema);
                return result.error || !changed ? false : true;
            }
            return false;
        };
        /* All of these methods need to be refactored to use specific event types */
        _this.enterInsert = function () {
            var newUser = __assign({}, utils_1.blankData, { password: utils_1.generateID() });
            var newData = _this.state.tableData.slice();
            newData.unshift(newUser);
            _this.setState({
                lockEdit: true,
                editID: newUser.id,
                tableData: newData,
                showInactive: false,
            });
        };
        _this.rowClick = function (e) {
            if (_this.state.lockEdit) {
                return;
            }
            var tableData = _this.state.tableData;
            var index = tableData.findIndex(function (u) { return u.id === e.dataItem.id; });
            var selectedUser = tableData[index];
            if (_this.state.editID !== null) {
                _this.cancel();
            }
            _this.setState({
                editID: selectedUser.id,
            });
        };
        _this.cancel = function () {
            if (_this.state.passwordModalOpen) {
                _this.togglePasswordModal();
            }
            var editID = _this.state.editID;
            if (editID === null) {
                return;
            }
            var newTableData = _this.state.tableData.slice();
            var selectedIndex = _this.state.tableData.findIndex(function (u) { return u.id === editID; });
            if (editID === "temp") {
                newTableData.splice(selectedIndex, 1);
            }
            else {
                var originalUser = _this.state.userData.find(function (u) { return u.id === editID; });
                newTableData[selectedIndex] = Object.assign({}, originalUser);
            }
            _this.setState({
                lockEdit: false,
                editID: null,
                tableData: newTableData
            });
        };
        _this.clone = function (data) {
            return Object.assign({}, data);
        };
        _this.save = function () {
            var editID = _this.state.editID;
            var newTableData = _this.state.tableData.slice();
            var newUserData = _this.state.userData.slice();
            var userIndex = newUserData.findIndex(function (u) { return u.id === editID; });
            var tableIndex = newTableData.findIndex(function (u) { return u.id === editID; });
            if (editID === "temp") {
                _this.postUser(newTableData[tableIndex]);
                newTableData[tableIndex].id = utils_1.generateID(); // Watch for post return json
                newUserData.unshift(newTableData[tableIndex]);
            }
            else {
                _this.patchUser(newTableData[tableIndex], newUserData[userIndex]);
                newUserData[userIndex] = _this.clone(newTableData[tableIndex]);
            }
            _this.setState({
                userData: newUserData,
                tableData: newTableData,
                editID: null,
                lockEdit: false,
            });
        };
        _this.remove = function () {
            if (_this.state.removeAlertOpen) {
                _this.toggleRemoveAlert();
            }
            var newTableData = _this.state.tableData.slice();
            var newUserData = _this.state.userData.slice();
            var tableIndex = newTableData.findIndex(function (u) { return u.id === _this.state.editID; });
            var userIndex = newUserData.findIndex(function (u) { return u.id === _this.state.editID; });
            newTableData[tableIndex].isActive = false;
            _this.patchUser(newTableData[tableIndex], newUserData[userIndex]);
            newUserData[userIndex].isActive = false;
            _this.setState({
                editID: null,
                tableData: newTableData,
                userData: newUserData
            });
        };
        _this.state = {
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
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers()];
                    case 1:
                        localData = _a.sent();
                        this.setState({
                            tableData: localData.slice(),
                            userData: localData.slice(),
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.render = function () {
        var _this = this;
        var _a = this.state, tableData = _a.tableData, editID = _a.editID, showInactive = _a.showInactive, lockEdit = _a.lockEdit;
        var filterData = showInactive ?
            tableData.filter(function (u) { return !u.isActive; }) :
            tableData.filter(function (u) { return u.isActive; });
        return (<react_1.Fragment>
        <kendo_react_grid_1.Grid style={{ height: '500px' }} data={kendo_data_query_1.orderBy(filterData.map(function (user) {
            return Object.assign({
                inEdit: user.id === editID
            }, user);
        }), this.state.sort)} editField="inEdit" onRowClick={this.rowClick} onItemChange={this.userChange} reorderable={true} sortable={true} sort={this.state.sort} onSortChange={function (e) {
            _this.setState({
                sort: e.sort
            });
        }}>
          <kendo_react_grid_1.GridToolbar>
            <div>

              <button title="Add new" className="k-button k-primary" onClick={this.enterInsert} disabled={editID !== null}>
                Add User
              </button>

              <button className="k-button k-primary" disabled={editID === null || !this.validSubmission()} onClick={this.save}>
                Save
              </button>

              <button className="k-primary k-button k-grid-remove-command" onClick={this.toggleRemoveAlert} disabled={!editID || lockEdit}>
                Delete
					    </button>

              <button className="k-button k-primary" disabled={editID === null} onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </kendo_react_grid_1.GridToolbar>
          <kendo_react_grid_1.GridColumn field="username" title="Username" width="200px"/>
          <kendo_react_grid_1.GridColumn field="firstName" title="First Name" width="200px"/>
          <kendo_react_grid_1.GridColumn field="lastName" title="Last Name" width="200px"/>
          <kendo_react_grid_1.GridColumn field="isEntryAdmin" title="Entry Admin" editor="boolean" cell={function (props) { return <CustomCells_1.CheckboxCell {...props}/>; }}/>
          <kendo_react_grid_1.GridColumn field="isListAdmin" title="List Admin" editor="boolean" cell={function (props) { return <CustomCells_1.CheckboxCell {...props}/>; }}/>
          <kendo_react_grid_1.GridColumn field="isLocationManager" title="Location Manager" editor="boolean" cell={function (props) { return <CustomCells_1.CheckboxCell {...props}/>; }}/>
          <kendo_react_grid_1.GridColumn field="isOperatorAdmin" title="Operator Admin" editor="boolean" cell={function (props) { return <CustomCells_1.CheckboxCell {...props}/>; }}/>
          <kendo_react_grid_1.GridColumn field="isUserAdmin" title="User Admin" editor="boolean" cell={function (props) { return <CustomCells_1.CheckboxCell {...props}/>; }}/>
          <kendo_react_grid_1.GridColumn sortable={false} cell={CustomCells_1.CommandCell(this.togglePasswordModal, this.reactivateUser)} width="150px"/>
        </kendo_react_grid_1.Grid>
     
        {this.state.passwordModalOpen &&
            <Dialogs_1.PasswordDialog newPassword={this.state.newPassword} confirmPassword={this.state.confirmPassword} handlePasswordInput={this.handlePasswordInput} togglePasswordModal={this.togglePasswordModal} savePassword={this.savePassword} passwordValid={this.passwordValid}/>}

        {this.state.removeAlertOpen &&
            <Dialogs_1.RemoveDialog toggleRemoveAlert={this.toggleRemoveAlert} remove={this.remove}/>}
        <button className="k-button k-primary " onClick={this.toggleInactiveUsers}>
          {showInactive ? "Show Active" : "Show Inactive"}
        </button>
      </react_1.Fragment>);
    };
    return App;
}(react_1.Component));
exports.default = App;
