using Core.Entities;
using Core.Interfaces;
using Moq;
using Services.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Tests
{
    public class DeckServiceTests
    {
        private readonly Mock<IGenericRepository<Deck>> _mockDeckRepository;
        private readonly DeckService _deckService;

        public DeckServiceTests()
        {
            _mockDeckRepository = new Mock<IGenericRepository<Deck>>();
            _deckService = new DeckService(_mockDeckRepository.Object);
        }

        [Fact]
        public async Task GetAllDecks_ShouldReturnDeckList()
        {
            // Arrange
            var mockDecks = new List<Deck>
            {
                new Deck { DeckId = 3, DeckName = "Verbs", UserId = 1 },
                new Deck { DeckId = 4, DeckName = "Nouns", UserId = 1 }
            };

            _mockDeckRepository.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(mockDecks);

            // Act
            var result = await _deckService.TGetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetDeckById_ShouldReturnCorrectDeck()
        {
            // Arrange
            var mockDeck = new Deck { DeckId = 3, DeckName = "Verbs", UserId = 1 };

            _mockDeckRepository.Setup(repo => repo.GetByIdAsync(3))
                .ReturnsAsync(mockDeck);

            // Act
            var result = await _deckService.TGetByIdAsync(3);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Verbs", result.DeckName);
        }

        [Fact]
        public async Task AddDeck_ShouldCallRepositoryOnce()
        {
            // Arrange
            var newDeck = new Deck { DeckId = 5, DeckName = "Pronouns", UserId = 1 };

            // Act
            await _deckService.TAddAsync(newDeck);

            // Assert
            _mockDeckRepository.Verify(repo => repo.AddAsync(newDeck), Times.Once);
        }

        [Fact]
        public async Task UpdateDeck_ShouldCallRepositoryUpdate()
        {
            // Arrange
            var existingDeck = new Deck { DeckId = 3, DeckName = "Old Name", UserId = 1 };

            // Act
            existingDeck.DeckName = "New Name";
            await _deckService.TUpdateAsync(existingDeck);

            // Assert
            _mockDeckRepository.Verify(repo => repo.UpdateAsync(existingDeck), Times.Once);
        }

        [Fact]
        public async Task DeleteDeck_ShouldCallRepositoryDelete()
        {
            // Arrange
            var deckId = 3;

            // Act
            await _deckService.TDeleteAsync(deckId);

            // Assert
            _mockDeckRepository.Verify(repo => repo.DeleteAsync(deckId), Times.Once);
        }
    }
}
