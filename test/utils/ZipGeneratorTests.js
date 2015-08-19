/*jslint node: true*/
/*global describe: true, it: true*/
"use strict";

var chai = require("chai"),
    expect = require("chai").expect;
var fs = require('fs');

var ZipGenerator = require('./ZipGenerator');
ZipGenerator = new ZipGenerator();

describe("Zip Generator", function () {

    it("Generates a zip", function () {

        var zipName = "staticApp.zip";

        return ZipGenerator.generate(zipName, 1, 0).then(function () {
            fs.exists(zipName, function (result) {
                expect(result).to.be.true;
            });
            return ZipGenerator.remove(zipName);
        }).then(function () {
            fs.exists(zipName, function (result) {
                expect(result).to.be.false;
            });
        });

    });
});