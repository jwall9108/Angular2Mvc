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

        //public void InsertStudent(Student student)
        //{
        //    context.States.Add(student);
        //}

        //public void DeleteStudent(int studentID)
        //{
        //    Student student = context.States.Find(studentID);
        //    context.States.Remove(student);
        //}

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