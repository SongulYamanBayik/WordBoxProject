import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap ikonları
import "./dashboard.css"; // CSS dosyasını içeri aktarıyoruz

const Dashboard = () => {
  const colors = ["#FFA500", "#4682B4", "#2F9E44", "#DC143C", "#8A2BE2"]; // Turuncu, Mavi, Yeşil, Kırmızı, Mor
  const [decks, setDecks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [selectedDeck, setSelectedDeck] = useState(null); // Seçili Deck
  const [menuOpen, setMenuOpen] = useState(null); // Ayarlar Menüsü Açık mı?
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
          color: colors[index % colors.length], // Renkleri sırayla ata
        }));
        setDecks(updatedDecks);
      })
      .catch((error) => console.error("Deckler alınırken hata oluştu:", error));
  }, []);

  // Modal Aç/Kapat
  const openModal = () => {
    setDeckName(""); // Yeni ekleme için input'u sıfırla
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Yeni Deck Kaydet
  const handleSave = () => {
    if (!deckName.trim()) return; // Boş kayıt yapma

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deckName }),
    })
      .then((res) => res.json())
      .then((newDeck) => {
        const updatedDeck = {
          id: newDeck.deckId || newDeck.id, // ID'yi al
          name: newDeck.deckName || deckName, // Gelen veride deckName varsa onu kullan, yoksa inputtan al
          count: newDeck.cardCount || 0, // Kart sayısı gelmezse 0 olarak ata
          color: colors[decks.length % colors.length], // Renk ata
        };

        setDecks([...decks, updatedDeck]);
        closeModal();
      })
      .catch((error) => console.error("Hata oluştu:", error));
  };

  // Ayarlar Menüsünü Aç/Kapat
  const toggleMenu = (deckId) => {
    setMenuOpen(menuOpen === deckId ? null : deckId);
  };

  // Deck'i Sil
  const deleteDeck = (deckId) => {
    fetch(`${API_URL}/${deckId}`, { method: "DELETE" })
      .then(() => {
        setDecks(decks.filter((deck) => deck.id !== deckId));
        setMenuOpen(null);
      })
      .catch((error) => console.error("Silme hatası:", error));
  };

  // Rename Modalını Aç
  const openRenameModal = (deck) => {
    setSelectedDeck(deck);
    setDeckName(deck.name);
    setRenameModalOpen(true);
    setMenuOpen(null);
  };

  // Rename İşlemi
  const handleRename = () => {
    if (!deckName.trim()) return;

    fetch(`${API_URL}/${selectedDeck.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deckName }),
    })
      .then(() => {
        setDecks(
          decks.map((d) =>
            d.id === selectedDeck.id ? { ...d, name: deckName } : d
          )
        );
        setRenameModalOpen(false);
      })
      .catch((error) => console.error("Güncelleme hatası:", error));
  };

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
              <div key={deck.id} className="deck-wrapper">
                <div
                  className="deck-card"
                  style={{ backgroundColor: deck.color }}
                  onClick={() => toggleMenu(deck.id)}
                >
                  <h5>{deck.name}</h5>
                  <p>{deck.count} cards</p>
                </div>
                {menuOpen === deck.id && (
                  <div className="deck-menu">
                    <button onClick={() => openRenameModal(deck)}>
                      Rename
                    </button>
                    <button onClick={() => deleteDeck(deck.id)}>Delete</button>
                    <button>Add Cards</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Yeni Deste Ekle Butonu */}
        <button className="add-deck-btn" onClick={openModal}>
          ➕
        </button>

        {/* Modal */}
        {modalOpen && (
          <div className="modal">
            <div className="modal-content small-modal">
              <button className="close-btn" onClick={closeModal}>
                <i className="bi bi-x-lg"></i> {/* Bootstrap X ikonu */}
              </button>
              <h2>New Deck</h2>
              <label>Deck Name:</label>
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="Enter deck name"
              />
              <div className="modal-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Rename Modal */}
        {renameModalOpen && (
          <div className="modal">
            <div className="modal-content small-modal">
              <button
                className="close-btn"
                onClick={() => setRenameModalOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
              <h2>Rename Deck</h2>
              <label>New Name:</label>
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="Enter new deck name"
              />
              <div className="modal-actions">
                <button className="save-btn" onClick={handleRename}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setRenameModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
