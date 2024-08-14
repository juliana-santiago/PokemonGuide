using Refit;
using System.Threading.Tasks;

namespace PokemonGuide.Services.Interfaces
{
    public interface IPokemonService
    {
        [Get("/pokemon/{pokemon}")]
        Task<string> GetPokemonByName(string pokemon);

    }
}