using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DAWProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserDailyDataController : ControllerBase
	{
		private readonly IUserDailyDataRepository _userDailyDataRepository;

		public UserDailyDataController(IUserDailyDataRepository userDailyDataRepository)
		{
			_userDailyDataRepository = userDailyDataRepository;
		}
		// GET: api/<UserDailyDataController>
		[HttpGet]
		public IEnumerable<UserDailyData> Get()
		{
			return _userDailyDataRepository.GetAll();
		}

		// GET api/<UserDailyDataController>/5
		[HttpGet("{id}")]
		public UserDailyData Get(int id)
		{
			return _userDailyDataRepository.FindById(id);
		}

		// POST api/<UserDailyDataController>
		[HttpPost]
		public ActionResult Post([FromBody] UserDailyData value)
		{
			_userDailyDataRepository.Create(value);
			return Ok(_userDailyDataRepository.Save());
		}

		// PUT api/<UserDailyDataController>/5
		[HttpPut("{id}")]
		public ActionResult Put([FromBody] UserDailyData value)
		{
			_userDailyDataRepository.Update(value);
			return Ok(_userDailyDataRepository.Save());
		}

		// DELETE api/<UserDailyDataController>/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			_userDailyDataRepository.Delete(_userDailyDataRepository.FindById(id));
			return Ok(_userDailyDataRepository);
		}
	}
}
