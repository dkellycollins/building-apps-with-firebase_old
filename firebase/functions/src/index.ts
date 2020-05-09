import * as functions from 'firebase-functions';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { app } from './app';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const api = functions.https.onRequest(app);

const visionClient = new ImageAnnotatorClient();
const imageDataPath = 'test';

export const processRecieptImage = functions.storage.object()
  .onFinalize(async (object) => {
    if (!object.name) {
      console.log("object.name is undefined. Exiting.");
      return;
    }
    if (!object.name.startsWith(imageDataPath)) {
      console.log(`object.name, ${object.name}, is not in the ${imageDataPath} folder. Exiting...`);
      return;
    }

    const imageUrl = `gs://${object.bucket}/${object.name}`;
    console.log(`Processing image ${imageUrl}`);
    const results = await visionClient.textDetection(imageUrl);
    console.log(JSON.stringify(results));
  });