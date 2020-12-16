using DAWProject.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAWProject.Models.Entities
{
	public class User : BaseEntity
	{
		public String FirstName { get; set; }
		public String LastName { get; set; }
		public String Email { get; set; }
		public String Password { get; set; }
		public ICollection<UserDailyData> UserDailyData { get; set; }
		public ICollection<Meal> Meals { get; set; }

	}
}
