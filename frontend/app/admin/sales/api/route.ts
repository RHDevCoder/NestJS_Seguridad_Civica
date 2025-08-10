import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const transactionDate = searchParams.get('transactionDate')
    console.log(transactionDate)

    return Response.json(transactionDate)
}