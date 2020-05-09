import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

export const app = express();

const firebaseApp = admin.initializeApp();

app
  .use(cors())
  .get('/', async (req, res) => {
    const userUid = req.query.userUid;

    try {
      const result = await firebaseApp.firestore()
        .collection('transactions')
        .where('owner', '==', userUid)
        .get();
      const totalAmount = result.docs
        .map(doc => doc.data().amount)
        .reduce((amount, total) => total + amount, 0);

      res.status(200).json({ totalAmount: totalAmount });
    }
    catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });