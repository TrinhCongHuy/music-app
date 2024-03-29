"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createPost = exports.create = exports.index = void 0;
const md5_1 = __importDefault(require("md5"));
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const generate = __importStar(require("../../helpers/generate"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield accounts_model_1.default.find({
        deleted: false
    });
    for (const account of accounts) {
        const role = yield roles_model_1.default.findOne({
            _id: account.role_id,
            deleted: false
        }).select("title");
        account["role"] = role;
    }
    res.render("admin/pages/accounts/index", {
        titlePage: "Danh sách tài khoản admin",
        accounts: accounts
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/accounts/create", {
        titlePage: "Thêm mới tài khoản",
        roles: roles
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield accounts_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (existEmail) {
        res.redirect("back");
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    const account = new accounts_model_1.default({
        fullName: req.body.fullName,
        email: req.body.email,
        token: generate.generateRandomString(20),
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        role_id: req.body.role_id,
        status: req.body.status
    });
    yield account.save();
    res.redirect("back");
});
exports.createPost = createPost;
