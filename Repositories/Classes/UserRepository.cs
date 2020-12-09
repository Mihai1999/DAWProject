using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Classes
{
	public class UserRepository : GenericRepository<User>, IUserRepository
	{
		public UserRepository(DAWContext _context) : base(_context)
		{
			
		}

		public  List<User> GetAllJoins()
		{
			List<User> users = _context.Users
				.Include(x => x.UserDailyData)
				.ToList();

			return users;
		}
	}
}
