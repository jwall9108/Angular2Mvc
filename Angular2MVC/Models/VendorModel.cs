using Angular2MVC.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angular2MVC.Models
{
    public class VendorModel
    {
        public IEnumerable<VendorContactModel> Contacts { get; set; }

        public string Vendor { get; set; }

        public VendorModel()
        {
        }

        public VendorModel(Vendor vendor, IEnumerable<StateVendorContact> vendorContacts)
        {
            Vendor = vendor.VendorName;
            Contacts = vendorContacts.Select(x => new VendorContactModel(x.VendorContact)).ToList();
        }
    }
}