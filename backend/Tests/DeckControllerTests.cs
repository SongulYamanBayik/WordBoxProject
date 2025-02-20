using API.Controllers;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class DeckControllerTests
    {
        private readonly Mock<IGenericService<Deck>> _mockDeckService;
        private readonly DeckController _deckController;

        public DeckControllerTests()
        {
            _mockDeckService = new Mock<IGenericService<Deck>>();
            _deckController = new DeckController(_mockDeckService.Object);
        }

        [Fact]
        public async Task GetAllDecks_ShouldReturnOkResult_WithDecks()
        {
            // Arrange
            var mockDecks = new List<Deck>
            {
        new Deck { DeckId = 3, DeckName = "Verbs", UserId = 1, Cards = new List<Card>() },
        new Deck { DeckId = 4, DeckName = "Nouns", UserId = 1, Cards = new List<Card>() }
            };

            _mockDeckService.Setup(service => service.TGetAllAsync(d => d.Cards))
                .ReturnsAsync(mockDecks);

            // Act
            var result = await _deckController.GetAllDecks();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedDecks = Assert.IsType<List<DeckListDto>>(okResult.Value);

            Assert.Equal(2, returnedDecks.Count);
            Assert.Equal("Verbs", returnedDecks[0].DeckName);
        }
        [Fact]
        public async Task GetDeckById_ShouldReturnNotFound_WhenDeckDoesNotExist()
        {
            // Arrange
            _mockDeckService.Setup(service => service.TGetByIdAsync(1))
                .ReturnsAsync((Deck)null);

            // Act
            var result = await _deckController.GetDeckById(1);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateDeck_ShouldReturnCreatedAtAction()
        {
            // Arrange
            var newDeck = new Deck { DeckId = 5, DeckName = "Adjectives", UserId = 1 };

            // Act
            var result = await _deckController.CreateDeck(newDeck);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnedDeck = Assert.IsType<Deck>(createdResult.Value);

            Assert.Equal("Adjectives", returnedDeck.DeckName);
        }
    }
}
