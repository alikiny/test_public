import React from 'react'
import withLoading from './withLoading'

const UserList = ({data} : any) => {
  return (
      <div>
          {data.map(
              (item: any) => (<p key={item.id}>{item.email}</p>)
          )}
    </div>
  )
}

const UserListWithLoading = withLoading(UserList, " https://api.escuelajs.co/api/v1/users")

export default UserListWithLoading