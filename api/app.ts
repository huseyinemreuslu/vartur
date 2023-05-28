import fastify, { FastifyInstance } from "fastify";
import productRoutes from "./src/modules/product/product.route";
import cors from "@fastify/cors";
import { productSchemas } from "./src/modules/product/product.scheme";
import fastifyMultipart from "@fastify/multipart";

const server: FastifyInstance = fastify({ logger: true });
// const multipart = require("fastify-multipart");
// server.register(multipart);

server.register(fastifyMultipart, {
  addToBody: true,
});
server.register(productRoutes, { prefix: "/api/products" });

async function main() {
  await server.register(cors, {
    // This is NOT recommended for production as it enables reflection exploits
    origin: true,
  });
  for (const schema of productSchemas) {
    server.addSchema(schema);
  }
  try {
    server.listen({ port: 8080 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error) {}
}

main();
