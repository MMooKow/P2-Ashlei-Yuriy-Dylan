using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace API.Tests.ControllersTests
{
    public class BuggyControllerTests
    {
        [Fact]
        public ActionResult<string> GetSecretText_ValidCall()
        {
            throw new NotImplementedException();
        }

    }
}
