import React, { useState, useEffect } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const colors = ["#FFA500", "#4682B4", "#2F9E44", "#DC143C", "#8A2BE2"];
  const [decks, setDecks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deckData, setDeckData] = useState({ id: null, name: "", count: 0 });
  const API_URL = "http://localhost:5146/api/deck";

  // API'den Deck'leri Çek
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const updatedDecks = data.map((deck, index) => ({
          id: deck.deckId,
          name: deck.deckName,
          count: deck.cardCount || 0,
          color: colors[index % colors.length],
        }));
        setDecks(updatedDecks);
      })
      .catch((error) => console.error("Deckler alınırken hata oluştu:", error));
  }, []);

  // Modal Aç/Kapat
  const openModal = (deck = { id: null, name: "", count: 0 }) => {
    setDeckData(deck);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDeckData({ id: null, name: "", count: 0 });
  };

  // Deck Ekle veya Güncelle
  const handleSave = () => {
    const method = deckData.id ? "PUT" : "POST";
    const url = deckData.id ? `${API_URL}/${deckData.id}` : API_URL;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deckId: deckData.id, deckName: deckData.name }),
    })
      .then((res) => res.json())
      .then((updatedDeck) => {
        if (deckData.id) {
          // Güncelleme
          setDecks(
            decks.map((deck) =>
              deck.id === updatedDeck.deckId
                ? { ...deck, name: updatedDeck.deckName }
                : deck
            )
          );
        } else {
          // Yeni Ekleme
          setDecks([
            ...decks,
            { ...updatedDeck, color: colors[decks.length % colors.length] },
          ]);
        }
        closeModal();
      })
      .catch((error) => console.error("Hata oluştu:", error));
  };

  // Deck Sil
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setDecks(decks.filter((deck) => deck.id !== id)))
      .catch((error) => console.error("Hata oluştu:", error));
  };

  return (
    <div className="dashboard-container">
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
                onClick={() => openModal(deck)} // 🔥 Güncellemek için tıklanabilir
              >
                <h5>{deck.name}</h5>
                <p>{deck.count} cards</p>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Modal açılmasını engelle
                    handleDelete(deck.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Yeni Deste Ekle Butonu */}
        <button className="add-deck-btn" onClick={() => openModal()}>
          ➕
        </button>

        {/* Modal */}
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>{deckData.id ? "Deste Güncelle" : "Yeni Deste Ekle"}</h2>
              <input
                type="text"
                placeholder="Deste Adı"
                value={deckData.name}
                onChange={(e) =>
                  setDeckData({ ...deckData, name: e.target.value })
                }
              />
              <div className="modal-actions">
                <button onClick={handleSave}>Kaydet</button>
                <button onClick={closeModal}>İptal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
