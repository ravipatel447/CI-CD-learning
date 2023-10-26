import Joi from "joi";
import { PersonItem } from "@lib/model";

const PersonSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  hobbies: Joi.array().items(Joi.string().required()),
});

export const validatePersonPayload = (object: PersonItem) => {
  return PersonSchema.validate(object);
};
