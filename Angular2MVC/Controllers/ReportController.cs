using Angular2MVC.Code;
using Angular2MVC.DBContext;
using Angular2MVC.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    public class ReportController : BaseAPIController
    {
        private StateRepository stateRepository;

        public ReportController()
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
            var state = stateRepository.GetStateById(id);

            List<StateReportStatusModel> reports = new List<StateReportStatusModel>
            {
                new StateReportStatusModel(state.AssessmentReports.FirstOrDefault()),
                new StateReportStatusModel(state.DemographicDataReports.FirstOrDefault()),
                new StateReportStatusModel(state.LastUpdateReports.FirstOrDefault())
            };

            return ToJson(reports);
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
