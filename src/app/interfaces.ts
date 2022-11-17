export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string
}

export interface Restaurant {
    name: string,
    address: string,
    delivery_boy: string,
    description: string,
    img_URL: string,
    categories: []
}

export interface FoodItem {
    name: string,
    category: string,
    restaurant: string,
    description: string,
    active: boolean,
    price: number,
    is_veg: boolean,
    img_URL: string
}