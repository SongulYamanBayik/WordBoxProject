import React, { useState } from "react";
import "./dashboard.css"; // CSS dosyasını içeri aktarıyoruz

const Dashboard = () => {
  const colors = ["#FFA500", "#4682B4", "#2F9E44", "#DC143C", "#8A2BE2"]; // Turuncu, Mavi, Yeşil, Kırmızı, Mor

  const [decks, setDecks] = useState([
    { id: 1, name: "Verbs", count: 15, color: colors[0] },
    { id: 2, name: "Lesson words", count: 75, color: colors[1] },
    { id: 3, name: "Book v.", count: 48, color: colors[2] },
  ]);

  const addDeck = (name, count) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setDecks([
      ...decks,
      { id: decks.length + 1, name, count, color: randomColor },
    ]);
  };

  return (
    <div className="dashboard-container">
      {/* Deste Alanı Kutusu */}
      <div className="deck-area">
        <h1 style={{ textAlign: "left" }}>Decks</h1>
        <div className="d-flex justify-content-start flex-wrap">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="deck-card"
              style={{ backgroundColor: deck.color }}
              title={deck.name}
            >
              <h5>{deck.name}</h5>
              <p>{deck.count}</p>
            </div>
          ))}
        </div>

        {/* Yeni Deste Ekle Butonu */}
        <button className="add-deck-btn">➕</button>
      </div>
    </div>
  );
};

export default Dashboard;
