using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.DTOs
{
	public class UserRequestDTO
	{
		[Required]
		public String Email { get; set; }
		[Required]
		public String Password { get; set; }

	}
}
