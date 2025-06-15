using Backend.DTOS.Account;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("backend/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager , ITokenService tokenService,SignInManager<AppUser> signInManager)
        {

            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)

                return BadRequest(ModelState);
            var user = await _userManager.Users.FirstOrDefaultAsync(x=>x.UserName == loginDTO.UserName.ToLower());
            if (user == null) return Unauthorized("Invalid UserName");
            var result = await _signInManager.CheckPasswordSignInAsync(user,loginDTO.Password,false);
            if (!result.Succeeded) return Unauthorized("Username Not Found and/or password incorrect ");
            return Ok(
                new NewUserDTO
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
                );
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                
                    return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = registerDTO.UserName,
                    Email = registerDTO.Email
                };
                var createuser = await _userManager.CreateAsync(appUser, registerDTO.Password);
                if(createuser.Succeeded)
                {
                    var RoleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if(RoleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDTO
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            }
                            );
                    }else
                    {
                        return StatusCode(500, RoleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createuser.Errors);

                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
    }
}
