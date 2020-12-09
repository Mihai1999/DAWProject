using DAWProject.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Models.Entities
{
	public class UserDailyData : BaseEntity
	{
		public DateTime Day { get; set; }
		public Double Weigth { get; set; }
		public Double BPM { get; set; }
		public int UserId { get; set; }
		public virtual User User { get; set; } 
	}
}
