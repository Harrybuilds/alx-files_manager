#!/usr/bin/node

import { redisClient } from '../utils/redis.js';
import { dbClient } from '../utils/db.js';

const getStatus = (req, res) => {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    res.Status(200).send({"redis": redisStatus, "db": dbStatus});
};

const getStats = async (req, res) => {
    const usersNo = await dbClient.nbUsers()
    const filesNo = await dbClient.nbFiles()
    res.Status(200).send({"users": usersNo, "files": filesNo});
};

module.exports = { getStatus, getStats };
