import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    })

    for (const song of songs) {

        const infoSinger = await Singer.findOne({
            _id: song.singerId
        }).select("fullName")

        const infoTopic = await Topic.findOne({
            _id: song.topicId
        }).select("title")

        song["infoSinger"] = infoSinger
        song["infoTopic"] = infoTopic

    }

    res.render("admin/pages/songs/index", {
        titlePage: "Danh sách bài hát",
        songs: songs
    })
}


// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {

    const singers = await Singer.find({
        deleted: false
    })

    const topics = await Topic.find({
        deleted: false
    })

    res.render("admin/pages/songs/create", {
        titlePage: "Thêm mới bài hát",
        singers: singers,
        topics: topics
    })
}


// [post] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    let avatar = ""
    let audio = ""

    if (req.body.avatar) {
        avatar = req.body.avatar[0]
    }
    if (req.body.audio) {
        audio = req.body.audio[0]
    }

    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio
    }

    const song = new Song(dataSong)
    await song.save()

    res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}