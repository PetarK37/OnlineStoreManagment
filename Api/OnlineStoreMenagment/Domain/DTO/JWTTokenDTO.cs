namespace Domain.DTO
{
    public class JWTTokenDTO
    {
        public string Token { get; set; }


        public JWTTokenDTO(string token)
        {
            this.Token = token;
        }

    }
}
