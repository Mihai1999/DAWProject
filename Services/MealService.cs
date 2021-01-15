using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Services
{
	public class MealService : IMealService
	{
		private readonly IMealRepository _mealRepository;
		private readonly DAWContext _context;
		public MealService(IMealRepository mealRepository, DAWContext context)
		{
			_mealRepository = mealRepository;
			_context = context;
		}
		public void calculateCalories(int mealid)
		{
			var meal = _mealRepository.GetMealWithServingsAliment(mealid);
			meal.MealCalories = _context.Servings.Where(x => x.MealId == mealid).Sum(x => x.Calories);

			_context.SaveChanges();

		}

		public List<Meal> GetLeadearboards(int size, DateTime date)
		{
			var leaderboards = _context.Meals.OrderByDescending(x => x.MealCalories)
				.Where(x => x.Date > date)
				.Take(size)
				.Include(x => x.User)
				.ToList();

			return leaderboards;
		}

	}
}
