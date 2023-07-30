import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
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
}
//# sourceMappingURL=firebase.js.map