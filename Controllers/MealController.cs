using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAWProject.Helpers;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using DAWProject.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DAWProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	
	public class MealController : ControllerBase
	{
		private readonly IMealRepository _mealRepository;
		private readonly IMealService _mealService;

		public MealController(IMealRepository mealRepository,
			IMealService mealService)
		{
			_mealRepository = mealRepository;
			_mealService = mealService;
		}

		// GET: api/<MealController>
		[HttpGet]
		[Authorize]
		public IEnumerable<Meal> Get()
		{
			return _mealRepository.GetAll();
		}

		// GET api/<MealController>/5
		[HttpGet("{id}")]
		[Authorize]
		public Meal Get(int id)
		{
			_mealRepository.calculateCalories(id);
			return _mealRepository.GetMealWithServingsAliment(id);
		}

		[HttpPost("leaderboards")]
		public ActionResult<List<Meal>> GetLeaderboards([FromBody] JObject json)
		{
			int size = Int32.Parse(json["size"].ToString()) ;
			DateTime date = json["date"].ToObject<DateTime>();
			DateTime start = date.AddDays(-7);
			//return Ok(_mealService.GetLeadearboards(size, date));

			return Ok(_mealRepository.Leaderboards(size, start, date));

		}


		[HttpPost("{id}/date")]
		[Authorize]
		public ActionResult<List<Meal>> GetMealsByDate(int id, [FromBody] DateTime data)
		{
			//DateTime d = data["date"].ToObject<DateTime>();

			var meals = _mealRepository.GetMealsWithJoins(id, data);

			 return Ok(meals); 

		}


		// POST api/<MealController>
		[HttpPost]
		[Authorize]
		public ActionResult Post([FromBody] Meal value)
		{
			_mealRepository.InsertMeal(value);
			return Ok(_mealRepository.Save());
		}

		// PUT api/<MealController>/5
		[HttpPut("{id}")]
		[Authorize]
		public ActionResult Put([FromBody] Meal value)
		{
			_mealRepository.Update(value);
			return Ok(_mealRepository.Save());
		}

		// DELETE api/<MealController>/5
		[HttpDelete("{id}")]
		[Authorize]
		public ActionResult Delete(int id)
		{
			_mealRepository.Delete(_mealRepository.FindById(id));
			return Ok(_mealRepository.Save());
		}
	}
}
