import prisma from "../../utils/db";
import { CreateProductSchema } from "./product.scheme";

export async function createProduct(productInput: CreateProductSchema) {
  const product = await prisma.products.create({
    data: productInput,
  });
  return product;
}

export async function removeProduct(id: number) {
  return prisma.products.delete({
    where: {
      id: id,
    },
  });
}

export async function getProduct(id: number) {
  return prisma.products.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      picture: true,
      createdAt: true,
    },
  });
}

export async function getProducts() {
  return prisma.products.findMany({
    select: {
      id: true,
      name: true,
      picture: true,
      createdAt: true,
    },
  });
}
