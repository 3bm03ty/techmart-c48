import { ProductDetailsResponse, ProductsResponse } from "@/types/response";


class ApiServices {

    async getProducts(): Promise<ProductsResponse> {
        const response = await fetch(process.env.BASE_URL + "/api/v1/products")
        const data = await response.json()

        return data;
    }


    async getProductDetails(productId: string): Promise<ProductDetailsResponse> {
        const response = await fetch(process.env.BASE_URL + "/api/v1/products/" + productId)
        const data = await response.json()

        return data;
    }
}


const apiServices = new ApiServices()

export default apiServices;