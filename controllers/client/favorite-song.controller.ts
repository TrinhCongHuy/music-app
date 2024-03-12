import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
    const favoriteSongs = await FavoriteSong.find({
        // usedId:
        deleted: false
    })

    for (const song of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id: song.songId,
            deleted: false
        })
        song["infoSong"] = infoSong

        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId,
            deleted: false
        }).select("fullName")
        song["infoSinger"] = infoSinger

    }

    
    res.render("client/pages/favorite-songs/index", {
        titlePage: "Bài hát yêu thích",
        favoriteSongs: favoriteSongs
    })
}