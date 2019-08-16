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

// console.log('\nChoose an option:\n\t(1) Load written data automatically. (Default)\n\t(2) Create data entry by entry through console.')

// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     prompt: '\nOption: '
// });

// rl.prompt();

// rl.on('line', (line) => {
//     switch (line.trim()) {
//         default:
//         case '1':
//             console.log('Chosen option 1');
//             autoLoad();
//             break;
//         case '2':
//             console.log('Chosen option 2');

//             break;
//     }
// }).on('close', () => {
//     mongoose.connection.close();
//     console.log('\nExiting addData.js!');
//     process.exit(0);
// })

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
                    cb(null, res)
                    return;
                })
            }, cb)
        },
    ], cb)
}

function electiveCreate(options, name, cb) {
    async.waterfall([
        function (cb) {
            coursesGet(options, cb)
        },
        function (res, cb) {
            // console.log(res)
            Elective.findOne({
                options: res,
            }, (err, old) => {
                if (err) {
                    console.log("Error finding elective " + name);
                    cb(err, null);
                    return;
                }
                if (old !== null) {
                    console.log(old)
                    console.log("Elective already exists " + name);
                    electives.push(old);
                    cb(null, old);
                    return;
                }

                electivedetail = {
                    options: res,
                    name: name,
                }

                var elective = new Elective(electivedetail);
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

function catalogCreate(name, requirements, cb) {
    Catalog.findOne({
        name: name
    }, (err, old) => {
        if (err) {
            console.log("Error finding elective " + name);
            cb(err, null);
            return;
        }
        if (old !== null) {
            requirements.push(old);
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
        // createCatalogs,

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

// TODO: Change nonElectives and electives
const nonElectives = [
    // 'COM SCI 1',
    // 'COM SCI 31',
    // 'COM SCI 32',
    // 'COM SCI 33',
    // 'COM SCI 35L',
    // 'COM SCI 111',
    // 'COM SCI 118',
    // 'COM SCI 131',
    // 'COM SCI 180',
    // 'COM SCI 181',
    // 'COM SCI 152B',
    // 'EC ENGR 100',
    // 'EC ENGR 102',
    // 'EC ENGR 115C',
    // 'EC ENGR 3',
    // 'MATH 31A',
    // 'MATH 31B',
    // 'MATH 32A',
    // 'MATH 32B',
    // 'MATH 33A',
    // 'MATH 33B',
    // 'MATH 61',
    // 'PHYSICS 1A',
    // 'PHYSICS 1B',
    // 'PHYSICS 1C',
    // 'TBR 1',
    // 'TBR 2',
    // 'TBR 3',
    // 'GE LS',
    // 'GE HAN',
    // 'GE SAN'
]


function createElectives(cb) {
    const electiveArray = [
        [
            [
                'EC ENGR 101A',
                'EC ENGR 101B',
                'EC ENGR 101A',
                'EC ENGR 112',
                'EC ENGR 113',
                'EC ENGR 113DA',
                'EC ENGR 113DB',
                'EC ENGR 114',
                'EC ENGR 115A',
                'EC ENGR 115B',
                'EC ENGR 115E',
                'EC ENGR M119',
                'EC ENGR M116L',
                'EC ENGR M116C',
                'EC ENGR 121B',
                'EC ENGR 121DA',
                'EC ENGR 121DB',
                'EC ENGR 123A',
                'EC ENGR 123B',
                'EC ENGR 128',
                'EC ENGR 132A',
                'EC ENGR 132B',
                'EC ENGR 133A',
                'EC ENGR 133B',
                'EC ENGR 134',
                'EC ENGR 141',
                'EC ENGR 142',
                'EC ENGR C143A',
                'EC ENGR M146',
                'EC ENGR C147',
                'EC ENGR M153',
                'EC ENGR 162A',
                'EC ENGR 163A',
                'EC ENGR 163DA',
                'EC ENGR 163DB',
                'EC ENGR 163C',
                'EC ENGR 164DA',
                'EC ENGR 164DB',
                'EC ENGR 170A',
                'EC ENGR 170B',
                'EC ENGR 170C',
                'EC ENGR 173DB',
                'EC ENGR M171L',
                'EC ENGR 173DA',
                'EC ENGR 176',
                'EC ENGR 180DA',
                'EC ENGR 180DB',
                'EC ENGR 183DA',
                'EC ENGR 183DB',
                'EC ENGR 184DA',
                'EC ENGR 184DB',
                'EC ENGR M185',
            ]
        , 'ECE Elective'],
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
            catalogCreate("CSE", requirements, cb);
        },
    ], cb)
}


// Option 2: Entry
function createEntry() {

}
