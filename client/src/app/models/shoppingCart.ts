import { v4 as uuidv4 } from 'uuid';

    export interface IShoppingCartItem {
        id: number;
        productName: string;
        price: number;
        quantity: number;
        pictureUrl: string;
        brand: string;
        type: string;
    }

    export interface IShoppingCart{
        id: string;
        items: IShoppingCartItem[];
    }
export class ShoppingCart implements IShoppingCart {
    id = uuidv4();
    items: IShoppingCartItem[] = [];
}

export interface IShoppingCartTotals {
    delivery: number;
    subtotal: number;
    tax: number;
    total: number;
}
