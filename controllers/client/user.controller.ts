import { Request, Response } from "express";
import md5 from "md5"
import User from "../../models/user.model";
import * as generate from "../../helpers/generate"
import ForgotPassword from "../../models/forgot-password.model";
import * as sendMailHelper from "../../helpers/sendMail";


// [GET] /user/register
export const register = async (req: Request, res: Response) => {

    res.render("client/pages/user/register", {
        titlePage: "Trang đăng ký"
    })
}


// [POST] /user/register
export const registerPost = async (req: Request, res: Response) => {
    const email = req.body.email
    const password = md5(req.body.password)
    const confirmPassword = md5(req.body.confirmPassword)

    const existEmail = await User.findOne({
        email: email,
        deleted: false
    })

    if (existEmail) {
        res.redirect('back')
        return;
    }

    if (confirmPassword != password) {
        res.redirect('back')
        return;
    }


    const user = new User({
        fullName: req.body.fullName,
        email: email,
        password: password,
        tokenUser: generate.generateRandomString(20)
    })

    await user.save()

    res.redirect("/")
}


// [GET] /user/login
export const login = async (req: Request, res: Response) => {

    res.render("client/pages/user/login", {
        titlePage: "Trang đăng nhập"
    })
}

// [POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
    const email = req.body.email
    const password = md5(req.body.password)

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if (!user) {
        res.redirect("back")
        return
    }

    if (password != user.password) {
        res.redirect("back")
        return
    }

    if (user.status == "inactive") {
        res.redirect("back")
        return
    }

    res.cookie("tokenUser", user.tokenUser)

    res.redirect("/")
}

// [GET] /user/logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie("tokenUser")

    res.redirect("/")
}

// [GET] /user/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {

    res.render("client/pages/user/forgot-password", {
        titlePage: "Lấy lại mật khẩu"
    })
}

// [POST] /user/password/forgot
export const forgotPasswordPost = async (req: Request, res: Response) => {
    const email = req.body.email

    const existEmail = await User.findOne({
        email: email,
        deleted: false
    })

    if (!existEmail) {
        res.redirect("back")
        return
    }

    const otp = generate.generateRandomNumber(6)

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()

    const subject = "Mã OTP xác minh lấy lại mật khẩu!"
    const html = `Mã OTP lấy lại mật khẩu là ${otp}. Thời hạn sử dụng là 3 phút. Lưu ý: Không để lộ mã OTP.`

    sendMailHelper.sendMail(email, subject, html)

    res.redirect(`/user/password/otp?email=${email}`)
}


// [GET] /user/password/otp
export const otpPassword = async (req: Request, res: Response) => {
    const email = req.query.email

    res.render("client/pages/user/otp-password", {
        titlePage: "Nhập mã OTP",
        email: email
    })
}

// [POST] /user/password/otp
export const otpPasswordPost = async (req: Request, res: Response) => {
    const otp = req.body.otp
    const email = req.body.email

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })

    if (!result) {
        res.redirect("back")
        return
    }

    res.redirect(`/user/password/reset?email=${email}`)
}


// [GET] /user/password/reset
export const resetPassword = async (req: Request, res: Response) => {
    const email = req.query.email

    res.render("client/pages/user/reset-password", {
        titlePage: "Đổi mật khẩu",
        email: email
    })
}

// [POST] /user/password/reset
export const resetPasswordPost = async (req: Request, res: Response) => {
    const email = req.body.email
    const password = md5(req.body.password)
    const confirmPassword = md5(req.body.confirmPassword)

    if (confirmPassword != password) {
        res.redirect("back")
        return;
    }

    await User.updateOne(
        {
            email: email
        },
        {
            password: password
        }
    )

    res.redirect("/user/login")
}


// [GET] /user/infoUser
export const infoUser = async (req: Request, res: Response) => {
    const tokenUser = req.cookies.tokenUser

    const user = await User.findOne({
        tokenUser: tokenUser,
        deleted: false
    })

    res.render("client/pages/user/info", {
        titlePage: "Trang thông tin",
        user: user
    })
}

// [GET] /user/infoUser/edit/:id
export const editUser = async (req: Request, res: Response) => {
    const id = req.params.id
    const user = await User.findOne({
        _id: id,
        deleted: false
    })

    res.render("client/pages/user/edit", {
        titlePage: "Chỉnh sửa thông tin",
        user: user
    })
}

// [POST] /user/infoUser/edit/:id
export const editUserPost = async (req: Request, res: Response) => {
    const id = req.params.id
    const user = await User.findOne({
        _id: id,
        deleted: false
    })

    let password = user.password
    let avatar = ''

    if (req.body.newPassword) {
        const newPassword = md5(req.body.newPassword)
        password = newPassword;
    }

    if (req.body.avatar) {
        avatar = req.body.avatar
    }
    
    await user.updateOne({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: avatar,
        password: password
    })

    res.redirect("back")
}