import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";

// [GET] /admin/dashboard
export const index = async (req: Request, res: Response) => {
    const countSong = await Song.countDocuments()
    const countSinger = await Singer.countDocuments()
    const countTopic = await Topic.countDocuments()

    res.render("admin/pages/dashboard/index", {
        titlePage: "Tổng quan",
        countSong: countSong,
        countSinger: countSinger,
        countTopic: countTopic
    })
}