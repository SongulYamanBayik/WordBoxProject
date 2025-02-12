using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class DeckService : GenericService<Deck>, IDeckService
    {
        public DeckService(IGenericRepository<Deck> repository) : base(repository)
        {
        }
    }
}
