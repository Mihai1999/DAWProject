using DAWProject.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Models.Entities
{
	public class Meal : BaseEntity
	{
		public DateTime Date { get; set; }
		public int UserId { get; set; }
		public virtual User User { get; set; }
		public ICollection<Serving> Servings { get; set; }
	}
}
