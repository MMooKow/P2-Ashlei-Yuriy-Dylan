using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "HMMMMM, I think it was a bad request",
                401 => "REALLY!!! You are not Authorized.",
                404 => "You have a bad luck. Whatever you were looking for was not found.",
                500 => "Server has fallen off the face of the Earth.",
                _ => null
            };
        }
    }
}
