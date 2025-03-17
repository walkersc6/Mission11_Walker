using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        //display book records from database
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1) //by default, display 5 books per page
        {
            //list of books to display depending on page number and page size
            var bookList = _bookContext.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            //number of books in the database
            var totalNumBooks = _bookContext.Books.Count();

            //create an object to hold books and total number of books to return
            var thingsToPass = new
            {
                Books = bookList,
                TotalBooks = totalNumBooks
            };

            //return the thing to pass
            return Ok(thingsToPass);
        }
    }
}
