const redis = require('redis');

const publisher = redis.createClient(process.env.REDIS_URL);
const subscriber = redis.createClient(process.env.REDIS_URL);

exports.publisher = publisher;
exports.subscriber = subscriber;

// var express = require('express');
// var router = express.Router();
// const Redis = require('ioredis');
// const redis = new Redis({host: "redis"});
// const subscriber = redis;
// const publisher = redis;

// router.get(subscriber, (redis) => {
//     redis.subscribe('coords');
// });


// var subscriber = new Redis(6379, "127.0.0.1");
// var urlRedis = new Redis();
//
// exports.subscriber = subscriber;
// exports.publisher = publisher;
// module.exports = Redis;
