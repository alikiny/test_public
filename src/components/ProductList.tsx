import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import withLoading from './withLoading'

const createProduct = async () => { }
const ProductList = ({ data }: any) => {
    const [email, setEmail] = useState("") //track input with virtual DOM of REACT
    const [phone, setPhone] = useState("")
    // const [debounceTimeout, setDebounceTimeout] = useState<any>()
    let timerId: NodeJS.Timeout

    //not recommended by React
    /* uncontrolled input == document.querySelector --> single trust of resource */
    const userName = useRef() // tracked by real DOM,not React

    /*     (() => {
       
            console.log("Complicated function is called")
        })() */

    //use useCallback to memmorize the function
    const expensiveFunc = useCallback(() => {
        console.log("This is expensive function")
    }, [data])

    //use useMemo to memrize the result of a function
    const expensiveResult = useMemo(() => {
        console.log("this func should return something")
        return 20
    }, [data])

    /* This function
    is not re-executed when component is rerendered */
    const handleEmailChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
            /* if (timerId) {
                clearTimeout(timerId)
            }
            timerId = setTimeout(
                () => {
                    console.log("This should not be printed many times")
                }, 1000
            ) */
        }, [])

    return (
        <div>
            {/*             {data.map((item: any) =>
                (<p key={item.id}>{item.title}</p>)
            )} */}
            <EmailForm email={email} handleEmailChange={handleEmailChange} />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            <input
                type="text"
                ref={userName.current}
            />
        </div>
    )
}

const EmailForm = ({ email, handleEmailChange }: any) => {
    const [data, setData] = useState("")
    useEffect(() => {
        setTimeout(() => {
            setData("testing")
        }, 1000)
    })
    const func1 = () => {
        
    }
    const fun2 = () => {
        
    }
    return (
        <div>
            <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email here" />
            <p>{data}</p>
        </div>
    )
}

const ProductListWithLoading = withLoading(ProductList, "https://api.escuelajs.co/api/v1/products")
//const ProductListWithLoading = withLoading<Product>(ProductList, createProduct)

export default ProductListWithLoading