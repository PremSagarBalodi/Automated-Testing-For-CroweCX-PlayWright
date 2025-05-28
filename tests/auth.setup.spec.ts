import { test as setup } from "@playwright/test";
import * as fs from "fs";
import * as authData from "../testData/api/authentication.json";
import { stringFormat } from "../scripts/stringFormat.ts";
import ENV from "../utils/ENV.ts";
import { Message } from "../scripts/message.ts";
import { writeJsonFile } from "../utils/schemaHelperFunction.ts";

/* Generate access token for API Authentication */
setup("Generate Authorization Token", async ({ request }) => {
  const tokenFilePath = "testData/api/accesstoken.json";

  /* Update the body of the authentication post request based on environment variable */
  const authenticationBody: any = stringFormat(
    JSON.stringify(authData.Authentication.body),
    ENV.authenticationUsername,
    ENV.authenticationPassword,
    ENV.applicationURL
  );

  const message = new Message(request);

  /* Send the request to generate the token */
  const response = await message.postMessage(
    "Authentication",
    ENV.authenticationURL,
    authData.Authentication.headers,
    JSON.parse(authenticationBody),
    200
  );

  /* Read access token value from the response */
  const access_token = await response.access_token;
  const content = await JSON.parse(fs.readFileSync(tokenFilePath, "utf8"));
  content.access_token = access_token;
  /* Store access token to the testdata json file  */
  await writeJsonFile(tokenFilePath, JSON.stringify(content));
});