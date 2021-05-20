// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { sortAndDeduplicateDiagnostics } from 'typescript';
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

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

function PokemonInfo({pokemonName}) {
  const [{ status, pokemon, error }, setState] = React.useState({ status: Status.IDLE })

  React.useEffect(() => {
    if (pokemonName) {
      setState({ status: Status.PENDING })
      fetchPokemon(pokemonName).then(
        (pokemon) => setState({ status: Status.RESOLVED, pokemon }),
        (error) => setState({ status: Status.REJECTED, error })
      )
    }
  }, [pokemonName, setState])

  switch (status) {
    case Status.PENDING:
      return <PokemonInfoFallback name={pokemonName} />
    case Status.RESOLVED:
      return <PokemonDataView pokemon={pokemon} />
    case Status.REJECTED:
      return <PokemonError error={error} />
    case Status.IDLE:
      return 'Submit a pokemon'
    default:
  }
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
