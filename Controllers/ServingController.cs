using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAWProject.Helpers;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using DAWProject.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DAWProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class ServingController : ControllerBase
	{
		private readonly IServingRepository _servingRepository;
		private readonly IMealService _mealService;

		public ServingController(IServingRepository servingRepository,
			IMealService mealService)
		{
			_servingRepository = servingRepository;
			_mealService = mealService;
		}

		// GET: api/<ServingController>
		[HttpGet]
		public IEnumerable<Serving> Get()
		{
			return _servingRepository.GetAll();
		}

		// GET api/<ServingController>/5
		[HttpGet("{id}")]
		public Serving Get(int id)
		{
			return _servingRepository.FindById(id);
		}

		// POST api/<ServingController>
		[HttpPost]
		public ActionResult Post([FromBody] Serving value)
		{
			_servingRepository.Create(value);

			_mealService.calculateCalories(value.MealId);

			return Ok(_servingRepository.Save());
		}

		// PUT api/<ServingController>/5
		[HttpPut("{id}")]
		public ActionResult Put([FromBody] Serving value)
		{
			_servingRepository.Update(value);
			return Ok(_servingRepository.Save());
		}

		// DELETE api/<ServingController>/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			_servingRepository.Delete(_servingRepository.FindById(id));
			return Ok(_servingRepository.Save());
		}
	}
}
