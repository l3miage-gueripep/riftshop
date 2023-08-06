export class Product {
    constructor(public id: string, public name: string, public price: number, public description: string, public _image: string) { }
    public get interface(): any {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description,
            _image: this._image
        };
    }
}