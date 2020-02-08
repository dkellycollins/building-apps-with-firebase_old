import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const dataPath = 'transactions/json';

export const processData = functions.storage.object()
  .onFinalize(async (object) => {
    if (!object.name) {
      console.log("object.name is undefined. Exiting.");
      return;
    }
    if (!object.name.startsWith(dataPath)) {
      console.log(`object.name, ${object.name}, is not in the ${dataPath} folder. Exiting...`);
      return;
    }

    const app = admin.initializeApp();
    const fileBuffer = await app
      .storage()
      .bucket(object.bucket)
      .file(object.name)
      .download();
    const data = JSON.parse(fileBuffer.toString());
    const transaction = {
      owner: data.owner,
      category: data.category,
      amount: data.amount,
      date: admin.firestore.Timestamp.fromDate(new Date(data.date))
    }

    await app
      .firestore()
      .collection('transactions')
      .add(transaction);
    console.log(`Added transaction from object ${object.name}.`);
  });