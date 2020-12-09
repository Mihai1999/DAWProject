using DAWProject.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Interfaces
{
	public interface IGenericRepository<TEntity> where TEntity : BaseEntity
	{
		List<TEntity> GetAll();
		void Create(TEntity entity);
		void Update(TEntity entity);
		void Delete(TEntity entity);
		void CreateRange(IEnumerable<TEntity> entities);
		void DeleteRange(IEnumerable<TEntity> entities);
		TEntity FindById(int id);
		bool Save();
	}
}
