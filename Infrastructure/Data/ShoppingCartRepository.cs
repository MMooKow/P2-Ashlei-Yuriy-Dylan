using System;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly IDatabase _database;
        public ShoppingCartRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteShoppingCartAsync(string shoppingCartId)
        {
            return await _database.KeyDeleteAsync(shoppingCartId);
        }

        public async Task<CustomerShoppingCart> GetShoppingCartAsync(string shoppingCartId)
        {
            var data = await _database.StringGetAsync(shoppingCartId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerShoppingCart>(data);
        }
        /// <summary>
        /// TimeSpan used to specify lifetime of the shopping cart in the memory
        /// </summary>
        public async Task<CustomerShoppingCart> UpdateShoppingCartAsync(CustomerShoppingCart shoppingCart
        )
        {
            var created = await _database.StringSetAsync(shoppingCart.Id, JsonSerializer.Serialize(shoppingCart),
                TimeSpan.FromDays(30));

            if (!created) return null;

            return await GetShoppingCartAsync(shoppingCart.Id);
        }
    }
}
