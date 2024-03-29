import { Request, Response } from "express";
import md5 from 'md5'
import Account from "../../models/accounts.model";
import { systemConfig } from "../../config/config";


// [GET] /admin/auth/login
export const login = async (req: Request, res: Response) => {

    res.render("admin/pages/auth/login", {
        titlePage: "Đăng nhập tài khoản"
    })
}

// [POST] /admin/auth/login
export const loginPost = async (req: Request, res: Response) => {
    const email = req.body.email
    const password = md5(req.body.password)

    const account = await Account.findOne({
        email: email,
        deleted: false
    })

    if (!account) {
        res.redirect("back")
        return;
    }

    if (account.status == 'inactive') {
        res.redirect("back")
        return;
    }

    if (account.password != password) {
        res.redirect("back")
        return;
    }

    res.cookie("token", account.token)
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
}

// [POST] /admin/auth/logout
export const logout= async (req: Request, res: Response) => {
    res.clearCookie('token')

    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
}