# Getting started

### Installation

Using yarn

```bash copy
yarn add http-react
```

Or with npm
```
npm install --save http-react
```




### Quick start


**Basic example**

Create a `resolver` function that takes the request object and returns the data:

```js
// The resolver function takes a response as argument and returns the data.
// This is the default value so you can omit it if the data is a JSON value.
async function resolver(response) {
  return response.json()
}
```

And you can start using `useFetch` right away:

```jsx
import useFetch from 'http-react'

export default function App() {
  const { data, loading, error, responseTime } = useFetch('/api/user-info', {
    refresh: 2,
    resolver
  })

  if (loading) return <p>Loading</p>

  if (error) return <p>An error ocurred</p>

  return (
    <div>
      <h2>Welcome, {data.name}</h2>
      <small>Profile loaded in {responseTime} miliseconds</small>
    </div>
  )
}

```

The first argument passed to the `useFetch` function is the input of the request, a url. By default, this will be used along with the `method` to create a unique id to do things like deduplication and sync the state of a request between hook calls. (in this example, the id will be `GET /api/user-info`)
 
The second argument is the request configuration. This configuration accepts everything that `fetch` accetps and more. In this example, `refresh` tells `useFetch` to revalidate again 2 seconds after the initial and any subsequent request completes. `refresh` is not part of the native `fetch` configuration, it's one of the many features provided by `http-react`.

### Optional
Wrap your app with the `FetchConfig` component.

You can use it to set global configurations like cache, headers, default values for certain requests, configure which requests will run with [`Suspense`](https://beta.reactjs.org/reference/react/Suspense), etc.

It can also be used for SSR.

```jsx
import { FetchConfig } from 'http-react'

export default function App() {
  return (
    <FetchConfig baseUrl='/api' refresh={30} headers={{ Authorization: 'Token' }}>
      <div>
        <h2>My app</h2>
      </div>
    </FetchConfig>
  )
}
```
