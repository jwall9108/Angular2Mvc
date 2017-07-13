using Angular2MVC.Code;
using Angular2MVC.DBContext;
using Angular2MVC.Models;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    public class VendorController : BaseAPIController
    {
        private StateRepository stateRepository;

        public VendorController()
        {
            stateRepository = new StateRepository(new StateTrackerContext());
        }

        // GET api/<controller>
        public void Get()
        {


        }

        // GET api/<controller>/5
        public HttpResponseMessage HttpResponseMessage(int id)
        {
            var state = stateRepository.GetStateById(id);

            var vendorContacts = state.StateVendors.Select(x => new VendorModel(x.Vendor, state.StateVendorContacts)).ToList();
            return ToJson(vendorContacts);
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
