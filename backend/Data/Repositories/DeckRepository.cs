﻿using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class DeckRepository : GenericRepository<Deck>, IDeckRepository
    {
        public DeckRepository(Context.AppContext context) : base(context)
        {
        }
    }
}
