/**
 * RPC Sift - A Sift demonstrating the Sift API access.
 */

import 'babel-polyfill';

import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class RPCSiftController extends SiftController {
  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView({ params }) {
    console.log('[rpc-sift|controller] loadView | params:', params);

    const apiToken = `Bearer ${params.rpcJweToken.token}`;
    const userAccountId = params.userAccountId;

    const data = {
      apiToken,
      userAccountId,
    };

    return {
      html: 'summary.html',
      data,
    };
  }
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new RPCSiftController());
