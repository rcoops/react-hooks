// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useState, useEffect } from 'react'
// 1. Use custom serialise/deserialiser
// 2. default value could be a function to save computation when not necessary
// 3. Allow for key changes useing useRef because we dont want to trigger re-renders
// function useLocalStorageState(
//   key,
//   defaultValue = '',
//   {serialize = JSON.stringify, deserialize = JSON.parse} = {},
// ) {
//   const [state, setState] = React.useState(() => {
//     const valueInLocalStorage = window.localStorage.getItem(key)
//     if (valueInLocalStorage) {
//       // the try/catch is here in case the localStorage value was set before
//       // we had the serialization in place (like we do in previous extra credits)
//       try {
//         return deserialize(valueInLocalStorage)
//       } catch (error) {
//         window.localStorage.removeItem(key)
//       }
//     }
//     return typeof defaultValue === 'function' ? defaultValue() : defaultValue
//   })

//   const prevKeyRef = React.useRef(key)

//   // Check the example at src/examples/local-state-key-change.js to visualize a key change
//   React.useEffect(() => {
//     const prevKey = prevKeyRef.current
//     if (prevKey !== key) {
//       window.localStorage.removeItem(prevKey)
//     }
//     prevKeyRef.current = key
//     window.localStorage.setItem(key, serialize(state))
//   }, [key, state, serialize])

//   return [state, setState]
// }
const useLocalStorageState = (key, defaultValue = {}) => {
  const [value, setValue] = useState(() => {
    const localStorageItem = window.localStorage.getItem(key);
    if (localStorageItem) {
      try {
        return JSON.parse(localStorageItem)
      } catch (e) {
        window.localStorage.removeItem(key)
      }
    }
    return defaultValue;
  })

  useEffect(() => window.localStorage.setItem(key, JSON.stringify(value)), [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
