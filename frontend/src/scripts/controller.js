/**
 * RPC Sift - A Sift demonstrating the Sift API access.
 */

import 'babel-polyfill';

import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class RPCSiftController extends SiftController {
  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView({ params }) {
    console.log('[rpc-sift|controller] loadView | params:', params);

    const apiToken = params.rpcJweToken.token;
    const userAccountId = params.userAccountId;

    const data = {
      apiToken,
      userAccountId,
    };

    const req = new XMLHttpRequest();

    req.addEventListener('load', () => {
      console.log('RESPONSE:', req.response);
    });

    req.addEventListener('error', () => {
      console.log('ERROR:', req.status);
    });

    req.open('POST', 'https://rpc.redsift.io/echo', true);

    req.setRequestHeader('Redsift-Account', userAccountId);
    req.setRequestHeader('Authorization', `Bearer ${apiToken}`);

    // if (data) {
      //req.setRequestHeader('Content-type', 'application/json');
    // }

    req.send('bla blub');

    return {
      html: 'summary.html',
      data,
    };
  }
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new RPCSiftController());
