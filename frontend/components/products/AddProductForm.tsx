"use client"

import { addProduct } from "@/actions/add-product-action"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"


export default function AddProductForm({children} : {children : React.ReactNode}) {

    const [ state, dispatch ] = useActionState(addProduct, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
    }, [state])

    return (
        <form
            className="space-y-4"
            action={dispatch}
        >
            {children}
            <input
                type="submit"
                className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
                value="Agregar Producto"
            />
        </form>
    )
}
