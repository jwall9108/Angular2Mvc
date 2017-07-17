using Angular2MVC.Code;
using Angular2MVC.DBContext;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using Angular2MVC.Models;
using System.Net;

namespace Angular2MVC.Controllers
{
    public class LeadContactController : BaseAPIController
    {
        private StateRepository stateRepository;

        public LeadContactController()
        {
            stateRepository = new StateRepository(new StateTrackerContext());
        }

        [HttpGet]
        public HttpResponseMessage GetContacts(int id)
        {
            var contacts = stateRepository.GetStateById(id).StateLeadContacts.Select(x => new StateContactModel(x)).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, contacts);
        }

        [HttpPost]
        public HttpResponseMessage AddContact([FromUri]int id, [FromBody]StateContactModel value)
        {
            var contact = new StateLeadContact()
            {
                StateId = id,
                Name = value.Name,
                Phone_ = value.Phone,
                Role = value.Role,
                Email = value.Email,
                Additional = value.AdditionalInfo,
                Fax = value.Fax
            };

            stateRepository.AddContact(contact);
            return ToJson(stateRepository.Save());
        }

        [HttpPut]
        public HttpResponseMessage Put(int id, [FromBody]StateContactModel value)
        {
            var contact = stateRepository.GetStates().SelectMany(x => x.StateLeadContacts).FirstOrDefault(x => x.LeadContactId == id);
            contact.Name = value.Name;
            contact.Phone_ = value.Phone;
            contact.Role = value.Role;
            contact.Email = value.Email;
            contact.Additional = value.AdditionalInfo;
            contact.Fax = value.Fax;

            return Request.CreateResponse(HttpStatusCode.OK, stateRepository.Save());
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            stateRepository.DeleteContact(id);
            return ToJson(stateRepository.Save());
        }
    }
}
