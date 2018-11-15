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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_react_dialogs_1 = require("@progress/kendo-react-dialogs");
var kendo_react_inputs_1 = require("@progress/kendo-react-inputs");
var React = __importStar(require("react"));
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.render = function () {
        var _a = this.props, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword, handlePasswordInput = _a.handlePasswordInput, togglePasswordModal = _a.togglePasswordModal, savePassword = _a.savePassword, passwordValid = _a.passwordValid;
        return (<kendo_react_dialogs_1.Dialog title="Change Password" onClose={togglePasswordModal}>
			<form>
				<div style={{ marginBottom: '1rem' }}>

					<label>
						New Password<br />
						<kendo_react_inputs_1.Input type="text" name="newPassword" value={newPassword} onChange={handlePasswordInput}/>
					</label>
					<br />
					<label>
						Confirm Password <br />
						<kendo_react_inputs_1.Input type="text" name="confirmPassword" value={confirmPassword} onChange={handlePasswordInput}/>
					</label>
				</div>
			</form>

			<kendo_react_dialogs_1.DialogActionsBar>
				<button className="k-button" onClick={togglePasswordModal}>
					Cancel
				</button>
				<button className="k-button k-primary" onClick={savePassword} disabled={!passwordValid()}>
					Save
				</button>
			</kendo_react_dialogs_1.DialogActionsBar>

		</kendo_react_dialogs_1.Dialog>);
    };
    return default_1;
}(React.Component));
exports.default = default_1;
