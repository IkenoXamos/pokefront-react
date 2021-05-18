import React, { useEffect, useState } from 'react';
import Pokemon from '../../models/Pokemon';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPokemon } from '../../slices/pokemonSlice';

// The 'unknown' type allows any value to be passed in as props
// Which is fine for us, since we don't need any props
const Pokedex: React.FC<unknown> = (): JSX.Element => {
  // We use our 2 custom hooks
  // The first allows us to select data from the store
  const pokemon = useAppSelector((state) => state.pokemon);
  // And the second gives us the ability to dispatch actions to the store
  // Including Thunk Actions
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    // getPokemon is a thunk action
    // Since it doesn't directly return an action object
    // It is a promise of an action object

    // Due to the typing of the Redux ThunkAction type
    // We can't directly use async/await on it
    // But we don't need to
    // Redux-Thunk can handle that for us

    dispatch(getPokemon(59));
  }, [dispatch]);

  const populateTable = (arr: Pokemon[]): JSX.Element[] => (
    arr.map((poke: Pokemon) => (
      <tr key={ poke.name }>
        <td>{ poke.name }</td>
        <td>{ poke.types[0].type.name }
          { poke.types.length > 1
            && <span>, { poke.types[1].type.name }</span> }
        </td>
        <td><img src={ poke.sprites.front_default } alt="" /></td>
      </tr>
    )));

  return (
    <div>
      <div className="row">
        <input onChange={ (e) => setValue(Number(e.target.value)) } className="col" type="number" />
        <button className="btn btn-primary" type="submit" onClick={ () => dispatch(getPokemon(value)) }>Favorite Pokemon</button>
      </div>

      <div>
        { pokemon.length === 0 || (
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Sprite</th>
              </tr>
            </thead>
            <tbody>
              { populateTable(pokemon) }
            </tbody>
          </table>
        ) }
      </div>
    </div>
  );
};

export default Pokedex;
