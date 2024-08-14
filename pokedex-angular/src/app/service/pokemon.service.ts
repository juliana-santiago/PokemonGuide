import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.interface';
import { PokemonsResponse } from '../models/pokemons-response.interface';
import { PokemonTypes } from '../models/pokemon-types.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<{ name: string; types: string[] }[]> {
    return this.http
      .get<PokemonsResponse>(`${this.apiUrl}pokemon?limit=151`)
      .pipe(
        mergeMap((response) =>
          forkJoin(
            response.results.map((pokemon) =>
              this.getPokemonDetails(pokemon.url)
            )
          )
        )
      );
  }

  private getPokemonDetails(
    url: string
  ): Observable<{ name: string; types: string[] }> {
    return this.http.get<PokemonTypes>(url).pipe(
      map((pokemonDetails) => ({
        name: pokemonDetails.name,
        types: pokemonDetails.types.map((t) => t.type.name),
      }))
    );
  }
}
