using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAWProject.DTOs;
using DAWProject.Helpers;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using DAWProject.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DAWProject.Controllers
{
	[EnableCors]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserRepository _userRepository;
		private readonly IUserService _userService;
		private readonly IMealRepository _mealRepository;

		public UserController(IUserRepository userRepository, IUserService userService, IMealRepository mealRepository)
		{
			_userRepository = userRepository;
			_userService = userService;
			_mealRepository = mealRepository;
		}

		[HttpPost("authentificate")]
		public IActionResult Authentificate(UserRequestDTO user)
		{
			var result = _userService.Authentificate(user);
			
			if(result == null)
			{
				return BadRequest(new { Message = "Username or Password is invalid!" });
			}

			return Ok(result);
		}
		// GET: api/<UserController>
		//[Authorize]
		[HttpGet]
		public IEnumerable<User> Get()
		{
			return _userRepository.GetAllJoins();
		}

		// GET api/<UserController>/5
		[HttpGet("{id}")]
		public User Get(int id)
		{
			return _userRepository.FindById(id);
		}

		[HttpGet("{id}/meals")]
		public List<Meal> Get(int id, [FromBody] DateTime data)
		{
			return _mealRepository.GetMealsWithJoins(id, data);
		}


		[HttpGet("{id}/usermeals")]
		public List<Meal> GetUserMeals(int id)
		{
			return _mealRepository.GetUserMeals(id);
		}

		// POST api/<UserController>
		[HttpPost]
		public ActionResult Post([FromBody] User value)
		{
			_userRepository.Create(value);
			return Ok(_userRepository.Save());
		}

		// PUT api/<UserController>/5
		[HttpPut("{id}")]
		public ActionResult Put([FromBody] User value)
		{
			_userRepository.Update(value);
			return Ok(_userRepository.Save());
		}

		// DELETE api/<UserController>/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			_userRepository.Delete(_userRepository.FindById(id));
			return Ok(_userRepository.Save());
		}
	}
}
