import React, { useEffect, useState } from 'react'

export interface Product {
    id: number
    title: string
    price: number
}

const useDebounce = <T,>(
    filterFunc: (items: T[], filter: string) => T[],
    items: T[]
) => {
    const [filteredItems, setFilteredItems] = useState(items)
    const [filter, setFilter] = useState("")
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilteredItems(filterFunc(items, filter))
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [filter, items])
    const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }
    return {
        onChangeFilter,
        filter,
        filteredItems
    }
}

const ListWithSearch = () => {
    const [products, setProducts] = useState<Product[]>([])

    const filterProducts = (items: Product[], filter: string) => {
        return items.filter(item => item.title.includes(filter))
    }

    const {
        onChangeFilter,
        filter,
        filteredItems } = useDebounce<Product>(filterProducts, products)

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
            .then(
                result => result.json()
            ).then(
                result => {
                    setProducts(result)
                }
            )
    }, [])

    return (
        <div>
            <input type="text"
                placeholder='filter product by name'
                value={filter}
                onChange={onChangeFilter}
            />
            {/* <input type="number" placeholder='Minimum price'
                value={price}
                onChange={onPriceChange} /> */}
            {filteredItems?.map(
                item =>
                    (<p key={item.id}>{item.title} {item.price}</p>)
            )}
        </div>
    )
}

export default ListWithSearch