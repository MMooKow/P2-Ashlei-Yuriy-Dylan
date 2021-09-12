using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public string GetProducts()
        {
            return "should return a product list";
        }


        //way to get single product
        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")]
        public string GetProduct(int id)
        {
            return "single product";
        }
        
    }
}