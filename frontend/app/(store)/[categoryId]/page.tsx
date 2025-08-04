import { CategoryWithProductsResponseSchema } from "@/app/src/schemas"

type Params = Promise<{categoryId: string}>

async function getProducts(categoryId: string) {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
    const req = await fetch(url)
    const json = await req.json()
    const products = CategoryWithProductsResponseSchema.parse(json)
    return products
}

export default async function StorePage({params}: {params: Params}) {
    const { categoryId } = await params
    const products = await getProducts(categoryId)

    console.log(products)

    return (
        <div>
            <h1>StorePage</h1>
            <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
    )
}