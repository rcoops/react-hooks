// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

function PokemonError ({error}) {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}
function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  const getPokemon = React.useCallback(async (pokemonName) => {
    return await fetchPokemon(pokemonName)
      .catch(e => setError(e))
  }, [setError])

  React.useEffect(() => {
    (async () => {
      if (pokemonName) {
        setError(null)
        setPokemon(await getPokemon(pokemonName))
      }
    })()
  }, [pokemonName, setPokemon, getPokemon])

  if (error) {
    return <PokemonError error={error} />
  }
  return (
    pokemonName
      ? (
        pokemon
          ? <PokemonDataView pokemon={pokemon} />
          : <PokemonInfoFallback name={pokemonName} />
      )
      : 'Submit a pokemon'
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
