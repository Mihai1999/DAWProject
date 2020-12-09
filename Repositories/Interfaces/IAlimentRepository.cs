using DAWProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Interfaces
{
	public interface IAlimentRepository : IGenericRepository<Aliment>
	{
		List<Aliment> GetByName(string name);
	}
}
