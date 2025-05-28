import { test, expect } from '@playwright/test';
import { Message } from '../scripts/message.js';
import ENV from '../utils/ENV.js';
import * as header from '../testData/headers.json';
import { stringFormat } from '../scripts/stringFormat.js';
import * as token from '../testData/api/accesstoken.json';
import * as testData from '../testData/bodyPriorPeriod.json';

export async function createPriorPeriodStatement(request) {
  const message = new Message(request);

  const Headers = stringFormat(JSON.stringify(header.headers), token.access_token);
  const Statement = testData.bodies.body;
  const StatementLineItemAssetData1 = testData.bodies.body1;
  const StatementLineItemAssetData2 = testData.bodies.body2;
  const StatemetntLineItemLiabilities = testData.bodies.body3;

  // Create Statement Record
  const responseStatement = await message.postMessageData(
    "Create_Statement",
    `${ENV.webapiURL}/crowe_statements`,
    JSON.parse(Headers),
    Statement,
    201
  );

  // Log the response
  console.log('Create Statement Response:', responseStatement);

  //Capture statementid from the response
  const crowe_statementid = responseStatement.crowe_statementid;


  StatementLineItemAssetData1['crowe_Statement@odata.bind'] = "/crowe_statements(" + crowe_statementid + ")";
  StatemetntLineItemLiabilities['crowe_Statement@odata.bind'] = "/crowe_statement(" + crowe_statementid + ")";


  // Create Statement Line Items - Assets
  await message.postMessageData(
    "Create_StatementLineItems_Assets",
    `${ENV.webapiURL}/crowe_statementlineitems`,
    JSON.parse(Headers),
    StatementLineItemAssetData1,
    201
  );

  await message.postMessageData(
    "Create_StatementLineItems_Assets",
    `${ENV.webapiURL}/crowe_statementlineitems`,
    JSON.parse(Headers),
    StatementLineItemAssetData2,
    201
  );

  await message.postMessageData(
    "Create_StatementLineItems_Liabilities",
    `${ENV.webapiURL}/crowe_statementlineitems`,
    JSON.parse(Headers),
    StatemetntLineItemLiabilities,
    201
  );

};