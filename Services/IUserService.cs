using DAWProject.DTOs;
using DAWProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Services
{
	public interface IUserService
	{
		UserResponseDTO Authentificate(UserRequestDTO userRequest);

	}
}
