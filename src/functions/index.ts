import {
  createPerson,
  deletePerson,
  getPersonDetail,
  listAllPersons,
  updatePerson,
} from "./person/person";
export const functions = {
  hello: {
    handler: "src/handlers/hello.handler",
    events: [
      {
        http: {
          method: "GET",
          path: "/hello",
          cors: true,
        },
      },
    ],
  },
  createPerson,
  deletePerson,
  updatePerson,
  getPersonDetail,
  listAllPersons,
};
