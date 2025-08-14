"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditProductForm({children} : {children : React.ReactNode}) {

    const router = useRouter()



    return (
        <form
            className="space-y-4"
        >
            {children}
            <input
                type="submit"
                className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
                value="Guardar Cambios"
            />
        </form>
    )
}
