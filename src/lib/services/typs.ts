

export interface CategoryType { 
    _id?:string  ,
    name?:string,
    price?:Number,
    quantity?:Number
    }
export interface ProductType { 
    _id?:string  ,
    name?:string,
    price?:Number,
    quantity?:Number,
    category?:string
    subcategory?:string
    images?:any
    }