using DAWProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.DTOs
{
	public class UserResponseDTO
	{
		public int Id { get; set; }
		public String FirstName{ get; set; }
		public String LastName { get; set; }
		public String Email { get; set; }
		public string Token { get; set; }

		public UserResponseDTO(User user, string token)
		{
			Id = user.Id;
			FirstName = user.LastName;
			LastName = user.LastName;
			Email = user.Email;
			Token = token;
		}
		
	}
}
