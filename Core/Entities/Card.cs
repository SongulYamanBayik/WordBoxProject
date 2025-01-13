using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Card
    {
        public int CardId { get; set; }
        public string FrontText { get; set; }
        public string BackText { get; set; }
        public string Synonyms { get; set; }
        public string ExampleSentence { get; set; }
        public string Pronunciation { get; set; }
        public string AudioFile { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int DeckId { get; set; }
        public Deck Deck { get; set; }
    }
}
