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
var React = __importStar(require("react"));
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.render = function () {
        var _a = this.props, toggleRemoveAlert = _a.toggleRemoveAlert, remove = _a.remove;
        return (<kendo_react_dialogs_1.Dialog title="Remove User?" onClose={toggleRemoveAlert}>
				<label>
					Are you sure you want to delete this user? <br />
				</label>
				<kendo_react_dialogs_1.DialogActionsBar>
					<button className="k-button" onClick={toggleRemoveAlert}>
						Cancel
                        </button>
					<button className="k-button k-primary" onClick={remove}>
						Confirm
            </button>
				</kendo_react_dialogs_1.DialogActionsBar>
			</kendo_react_dialogs_1.Dialog>);
    };
    return default_1;
}(React.Component));
exports.default = default_1;
