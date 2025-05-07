using System.ComponentModel.DataAnnotations;

namespace Backend.DTOS.Account
{
    public class LoginDTO
    {
        [Required]
        public string? UserName { get; set; }
        
        [Required]
        public string? Password { get; set; }
    }
}
