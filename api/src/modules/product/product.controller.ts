import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
} from "./product.service";
import { CreateProductSchema, DeleteProductSchema } from "./product.scheme";
import { log } from "console";

export async function createProductHandler(
  request: FastifyRequest<{
    consumes: ["multipart/form-data"];
    Body: CreateProductSchema;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const product = await createProduct(body);
    return reply.code(500).send(product);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

export async function getProductsHandler() {
  const products = await getProducts();
  return products;
}

export async function getProductHandler(
  request: FastifyRequest<{
    Params: {
      id: number;
    };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const product = await getProduct(id);

  if (!product) return reply.code(404).send();

  return reply.code(200).send(product);
}

export async function deleteProductHandler(
  request: FastifyRequest<{ Params: DeleteProductSchema }>,
  reply: FastifyReply
) {
  try {
    const query = request.params;
    const product = await removeProduct(query.id);
    return reply.code(201).send(product);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

export async function removeProductHandler(
  request: FastifyRequest<{
    Params: {
      id: number;
    };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  const product = await getProduct(id);
  if (!product) return reply.code(404).send();

  await removeProduct(id);

  return reply.code(200).send();
}
