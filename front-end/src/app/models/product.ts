import { DocumentSnapshot } from "firebase/firestore";

export class Product {
  constructor(public id: string, public name: string, public price: number, public description: string, private _image: string) { }
  get image(): string {
    let imageLocation = "assets/images/";
    return imageLocation + this._image;
  }

  set image(image: string) {
    this._image = image;
  }

  get frenchPrice(): string {
    return "€ " + this.price.toString().replace(".", ",");
  }

  toString(): string {
    return `Product: { id: ${this.id}, name: ${this.name}, price: ${this.price}, description: ${this.description}, image: ${this._image} }`;
  }

  public static get firebaseConverter(): any {
    return {
      toFirestore: (product: Product) => {
        return product.interface;
      },
      fromFirestore: (snapshot: DocumentSnapshot) => {
        const data = snapshot.data();
        if (!data) {
          return null;
        }
        return new Product(snapshot.id, data['name'], data['price'], data['description'], data['image']);
      }
    }
  }
  public get interface(): any {
    return {
      ...(this.id ? { id: this.id } : {}),
      name: this.name,
      description: this.description,
      price: this.price,
      image: this._image
    };
  }
}
