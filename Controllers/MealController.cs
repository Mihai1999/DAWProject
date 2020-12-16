using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAWProject.Helpers;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DAWProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class MealController : ControllerBase
	{
		private readonly IMealRepository _mealRepository;

		public MealController(IMealRepository mealRepository)
		{
			_mealRepository = mealRepository;
		}

		// GET: api/<MealController>
		[HttpGet]
		public IEnumerable<Meal> Get()
		{
			return _mealRepository.GetAll();
		}

		// GET api/<MealController>/5
		[HttpGet("{id}")]
		public Meal Get(int id)
		{
			return _mealRepository.GetMealWithServingsAliment(id);
		}

		[HttpPost("{id}/date")]
		public ActionResult<List<Meal>> GetMealsByDate(int id, [FromBody] DateTime data)
		{
			//DateTime d = data["date"].ToObject<DateTime>();

			var meals = _mealRepository.GetMealsWithJoins(id, data);

			return Ok(meals); 

		}


		// POST api/<MealController>
		[HttpPost]
		public ActionResult Post([FromBody] Meal value)
		{
			_mealRepository.InsertMeal(value);
			return Ok(_mealRepository.Save());
		}

		// PUT api/<MealController>/5
		[HttpPut("{id}")]
		public ActionResult Put([FromBody] Meal value)
		{
			_mealRepository.Update(value);
			return Ok(_mealRepository.Save());
		}

		// DELETE api/<MealController>/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			_mealRepository.Delete(_mealRepository.FindById(id));
			return Ok(_mealRepository.Save());
		}
	}
}
