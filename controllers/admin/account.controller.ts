import { Request, Response } from "express";
import md5 from "md5"
import Account from "../../models/accounts.model";
import Role from "../../models/roles.model";
import * as generate from "../../helpers/generate"


// [GET] /admin/accounts/
export const index = async (req: Request, res: Response) => {
    const accounts = await Account.find({
        deleted: false
    })

    for (const account of accounts) {
        const role = await Role.findOne({
            _id: account.role_id,
            deleted: false
        }).select("title")
        account["role"] = role
    }

    res.render("admin/pages/accounts/index", {
        titlePage: "Danh sách tài khoản admin",
        accounts: accounts
    })
}

// [GET] /admin/accounts/create
export const create = async (req: Request, res: Response) => {
    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/accounts/create", {
        titlePage: "Thêm mới tài khoản",
        roles: roles
    })
}


// [POST] /admin/accounts/create
export const createPost = async (req: Request, res: Response) => {
    const existEmail = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if (existEmail) {
        res.redirect("back")
        return;
    }

    req.body.password = md5(req.body.password)

    const account = new Account({
        fullName: req.body.fullName,
        email: req.body.email,
        token: generate.generateRandomString(20),
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        role_id: req.body.role_id,
        status: req.body.status
    })

    await account.save()

    res.redirect("back")
}