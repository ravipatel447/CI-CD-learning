import { AwsFunction } from "serverless-schema";

export const createPerson: AwsFunction = {
  handler: "src/handlers/person/person.createPerson",
  events: [
    {
      http: {
        method: "Post",
        path: "/person/create",
        cors: true,
      },
    },
  ],
};

export const updatePerson: AwsFunction = {
  handler: "src/handlers/person/person.updatePerson",
  events: [
    {
      http: {
        method: "Put",
        path: "/person/{id}/update",
        cors: true,
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

export const listAllPersons: AwsFunction = {
  handler: "src/handlers/person/person.listAllPersons",
  events: [
    {
      http: {
        method: "Get",
        path: "/person/list",
        cors: true,
      },
    },
  ],
};

export const getPersonDetail: AwsFunction = {
  handler: "src/handlers/person/person.getPersonDetail",
  events: [
    {
      http: {
        method: "Get",
        path: "/person/{id}/detail",
        cors: true,
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};

export const deletePerson: AwsFunction = {
  handler: "src/handlers/person/person.deletePerson",
  events: [
    {
      http: {
        method: "Delete",
        path: "/person/{id}/delete",
        cors: true,
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};
