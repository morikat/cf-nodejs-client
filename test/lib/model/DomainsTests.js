/*jslint node: true*/
/*global describe: true, it: true*/
/*globals Promise:true*/
"use strict";

var chai = require("chai"),
    expect = require("chai").expect;

var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });

var cf_api_url = nconf.get('CF_API_URL'),
    username = nconf.get('username'),
    password = nconf.get('password');

var CloudFoundry = require("../../../lib/model/CloudFoundry");
var CloudFoundryDomains = require("../../../lib/model/Domains");
CloudFoundry = new CloudFoundry(nconf.get('CF_API_URL'));
CloudFoundryDomains = new CloudFoundryDomains(nconf.get('CF_API_URL'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("Cloud foundry Domains", function () {

    it("The platform returns Domains defined", function () {
        this.timeout(3000);

        var token_endpoint = null;
        var domain = null;
        return CloudFoundry.getInfo().then(function (result) {
            token_endpoint = result.token_endpoint;
            return CloudFoundry.login(token_endpoint, username, password).then(function (result) {
                return CloudFoundryDomains.getDomains(result.token_type, result.access_token);
            });
        }).then(function (result) {
            domain = result.resources[0].entity.name;
            expect(domain).is.a("string");
            expect(result.resources.length).to.be.above(0);
            expect(result.total_results).is.a("number");
        });
    });

    it("The platform returns Shared domains defined", function () {
        this.timeout(5000);

        var token_endpoint = null;
        var domain = null;
        return CloudFoundry.getInfo().then(function (result) {
            token_endpoint = result.token_endpoint;
            return CloudFoundry.login(token_endpoint, username, password).then(function (result) {
                return CloudFoundryDomains.getSharedDomains(result.token_type, result.access_token);
            });
        }).then(function (result) {
            domain = result.resources[0].entity.name;
            expect(domain).is.a("string");
            expect(result.resources.length).to.be.above(0);
            expect(result.total_results).is.a("number");
        });
    });

});