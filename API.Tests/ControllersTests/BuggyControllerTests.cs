using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Controllers;
using API.Errors;
using Autofac.Extras.Moq;
using Infrastructure.Data.Migrations;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace API.Tests.ControllersTests
{
    public class BuggyControllerTests
    {

        /// <summary>
        /// Test to make sure GetNotFoundRequest works
        /// </summary>
        /// <returns></returns>
        [Fact]
        public ActionResult GetNotFoundRequest_ValidCall()
        {
            /// Using GetLoose to make sure this method is called. Don't currently need GetStrict
            using (var mock = AutoMock.GetLoose())
            {
                var thing = mock.Mock<StoreContext>()
                    .Setup(x => x.Products.Find(42));
                Assert.True(thing.Equals(42));
                    
            
            }
            throw new NotImplementedException();
        }
    }
}

