using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeckController : ControllerBase
    {
        private readonly IGenericService<Deck> _deckService;

        public DeckController(IGenericService<Deck> deckService)
        {
            _deckService = deckService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deck>>> GetAllDecks()
        {
            var decks = await _deckService.TGetAllAsync();
            return Ok(decks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Deck>> GetDeckById(int id)
        {
            var deck = await _deckService.TGetByIdAsync(id);
            if (deck == null)
                return NotFound();
            return Ok(deck);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDeck([FromBody] Deck deck)
        {
            if (deck == null)
            {
                return BadRequest();
            }
            await _deckService.TAddAsync(deck);
            return CreatedAtAction(nameof(GetDeckById), new { id = deck.DeckId }, deck);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeck(int id, [FromBody] Deck deck)
        {
            if (id != deck.DeckId)
                return BadRequest();

            await _deckService.TUpdateAsync(deck);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeck(int id)
        {
            await _deckService.TDeleteAsync(id);
            return NoContent();
        }
    }
}
