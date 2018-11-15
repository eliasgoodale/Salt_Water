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
var React = __importStar(require("react"));
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.render = function () {
        var _a = this.props, dataItem = _a.dataItem, field = _a.field, onChange = _a.onChange;
        var value = dataItem[field];
        return (dataItem.inEdit ?
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
					<input type="checkbox" id={field} className="k-checkbox" checked={value} onChange={function (e) {
                e.dataItem = dataItem;
                e.field = field;
                e.value = !value;
                onChange(e);
            }}/>
					<label className="k-checkbox-label" htmlFor={field}/>
				</td> :
            value ?
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
						<input type="checkbox" className="k-checkbox" defaultChecked={value}/>
						<label className="k-checkbox-label"/>
					</td>
                : <td />);
    };
    return default_1;
}(React.Component));
exports.default = default_1;
