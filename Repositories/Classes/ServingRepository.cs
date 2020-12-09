using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Classes
{
	public class ServingRepository : GenericRepository<Serving>, IServingRepository
	{
		public ServingRepository(DAWContext _context) : base(_context)
		{

		}
	}
}
