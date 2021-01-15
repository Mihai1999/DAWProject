using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DAWProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserDailyDataController : ControllerBase
	{
		private readonly IUserDailyDataRepository _userDailyDataRepository;
		private readonly DAWContext _context;

		public UserDailyDataController(IUserDailyDataRepository userDailyDataRepository, DAWContext context)
		{
			_userDailyDataRepository = userDailyDataRepository;
			_context = context;
		}
		// GET: api/<UserDailyDataController>
		[HttpGet]
		public IEnumerable<UserDailyData> Get()
		{
			return _userDailyDataRepository.GetAll();
		}

		[HttpPost("{userid}")]
		public ActionResult<UserDailyData> GetDailyData(int userid, [FromBody] DateTime data)
		{
			return _userDailyDataRepository.GetByDate(userid, data);
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

			UserDailyData exist = GetDailyData(value.UserId, value.Day).Value;
			if (exist != null)
			{
				_userDailyDataRepository.Delete(exist);

			}

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
