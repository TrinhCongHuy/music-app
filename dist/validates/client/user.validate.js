"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInfoPost = exports.passwordResetPost = exports.forgotPassword = exports.loginPost = exports.registerPost = void 0;
const registerPost = (req, res, next) => {
    if (req.body.fullName == "") {
        res.redirect('back');
        return;
    }
    if (req.body.email == "") {
        res.redirect('back');
        return;
    }
    if (req.body.password == "") {
        res.redirect('back');
        return;
    }
    next();
};
exports.registerPost = registerPost;
const loginPost = (req, res, next) => {
    if (req.body.email == "") {
        res.redirect('back');
        return;
    }
    if (req.body.password == "") {
        res.redirect('back');
        return;
    }
    next();
};
exports.loginPost = loginPost;
const forgotPassword = (req, res, next) => {
    if (req.body.email == "") {
        res.redirect('back');
        return;
    }
    next();
};
exports.forgotPassword = forgotPassword;
const passwordResetPost = (req, res, next) => {
    if (req.body.password == "") {
        res.redirect('back');
        return;
    }
    if (req.body.confirmPassword == "") {
        res.redirect('back');
        return;
    }
    if (req.body.password != req.body.confirmPassword) {
        res.redirect('back');
        return;
    }
    next();
};
exports.passwordResetPost = passwordResetPost;
const updateInfoPost = (req, res, next) => {
    if (req.body.fullName == "") {
        res.redirect('back');
        return;
    }
    if (req.body.email == "") {
        res.redirect('back');
        return;
    }
    next();
};
exports.updateInfoPost = updateInfoPost;
