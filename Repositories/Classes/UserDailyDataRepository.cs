using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Classes
{
	public class UserDailyDataRepository : GenericRepository<UserDailyData>, IUserDailyDataRepository
	{
		public UserDailyDataRepository(DAWContext _context) : base(_context)
		{

		}
	}
}
