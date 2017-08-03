/**
 * Botfwk Demo Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';
// import { SiftController, registerSiftController } from './sift-sdk-web/sdk';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    // this._suHandler = this.onStorageUpdate.bind(this);
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    debugger;

    try {
      throw new Error('');
    } catch(err) {
      console.log('[rpc-sift] loadView stack trace', err.stack);
    }
    console.log('botfwk-sift: loadView', state);
    // Register for storage update events on the "x" bucket so we can update the UI
    // this.storage.subscribe(['x'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        return {
          html: 'email-thread.html',
          data: {}
        };
      case 'summary':
        return {
          html: 'summary.html',
          data: this.getToken()
        };
      default:
        console.error('botfwk-sift: unknown Sift type: ', state.type);
    }
  }

  // Event: storage update
  // onStorageUpdate(value) {
  //   console.log('botfwk-sift: onStorageUpdate: ', value);
  //   return this.getX().then(xe => {
  //     // Publish events from 'x' to view
  //     this.publish('counts', xe);
  //   });
  // }

   getToken() {
    return this.storage.get({
      bucket: '_redsift',
      keys: ['botfwk/handshake_token']
    }).then((values) => {
      console.log('botfwk-sift: getToken returned:', values);
      return {
        token: values[0].value || ""
      };
    });
  }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
