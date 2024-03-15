"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favorite_song_route_1 = require("./favorite-song.route");
const search_route_1 = require("./search.route");
const clientRoute = (app) => {
    app.use('/topics', topic_route_1.topicRouter);
    app.use('/songs', song_route_1.songRouter);
    app.use('/favorite-songs', favorite_song_route_1.favoriteSongRouter);
    app.use('/search', search_route_1.searchRouter);
};
exports.default = clientRoute;
