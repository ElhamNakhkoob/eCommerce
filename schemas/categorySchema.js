import { z } from "zod/v4";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export default categorySchema;
