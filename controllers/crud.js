const express = require("express");
const asyncErrorHandler = require("../helpers/asyncErrorHandler");
const joiValidator = require("express-joi-validator");

class CrudController {
  constructor(service, schema) {
    this.service = service;
    this.schema = schema;

    this.readAll = this.readAll.bind(this);
    this.read = this.read.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.router = express.Router();
    this.routes = {
      "/": [
        { method: "get", cb: this.readAll, schema: this.schema.readAll },
        { method: "post", cb: this.create, schema: this.schema.create }
      ],
      "/:id": [
        { method: "get", cb: this.read, schema: this.schema.read },
        { method: "put", cb: this.update, schema: this.schema.update },
        { method: "delete", cb: this.delete, schema: this.schema.delete }
      ]
    };
  }

  async readAll(req, resp) {
    const result = await this.service.readChunk(req.params);

    resp.send(result);
  }

  async read(req, resp) {
    const result = await this.service.read(req.params.id);

    resp.send(result);
  }

  async create(req, resp) {
    resp.send(await this.service.create(req.body));
  }

  async update(req, resp) {
    resp.send(await this.service.update(req.params.id, req.body));
  }

  async delete(req, resp) {
    resp.send(await this.service.delete(req.params.id));
  }

  registerRoutes() {
    Object.keys(this.routes).forEach((route) => {
      let handlers = this.routes[route];

      if (!handlers || !Array.isArray(handlers)) return;

      for (let handler of handlers) {
        this.router[handler.method](route, joiValidator(handler.schema), asyncErrorHandler(handler.cb));
      }
    });
  }
}

module.exports = CrudController;