const express = require('express');
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");
const server = express();

server.use(express.json());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

module.exports = server;
