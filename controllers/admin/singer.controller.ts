import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import paginationHelper from "../../helpers/pagination"

// [GET] /admin/singers
export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    }

       // Pagination
       const countSingers = await Singer.countDocuments(find);

       let objectPagination = paginationHelper(
           {
               currentPage: 1,
               limitItems: 5
           },
           req.query,
           countSingers
       ) 


    const singers = await Singer.find(find).limit(objectPagination.limitItems)
    .skip(objectPagination.skip);


    for (const singer of singers) {
        const countSong = await Song.countDocuments({
            singerId: singer.id
        })
        singer["countSong"] = countSong
    }

    res.render("admin/pages/singers/index", {
        titlePage: "Danh sách ca sĩ",
        singers: singers,
        pagination: objectPagination
    })
}

// [GET] /admin/singers/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
    const id = req.params.id
    const status = req.params.status

    await Singer.updateOne(
        {
            _id: id
        },
        {
            status: status
        }
    )

    res.redirect("back")
}

// [GET] /admin/singers/create
export const create = async (req: Request, res: Response) => {

    res.render("admin/pages/singers/create", {
        titlePage: "Thêm mới ca sĩ"
    })
}

// [POST] /admin/singers/create
export const createPost = async (req: Request, res: Response) => {
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status,
        avatar: req.body.avatar
    }

    const singer = new Singer(dataSinger)
    await singer.save()

    res.redirect("back")
}

// [DELETE] /admin/singers/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
    const id = req.params.id

    await Singer.updateOne(
        {
            _id: id
        },
        {
            deleted: true
        }
    )
}