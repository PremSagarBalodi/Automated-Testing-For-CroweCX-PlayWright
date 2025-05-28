/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIRequestContext, expect, test } from "@playwright/test";
//import { test } from "../../fixtures/fixture";

export class Message {
  readonly reqContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
  }

  /** Send post request with URL,headers and body
   * @param apiName
   * @param URL
   * @param headers
   * @param body
   * @param status
   * @param returns
   **/
  public async postMessage(apiName: string, URL: string, headers: any, body: any, status: any) {
    let statusResponse: any;
    let callResponse: any;

    await test.step(`Send the ${apiName} POST request`, async () => {
      const response = await this.reqContext.post(URL, {
        headers: headers,
        form: body,
      });

      statusResponse = response.status();
      callResponse = response.json();
    });

    await test.step(`Status code is ${status}`, async () => {
      const msg: string = "|| Validate || Status Code | Expected: " + status + " | Actual: " + statusResponse;
      expect(statusResponse, msg).toBe(status);
    });

    return callResponse;
  }

  public async postMessageData(apiName: string, URL: string, headers: any, body: any, status: any) {
    let statusResponse: any;
    let callResponse: any;
    let responseError: any;

    await test.step(`Send the ${apiName} POST request`, async () => {
     const response = await this.reqContext.post(URL, {
        headers: headers,
        data: body,
      });

      statusResponse = response.status();
      callResponse = await response.json();
      if (callResponse.error)
        {
          responseError = callResponse.error;
        }
    });

    console.log(callResponse);
    
    await test.step(`Status code is ${status}`, async () => {
      let msg: string = "|| Validate || Status Code | Expected: " + status + " | Actual: " + statusResponse + " | response: " + callResponse;
      if (responseError && responseError.message)
        {
          msg = msg + " | error: " +responseError.message;
        }
      expect(statusResponse, msg).toBe(status);
    });

    return callResponse;
  }

  // public async postMessageData(apiName: string, URL: string, headers: Record<string, string>, body: any, expectedStatus: number) {
  //   let statusResponse: any;
  //   let callResponse: any;

  //   await test.step(`Send the ${apiName} POST request`, async () => {
  //    const response = await this.reqContext.post(URL, {
  //       headers: headers,
  //       data: body,
  //     });

  //     statusResponse = response.status();
  //     callResponse = await response.json();
  //   });

  //   console.log(callResponse);
    
  //   await test.step(`Status code is ${expectedStatus}`, async () => {
  //     const msg: string = "|| Validate || Status Code | Expected: " + expectedStatus + " | Actual: " + statusResponse + " | response: " + JSON.stringify(callResponse);
  //     expect(statusResponse, msg).toBe(expectedStatus);
  //   });

  //   return callResponse;
  // }



  /**
   * Send Get request with URL,headers and status
   * @param apiName
   * @param URL
   * @param headers
   * @param status
   * @returns
   */
  
   public async getMessage(apiName: string, URL: string, headers: any, status: any) {
    let statusResponse: any;
    let callResponse: any;

    await test.step(`Send the ${apiName} Get request`, async () => {
      const response = await this.reqContext.get(URL, {
        headers: headers,
      });

      statusResponse = response.status();
      callResponse = response.json();
    });

    await test.step(`Status code is ${status}`, async () => {
      const msg: string = "|| Validate || Status Code | Expected: " + status + " | Actual: " + statusResponse;
      expect(statusResponse, msg).toBe(status);
    });

    return callResponse;
  }

  /**
   * Send Patch request with URL,headers and body
   * @param apiName
   * @param URL
   * @param headers
   * @param body
   * @param status
   * @returns
   */
  async patchMessage(apiName: string, URL: string, headers: any, body: any, status: any) {
    let statusResponse: any;
    let callResponse: any;

    await test.step(`Send the ${apiName} PATCH request`, async () => {
      const response = await this.reqContext.patch(URL, {
        headers: headers,
        data: body,
      });

      statusResponse = response.status();
      callResponse = response.json();
    });

    await test.step(`Status code is ${status}`, async () => {
      const msg: string = "|| Validate || Status Code | Expected: " + status + " | Actual: " + statusResponse;
      expect(statusResponse, msg).toBe(status);
    });

    return callResponse;
  }

  /**
   * Send Put request with URL,headers and body
   * @param apiName
   * @param URL
   * @param headers
   * @param body
   * @param status
   * @returns
   */
  async putMessage(apiName: string, URL: string, headers: any, body: any, status: any) {
    let statusResponse: any;
    let callResponse: any;

    await test.step(`Send the ${apiName} PUT request`, async () => {
      const response = await this.reqContext.put(URL, {
        headers: headers,
        data: body,
      });

      statusResponse = response.status();
      callResponse = response.json();
    });

    await test.step(`Status code is ${status}`, async () => {
      const msg: string = "|| Validate || Status Code | Expected: " + status + " | Actual: " + statusResponse;
      expect(statusResponse, msg).toBe(status);
    });

    return callResponse;
  }

  /**
   * Send Delete request with URL,headers and status
   * @param apiName
   * @param URL
   * @param headers
   * @param status
   * @returns
   */
  async deleteMessage(apiName: string, URL: string, headers: any, status: any) {
    let statusResponse: any;

    await test.step(`Send the ${apiName} DELETE request`, async () => {
      const response = await this.reqContext.delete(URL, {
        headers: headers,
      });

      statusResponse = response.status();
    });

    await test.step(`Status code is ${status}`, async () => {
      const msg: string = "|| Validate || Status Code | Expected: " + status + " | Actual: " + statusResponse;
      expect(statusResponse, msg).toBe(status);
    });

    return statusResponse;
  }

  /**
   * Send post request with URL, headers, and raw body
   * @param apiName
   * @param URL
   * @param headers
   * @param rawBody
   * @param status
   * @returns
   */
  public async postMessagewithRawBody(apiName: string, URL: string, headers: any, rawBody: any, status: any) {
    let statusResponse: any;
    let callResponse: any;

    await test.step(`Send the ${apiName} POST request`, async () => {
      const response = await this.reqContext.post(URL, {
        headers: headers,
        data: rawBody,
      });

      statusResponse = response.status();
      callResponse = response.json();
    });

    console.log(callResponse);

    await test.step(`Status code is ${status}`, async () => {
      const msg: string = "|| Validate || Status Code | Expected: " + status + " | Actual: " + statusResponse;
      expect(statusResponse, msg).toBe(status);
    });

    return callResponse;
  }
}
