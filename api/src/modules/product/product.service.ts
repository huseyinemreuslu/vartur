import prisma from "../../utils/db";
import { CreateProductSchema } from "./product.scheme";

export async function createProduct(productInput: CreateProductSchema) {
  const product = await prisma.products.create({
    data: productInput,
  });
  return product;
}

export async function updateProduct(
  productInput: CreateProductSchema,
  id: number
) {
  const product = await prisma.products.update({
    where: {
      id: id,
    },
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

export async function getProductLength(name: string) {
  return prisma.products.count({
    where: {
      name: {
        contains: name,
      },
    },
  });
}

export async function getProducts(name: string, skip: number, take: number) {
  return prisma.products.findMany({
    skip: skip,
    take: take,
    where: {
      name: {
        contains: name,
      },
    },
    select: {
      id: true,
      name: true,
      picture: true,
      createdAt: true,
    },
  });
}
