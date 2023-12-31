var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Product } from "./product.js";
import { Type } from "class-transformer";
export class CartItem {
    id;
    quantity;
    product;
    constructor(id, quantity, product) {
        this.id = id;
        this.quantity = quantity;
        this.product = product;
    }
    get interface() {
        console.log(this.product);
        console.log(this.product.interface);
        return {
            product: this.product.interface,
            quantity: this.quantity
        };
    }
}
__decorate([
    Type(() => Product),
    __metadata("design:type", Product)
], CartItem.prototype, "product", void 0);
//# sourceMappingURL=cart-item.js.map