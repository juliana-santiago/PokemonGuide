import { PokemonType } from './pokemon-type.inteface';

export interface PokemonTypes {
  types: { type: PokemonType }[];
  name: string;
}
