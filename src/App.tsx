import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ProductListWithLoading from './components/ProductList'
import UserListWithLoading from './components/UserList'
import ListWithSearch from './components/ListWithSearch'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'
import UserPage from './pages/UserPage'
import SingleProductPage from './pages/SingleProductPage'

/* 
1. Techniques to abstract the React application
- custom hooks: return certain properties
- higher order component (HOC): return a new component with wrapped features
2. Enhance performance (performance optimization)
- useMemo / useCallback
- debounce / throttle
3. Router - react router */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: "products",
        element: <ProductPage />
      },
      {
        path: "users",
        element: <UserPage />
      },
      {
        path: "products/:id",
        element: <SingleProductPage />
      }
    ]
  },
  /*   {
      path: "/products",
      element: <ProductPage/>
    } */
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App