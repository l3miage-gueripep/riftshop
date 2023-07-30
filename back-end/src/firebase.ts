import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';


//all the code related to firebase
export class Firebase {
  public readonly app: any;
  private readonly db: Firestore;

  constructor() {
    this.app = initializeApp({
      credential: applicationDefault(),
    });
    this.db = getFirestore(this.app);
  }
 

  public async getProductPrice(productId: string): Promise<number> {
    const docRef = this.db.doc(`products/${productId}`);
    const data = (await docRef.get()).data();
    if (!data) {
      throw new Error(`No product found with id ${productId}`);
    }
    return data['price'];
  }
}

