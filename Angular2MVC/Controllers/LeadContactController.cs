using Angular2MVC.Code;
using Angular2MVC.DBContext;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using Angular2MVC.Models;

namespace Angular2MVC.Controllers
{
    public class LeadContactController : BaseAPIController
    {
        private StateRepository stateRepository;

        public LeadContactController()
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
            var contacts = stateRepository.GetStateById(id).StateLeadContacts.Select(x => new StateContactModel(x)).ToList();
            return ToJson(contacts);
        }

        //public HttpResponseMessage Post([FromBody]TblUser value)
        //{
        //    UserDB.TblUsers.Add(value);
        //    return ToJson(UserDB.SaveChanges());
        //}

        public HttpResponseMessage Put(int id, [FromBody]StateContactModel value)
        {
            var contact = stateRepository.GetStates().SelectMany(x => x.StateLeadContacts).FirstOrDefault(x => x.LeadContactId == id);
            contact.Name = value.Name;
            contact.Phone_ = value.Phone;
            contact.Role = value.Role;
            contact.Email = value.Email;
            contact.Additional = value.AdditionalInfo;
            contact.Fax = value.Fax;

            return ToJson(stateRepository.Save());
        }
        public HttpResponseMessage Delete(int id)
        {
            UserDB.TblUsers.Remove(UserDB.TblUsers.FirstOrDefault(x => x.Id == id));
            return ToJson(UserDB.SaveChanges());
        }
    }
}
