import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { Order } from './models/order.js';
import 'reflect-metadata';
import { Product } from './models/product.js';


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

  public async createOrder(order: Order): Promise<void> {
    const docRef = this.db.collection('orders').doc(order.id);
    console.log(order.interface);
    await docRef.set(order.interface);
  }

  public async completeOrder(orderId: string): Promise<void> {
    const docRef = this.db.collection('orders').doc(orderId);
    await docRef.update({ completed: true });
  }

}

