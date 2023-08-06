import { Type } from "class-transformer";
import { CartItem } from "./cart-item.js";


export class Order{
    @Type(() => CartItem)
    public items: CartItem[];

    constructor(public id: string, public userUid: string, items: CartItem[], public totalPrice: number, public date: Date, public completed: boolean = false) { 
        this.items = items;
    }

    public get interface(): any {
        const itemsInterface: any[] = this.items.map((item: CartItem) => item.interface);
        return {
            userUid: this.userUid,
            items: itemsInterface,
            totalPrice: this.totalPrice,
            date: this.date,
            completed: this.completed,
        };
    }
} 