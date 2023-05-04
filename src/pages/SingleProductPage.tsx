import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Product } from '../components/ListWithSearch'

const SingleProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | undefined>()
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then(
                data => data.json()
            ).then(
                data => setProduct(data)
            )
    }, [])
    return (
        <div>
            {product && (
                <>
                    <p>{product.title}</p>
                </>
            )}
        </div>
    )
}

export default SingleProductPage