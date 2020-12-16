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
	public class AlimentController : ControllerBase
	{
		private readonly IAlimentRepository _alimentRepository;

		public AlimentController(IAlimentRepository alimentRepository)
		{
			_alimentRepository = alimentRepository;
		}
		// GET: api/<AlimentController>
		[HttpGet]
		public IEnumerable<Aliment> Get()
		{
			return _alimentRepository.GetAll();
		}

		// GET api/<AlimentController>/5
		[HttpGet("{id}")]
		public Aliment Get(int id)
		{
			return _alimentRepository.FindById(id);
		}

		[HttpGet("name/{name}")]
		public ActionResult<List<Aliment>> GetByName(string name)
		{
				
			return Ok(_alimentRepository.GetByName(name));
		}

		// POST api/<AlimentController>
		[HttpPost]
		public ActionResult Post([FromBody] Aliment value)
		{
			_alimentRepository.Create(value);
			return Ok(_alimentRepository.Save());
		}

		// PUT api/<AlimentController>/5
		[HttpPut("{id}")]
		public ActionResult Put([FromBody] Aliment value)
		{
			_alimentRepository.Update(value);
			return Ok(_alimentRepository.Save());
		}

		// DELETE api/<AlimentController>/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			_alimentRepository.Delete(_alimentRepository.FindById(id));
			return Ok(_alimentRepository.Save());
		}
	}
}
