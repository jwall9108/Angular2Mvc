using Angular2MVC.DBContext;
using System;

namespace Angular2MVC.Models
{
    public class StateReportStatusModel
    {
        public enum ReportStatus
        {
            Submitting,
            Late
        }

        public string ReportName { get; set; }

        public DateTime LastSent { get; set; }

        public string Status { get; set; }


        public StateReportStatusModel() {

        }

        public StateReportStatusModel(AssessmentReport report)
        {
            ReportName = "Assessment Report";
            LastSent = report.Date_Last_File_Sent.GetValueOrDefault();
            Status = GetStatus(report.Status);

        }
        public StateReportStatusModel(DemographicDataReport report)
        {
            ReportName = "Demographic Report";
            LastSent = report.Date_Last_File_Sent.GetValueOrDefault();
            Status = GetStatus(report.Status);

        }
        public StateReportStatusModel(LastUpdateReport report)
        {
            ReportName = "Last Update Report";
            LastSent = report.Date_Last_File_Sent.GetValueOrDefault();
            Status = GetStatus(report.Late);
        }

        private string GetStatus(string status) {
            if (status == "Late")
            {
                return ReportStatus.Late.ToString();
            }
            return ReportStatus.Submitting.ToString();
        }
    }
}