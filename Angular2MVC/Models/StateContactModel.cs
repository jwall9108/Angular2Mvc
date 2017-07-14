using Angular2MVC.DBContext;

namespace Angular2MVC.Models
{
    public class StateContactModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Role { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Fax { get; set; }

        public string AdditionalInfo { get; set; }


        public StateContactModel()
        {
        }

        public StateContactModel(StateLeadContact contact) {
            Id = contact.LeadContactId;
            Name = contact.Name;
            Role = contact.Role;
            Phone = contact.Phone_;
            Email = contact.Email;
            Fax = contact.Fax;
            AdditionalInfo = contact.Additional;
        }
    }
}