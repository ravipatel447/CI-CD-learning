import { PERSON_TABLE_NAME } from "@lib/const";
import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export interface Person {
  id: string;
  name: string;
  email: string;
  hobbies: Array<string>;
}

export class PersonItem extends Item implements Person {
  id: string;
  name: string;
  email: string;
  hobbies: Array<string>;
}

export const PersonSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hoobbies: {
      type: Array,
      schema: [String],
      required: false,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

export const PersonModel = dynamoose.model<PersonItem>(
  PERSON_TABLE_NAME,
  PersonSchema
);
