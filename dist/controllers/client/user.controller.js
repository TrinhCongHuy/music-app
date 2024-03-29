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
exports.editUserPost = exports.editUser = exports.infoUser = exports.resetPasswordPost = exports.resetPassword = exports.otpPasswordPost = exports.otpPassword = exports.forgotPasswordPost = exports.forgotPassword = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const generate = __importStar(require("../../helpers/generate"));
const forgot_password_model_1 = __importDefault(require("../../models/forgot-password.model"));
const sendMailHelper = __importStar(require("../../helpers/sendMail"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/register", {
        titlePage: "Trang đăng ký"
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const confirmPassword = (0, md5_1.default)(req.body.confirmPassword);
    const existEmail = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (existEmail) {
        res.redirect('back');
        return;
    }
    if (confirmPassword != password) {
        res.redirect('back');
        return;
    }
    const user = new user_model_1.default({
        fullName: req.body.fullName,
        email: email,
        password: password,
        tokenUser: generate.generateRandomString(20)
    });
    yield user.save();
    res.redirect("/");
});
exports.registerPost = registerPost;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login", {
        titlePage: "Trang đăng nhập"
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        res.redirect("back");
        return;
    }
    if (password != user.password) {
        res.redirect("back");
        return;
    }
    if (user.status == "inactive") {
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenUser");
    res.redirect("/");
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/forgot-password", {
        titlePage: "Lấy lại mật khẩu"
    });
});
exports.forgotPassword = forgotPassword;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const existEmail = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!existEmail) {
        res.redirect("back");
        return;
    }
    const otp = generate.generateRandomNumber(6);
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    };
    const forgotPassword = new forgot_password_model_1.default(objectForgotPassword);
    yield forgotPassword.save();
    const subject = "Mã OTP xác minh lấy lại mật khẩu!";
    const html = `Mã OTP lấy lại mật khẩu là ${otp}. Thời hạn sử dụng là 3 phút. Lưu ý: Không để lộ mã OTP.`;
    sendMailHelper.sendMail(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`);
});
exports.forgotPasswordPost = forgotPasswordPost;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    res.render("client/pages/user/otp-password", {
        titlePage: "Nhập mã OTP",
        email: email
    });
});
exports.otpPassword = otpPassword;
const otpPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = req.body.otp;
    const email = req.body.email;
    const result = yield forgot_password_model_1.default.findOne({
        email: email,
        otp: otp
    });
    if (!result) {
        res.redirect("back");
        return;
    }
    res.redirect(`/user/password/reset?email=${email}`);
});
exports.otpPasswordPost = otpPasswordPost;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    res.render("client/pages/user/reset-password", {
        titlePage: "Đổi mật khẩu",
        email: email
    });
});
exports.resetPassword = resetPassword;
const resetPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const confirmPassword = (0, md5_1.default)(req.body.confirmPassword);
    if (confirmPassword != password) {
        res.redirect("back");
        return;
    }
    yield user_model_1.default.updateOne({
        email: email
    }, {
        password: password
    });
    res.redirect("/user/login");
});
exports.resetPasswordPost = resetPasswordPost;
const infoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({
        tokenUser: tokenUser,
        deleted: false
    });
    res.render("client/pages/user/info", {
        titlePage: "Trang thông tin",
        user: user
    });
});
exports.infoUser = infoUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.render("client/pages/user/edit", {
        titlePage: "Chỉnh sửa thông tin",
        user: user
    });
});
exports.editUser = editUser;
const editUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    let password = user.password;
    let avatar = '';
    if (req.body.newPassword) {
        const newPassword = (0, md5_1.default)(req.body.newPassword);
        password = newPassword;
    }
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }
    yield user.updateOne({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: avatar,
        password: password
    });
    res.redirect("back");
});
exports.editUserPost = editUserPost;
