import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {

    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    })
    
    const songs = await Song.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    })

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        })
        song["infoSinger"]= infoSinger
    }

    res.render("client/pages/songs/list", {
        titlePage: topic.title,
        songs: songs
    })
}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {

    const song = await Song.findOne({
        slug: req.params.slugSong,
        status: "active",
        deleted: false
    })

    const topic = await Topic.findOne({
        _id: song.topicId,
        status: "active"
    }).select("title")

    const singer = await Singer.findOne({
        _id: song.singerId,
        status: "active"
    }).select("fullName")

    res.render("client/pages/songs/detail", {
        titlePage: topic.title,
        song: song,
        topic: topic,
        singer: singer
    })
}