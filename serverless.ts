import env from "@lib/env";
import { functions } from "@functions/index";
import { ServerlessFrameworkConfiguration } from "serverless-schema";
import { Dynamodb } from "iam-floyd";
import { PERSON_TABLE_NAME } from "@lib/const";

const serverlessConfiguration: ServerlessFrameworkConfiguration = {
  service: "typescript-template",
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      watch: {
        pattern: "src/**/*.ts",
      },
    },
    stage: env.STAGE,
    stages: ["staging", "prod"],
    prune: {
      automatic: true,
      number: 3,
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-prune-plugin",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "us-west-2",
    stage: env.STAGE,
    deploymentBucket: {
      name: env.DEPLOYMENT_BUCKET,
      maxPreviousDeploymentArtifacts: 2,
    },
    environment: {
      ...env,
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    iamRoleStatements: [
      new Dynamodb()
        .allow()
        .toGetItem()
        .toConditionCheckItem()
        .toScan()
        .toPutItem()
        .toUpdateItem()
        .toBatchWriteItem()
        .toQuery()
        .toBatchGetItem()
        .toDescribeTable()
        .toDeleteItem()
        .onTable(PERSON_TABLE_NAME)
        .toJSON(),
    ],
  },
  functions,
  package: {
    individually: true,
  },
};

module.exports = serverlessConfiguration;
