import React, { useCallback, useEffect, useState } from 'react';
import Pokemon from '../../models/Pokemon';

export const Pokedex: React.FC<any> = (): JSX.Element => {
  const [pokes, setPokes] = useState<Pokemon[]>([]);
  const [value, setValue] = useState<number>(0);

  const getPokes = useCallback(async (id: number): Promise<void> => {
    if(!pokes.find((poke) => poke.id === id)) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const newPoke: Pokemon = await res.json();

      setPokes((oldState) => [...oldState, newPoke]);
    }
  }, [pokes]);

  useEffect(() => {
    getPokes(59);
  }, [getPokes]);

  const populateTable = (arr: Pokemon[]): JSX.Element[] => (
    arr.map((pokemon: Pokemon) => (
      <tr key={pokemon.name}>
        <td>{pokemon.name}</td>
        <td>{pokemon.types[0].type.name}
          { pokemon.types.length > 1
            && <span>, {pokemon.types[1].type.name}</span>}
        </td>
        <td><img src={pokemon.sprites.front_default} alt="" /></td>
      </tr>
    )));

  return (
    <div>
      <div className="row">
        <input onChange={(e) => setValue(Number(e.target.value))} className="col" type="number" />
        <button className="btn btn-primary" type="submit" onClick={() => getPokes(value)}>Favorite Pokemon</button>
      </div>

      <div>
        { pokes.length === 0 || (
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Sprite</th>
              </tr>
            </thead>
            <tbody>
              {populateTable(pokes)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
