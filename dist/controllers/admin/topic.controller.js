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
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    const countTopics = yield topic_model_1.default.countDocuments(find);
    let objectPagination = (0, pagination_1.default)({
        currentPage: 1,
        limitItems: 5
    }, req.query, countTopics);
    const topics = yield topic_model_1.default.find(find).limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    res.render("admin/pages/topics/index", {
        titlePage: "Trang chủ đề",
        topics: topics,
        pagination: objectPagination
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    const id = req.params.id;
    yield topic_model_1.default.updateOne({ _id: id }, {
        status: status
    });
    res.redirect('back');
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/topics/create", {
        titlePage: "Thêm mới chủ đề"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = new topic_model_1.default(req.body);
    yield topic.save();
    res.redirect("back");
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.findOne({
        _id: id
    });
    res.render("admin/pages/topics/edit", {
        titlePage: "Sửa chủ đề",
        topic: topic
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield topic_model_1.default.updateOne({
        _id: id
    }, {
        title: req.body.title,
        avatar: req.body.avatar,
        description: req.body.description,
        status: req.body.status
    });
    res.redirect("back");
});
exports.editPatch = editPatch;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield topic_model_1.default.updateOne({
        _id: id
    }, {
        deleted: true
    });
    res.redirect("back");
});
exports.deleteItem = deleteItem;
