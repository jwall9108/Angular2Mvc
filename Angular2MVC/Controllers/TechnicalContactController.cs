using Angular2MVC.Code;
using Angular2MVC.DBContext;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using Angular2MVC.Models;
using System.Collections.Generic;

namespace Angular2MVC.Controllers
{
    public class TechnicalContactController : BaseAPIController
    {
        private StateRepository stateRepository;

        public TechnicalContactController()
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
            var contacts = new List<StateTechincalContactModel>();
            var state = stateRepository.GetStateById(id);

            if (state.StateTechnicalContacts.Count > 0)
            {
                contacts = state.StateTechnicalContacts.FirstOrDefault().ContactInfo.Split(';')
                    .Select(x => new StateTechincalContactModel() { Contact = x }).ToList();
            }

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
