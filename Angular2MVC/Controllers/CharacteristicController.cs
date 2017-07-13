using Angular2MVC.Code;
using Angular2MVC.DBContext;
using Angular2MVC.Models;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    public class CharacteristicController : BaseAPIController
    {
        private StateRepository stateRepository;

        public CharacteristicController()
        {
            stateRepository = new StateRepository(new StateTrackerContext());
        }

        // GET api/<controller>
        public void Get()
        {


        }

        // GET api/<controller>/5
        public HttpResponseMessage Get(int id)
        {
            var contacts = stateRepository.GetStateById(id).StateCharacteristics.Select(x => new StateCharacteristicsModel(x)).ToList();
            return ToJson(contacts);
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
