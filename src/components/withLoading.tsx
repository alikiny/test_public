import React, { useEffect, useState } from 'react'

/** HOC --> a function, not a React Component  */
const withLoading = (
    ChildComponent: (data: any) => JSX.Element,
    url: string) => {
    return () => {
        const [data, setData] = useState([])
        const [error, setError] = useState("")
        const [loading, setLoading] = useState(true)
        useEffect(
            () => {
                fetch(url).then(
                    result => result.json()
                ).then(
                    result => {
                        setData(result)
                        setLoading(false)
                    }
                ).catch(e => {
                    setError(e.message)
                    setLoading(false)
                })
            },
            []
        )
        if (loading) {
            return <p>Loading...</p>
        }
        if (error) {
            return <p>{error}</p>
        }
        return <ChildComponent data={data} />
    }
}

/* const withLoading = <T,>(
    ChildComponent: (data: T) => JSX.Element,
    asyncFunc: () => Promise<T[]>) => {
    return () => {
        const [data, setData] = useState<T[]>([])
        const [error, setError] = useState("")
        const [loading, setLoading] = useState(true)
        useEffect(
            () => {
                asyncFunc().then(
                    result => {
                        setData(result)
                        setLoading(false)
                    }
                ).catch(e => {
                    setError(e.message)
                    setLoading(false)
                })
            }
        )
        if (loading) {
            return <p>Loading...</p>
        }
        if (error) {
            return <p>{error}</p>
        }
        return <ChildComponent data={data} />
    }
} */

export default withLoading