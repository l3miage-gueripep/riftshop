import { DocumentSnapshot } from "firebase/firestore";
import { Type, plainToInstance } from "class-transformer";
import { CartItem } from "./cart-item";

export class Order {
  @Type(() => CartItem)
  public items: CartItem[];

  constructor(public id: string, public userUid: string, items: CartItem[], public totalPrice: number, public date: Date, public completed: boolean = false) { 
    this.items = items;
  }

  public get formattedDate(): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthString = months[this.date.getMonth()];
    const day = this.date.getDate();
    const year = this.date.getFullYear();
    return `${monthString} ${day}, ${year}`;
  }

  public get frenchTotalPrice(): string {
    return '€ ' + this.totalPrice.toFixed(2).replace('.', ',');
  }

  public static get firebaseConverter(): any {
    return {
      toFirestore: (order: Order) => {
        const itemsInterface = order.items.map(item => item.interface);
        return {
          items: itemsInterface,
          totalPrice: order.totalPrice,
          date: order.date,
          completed: order.completed,
        };
      },
      fromFirestore: (snapshot: DocumentSnapshot) => {
        const data = snapshot.data();
        if (!data) {
          return null;
        }
        const items = plainToInstance(CartItem, data['items']);
        const date = new Date(data['date']['seconds'] * 1000);
        return new Order(snapshot.id, data['userUid'], items, data['totalPrice'], date, data['completed']);
      }
    }
  }
}