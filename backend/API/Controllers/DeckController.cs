using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

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
        public async Task<ActionResult<IEnumerable<DeckListDto>>> GetAllDecks()
        {
            var decks = await _deckService.TGetAllAsync(d => d.Cards);
            var result = decks.Select(d => new DeckListDto
            {
                DeckId=d.DeckId,
                DeckName=d.DeckName,
                CardCount=d.Cards.Count
            }).ToList();
            return Ok(result);
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
        public async Task<IActionResult> CreateDeck([FromBody] CreateDeckDto deckDto)
        {
            if (deckDto == null || string.IsNullOrWhiteSpace(deckDto.DeckName))
            {
                return BadRequest();
            }
            var deck = new Deck
            {
                DeckName = deckDto.DeckName,
                UserId = 1, 
            };
            await _deckService.TAddAsync(deck);
            return CreatedAtAction(nameof(GetDeckById), new { id = deck.DeckId }, deck);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeck(int id, [FromBody] CreateDeckDto updateDto)
        {
            var deck = await _deckService.TGetByIdAsync(id);
            if (deck == null)
                return NotFound(); 

            deck.DeckName = updateDto.DeckName; 

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
