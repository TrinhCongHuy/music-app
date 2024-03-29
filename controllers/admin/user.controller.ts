import { Request, Response } from "express";
import Account from "../../models/accounts.model";
import Role from "../../models/roles.model";
import User from "../../models/user.model";

// [GET] /admin/accounts/
export const index = async (req: Request, res: Response) => {
    const users = await User.find({
        deleted: false
    })

    res.render("admin/pages/users/index", {
        titlePage: "Danh sách tài khoản user",
        users: users
    })
}
