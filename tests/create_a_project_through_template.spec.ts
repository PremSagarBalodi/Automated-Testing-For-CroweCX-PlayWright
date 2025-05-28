import { test, expect } from '@playwright/test';
import { login } from './login_croweCX.js';
import { Message } from '../scripts/message.js';
import ENV from '../utils/ENV.js';
import * as header from '../testData/headers.json';
import { stringFormat } from '../scripts/stringFormat.js';
import * as token from '../testData/api/accesstoken.json';
import * as testData from '../testData/bodyProject.json';
import path from 'path';
import { assert } from 'console';
//import { TIMEOUT } from 'dns';

test('Create a Project through a Project Template', async ({ page, request }) => {
  const message = new Message(request);

  const Headers = stringFormat(JSON.stringify(header.headers), token.access_token);
  const ProjectTemplateData = testData.bodies.body_projectTemplates;
  const ProjectMilestonesData = testData.bodies.body_ProjectMilestones;
  const ProjectActionItemTemplatesData = testData.bodies.body_ProjectActionItemTemplates;
  const ProjectData = testData.bodies.body_Project;

  // Create Project Template
  const responsePT = await message.postMessageData(
    "Create_ProjectTemplate",
    `${ENV.webapiURL}/crowe_projecttemplates`,
    JSON.parse(Headers),
    ProjectTemplateData,
    201
  );

  // Log the response
  console.log('Create Project Template Response', responsePT);

  //Capture projecttemplateid from the response
  const projecttemplateid = responsePT.crowe_projecttemplateid;

  ProjectMilestonesData['crowe_ProjectId_crowe_projecttemplate@odata.bind'] = "/crowe_projecttemplates(" + projecttemplateid + ")";
  ProjectActionItemTemplatesData['crowe_ProjectTemplateId@odata.bind'] = "/crowe_projecttemplates(" + projecttemplateid + ")";
  ProjectData['crowe_ProjectTemplateId@odata.bind'] = "/crowe_projecttemplates(" + projecttemplateid + ")";
  

  // Create Project Milestones for the above Project Template
  const responsePM = await message.postMessageData(
    "Create_ProjectMilestones",
    `${ENV.webapiURL}/crowe_projectmilestones`,
    JSON.parse(Headers),
    ProjectMilestonesData,
    201
  );
 
  //Log the Response
  console.log('Create Project Milestone Response', responsePM);

  // Capture projectmilestoneid from the response
  const milestoneId = responsePM.crowe_projectmilestoneid;

  // Update Body2 with crowe_projectmilestoneid
  ProjectActionItemTemplatesData['crowe_ProjectMilestoneId@odata.bind'] = "/crowe_projectmilestones(" + milestoneId + ")";

  // Create Project Action Item Template with above Milestones
  await message.postMessageData(
    "Create_ProjectActionItemTemplate",
    `${ENV.webapiURL}/crowe_projectactionitemtemplates`,
    JSON.parse(Headers),
    ProjectActionItemTemplatesData,
    201
  );

  // Create Project using above Project Template
  await message.postMessageData(
    "Create_Project",
    `${ENV.webapiURL}/crowe_projects`,
    JSON.parse(Headers),
    ProjectData,
    201
  );

  await login(page);
  await page.locator("//span[normalize-space()='Projects']").click({ timeout: 8000 });
  await page.locator("//input[@placeholder='Filter by keyword']").fill("Automated");
  await page.keyboard.press('Enter');
  await page.locator("//span[@role='presentation'][normalize-space()='Automated-Project-1']").click({ timeout: 10000 });
  await page.waitForLoadState();
  const Details = "//li[@title='Details']";
  await page.locator(Details).click();

  const toggleSelector = "//button[@aria-disabled='false']";
  (await page.waitForSelector(toggleSelector)).click();
  const clockIcon = "//div[@role='gridcell']//div//div//div//div//div[@role='none']//*[name()='svg']";
  await page.locator(clockIcon).click();
});