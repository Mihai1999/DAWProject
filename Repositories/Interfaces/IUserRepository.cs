using DAWProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Interfaces
{
	public interface IUserRepository : IGenericRepository<User> 
	{
		public  List<User> GetAllJoins();
	}
}
