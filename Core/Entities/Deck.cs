using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Deck
    {
        public int DeckId { get; set; }
        public string DeckName { get; set; }
        public int UserId { get; set; }  
        public User User { get; set; }
        public ICollection<Card> Cards { get; set; }
    }
}
