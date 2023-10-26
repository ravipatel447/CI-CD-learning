import { response } from "@lib/api-gateway";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from "uuid";
import { PersonModel, PersonItem } from "@lib/model";
import { validatePersonPayload } from "@lib/validators";

export const createPerson: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  console.log(event);

  let payload: PersonItem;
  if (typeof event.body === "string") {
    payload = JSON.parse(event.body);
  } else {
    payload = event.body as unknown as PersonItem;
  }

  try {
    const validate = validatePersonPayload(payload);
    if (validate.error) {
      console.log("Validation error :=", validate.error.details[0].message);
      throw new Error(
        `Validation Error : ${validate.error.details[0].message}`
      );
    }
    const { name, email, hobbies }: PersonItem = validate.value;

    const item = await PersonModel.create({
      id: uuid(),
      name,
      email,
      hobbies,
    });

    return response(200, {
      data: {
        item,
      },
      error: false,
    });
  } catch (err) {
    console.error(err);
    return response(400, { message: err.message, error: JSON.stringify(err) });
  }
};

export const updatePerson: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  let payload: PersonItem;
  if (typeof event.body === "string") {
    payload = JSON.parse(event.body);
  } else {
    payload = event.body as unknown as PersonItem;
  }
  const pathParameters = event?.pathParameters || {};
  try {
    const id = pathParameters["id"];
    if (!id) throw new Error(`id not specified in PathParameters`);

    const validate = validatePersonPayload(payload);
    if (validate.error) {
      console.log("Validation error :=", validate.error.details[0].message);
      throw new Error(
        `Validation Error : ${validate.error.details[0].message}`
      );
    }
    const { name, email, hobbies }: PersonItem = validate.value;
    const item = await PersonModel.get({
      id,
    });
    item.hobbies = JSON.parse(JSON.stringify(hobbies));
    item.name = name;
    item.email = email;
    await item.save();

    return response(200, {
      data: {
        item,
      },
      error: false,
    });
  } catch (err) {
    console.error(err);
    return response(400, { message: err.message, error: JSON.stringify(err) });
  }
};

export const listAllPersons: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  console.log(event);
  const queryStringParams = event.queryStringParameters || {};
  try {
    const pageLimit = queryStringParams["limit"]
      ? parseInt(queryStringParams["limit"])
      : 20;
    const exclusiveStartKey = queryStringParams["exclusiveStartKey"]
      ? JSON.parse(queryStringParams["exclusiveStartKey"])
      : null;

    const Items = await PersonModel.scan()
      .limit(pageLimit)
      .startAt(exclusiveStartKey)
      .exec();

    return response(200, {
      data: { Items, Count: Items.count, LastEvaluatedKey: Items.lastKey },
      error: false,
    });
  } catch (err) {
    console.log("err:", err);
    return response(400, { message: err.message, error: JSON.stringify(err) });
  }
};

export const getPersonDetail: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  const pathParameters = event?.pathParameters || {};
  try {
    const id = pathParameters["id"];
    if (!id) throw new Error(`id not specified in PathParameters`);

    const person = await PersonModel.get({
      id,
    });
    if (!person) throw new Error(`Person not found`);
    return response(200, {
      data: {
        item: person,
      },
      error: false,
    });
  } catch (err) {
    console.error(err);
    return response(400, {
      message: err.message,
      error: JSON.stringify(err),
    });
  }
};

export const deletePerson: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  const pathParameters = event?.pathParameters || {};
  try {
    const id = pathParameters["id"];
    if (!id) throw new Error(`id not specified in PathParameters`);

    await PersonModel.delete({
      id,
    });
    console.log(`person with id ${id} has been removed`);
    return response(200, {
      message: `person with id ${id} has been removed`,
    });
  } catch (err) {
    console.error(err);
    return response(400, {
      message: err.message,
      error: JSON.stringify(err),
    });
  }
};
