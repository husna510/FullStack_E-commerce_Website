export interface Product {
    isNew: boolean;  
    _id: string;  
    title: string;
    _type: "product"; 
    discountPercentage?: number; 
    productImage?: {
        asset: {
            _ref: string; 
            _type: "image"; 
        };
    };
    price: number;
    description?: string;
    slug: {
        _type: "slug";
        current: string;
    };
    tags?: string[];  
    inventoryCount: number;
  }
  