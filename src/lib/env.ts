import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
  SERVICE_NAME: str(),
  STAGE: str(),
  AWS_ACCOUNT_ID: str(),
});
