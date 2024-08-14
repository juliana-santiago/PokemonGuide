using Microsoft.AspNetCore.Mvc;
using PokemonGuide.Services.Interfaces;
using System.Threading.Tasks;

namespace PokemonGuide.Controllers
{
    [Route("api/v1/")]
    public class PokemonController : ControllerBase
    {
        private readonly IPokemonService _pokemonService;
        public PokemonController(IPokemonService pokemonService)
        {
            this._pokemonService = pokemonService;
        }

        [HttpGet("pokemon/{name}")]
        public async Task<IActionResult> GetPokemonByName(string name)
        {
            var result = await this._pokemonService.GetPokemonByName(name.ToLower());

            return this.Ok(result);
        }
    }
}