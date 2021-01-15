using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using DAWProject.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Classes
{
	public class MealRepository : GenericRepository<Meal>, IMealRepository
	{
		protected readonly IMealService _mealService;
		public MealRepository(DAWContext _context) : base(_context)
		{

		}

		public void calculateCalories(int mealid)
		{
			var meal = GetMealWithServingsAliment(mealid);

			var servings = _context.Servings.Where(x => x.MealId == mealid).Include(x => x.Aliment).ToList();
			double sum = 0;
			foreach(Serving s in servings)
			{
				
				sum += (s.Quantity / s.Aliment.Quantity) * s.Aliment.Calories;
			}

			meal.MealCalories = sum;

			_context.SaveChanges();
		}

		public List<Meal> GetMealsWithJoins(int userid, DateTime data)
		{
			List<Meal> result = _context.Meals
				.Where(x => x.UserId == userid && x.Date.Day== data.Day && x.Date.Month == data.Month && x.Date.Year == data.Year)
				.Include(x => x.Servings).ThenInclude(y => y.Aliment)
				.ToList();
			

			return result;
		}

		public Meal GetMealWithServingsAliment(int mealid)
		{
			var meal = _context.Meals.Where(x => x.Id == mealid)
				.Include(x => x.Servings)
				.ThenInclude(y => y.Aliment)
				.FirstOrDefault();

			return meal;
		}

		public List<Meal> GetUserMeals(int userid)
		{
			List<Meal> result = _context.Meals
							.Include(x => x.Servings).ThenInclude(y => y.Aliment)
							.Where(x => x.UserId == userid)
							.ToList();

			return result;
		}

		public void InsertMeal(Meal meal)
		{
			if(meal.Date == null)
			{
				meal.Date = DateTime.UtcNow;
			}

			meal.MealCalories = 0;

			_context.Add(meal);
		}

		public List<Meal> Leaderboards(int length, DateTime start, DateTime end)
		{
			var lb = _context.Meals.Where(x => x.Date >= start && x.Date <= end)
				.Include(x => x.Servings)
				.ThenInclude(x => x.Aliment).ToList();

			foreach(Meal meal in lb)
			{
				if(meal.MealCalories == null || meal.MealCalories == 0)
				{
					calculateCalories(meal.Id);
				}
				
			}

			var result = _context.Meals.Where(x => x.Date >= start && x.Date <= end)
				.Include(x => x.User)
				.OrderByDescending(x => x.MealCalories)
				.Skip(0)
				.Take(length)
				.ToList();

			return result;

		}


	}
}
