using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Synonym
    {
        public int SynonymId { get; set; }
        public int CardId { get; set; }
        public string SynonymWord { get; set; }
        public Card Card { get; set; }
    }
}
