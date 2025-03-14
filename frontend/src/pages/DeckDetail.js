import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./deckDetail.css";

const DeckDetail = () => {
  const { id } = useParams();
  const [deck, setDeck] = useState(null);
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const DECK_API_URL = `http://localhost:5146/api/deck/${id}`;
  const CARD_API_URL = "http://localhost:5146/api/card";

  useEffect(() => {
    fetch(DECK_API_URL)
      .then((res) => res.json())
      .then((data) => setDeck(data))
      .catch((error) =>
        console.error("Deste verisi yüklenirken hata oluştu:", error)
      );
  }, [id]);

  // Modal'ı açar, input'ları sıfırlar
  const openAddCardModal = () => {
    setFrontText("");
    setBackText("");
    setAddCardModalOpen(true);
  };

  // Modal'ı kapatır
  const closeAddCardModal = () => {
    setAddCardModalOpen(false);
  };

  // Yeni kartı kaydeder
  const handleSaveCard = () => {
    if (!frontText.trim()) return; // Boş kayıt yapma

    // POST isteği ile yeni kart ekle
    fetch(CARD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deckId: deck.deckId,
        frontText,
        backText,
      }),
    })
      .then((res) => res.json())
      .then((newCard) => {
        // deck.cards'a yeni kartı ekliyoruz
        const updatedDeck = {
          ...deck,
          cards: [...deck.cards, newCard],
        };
        setDeck(updatedDeck);
        closeAddCardModal();
      })
      .catch((error) => console.error("Kart ekleme hatası:", error));
  };

  if (!deck) return <p>Loading...</p>;

  return (
    <div className="deckDetail-container">
      {/* Kart Alanı Kutusu */}
      <div className="card-area">
        {/* Sayfa Başlığı */}
        <h1 style={{ textAlign: "left" }}>{deck.deckName}</h1>

        {/* Kartlar */}
        <div className="d-flex justify-content-start flex-wrap">
          {deck.cards.length === 0 ? (
            <p>No cards found in this deck.</p>
          ) : (
            deck.cards.map((card) => (
              <div key={card.cardId} className="card-box">
                <h5>{card.frontText}</h5>
              </div>
            ))
          )}
        </div>

        {/* Yeni Kart Ekle Butonu */}
        <button className="add-card-btn" onClick={openAddCardModal}>
          ➕
        </button>
      </div>

      {/* Yeni Kart Ekleme Modalı */}
      {addCardModalOpen && (
        <div className="modal">
          <div className="modal-content small-modal">
            <button className="close-btn" onClick={closeAddCardModal}>
              ✖
            </button>
            <h2>New Card</h2>

            <label>Front Text:</label>
            <input
              type="text"
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
              placeholder="Enter front text"
            />

            <label>Back Text:</label>
            <input
              type="text"
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
              placeholder="Enter back text"
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveCard}>
                Save
              </button>
              <button className="cancel-btn" onClick={closeAddCardModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckDetail;
