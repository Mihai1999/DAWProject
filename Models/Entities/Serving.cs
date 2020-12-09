using DAWProject.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Models.Entities
{
	public class Serving : BaseEntity
	{
		public Double Quantity { get; set; }
		public Double Calories { get; set; }
		public int AlimentId { get; set; }
		public Aliment Aliment { get; set; }
		public int MealId { get; set; }
		public Meal Meal { get; set; }
	}
}
