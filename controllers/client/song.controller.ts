import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import FavoriteSong from "../../models/favorite-song.model";
import User from "../../models/user.model";
import moment from "moment";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false,
  });

  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  });

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });
    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/songs/list", {
    titlePage: topic.title,
    topic: topic,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const song = await Song.findOne({
    slug: req.params.slugSong,
    status: "active",
    deleted: false,
  });

  const formattedDate = moment(song.createdAt, "MMMM Do YYYY").format('DD/MM/YYYY');
  song["formattedDate"] = formattedDate

  const tokenUser = req.cookies.tokenUser; 

  const user = await User.findOne({
    deleted: false,
    tokenUser: tokenUser,
  }); 

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
  }).select("title");

  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
  }).select("fullName");

  const favoriteSong = await FavoriteSong.findOne({
    userId: user.id,
    songId: song.id,
  });

  song["isFavoriteSong"] = favoriteSong ? true : false;

 
  const existLike = await Song.findOne({
    slug: req.params.slugSong,
    like: { $in: [user.id] },
  });

  let isActive: boolean

  if (existLike) {
    isActive = true
  }else {
    isActive = false
  }

  const existFavorite = await FavoriteSong.findOne({
    userId: user.id,
    songId: song.id,
  });

  let isFavorite: boolean

  if (existFavorite) {
    isFavorite = true
  }else {
    isFavorite = false
  }

  

  res.render("client/pages/songs/detail", {
    titlePage: topic.title,
    song: song,
    topic: topic,
    singer: singer,
    isActive: isActive,
    isFavorite: isFavorite
  });
};

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const tokenUser = req.cookies.tokenUser;

  const user = await User.findOne({
    deleted: false,
    tokenUser: tokenUser,
  });

  const existLike = await Song.findOne({
    _id: idSong,
    like: { $in: [user.id] },
  });

  let isExist: boolean;

  if (!existLike) {
    isExist = true;
    await Song.updateOne(
      {
        _id: idSong,
      },
      {
        $push: { like: user.id },
      }
    );
  } else {
    isExist = false;
    await Song.updateOne(
      {
        _id: idSong,
      },
      {
        $pull: { like: user.id },
      }
    );
  }

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });

  const likeLength = song.like.length;

  res.json({
    code: 200,
    message: "Cập nhật thành công!",
    like: likeLength,
    isExist: isExist
  });
};

// [PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeFavorite: string = req.params.typeFavorite;
  const tokenUser = req.cookies.tokenUser

  const user = await User.findOne({
    tokenUser: tokenUser,
    deleted: false
  })

  switch (typeFavorite) {
    case "favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        userId: user.id,
        songId: idSong,
      });

      if (!existFavoriteSong) {
        const record = new FavoriteSong({
          userId: user.id,
          songId: idSong,
        });
        await record.save();
      }
      break;
    case "unfavorite":
      await FavoriteSong.deleteOne({
        userId: user.id,
        songId: idSong,
      });
      break;
    default:
      break;
  }

  res.json({
    code: 200,
    message: "Cập nhật thành công!",
  });
};

// [PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const idSong = req.params.idSong;
  const song = await Song.findOne({
    _id: idSong,
    deleted: false,
  });

  const listen: number = song.listen + 1;

  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      listen: listen,
    }
  );

  const newSong = await Song.findOne({
    _id: idSong,
    deleted: false,
  });

  res.json({
    code: 200,
    message: "Cập nhật thành công!",
    listen: newSong.listen,
  });
};
