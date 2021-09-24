using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CustomerShoppingCart
    {
        public CustomerShoppingCart()
        {
        }

        public CustomerShoppingCart(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<ShoppingCartItem> Items { get; set; } = new List<ShoppingCartItem>();
     
    }
}
