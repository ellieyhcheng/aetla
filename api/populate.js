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


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var courses = {}
var electives = []
var requirements = []
var catalogs = []
var plans = []

function electiveCreate(options, selected, name, cb) {
    electivedetail = {
        options: options,
        name: name,
    }
    if (selected) electivedetail.selected = selected;

    var elective = new Elective(electivedetail);
    elective.save(err => {
        if (err) {
            console.log('ERROR CREATING elective: ' + elective);
            cb(err, null);
            return
        }
        electives.push(elective);
        // console.log('Created Elective: ' + elective);
        cb(null, elective);
    })
}

function requirementCreate(content, type, cb) {
    requirementdetail = {
        content: content,
        contentModel: type,
    }

    var requirement = new Requirement(requirementdetail);
    requirement.save(err => {
        if (err) {
            console.log('ERROR CREATING requirement: ' + requirement);
            cb(err, null);
            return
        }
        requirements.push(requirement);
        cb(null, requirement);
    })
}

function catalogCreate(name, courses, cb) {
    catalogdetail = {
        name: name,
        courses: courses,
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
}

function planCreate(title, description, courses, courselist, coursePlan, cb) {
    plandetail = {
        title: title,
        courses: courses,
        courseList: courselist,
        coursePlan: {
            name: 'year1',
            quarters: ['fall'],
            fall: [], 
            winter: [],
            spring: [],
            summer: [],
        }
    }
    if (description != false) plandetail.description = description;
    if (coursePlan != false) plandetail.coursePlan = coursePlan;

    var plan = new Plan(plandetail);
    plan.save(function (err) {
        if (err) {
            console.log('ERROR CREATING Plan: ' + plan);
            cb(err, null)
            return
        }
        plans.push(plan)
        cb(null, err)
    });
}

const cseCourses = [
    'COM SCI 1',
    'COM SCI 31',
    'COM SCI 32',
    'COM SCI 33',
    'COM SCI 35L',
    'COM SCI M51A',
    'COM SCI 111',
    'COM SCI 112',
    'COM SCI 117',
    'COM SCI 118',
    'COM SCI M119',
    'COM SCI CM121',
    'COM SCI CM122',
    'COM SCI CM124',
    'COM SCI 130',
    'COM SCI 131',
    'COM SCI 132',
    'COM SCI 133',
    'COM SCI 136',
    'COM SCI C137A',
    'COM SCI C137B',
    'COM SCI 143',
    'COM SCI 144',
    'COM SCI 145',
    'COM SCI M146',
    'COM SCI M151B',
    'COM SCI M152A',
    'COM SCI 152B',
    'COM SCI 161',
    'COM SCI 168',
    'COM SCI 170A',
    'COM SCI M171L',
    'COM SCI 172',
    'COM SCI 174A',
    'COM SCI 174B',
    'COM SCI C174C',
    'COM SCI 180',
    'COM SCI 181',
    'COM SCI M182',
    'COM SCI 183',
    'COM SCI M184',
    'COM SCI M185',
    'COM SCI CM186',
    'COM SCI CM187',
    'EC ENGR 100',
    'EC ENGR 102',
    'EC ENGR 115C',
    'EC ENGR 3',
    'EC ENGR M16',
    'EC ENGR M116C',
    'EC ENGR M116L',
    'EC ENGR 131A',
    'MATH 31A',
    'MATH 31B',
    'MATH 32A',
    'MATH 32B',
    'MATH 33A',
    'MATH 33B',
    'MATH 61',
    'MATH 170A',
    'PHYSICS 1A',
    'PHYSICS 1B',
    'PHYSICS 1C',
    'PHYSICS 4AL',
    'PHYSICS 4BL',
    'STATS 100A',
    'C&EE 110',
    'ENGR 185EW',
    'ENGR 183EW',
    'TBR 1',
    'TBR 2',
    'TBR 3',
    'GE LCA',
    'GE PLA',
    'GE VPA',
    'GE HAN',
    'GE SAN',
    'GE LS',
]

function getCourses(arr, cb) {
    async.map(arr, (name, cb) => {
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
            // console.log('Found course: ' + name);
            courses[name] = res;
            cb(null, res)
            return res;
        })
    }, cb)
}

function createElectives(cb) {
    async.parallel([
        function(callback) {
            electiveCreate([courses['PHYSICS 4AL'], courses['PHYSICS 4BL']], 0, '', callback);
        },
        function(callback) {
            electiveCreate([courses['COM SCI M51A'], courses['EC ENGR M16']], 0, '', callback);
        },
        function(callback) {
            electiveCreate([courses['COM SCI M151B'], courses['EC ENGR M116C']], 0, '', callback);
        },
        function(callback) {
            electiveCreate([courses['COM SCI M152A'], courses['EC ENGR M116L']], 0, '', callback);
        },
        function(callback) {
            electiveCreate([courses['STATS 100A'], courses['C&EE 110'], courses['EC ENGR 131A'], courses['MATH 170A']], 0, '', callback);
        },
        function(callback) {
            electiveCreate([courses['ENGR 185EW'],courses['ENGR 183EW']], 0, 'Ethics', callback);
        },
        function(callback) {
            electiveCreate([courses['GE LCA'],courses['GE PLA'],courses['GE VPA'],], 0, 'GE FAH', callback);
        },
        function(callback) {
            electiveCreate([courses['GE LCA'],courses['GE PLA'],courses['GE VPA'],], 0, 'GE FAH', callback);
        },
        function(callback) {
            electiveCreate([
                courses['COM SCI 112'],
                courses['COM SCI 117'],
                courses['COM SCI M119'],
                courses['COM SCI CM121'],
                courses['COM SCI CM122'],
                courses['COM SCI CM124'],
                courses['COM SCI 130'],
                courses['COM SCI 132'],
                courses['COM SCI 133'],
                courses['COM SCI 136'],
                courses['COM SCI C137A'],
                courses['COM SCI C137B'],
                courses['COM SCI 143'],
                courses['COM SCI 144'],
                courses['COM SCI 145'],
                courses['COM SCI M146'],
                courses['COM SCI 161'],
                courses['COM SCI 168'],
                courses['COM SCI 170A'],
                courses['COM SCI M171L'],
                courses['COM SCI 172'],
                courses['COM SCI 174A'],
                courses['COM SCI 174B'],
                courses['COM SCI C174C'],
                courses['COM SCI M182'],
                courses['COM SCI 183'],
                courses['COM SCI M184'],
                courses['COM SCI M185'],
                courses['COM SCI CM186'],
                courses['COM SCI CM187'],
            ], 0, 'COM SCI Elective 1', callback);
        },
        function(callback) {
            electiveCreate([
                courses['COM SCI 112'],
                courses['COM SCI 117'],
                courses['COM SCI M119'],
                courses['COM SCI CM121'],
                courses['COM SCI CM122'],
                courses['COM SCI CM124'],
                courses['COM SCI 130'],
                courses['COM SCI 132'],
                courses['COM SCI 133'],
                courses['COM SCI 136'],
                courses['COM SCI C137A'],
                courses['COM SCI C137B'],
                courses['COM SCI 143'],
                courses['COM SCI 144'],
                courses['COM SCI 145'],
                courses['COM SCI M146'],
                courses['COM SCI 161'],
                courses['COM SCI 168'],
                courses['COM SCI 170A'],
                courses['COM SCI M171L'],
                courses['COM SCI 172'],
                courses['COM SCI 174A'],
                courses['COM SCI 174B'],
                courses['COM SCI C174C'],
                courses['COM SCI M182'],
                courses['COM SCI 183'],
                courses['COM SCI M184'],
                courses['COM SCI M185'],
                courses['COM SCI CM186'],
                courses['COM SCI CM187'],
            ], 0, 'COM SCI Elective 2', callback);
        },
        function(callback) {
            electiveCreate([
                courses['COM SCI 112'],
                courses['COM SCI 117'],
                courses['COM SCI M119'],
                courses['COM SCI CM121'],
                courses['COM SCI CM122'],
                courses['COM SCI CM124'],
                courses['COM SCI 130'],
                courses['COM SCI 132'],
                courses['COM SCI 133'],
                courses['COM SCI 136'],
                courses['COM SCI C137A'],
                courses['COM SCI C137B'],
                courses['COM SCI 143'],
                courses['COM SCI 144'],
                courses['COM SCI 145'],
                courses['COM SCI M146'],
                courses['COM SCI 161'],
                courses['COM SCI 168'],
                courses['COM SCI 170A'],
                courses['COM SCI M171L'],
                courses['COM SCI 172'],
                courses['COM SCI 174A'],
                courses['COM SCI 174B'],
                courses['COM SCI C174C'],
                courses['COM SCI M182'],
                courses['COM SCI 183'],
                courses['COM SCI M184'],
                courses['COM SCI M185'],
                courses['COM SCI CM186'],
                courses['COM SCI CM187'],
            ], 0, 'COM SCI Elective 3', callback);
        },
    ], cb)
}

function createRequirements(cb) {
    const nonElectives = [
        'COM SCI 1',
        'COM SCI 31',
        'COM SCI 32',
        'COM SCI 33',
        'COM SCI 35L',
        'COM SCI 111',
        'COM SCI 118',
        'COM SCI 131',
        'COM SCI 180',
        'COM SCI 181',
        'COM SCI 152B',
        'EC ENGR 100',
        'EC ENGR 102',
        'EC ENGR 115C',
        'EC ENGR 3',
        'MATH 31A',
        'MATH 31B',
        'MATH 32A',
        'MATH 32B',
        'MATH 33A',
        'MATH 33B',
        'MATH 61',
        'PHYSICS 1A',
        'PHYSICS 1B',
        'PHYSICS 1C',
        'TBR 1',
        'TBR 2',
        'TBR 3',
        'GE LS',
        'GE HAN',
        'GE SAN'
    ];
    async.parallel([
        // Create Reqs for all the electives (use async.map on all the electives in the array)
        function(callback) {
            async.map(electives, (elec, cb) => {
                requirementCreate(elec, 'Elective', cb)
            }, callback)
        },
        // Create Reqs for the rest of the courses (use a new array to query courses object)
        function(callback) {
            async.map(nonElectives, (course, cb) => {
                requirementCreate(courses[course], 'Course', cb);
            }, callback);
        }
    ], cb)
}

function createCatalogs(cb) {
    async.parallel([
        function (callback) {
            catalogCreate("CSE", requirements, callback);
        },
        // function (callback) {
        //     catalogCreate("EE", courses, callback);
        // }
    ],
    cb);
}

function createPlans(cb) {
    async.parallel([
        function (callback) {
            planCreate(
                "My First Plan", 
                "Four year plan for CSE",
                [catalogs[0]],
                requirements,
                false, callback);
        },
    ],
    cb);
}


async.series([
    function(callback) {
        getCourses(cseCourses, callback);
    },
    createElectives,
    createRequirements,
    createCatalogs,
    createPlans

], (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("All loaded");
    }
    mongoose.connection.close();
})