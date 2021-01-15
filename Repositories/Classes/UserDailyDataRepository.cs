using DAWProject.Data;
using DAWProject.Models.Entities;
using DAWProject.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Repositories.Classes
{
	public class UserDailyDataRepository : GenericRepository<UserDailyData>, IUserDailyDataRepository
	{
		public UserDailyDataRepository(DAWContext _context) : base(_context)
		{

		}

		public UserDailyData GetByDate(int userid, DateTime data)
		{

			var dailydata = _context.UserDailyData.Where(x => x.UserId == userid &&
			x.Day.Day == data.Day && x.Day.Month == data.Month && x.Day.Year == data.Year).OrderBy(x => x.Day).LastOrDefault();

			return dailydata;
		}
	}
}
