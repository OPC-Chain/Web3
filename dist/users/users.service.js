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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const paginate_1 = require("../common/pagination/paginate");
const options = {
    keys: ['name', 'type.slug', 'categories.slug', 'status'],
    threshold: 0.3,
};
let UsersService = class UsersService {
    constructor(billingUserModel) {
        this.billingUserModel = billingUserModel;
    }
    async getUsers({ text, limit, page }) {
        if (!page)
            page = 1;
        let query = {};
        if (text) {
            query = {
                $or: [
                    { name: { $regex: text, $options: 'i' } },
                    { email: { $regex: text, $options: 'i' } },
                ],
            };
        }
        const results = await this.billingUserModel
            .find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        const totalDoc = await this.billingUserModel.countDocuments(query);
        const url = `/users?limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(totalDoc, page, limit, results.length, url));
    }
    findUser(email) {
        return this.billingUserModel.findOne({ email });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map