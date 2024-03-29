"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsPatch = exports.permissions = exports.createPost = exports.create = exports.index = void 0;
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/roles/index", {
        titlePage: "Danh sách nhóm quyền",
        roles: roles
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/roles/create", {
        titlePage: "Thêm mới quyền"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = new roles_model_1.default(req.body);
    yield role.save();
    res.redirect("back");
});
exports.createPost = createPost;
const permissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield roles_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/roles/permissions", {
        titlePage: "Trang phân quyền",
        records: records
    });
});
exports.permissions = permissions;
const permissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        yield roles_model_1.default.updateOne({
            _id: item.id
        }, {
            permissions: item.permissions
        });
    }
    res.redirect("back");
});
exports.permissionsPatch = permissionsPatch;
