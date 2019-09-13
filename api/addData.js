#! /usr/bin/env node

console.log('This script populates some test courses, courselists, and courseplans to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Course = require('./models/Course')
var Catalog = require('./models/Catalog')
var Plan = require('./models/Plan')
var Requirement = require('./models/Requirement')
var Elective = require('./models/Elective')
var readline = require('readline');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

load();

var electives = []
var requirements = []
var catalogs = []

/**
 * Asynchronously get courses from database using course name and save
 * to courses dictionary with name as key
 * @param {*} courseArr - array of course names
 * @param {*} cb 
 */
function coursesGet(courseArr, cb) {
    async.waterfall([
        function (cb) {
            async.map(courseArr, (name, cb) => {
                var filter = name.split(' ');
                var subject = filter[0];
                var num = filter[1];
                if (filter.length > 2) {
                    subject = filter[0] + ' ' + filter[1];
                    num = filter[2];
                }
                Course.findOne({ subject: subject, num: num }, (err, res) => {
                    if (err) {
                        console.log("Error getting course: " + name)
                        console.log(err)
                        cb(err, null);
                        return
                    }
                    if (res === null)
                        console.log("Error finding course: " + name)
                    // console.log("Found course: " + name)
                    cb(null, res.id)
                    return;
                })
            }, cb)
        },
    ], cb)
}

function electiveCreate(options, name, cb) {
        async.waterfall([
            function (cb) {
                if (options)
                    coursesGet(options, cb)
                else
                    cb(null, []) // Search by name
            },
            function (res, cb) {
                // console.log(res)
                if (name === "") {
                    Elective.findOne({
                        options: {$all: [...res]},
                    }, (err, old) => {
                        if (err) {
                            console.log("Error finding elective " + name);
                            cb(err, null);
                            return;
                        }
                        if (old !== null) {
                            console.log(res)
                            console.log("Elective already exists " + name);
                            electives.push(old);
                            cb(null, old);
                            return;
                        }

                        electivedetail = {
                            options: res,
                            name: name,
                        }

                        let elective = new Elective(electivedetail);
                        elective.save(err => {
                            if (err) {
                                console.log('ERROR CREATING elective: ' + elective);
                                cb(err, null);
                                return
                            }
                            // console.log('CREATED elective: ' + elective);
                            electives.push(elective);
                            cb(null, elective);
                        })

                    })
                }
                else {
                    Elective.findOne({
                        name: name,
                    }, (err, old) => {
                        if (err) {
                            console.log("Error finding elective " + name);
                            cb(err, null);
                            return;
                        }
                        if (old !== null) {
                            console.log(res)
                            console.log("Elective already exists " + name);
                            electives.push(old);
                            cb(null, old);
                            return;
                        }

                        electivedetail = {
                            options: res,
                            name: name,
                        }

                        let elective = new Elective(electivedetail);
                        elective.save(err => {
                            if (err) {
                                console.log('ERROR CREATING elective: ' + elective);
                                cb(err, null);
                                return
                            }
                            // console.log('CREATED elective: ' + elective);
                            electives.push(elective);
                            cb(null, elective);
                        })

                    })
                }
            },
        ], cb)
}

/**
 * 
 * @param {} content - If type is 'Course', content should be the course name.
 *         If type is 'Elective', content should be the elective object
 * @param {String} type 
 * @param {(err, res) => {}} cb 
 */
function requirementCreate(content, type, cb) {
    async.waterfall([
        function (cb) {
            if (type === "Course")
                coursesGet([content], cb)
            else if (type === "Elective")
                cb(null, content)
        },
        function (res, cb) {
            if (res.length === 1)
                res = res[0];
            Requirement.findOne({
                content: res,
            }, (err, old) => {
                if (err) {
                    console.log("Error finding requirement");
                    cb(err, null);
                    return;
                }
                if (old !== null) {
                    requirements.push(old);
                    cb(null, old);
                    return;
                }
        
                requirementdetail = {
                    content: res,
                    contentModel: type,
                }
            
                var requirement = new Requirement(requirementdetail);
                requirement.save((err, doc) => {
                    if (err) {
                        console.log('ERROR CREATING requirement: ' + requirement);
                        cb(err, null);
                        return
                    }
                    console.log(doc["_id"])
                    requirements.push(requirement);
                    cb(null, requirement);
                })
        
            })
        },
    ], cb)
    
}

function catalogCreate(name, reqs, cb) {
    Catalog.findOne({
        name: name
    }, (err, old) => {
        if (err) {
            console.log("Error finding elective " + name);
            cb(err, null);
            return;
        }
        if (old !== null) {
            catalogs.push(old);
            cb(null, old);
            return;
        }

        catalogdetail = {
            name: name,
            courses: requirements,
        }
    
        var catalog = new Catalog(catalogdetail);
        catalog.save(function (err) {
            if (err) {
                console.log('ERROR CREATING catalog: ' + catalog);
                cb(err, null);
                return;
            }
            catalogs.push(catalog);
            cb(null, catalog);
        });
    })
}

// Option 1: Auto-load
function load() {
    async.series([
        createElectives,
        createRequirements,
        createCatalogs,

    ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result)
            console.log("All loaded!");
            // rl.prompt();
            mongoose.connection.close();
        }
    })
}

// TODO: Change nonElectives and electives and name
// naming by https://www.registrar.ucla.edu/Faculty-Staff/Courses-and-Programs/Major-and-Minor-Codes/Undergraduate-Majors-and-Premajors
const catalogName = "MAT ENGR E"
const nonElectives = [
    "MATH 31A",
    "MATH 31B",
    "MATH 32A",
    "MATH 32B",
    "MATH 33A",
    "CHEM 20A",
    "CHEM 20B",
    "CHEM 20L",
    "MAT SCI 10",
    "MAT SCI 90L",
    "PHYSICS 1A",
    "PHYSICS 1B",
    "PHYSICS 1C",
    "MAT SCI 104",
    "MAT SCI 110",
    "MAT SCI 110L",
    "MAT SCI 120",
    "MAT SCI 121",
    "MAT SCI 121L",
    "MAT SCI 122",
    "MAT SCI 130",
    "MAT SCI 131",
    "MAT SCI 131L",
    "MAT SCI 132",
    "MAT SCI 140A",
    "MAT SCI 140B",
    'EC ENGR 100',
    'EC ENGR 101A',
    'EC ENGR 121B',
    'MECH&AE 101',

]

function createElectives(cb) {
    const electiveArray = [
        [["MECH&AE 82", "MATH 33B"], ""],
        [["COM SCI 31", "MECH&AE M20", "C&EE M20"], ""],
        [["MECH&AE 182B", 'MECH&AE 182C', 'C&EE 103', 'EC ENGR 102', 'MATH 132'], "UD Math Course"],
        [['MAT SCI 150', 'MAT SCI 160'], 'MAT SCI E Elective 1'],
        [['EC ENGR 123A', 'EC ENGR 123B', 'MAT SCI 150', 'MAT SCI 160'], 'MAT SCI E Elective 2'],
        [['EC ENGR 110', 'EC ENGR 131A', 'MAT SCI 111', 'MAT SCI C112', 'MAT SCI 143A', 'MAT SCI 162'], 'MAT SCI E Elective 3'],
        [['MAT SCI 141L','MAT SCI 161L', 'MAT SCI 199'], "MAT SCI E Lab 1"],
        [['MAT SCI 141L','MAT SCI 161L'], "MAT SCI E Lab 2"],

    ]
    async.map(electiveArray, (elec, cb) => {
        electiveCreate(elec[0], elec[1], cb)
    }, cb)
}

function createRequirements(cb) {
    async.parallel([
        function(cb) {
            async.map(electives, (elec, cb) => {
                requirementCreate(elec, 'Elective', cb)
            }, cb)
        },
        function(cb) {
            async.map(nonElectives, (course, cb) => {
                requirementCreate(course, 'Course', cb);
            }, cb);
        }
    ], cb)
}

function createCatalogs(cb) {
    async.parallel([
        function (cb) {
            catalogCreate(catalogName, requirements, cb);
        },
    ], cb)
}


// Option 2: Entry
function createEntry() {

}
