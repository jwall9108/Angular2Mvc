﻿using Angular2MVC.Code;
using Angular2MVC.DBContext;
using Angular2MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    public class StateController : BaseAPIController
    {
        private StateRepository stateRepository;

        public StateController()
        {
            stateRepository = new StateRepository(new StateTrackerContext());
        }

        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            var states = stateRepository.GetStates().Select(x =>
                new StateModel()
                {
                    Id = x.StateId,
                    Name = x.State1,
                    Abbreviation = x.Abbreviation
                }
            ).ToList();

            return ToJson(states);
        }

        // GET api/<controller>/5
        public HttpResponseMessage Get(int id)
        {
            var state = new StateModel(stateRepository.GetStateById(id));
            return ToJson(state);
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