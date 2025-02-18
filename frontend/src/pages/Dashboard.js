import React, { useState, useEffect } from "react";
import "./dashboard.css"; // CSS dosyasını içeri aktarıyoruz

const Dashboard = () => {
  const colors = ["#FFA500", "#4682B4", "#2F9E44", "#DC143C", "#8A2BE2"]; // Turuncu, Mavi, Yeşil, Kırmızı, Mor
  const [decks, setDecks] = useState([]);
  const API_URL = "http://localhost:5146/api/deck"; // Backend API URL

  // API'den Deck'leri Çek
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Veri çekilemedi!");
        }
        return res.json();
      })
      .then((data) => {
        // API'den gelen deck listesini state'e kaydediyoruz
        const updatedDecks = data.map((deck, index) => ({
          id: deck.deckId,
          name: deck.deckName,
          count: deck.cardCount || 0, // Eğer backend'den count gelmezse 0 olsun
          color: colors[index % colors.length], // Sıralı renk seçimi (döngü)
        }));
        setDecks(updatedDecks);
      })
      .catch((error) => console.error("Deckler alınırken hata oluştu:", error));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Deste Alanı Kutusu */}
      <div className="deck-area">
        <h1 style={{ textAlign: "left" }}>Decks</h1>
        <div className="d-flex justify-content-start flex-wrap">
          {decks.length === 0 ? (
            <p>Henüz deste bulunmuyor.</p>
          ) : (
            decks.map((deck) => (
              <div
                key={deck.id}
                className="deck-card"
                style={{ backgroundColor: deck.color }}
                title={deck.name}
              >
                <h5>{deck.name}</h5>
                <p>{deck.count} cards</p> {/* Kart sayısını gösteriyoruz */}
              </div>
            ))
          )}
        </div>

        {/* Yeni Deste Ekle Butonu */}
        <button className="add-deck-btn">➕</button>
      </div>
    </div>
  );
};

export default Dashboard;
