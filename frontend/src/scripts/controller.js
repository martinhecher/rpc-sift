/**
 * RPC Sift - A Sift demonstrating the Sift API access.
 */

import 'babel-polyfill';

import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class RPCSiftController extends SiftController {
  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView({ params }) {
    console.log('[rpc-sift|controller] loadView | params:', params);

    const userAccountId = params.userAccountId;
    const rpcApiConfig = params.rpcApiConfig;

    const data = {
      userAccountId,
      rpcApiConfig,
    };

    console.log('[rpc - sift | view] loadView | data:', data);

    return {
      html: 'summary.html',
      data,
    };
  }
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new RPCSiftController());
