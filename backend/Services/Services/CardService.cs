using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class CardService : GenericService<Card>
    {
        public CardService(IGenericRepository<Card> repository) : base(repository)
        {
        }
    }
}
