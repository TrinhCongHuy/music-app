import { Request, Response } from "express";
import Role from "../../models/roles.model";

// [GET] /admin/roles
export const index = async (req: Request, res: Response) => {
    
    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/index", {
        titlePage: "Danh sách nhóm quyền",
        roles: roles
    })
}

// [GET] /admin/roles/create
export const create = async (req: Request, res: Response) => {

    res.render("admin/pages/roles/create", {
        titlePage: "Thêm mới quyền"
    })
}


// [POST] /admin/roles/create
export const createPost = async (req: Request, res: Response) => {
    const role = new Role(req.body)
    await role.save()

    res.redirect("back")
}

// [get] /admin/roles/permissions
export const permissions = async (req: Request, res: Response) => {

    const records = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/permissions", {
        titlePage: "Trang phân quyền",
        records: records
    })
}

// [get] /admin/roles/permissions
export const permissionsPatch = async (req: Request, res: Response) => {
    const permissions = JSON.parse(req.body.permissions)

    for (const item of permissions) {
        await Role.updateOne(
            {
                _id: item.id
            },
            {
                permissions: item.permissions
            }
        )
    }
    res.redirect("back")
}