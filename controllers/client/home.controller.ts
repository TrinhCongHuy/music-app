import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /topics
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  }).limit(6);

  const songs = await Song.find().sort({ listen: -1 }).limit(10);

  for (const song of songs) {
    const infoSinger = await Singer.findOne(
        {
            _id: song.singerId,
            deleted: false
        }
    ).select("fullName")
    song["infoSinger"] = infoSinger
  }

  res.render("client/pages/home/index", {
    titlePage: "Trang chủ",
    topics: topics,
    songs: songs
  });
};
