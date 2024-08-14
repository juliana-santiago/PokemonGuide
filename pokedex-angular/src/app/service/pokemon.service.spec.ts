import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { PokemonsResponse } from '../models/pokemons-response.interface';
import { PokemonTypes } from '../models/pokemon-types.interface';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  const mockPokemonsResponse: PokemonsResponse = {
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ]
  };

  const mockPokemonDetails: PokemonTypes = {
    name: 'bulbasaur',
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting()], // Atualizado para usar provideHttpClientTesting
      providers: [PokemonService]
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of pokemons with their types', () => {
    service.getPokemons().subscribe((pokemons) => {
      expect(pokemons.length).toBe(2);
      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[0].types).toEqual(['grass', 'poison']);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonsResponse);

    const reqDetail1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1/');
    expect(reqDetail1.request.method).toBe('GET');
    reqDetail1.flush(mockPokemonDetails);

    const reqDetail2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/2/');
    expect(reqDetail2.request.method).toBe('GET');
    reqDetail2.flush({
      name: 'ivysaur',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
    });
  });
});
