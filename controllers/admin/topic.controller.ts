import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import paginationHelper from "../../helpers/pagination"


// [GET] /admin/topics
export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    }

    // Pagination
    const countTopics = await Topic.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countTopics
    ) 


    const topics = await Topic.find(find).limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

    res.render("admin/pages/topics/index", {
        titlePage: "Trang chủ đề",
        topics: topics,
        pagination: objectPagination
    })
}

export const changeStatus = async (req: Request, res: Response) => {
    const status = req.params.status
    const id = req.params.id

    await Topic.updateOne({ _id: id }, { 
        status: status
    })

    res.redirect('back')

}

// [GET] /admin/topics/create
export const create = async (req: Request, res: Response) => {

    res.render("admin/pages/topics/create", {
        titlePage: "Thêm mới chủ đề"
    })
}

// [POST] /admin/topics/create
export const createPost = async (req: Request, res: Response) => {
    const topic = new Topic(req.body)
    await topic.save()

    res.redirect("back")
}

// [GET] /admin/topics/edit/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id

    const topic = await Topic.findOne({
        _id: id
    })

    res.render("admin/pages/topics/edit", {
        titlePage: "Sửa chủ đề",
        topic: topic
    })
}

// [PATCH] /admin/topics/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id

    await Topic.updateOne(
        {
            _id: id
        },
        {
            title: req.body.title,
            avatar: req.body.avatar,
            description: req.body.description,
            status: req.body.status
        }
    )

    res.redirect("back")
}

// [PATCH] /admin/topics/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
    const id = req.params.id

    await Topic.updateOne(
        {
            _id: id
        },
        {
            deleted: true
        }
    )

    res.redirect("back")
}