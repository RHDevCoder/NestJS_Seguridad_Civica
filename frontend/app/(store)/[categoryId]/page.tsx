type Params = Promise<{categoryId: string}>

async function getProducts(categoryId: string) {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
    const req = await fetch(url)
    const json = await req.json()
    console.log("Datos recibidos desde el backend:", json)
    return json
}

export default async function StorePage({ params }: { params: Params }) {
    const { categoryId } = await params

    const data = await getProducts(categoryId)

    return (
    <div>
        <h1>StorePage</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
    )
}