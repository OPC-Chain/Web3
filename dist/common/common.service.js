"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const configure_schema_1 = require("./schemas/configure.schema");
let CommonService = class CommonService {
    constructor(configureModel) {
        this.configureModel = configureModel;
    }
    async getMinFee() {
        const getConfig = await this.configureModel.findOne({
            key: 'min_fee',
        });
        return Number(getConfig.value);
    }
};
CommonService = __decorate([
    __param(0, (0, mongoose_2.InjectModel)(configure_schema_1.Configure.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map