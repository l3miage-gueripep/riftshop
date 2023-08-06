export class Product {
    id;
    name;
    price;
    description;
    _image;
    constructor(id, name, price, description, _image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this._image = _image;
    }
    get interface() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description,
            _image: this._image
        };
    }
}
//# sourceMappingURL=product.js.map