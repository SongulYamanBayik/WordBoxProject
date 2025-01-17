using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly IGenericRepository<T> _repository;

        public GenericService(IGenericRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task TAddAsync(T entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task TDeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<T>> TGetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<T> TGetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task TUpdateAsync(T entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task<IEnumerable<T>> TWhere(Expression<Func<T, bool>> predicate)
        {
            return await _repository.Where(predicate);
        }
    }
}
