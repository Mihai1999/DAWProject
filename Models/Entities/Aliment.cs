using DAWProject.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Models.Entities
{
	public class Aliment : BaseEntity
	{
		public String Name { get; set; }
		public String Photo { get; set; }
		public Double Quantity { get; set; }
		public Double Calories { get; set; }
		public Double Fats { get; set; }
		public Double Fibers { get; set; }
		public Double Carbs { get; set; }
		public ICollection<Serving> Servings { get; set; }


	}
}
