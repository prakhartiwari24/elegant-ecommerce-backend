export interface CreateProductDto {
  name: string;
  price: number;
  categoryId: number;
  description?: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  categoryId?: number;
  description?: string;
}

export interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  description: string | null;
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponseDto {
  id: number;
  name: string;
}

export interface PaginatedProductsDto {
  products: ProductResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateCategoryDto {
  name: string;
}
export interface UpdateCategoryDto {
  name: string;
}

export interface CategoryResponseDto {
  id: number;
  name: string;
}

export interface ProductInOrderDto {
  id: number;
  name: string;
  price: number;
  description: string | null;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  orderProduct: {
    quantity: number;
  };
}

export interface OrderListDto {
  id: number;
  totalPrice: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponseDto extends OrderListDto {
  orderProducts: ProductInOrderDto[];
}

export interface SignupDto {
  email: string;
  password: string;
  role: "admin" | "user";
}
export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  success: boolean;
  token: string;
  expiresIn: string;
  email: string;
  id: number;
}
