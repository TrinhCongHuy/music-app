import Account from "../../models/accounts.model"
import Role from "../../models/roles.model"
import { systemConfig } from "../../config/config"
import { Request, Response, NextFunction } from "express"

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
    }else {
        const account = await Account.findOne({token: req.cookies.token}).select("-password")
        
        if(!account) {
            res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
        }else {
            const role = await Role.findOne({ _id: account.role_id }).select("title permissions")

            res.locals.account = account
            res.locals.role = role
            next()
        }
    }
}