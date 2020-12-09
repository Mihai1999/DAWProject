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
	public class MealRepository : GenericRepository<Meal>, IMealRepository
	{
		public MealRepository(DAWContext _context) : base(_context)
		{

		}

		public List<Meal> GetMealsWithJoins(int userid, DateTime data)
		{
			List<Meal> result = _context.Meals
				.Include(x => x.Servings).ThenInclude(y => y.Aliment)
				.Where(x => x.UserId == userid && x.Date.DayOfYear == data.DayOfYear)
				.ToList();
			

			return result;
		}

		public List<Meal> GetUserMeals(int userid)
		{
			List<Meal> result = _context.Meals
							.Include(x => x.Servings).ThenInclude(y => y.Aliment)
							.Where(x => x.UserId == userid)
							.ToList();

			return result;
		}
	}
}
