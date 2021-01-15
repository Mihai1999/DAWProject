using DAWProject.Data;
using DAWProject.Helpers;
using DAWProject.Repositories.Classes;
using DAWProject.Repositories.Interfaces;
using DAWProject.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DAWProject
{
	public class Startup
	{
		private readonly string CustomCors = "_customCors";
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(
					builder =>
					{
						//builder.AllowAnyOrigin()
						builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod(); 
					});

				options.AddPolicy(name: CustomCors,
							  builder =>
							  {
								  builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
							  });
			});


			services.AddControllersWithViews().AddNewtonsoftJson(options =>
				options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/dist";
			});
			services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
			services.AddScoped<IUserService, UserService>();

			services.AddDbContext<DAWContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));

			services.AddTransient<IUserRepository, UserRepository>();

			services.AddTransient<IUserDailyDataRepository, UserDailyDataRepository>();

			services.AddTransient<IMealRepository, MealRepository>();

			services.AddTransient<IServingRepository, ServingRepository>();

			services.AddTransient<IAlimentRepository, AlimentRepository>();

			services.AddTransient<IMealService, MealService>();




		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			

			app.UseStaticFiles();
			if (!env.IsDevelopment())
			{
				app.UseSpaStaticFiles();
			}

			app.UseRouting();
			app.UseCors();

			app.UseMiddleware<JWTMiddleware>();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");

				endpoints.MapControllers().RequireCors(CustomCors);
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});
		}
	}
}
