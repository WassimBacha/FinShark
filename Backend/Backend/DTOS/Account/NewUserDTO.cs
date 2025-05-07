using System.ComponentModel.DataAnnotations;

namespace Backend.DTOS.Account
{
    public class NewUserDTO
    {
        public string UserName { get; set; }
       
        public string Email { get; set; }

       
        public string Token { get; set; }
    }
}
