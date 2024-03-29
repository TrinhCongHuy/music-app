"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const moment_1 = __importDefault(require("moment"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false,
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false,
    });
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
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
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield song_model_1.default.findOne({
        slug: req.params.slugSong,
        status: "active",
        deleted: false,
    });
    const formattedDate = (0, moment_1.default)(song.createdAt, "MMMM Do YYYY").format('DD/MM/YYYY');
    song["formattedDate"] = formattedDate;
    const tokenUser = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({
        deleted: false,
        tokenUser: tokenUser,
    });
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
    }).select("title");
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
    }).select("fullName");
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        userId: user.id,
        songId: song.id,
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    const existLike = yield song_model_1.default.findOne({
        slug: req.params.slugSong,
        like: { $in: [user.id] },
    });
    let isActive;
    if (existLike) {
        isActive = true;
    }
    else {
        isActive = false;
    }
    const existFavorite = yield favorite_song_model_1.default.findOne({
        userId: user.id,
        songId: song.id,
    });
    let isFavorite;
    if (existFavorite) {
        isFavorite = true;
    }
    else {
        isFavorite = false;
    }
    res.render("client/pages/songs/detail", {
        titlePage: topic.title,
        song: song,
        topic: topic,
        singer: singer,
        isActive: isActive,
        isFavorite: isFavorite
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const tokenUser = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({
        deleted: false,
        tokenUser: tokenUser,
    });
    const existLike = yield song_model_1.default.findOne({
        _id: idSong,
        like: { $in: [user.id] },
    });
    let isExist;
    if (!existLike) {
        isExist = true;
        yield song_model_1.default.updateOne({
            _id: idSong,
        }, {
            $push: { like: user.id },
        });
    }
    else {
        isExist = false;
        yield song_model_1.default.updateOne({
            _id: idSong,
        }, {
            $pull: { like: user.id },
        });
    }
    const song = yield song_model_1.default.findOne({
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
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    const tokenUser = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({
        tokenUser: tokenUser,
        deleted: false
    });
    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                userId: user.id,
                songId: idSong,
            });
            if (!existFavoriteSong) {
                const record = new favorite_song_model_1.default({
                    userId: user.id,
                    songId: idSong,
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
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
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
    });
    const listen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: idSong,
    }, {
        listen: listen,
    });
    const newSong = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
    });
    res.json({
        code: 200,
        message: "Cập nhật thành công!",
        listen: newSong.listen,
    });
});
exports.listen = listen;
