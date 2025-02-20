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
    public class CardServiceTests
    {
        private readonly Mock<ICardRepository> _mockCardRepository;
        private readonly CardService _cardService;

        public CardServiceTests()
        {
            _mockCardRepository = new Mock<ICardRepository>();
            _cardService = new CardService(_mockCardRepository.Object);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllCards()
        {
            // Arrange
            var mockCards = new List<Card>
            {
                new Card { CardId = 1, FrontText = "Book", BackText = "Kitap" },
                new Card { CardId = 2, FrontText = "Table", BackText = "Masa" }
            };

            _mockCardRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(mockCards);

            // Act
            var result = await _cardService.TGetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
            Assert.Equal("Book", result.First().FrontText);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnCorrectCard()
        {
            // Arrange
            var mockCard = new Card { CardId = 1, FrontText = "Book", BackText = "Kitap" };

            _mockCardRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(mockCard);

            // Act
            var result = await _cardService.TGetByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Book", result.FrontText);
            Assert.Equal("Kitap", result.BackText);
        }

        [Fact]
        public async Task AddAsync_ShouldCallAddOnce()
        {
            // Arrange
            var newCard = new Card { CardId = 3, FrontText = "Computer", BackText = "Bilgisayar" };

            // Act
            await _cardService.TAddAsync(newCard);

            // Assert
            _mockCardRepository.Verify(repo => repo.AddAsync(newCard), Times.Once);
        }

        [Fact]
        public async Task UpdateAsync_ShouldCallUpdateOnce()
        {
            // Arrange
            var existingCard = new Card { CardId = 2, FrontText = "Table", BackText = "Masa" };

            // Act
            existingCard.FrontText = "Desk";
            await _cardService.TUpdateAsync(existingCard);

            // Assert
            _mockCardRepository.Verify(repo => repo.UpdateAsync(existingCard), Times.Once);
        }

        [Fact]
        public async Task DeleteAsync_ShouldCallDeleteOnce()
        {
            // Arrange
            var cardId = 1;

            // Act
            await _cardService.TDeleteAsync(cardId);

            // Assert
            _mockCardRepository.Verify(repo => repo.DeleteAsync(cardId), Times.Once);
        }
    }
}
