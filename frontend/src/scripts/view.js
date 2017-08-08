/**
 * RPC Sift - A Sift demonstrating the Sift API access.
 */

import 'babel-polyfill';

import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class RPCSiftView extends SiftView {
  constructor() {
    super(); // initializes the SiftView base class

    this._userAccountId = null;
    this._apiToken = null;
    this._apiBaseUrl = null;
    this._userAccountIdHeaderName = null;
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  async presentView({ data }) {
    console.log('[rpc-sift|view] loadView | data:', data);

    const { userAccountId, rpcApiConfig } = data;
    const { apiToken, baseUrl, userAccountIdHeaderName } = rpcApiConfig;

    console.log('[rpc - sift | view] loadView | rpcApiConfig:', rpcApiConfig);

    this._userAccountId = userAccountId;
    this._apiToken = apiToken;
    this._apiBaseUrl = baseUrl;
    this._userAccountIdHeaderName = userAccountIdHeaderName;

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
      userAccountId: this._userAccountId,
      apiToken: this._apiToken,
      apiBaseUrl: this._apiBaseUrl,
      apiUserAccountIdHeader: this._userAccountIdHeaderName,
      method: 'POST',
      path: '/echo',
      data: repeatMe,
    });

    return response;
  }

  // TODO: integrate into sift-sdk-web!
  sendApiRequest({
    userAccountId,
    apiToken,
    apiBaseUrl,
    apiUserAccountIdHeader,
    method,
    path,
    data = null,
    headers = [],
    contentType = 'application/json',
  }) {
    console.log('asdf', userAccountId);
    console.log('asdf', apiToken);
    console.log('asdf', apiBaseUrl);
    console.log('asdf', apiUserAccountIdHeader);
    console.log('asdf', method);
    console.log('asdf', path);
    console.log('asdf', data);
    console.log('asdf', headers);
    console.log('asdf', contentType);

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

      req.open(method, `${apiBaseUrl}${path}`, true);

      req.setRequestHeader(apiUserAccountIdHeader, userAccountId);
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
