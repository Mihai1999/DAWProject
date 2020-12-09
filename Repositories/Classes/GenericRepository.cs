using DAWProject.Data;
using DAWProject.Models.Base;
using DAWProject.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Classes
{
	public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
	{
		public readonly DAWContext _context;
		private readonly DbSet<TEntity> _table;
		public GenericRepository(DAWContext context)
		{
			_context = context;
			_table = _context.Set<TEntity>();
		}
		public void Create(TEntity entity)
		{
			_table.Add(entity);
		}

		public void CreateRange(IEnumerable<TEntity> entities)
		{
			_table.AddRange(entities);
		}

		public void Delete(TEntity entity)
		{
			_table.Remove(entity);
		}

		public void DeleteRange(IEnumerable<TEntity> entities)
		{
			_table.RemoveRange(entities);
		}

		public TEntity FindById(int id)
		{
			return _table.FirstOrDefault(x => x.Id == id);
		}

		public List<TEntity> GetAll()
		{
			return _table.ToList();
		}

		public bool Save()
		{
			return (_context.SaveChanges() > 0);
		}

		public void Update(TEntity entity)
		{
			_context.Update(entity);
		}
	}
}
