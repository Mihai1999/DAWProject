using DAWProject.Data;
using DAWProject.DTOs;
using DAWProject.Helpers;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace DAWProject.Services
{
	public class UserService : IUserService
	{
		private readonly AppSettings _appSettings;
		private readonly DAWContext _context;

		public UserService(IOptions<AppSettings> appSetings, DAWContext context)
		{
			_appSettings = appSetings.Value;
			_context = context;

		}
		public UserResponseDTO Authentificate(UserRequestDTO userRequest)
		{
			var user = _context.Users.SingleOrDefault(x => x.Email == userRequest.Email && x.Password == userRequest.Password );
			
			if (user == null) return null;

			var token = GenerateUserJWTToken(user);

			return new UserResponseDTO(user, token);

		}

		private string GenerateUserJWTToken(User user)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
				Expires = DateTime.UtcNow.AddDays(7),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}