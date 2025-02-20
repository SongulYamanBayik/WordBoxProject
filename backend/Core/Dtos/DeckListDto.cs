using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public class DeckListDto
    {
        public int DeckId { get; set; }
        public string DeckName { get; set; }
        public int CardCount { get; set; }
    }
}
