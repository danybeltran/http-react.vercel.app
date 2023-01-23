
# Reusing requests

If you want to use the same request in multiple places in your app, you can do so. Internally, `http-react` knows the current state of requests that were initialized by `useFetch`, whether they are loading, they completed succesfuly or if the failed, while preventing duplicated requests. This information is shared between any subscribers that use `useFetch` or any of its forms (`useData`, `useLoading`, etc).


```jsx
import useFetch from 'http-react'

// First, create a custom hook that returns the user info.
// You can pass any other configuration you want to send in
// the request (e.g. 'keepalive', 'cache', 'method')

function useUserInfo() {
  return useFetch('/api/user-info', {
    headers: {
      Authorization: 'Token my-token'
    },
    cache: 'only-if-cached',
    mode: 'cors'
  })
}
```


And you can use that function in any component or hook:

```jsx {2,16}
function UserInfo() {
  const { data, loading, error } = useUserInfo()

  if (loading) return <p>Loading</p>

  if (error) return <p>An error ocurred</p>

  return (
    <div>
      <p>Username: {data.name}</p>
    </div>
  )
}

function AccountBalance() {
  const { data, loading, error } = useUserInfo()

  if (loading) return <p>Loading account balance</p>

  if (error) return <p>Unable to get account balance</p>

  return (
    <div>
      <p>Balance: {data.balance}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <UserInfo />
      <AccountBalance />
    </div>
  )
}

```

The cool thing about it is that even though the `useUserInfo` hook is used multiple times **only one request will be sent** (See [Data deduplication](https://en.wikipedia.org/wiki/Data_deduplication)) and every subscriber using it will be notified when the state of the request changes.

You can also use the `useFetchId` hook that returns everything from a request using its id.

```jsx {16,34}
import useFetch, { useFetchId } from 'http-react'

// First, create a custom hook that returns the user info.

function useUserInfo() {
  return useFetch('/api/user-info', {
    headers: {
      Authorization: 'Token my-token'
    },
    cache: 'only-if-cached',
    mode: 'cors'
  })
}

function AccountBalance() {
  const { data, loading, error } = useFetchId('GET /api/user-info')

  if (loading) return <p>Loading account balance...</p>

  if (error) return <p>Unable to get account balance</p>

  return (
    <div>
      <p>Balance: {data.balance}</p>
    </div>
  )
}

// This will initialize the request revalidation process,
// which will be propagated to all of its subscribers.
// (See be below)

function InitializeUserRequest() {
  useUserInfo()
  return null
}

export default function App() {
  return (
    <div>
      <InitializeUserRequest />
      <AccountBalance />
    </div>
  )
}
```

That example can even be reduced if `useUserInfo` is used only in those components, so it can be removed safely and instead fetch data directly inside a component:

```jsx {23-29}
import useFetch, { useFetchId } from 'http-react'

function AccountBalance() {
  const { data, loading, error } = useFetchId('GET /api/user-info')

  if (loading) return <p>Loading account balance...</p>

  if (error) return <p>Unable to get account balance</p>

  return (
    <div>
      <p>Balance: {data.balance}</p>
    </div>
  )
}


// This will initialize the request revalidation process,
// which will be propagated to all of its subscribers
// (See be below)

function InitializeUserRequest() {
  useFetch('/api/user-info', {
    id: 'User',
    headers: {
      Authorization: "Token my-token"
    },
    mode: 'cors'
  })

  return null
}

export default function App() {
  return (
    <div>
      <InitializeUserRequest />
      <AccountBalance />
    </div>
  )
}
```