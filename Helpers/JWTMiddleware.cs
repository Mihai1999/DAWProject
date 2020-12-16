using DAWProject.Repositories.Interfaces;
using DAWProject.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAWProject.Helpers
{
	public class JWTMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly AppSettings _appSettings;

		public JWTMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
		{
			_next = next;
			_appSettings = appSettings.Value;
		}

		public async Task Invoke(HttpContext httpContext, IUserRepository userRepository)
		{
			var token = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

			if (token != null)
			{
				AttachUserToHttpContext(httpContext, token, userRepository);
			}

			await _next(httpContext);
		}

		private void AttachUserToHttpContext(HttpContext httpContext, string token, IUserRepository userRepository )
		{
			try
			{
				var tokenHandler = new JwtSecurityTokenHandler();
				var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
				tokenHandler.ValidateToken(token, new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false,
					ClockSkew = TimeSpan.Zero

				}, out SecurityToken validateToken);

				var jwtToken = (JwtSecurityToken)validateToken;
				var userId =  jwtToken.Claims.First(x => x.Type == "id").Value;

				httpContext.Items["User"] = userRepository.FindById(Int32.Parse(userId));
			}
			catch
			{

			}
		}



	}
}
