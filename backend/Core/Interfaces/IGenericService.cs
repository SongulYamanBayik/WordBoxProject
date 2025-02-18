using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericService<T> where T : class
    {
        Task<T> TGetByIdAsync(int id);
        Task<IEnumerable<T>> TWhere(Expression<Func<T, bool>> predicate);
        Task TAddAsync(T entity);
        Task TUpdateAsync(T entity);
        Task TDeleteAsync(int id);
        Task<IEnumerable<T>> TGetAllAsync(params Expression<Func<T, object>>[] includes);
    }
}
