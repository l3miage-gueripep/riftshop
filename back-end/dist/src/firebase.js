import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'reflect-metadata';
//all the code related to firebase
export class Firebase {
    app;
    db;
    constructor() {
        this.app = initializeApp({
            credential: applicationDefault(),
        });
        this.db = getFirestore(this.app);
    }
    async getProductPrice(productId) {
        const docRef = this.db.doc(`products/${productId}`);
        const data = (await docRef.get()).data();
        if (!data) {
            throw new Error(`No product found with id ${productId}`);
        }
        return data['price'];
    }
    async createOrder(order) {
        const docRef = this.db.collection('orders').doc(order.id);
        console.log(order.interface);
        await docRef.set(order.interface);
    }
    async completeOrder(orderId) {
        const docRef = this.db.collection('orders').doc(orderId);
        await docRef.update({ completed: true });
    }
}
//# sourceMappingURL=firebase.js.map