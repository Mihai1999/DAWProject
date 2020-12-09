using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Classes
{
	public class AlimentRepository : GenericRepository<Aliment>, IAlimentRepository
	{
		public AlimentRepository(DAWContext _context) : base(_context)
		{

		}

		public List<Aliment> GetByName(string name)
		{
			var alimente = _context.Aliments.Where(x => x.Name.Contains(name)).ToList();

			return alimente;
		}
	}
}
