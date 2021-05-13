import React, { useCallback, useEffect, useState } from 'react';

export const Pokemon: React.FC<any> = (): JSX.Element => {
  const [pokes, setPokes] = useState<any[]>([]);
  const [value, setValue] = useState<number>(0);

  const getPokes = useCallback(async (id: number): Promise<void> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const newPoke = await res.json();

    if(!pokes.find((poke) => poke.name === newPoke.name)) {
      setPokes((oldState) => [...oldState, newPoke]);
    }
  }, [pokes]);

  useEffect(() => {
    getPokes(59);
  }, [getPokes]);

  const populateTable = (arr: any[]): JSX.Element[] => (
    arr.map((pokemon: any) => (
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

export default Pokemon;
