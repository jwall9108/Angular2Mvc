using Angular2MVC.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Angular2MVC.Code
{
    public class StateRepository
    {
        private StateTrackerContext context;

        public StateRepository(StateTrackerContext context)
        {
            this.context = context;
        }

        public IEnumerable<State> GetStates()
        {
            return context.States.ToList();
        }

        public State GetStateById(int id)
        {
            return context.States.Find(id);
        }

        public void AddContact(StateLeadContact contact)
        {
            context.StateLeadContacts.Add(contact);
        }

        public void DeleteContact(int Id)
        {
            var contact = context.StateLeadContacts.Where(x => x.LeadContactId == Id).FirstOrDefault();
            context.StateLeadContacts.Remove(contact);
        }

        //public void UpdateStudent(State student)
        //{
        //    context.Entry(student).State = States.Modified;
        //}

        public int Save()
        {
            return context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}