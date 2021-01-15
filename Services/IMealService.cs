using DAWProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Services
{
	public interface IMealService
	{
		public void calculateCalories(int mealid);
		List<Meal> GetLeadearboards(int size, DateTime date);
	}
}
