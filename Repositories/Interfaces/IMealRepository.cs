using DAWProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Interfaces
{
	public interface IMealRepository : IGenericRepository<Meal>
	{
		List<Meal> GetMealsWithJoins(int userid, DateTime data);
		List<Meal> GetUserMeals(int userid);
	}
}
