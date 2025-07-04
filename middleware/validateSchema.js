import {z} from "zod/v4";

const validateSchema = (zodschema) => (req, res, next) => {
  const {data, error} = zodschema.safeParse(req.body);
  if(error){
    next(new Error(z.prettifyError(error), {cause: 400}));
  } else {
    req.sanitizedBody = data;
    next();
  }
};

export default validateSchema;