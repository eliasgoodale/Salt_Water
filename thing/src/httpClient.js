"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var LiquidTraceClient = /** @class */ (function () {
    function LiquidTraceClient(config, endpoints) {
        if (endpoints === void 0) { endpoints = {}; }
        var _this = this;
        this.config = config;
        this.endpoints = endpoints;
        this.createEntity = function (entity) {
            _this.endpoints[entity.name] = _this.createEndpoints(entity);
        };
        this.createEntities = function (entities) {
            entities.forEach(_this.createEntity.bind(_this));
        };
        this.createEndpoints = function (_a) {
            var name = _a.name;
            var endpoints = {};
            var resourceURL = "/" + name;
            /* Standard CRUD functions, return Promise */
            endpoints.getAll = function (_a) {
                var query = (_a === void 0 ? {} : _a).query;
                return _this._instance.get(resourceURL, { params: { query: query } });
            };
            endpoints.getOne = function (_a) {
                var id = _a.id;
                return _this._instance.get(resourceURL + "/" + id);
            };
            endpoints.create = function (toCreate) {
                return _this._instance.post(resourceURL, toCreate);
            };
            endpoints.update = function (toUpdate) {
                return _this._instance.patch(resourceURL + "/" + toUpdate.id, toUpdate);
            };
            /* Stream Request functions return Observable */
            endpoints.getList = function (ids) {
                if (ids === void 0) { ids = []; }
                return rxjs_1.from(ids).pipe(operators_1.mergeMap(function (id) {
                    return _this._instance.get(resourceURL + "/" + id);
                }));
            };
            return endpoints;
        };
        this._instance = axios_1["default"].create(config);
    }
    return LiquidTraceClient;
}());
var config = {
    baseURL: 'https://jsonplaceholder.typicode.com',
};

const httpClient = new LiquidTraceClient(config);
httpClient.createEntities([
    {name: 'comments'},
    {name: 'users'},
    {name: 'todos'},
]);
exports["default"] = httpClient;