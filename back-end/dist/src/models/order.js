var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from "class-transformer";
import { CartItem } from "./cart-item.js";
export class Order {
    id;
    userUid;
    totalPrice;
    date;
    completed;
    items;
    constructor(id, userUid, items, totalPrice, date, completed = false) {
        this.id = id;
        this.userUid = userUid;
        this.totalPrice = totalPrice;
        this.date = date;
        this.completed = completed;
        this.items = items;
    }
    get interface() {
        const itemsInterface = this.items.map((item) => item.interface);
        return {
            userUid: this.userUid,
            items: itemsInterface,
            totalPrice: this.totalPrice,
            date: this.date,
            completed: this.completed,
        };
    }
}
__decorate([
    Type(() => CartItem),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
//# sourceMappingURL=order.js.map