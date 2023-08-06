export class OrderItem {
    productId;
    quantity;
    constructor(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
    get toFirebase() {
        return {
            productId: this.productId,
            quantity: this.quantity
        };
    }
}
//# sourceMappingURL=order-item.js.map