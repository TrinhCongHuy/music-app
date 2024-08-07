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
exports.deleteItem = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.changeStatus = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const config_1 = require("../../config/config");
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false
    };
    const countSongs = yield song_model_1.default.countDocuments(find);
    const objectPagination = (0, pagination_1.default)({
        currentPage: 1,
        limitItems: 5
    }, req.query, countSongs);
    const songs = yield song_model_1.default.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
        }).select("fullName");
        const infoTopic = yield topic_model_1.default.findOne({
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
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    yield song_model_1.default.updateOne({
        _id: id
    }, {
        status: status
    });
    res.redirect("back");
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false,
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/songs/create", {
        titlePage: "Thêm mới bài hát",
        singers: singers,
        topics: topics,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const song = new song_model_1.default(dataSong);
    yield song.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
    });
    const singers = yield singer_model_1.default.find({
        deleted: false,
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/songs/edit", {
        titlePage: "Chỉnh sửa bài hát",
        song: song,
        singers: singers,
        topics: topics,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield song_model_1.default.updateOne({
        _id: idSong,
    }, dataSong);
    res.redirect("back");
});
exports.editPatch = editPatch;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield song_model_1.default.updateOne({
        _id: id
    }, {
        deleted: true
    });
});
exports.deleteItem = deleteItem;
