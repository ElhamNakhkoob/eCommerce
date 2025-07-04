import {z} from "zod/v4";

const userSchema = z.object({
  name: z.string()
  .min(4, "Name must be at least 4 character long")
  .max(30, "Name cannot be longer than 30 character"),

  email: z.string().min(7, "Email must be at least 7 character long"),

  password: z.string().min(5, "Password must be at least 5 character long")
});

export default userSchema;