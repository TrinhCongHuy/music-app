import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";
import paginationHelper from "../../helpers/pagination";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
    let find = {
        deleted: false
    }

  // Pagination
  const countSongs = await Song.countDocuments(find)

  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 5
    },
    req.query,
    countSongs
  )

  const songs = await Song.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
    }).select("fullName");

    const infoTopic = await Topic.findOne({
      _id: song.topicId,
    }).select("title");

    song["infoSinger"] = infoSinger;
    song["infoTopic"] = infoTopic;
  }

  res.render("admin/pages/songs/index", {
    titlePage: "Danh sách bài hát",
    songs: songs,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/songs/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id = req.params.id
  const status = req.params.status

  await Song.updateOne(
    {
      _id: id
    },
    {
      status: status
    }
  )

  res.redirect("back")
}


// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const singers = await Singer.find({
    deleted: false,
  });

  const topics = await Topic.find({
    deleted: false,
  });

  res.render("admin/pages/songs/create", {
    titlePage: "Thêm mới bài hát",
    singers: singers,
    topics: topics,
  });
};

// [post] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";

  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics,
  };

  const song = new Song(dataSong);
  await song.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};

// [PATCH] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  const idSong = req.params.id;

  const song = await Song.findOne({
    _id: idSong,
    deleted: false,
  });

  const singers = await Singer.find({
    deleted: false,
  });

  const topics = await Topic.find({
    deleted: false,
  });

  res.render("admin/pages/songs/edit", {
    titlePage: "Chỉnh sửa bài hát",
    song: song,
    singers: singers,
    topics: topics,
  });
};

// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const idSong = req.params.id;

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyrics: req.body.lyrics,
  };

  if (req.body.avatar) {
    dataSong["avatar"] = req.body.avatar[0];
  }
  if (req.body.audio) {
    dataSong["audio"] = req.body.audio[0];
  }

  await Song.updateOne(
    {
      _id: idSong,
    },
    dataSong
  );

  res.redirect("back");
};


// [DELETE] /admin/songs/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
  const id = req.params.id

  await Song.updateOne(
      {
          _id: id
      },
      {
          deleted: true
      }
  )
}