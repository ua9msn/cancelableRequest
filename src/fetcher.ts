import { xhrMock } from "./xhrMock";

export function fetcherFactory(numOfRetry = 3) {
  let controller: AbortController;
  let retryCounter = numOfRetry;

  return async function fetcher(url: string) {
    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    retryCounter = numOfRetry;

    while (true) {
      try {
        return await xhrMock("retryCounter", retryCounter, controller.signal);
      } catch (err) {
        retryCounter--;
        console.log(retryCounter);
        if (retryCounter < 1) {
          throw err;
        }
      }
    }
  };
}
