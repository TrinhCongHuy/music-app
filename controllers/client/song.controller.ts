import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import FavoriteSong from "../../models/favorite-song.model";

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

    const favoriteSong = await FavoriteSong.findOne({
        // userId:
        songId: song.id
    })

    song["isFavoriteSong"] = favoriteSong ? true : false

    res.render("client/pages/songs/detail", {
        titlePage: topic.title,
        song: song,
        topic: topic,
        singer: singer
    })
}

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong
    const typeLike: string = req.params.typeLike

    const song = await Song.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    })

    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1

    await Song.updateOne(
        {
            _id: idSong
        },
        {
            like: newLike
        }
    )

    res.json({
        code: 200,
        message: "Cập nhật thành công!",
        like: newLike
    })
}


// [PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong
    const typeFavorite: string = req.params.typeFavorite
    
    switch(typeFavorite) {
        case "favorite": 
            const existFavoriteSong = await FavoriteSong.findOne({
                songId: idSong
            })

            if (!existFavoriteSong) {
                const record = new FavoriteSong({
                    // userId:
                    songId: idSong
                })
                await record.save()
            }
            break;
        case "unfavorite": 
            await FavoriteSong.deleteOne({
                // userId:
                songId: idSong
            })
            break;
        default:
            break;  
    }
    

    res.json({
        code: 200,
        message: "Cập nhật thành công!"
    })
}

// [PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
    const idSong = req.params.idSong
    const song = await Song.findOne({
        _id: idSong,
        deleted: false
    })

    const listen: number = song.listen + 1

    await Song.updateOne(
        {
            _id: idSong
        },
        {
            listen: listen
        }
    )

    const newSong = await Song.findOne({
        _id: idSong,
        deleted: false
    })

    res.json({
        code: 200,
        message: "Cập nhật thành công!",
        listen: newSong.listen
    })
}