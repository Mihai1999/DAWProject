using DAWProject.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAWProject.Data
{
	public class DAWContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<UserDailyData> UserDailyData { get; set; }
		public DbSet<Meal> Meals { get; set; }
		public DbSet<Serving> Servings { get; set; }
		public DbSet<Aliment> Aliments { get; set; }
		
		public DAWContext(DbContextOptions<DAWContext> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			builder.Entity<UserDailyData>()
				.HasOne(x => x.User)
				.WithMany(y => y.UserDailyData)
				.HasForeignKey(f => f.UserId);

			builder.Entity<Meal>()
				.HasOne(x => x.User)
				.WithMany(y => y.Meals)
				.HasForeignKey(f => f.UserId);

			builder.Entity<Serving>()
				.HasOne(x => x.Meal)
				.WithMany(y => y.Servings)
				.HasForeignKey(f => f.MealId);

			builder.Entity<Serving>()
				.HasOne(x => x.Aliment)
				.WithMany(y => y.Servings)
				.HasForeignKey(f => f.AlimentId);

			base.OnModelCreating(builder);
		}
	}
}
