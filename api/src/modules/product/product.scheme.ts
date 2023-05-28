import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

/*
id        Int     @id @default(autoincrement())
name     String
picture   String?
createdAt          DateTime  @default(now())
updatedAt          DateTime  @updatedAt
*/

const productInput = {
  name: z.string(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const deleteProductSchema = z.object({
  id: z.number(),
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
});
