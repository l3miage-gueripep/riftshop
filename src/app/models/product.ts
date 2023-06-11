export class Product {
    constructor(public id: number, public name: string, public price: number, public description: string, private _image: string) { }

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
}
