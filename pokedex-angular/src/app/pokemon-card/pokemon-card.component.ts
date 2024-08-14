import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  pokemonNumber!: string;
  
  @Input()
  pokemon!: string;
  
  @Input()
  numero!: number;

  @Input()
  types!: string[];

  getPokemonImage() {
    const numeroFormatado = this.leadingZero(this.numero);
    return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${numeroFormatado}.png`;
  }

  leadingZero(num: number, size = 3): string {
    let s = String(num);
    while (s.length < size) {
      s = '0' + s;
    }
    this.pokemonNumber = `Nº ${s}`;
    return s;
  }

  capitalizeFirstLetter(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
