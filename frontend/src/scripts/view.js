/**
 * RPC Sift - A Sift demonstrating the Sift API access.
 */

import 'babel-polyfill';

import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class RPCSiftView extends SiftView {
  constructor() {
    super(); // initializes the SiftView base class

    this._apiToken = null;
    this._userAccountId = null;
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  async presentView({ data }) {
    console.log('[rpc-sift|view] loadView | data:', data);

    const { apiToken, userAccountId } = data;

    this._apiToken = apiToken;
    this._userAccountId = userAccountId;

    try {
      const response = await this._getDataFromAPI({
        repeatMe: 'A warm welcome from your Sift API!'
      });

      console.log('[rpc-sift] API response:', response);

      document.getElementById('apiResult').textContent = response;
    } catch(err) {
      console.error('[rpc-sift] API error:', err);

      document.getElementById('apiResult').textContent = err.message;
    }
  };

  async _getDataFromAPI({ repeatMe }) {
    const { response } = await this.sendApiRequest({
      apiToken: this._apiToken,
      userAccountId: this._userAccountId,
      method: 'POST',
      path: '/echo',
      data: repeatMe,
    });

    return response;
  }

  // TODO: integrate into sift-sdk-web!
  sendApiRequest({
    apiToken,
    userAccountId,
    method,
    path,
    data = null,
    headers = [],
    contentType = 'application/json',
  }) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.addEventListener('load', () => {
        resolve({
          response: req.response,
          status: req.status,
        });
      });

      req.addEventListener('error', () => {
        reject({
          message: `Error accessing the API | method: ${method} | path: ${path} | status: ${req.status}`,
          status: req.status,
        });
      });

      req.open(method, `https://rpc.redsift.io${path}`, true);

      req.setRequestHeader('Redsift-Account', userAccountId);
      req.setRequestHeader('Authorization', `Bearer ${apiToken}`);

      headers.forEach((header) => {
        req.setRequestHeader(header.key, header.value);
      });

      if (data) {
        req.setRequestHeader('Content-type', contentType);
      }

      const _data = data ? data : undefined;

      req.send(_data);
    });
  }
}

registerSiftView(new RPCSiftView(window));
