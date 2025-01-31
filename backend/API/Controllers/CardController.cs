using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly IGenericService<Card> _cardService;

        public CardController(IGenericService<Card> cardService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Card>>> GetAllCards()
        {
            var cards = await _cardService.TGetAllAsync();
            return Ok(cards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCardById(int id)
        {
            var card = await _cardService.TGetByIdAsync(id);
            if (card == null)
            {
                return NotFound();
            }
            return Ok(card);
        }

        [HttpPost]
        public async Task<ActionResult<Card>> CreateCard([FromBody] Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }
            await _cardService.TAddAsync(card);
            return CreatedAtAction(nameof(GetCardById), new { id = card.CardId }, card);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCard(int id, [FromBody] Card card)
        {
            if (id != card.CardId)
            {
                return BadRequest();
            }
            await _cardService.TUpdateAsync(card);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCard(int id)
        {
            await _cardService.TDeleteAsync(id);
            return NoContent();
        }
    }
}
