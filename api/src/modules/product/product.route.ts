import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  getProductHandler,
  getProductsHandler,
  removeProductHandler,
} from "./product.controller";
import { $ref } from "./product.scheme";
const multer = require("fastify-multer");
const upload = multer({ dest: "uploads/" });
async function productRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createProductSchema"),
        response: {
          201: $ref("productResponseSchema"),
        },
      },
    },
    createProductHandler
  );
  server.put(
    "/:id",
    {
      schema: {
        body: $ref("createProductSchema"),
        params: {
          id: { type: "number" },
        },
        response: {
          201: $ref("productResponseSchema"),
        },
      },
    },
    createProductHandler
  );
  server.post(
    "/upload/:id",
    { preHandler: upload.single("picture") },
    function (request, reply) {
      // request.file is the `avatar` file
      // request.body will hold the text fields, if there were any
      console.log(request.file);

      reply.code(200).send("SUCCESS");
    }
  );
  server.delete(
    "/:id",
    {
      schema: {
        params: {
          id: { type: "number" },
        },
      },
    },
    removeProductHandler
  );
  server.get(
    "/:id",
    {
      schema: {
        params: {
          id: { type: "number" },
        },
        response: {
          200: $ref("productResponseSchema"),
        },
      },
    },
    getProductHandler
  );
  server.get(
    "/",
    {
      schema: {
        querystring: {
          name: { type: "string" },
          skip: { type: "number" },
          take: { type: "number" },
        },
        response: {
          200: $ref("productsResponseSchema"),
        },
      },
    },
    getProductsHandler
  );
}

export default productRoutes;
