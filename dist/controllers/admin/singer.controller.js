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
exports.deleteItem = exports.createPost = exports.create = exports.changeStatus = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    const countSingers = yield singer_model_1.default.countDocuments(find);
    let objectPagination = (0, pagination_1.default)({
        currentPage: 1,
        limitItems: 5
    }, req.query, countSingers);
    const singers = yield singer_model_1.default.find(find).limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    for (const singer of singers) {
        const countSong = yield song_model_1.default.countDocuments({
            singerId: singer.id
        });
        singer["countSong"] = countSong;
    }
    res.render("admin/pages/singers/index", {
        titlePage: "Danh sách ca sĩ",
        singers: singers,
        pagination: objectPagination
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    yield singer_model_1.default.updateOne({
        _id: id
    }, {
        status: status
    });
    res.redirect("back");
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        titlePage: "Thêm mới ca sĩ"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status,
        avatar: req.body.avatar
    };
    const singer = new singer_model_1.default(dataSinger);
    yield singer.save();
    res.redirect("back");
});
exports.createPost = createPost;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield singer_model_1.default.updateOne({
        _id: id
    }, {
        deleted: true
    });
});
exports.deleteItem = deleteItem;
