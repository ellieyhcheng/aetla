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


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var courses = []
var catalogs = []
var plans = []

// function courseCreate(subject, num, title, units, description, cb) {
//   coursedetail = {
//       subject: subject,
//       num: num,
//       title: title,
//       units: units,
//       description: description
//   }

//   var course = new Course(coursedetail);

//   course.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Course: ' + course);
//     courses.push(course)
//     cb(null, course)
//   }  );
// }

// function courseListCreate(name, courses, cb) {
//   courselistdetail = { 
//     name: name,
//     courses: courses,
//   }

//   var courseList = new CourseList(courselistdetail);    
//   courseList.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New CourseList: ' + courseList);
//     courselists.push(courseList)
//     cb(null, courseList)
//   }  );
// }


const cse = [
    'COM SCI 1',
    'COM SCI 31',
    'COM SCI 32',
    'COM SCI 33',
    'COM SCI 35L',
    'COM SCI M51A',
    'COM SCI 111',
    'COM SCI 118',
    'COM SCI 131',
    'COM SCI M151B',
    'COM SCI 180',
    'COM SCI 181',
    'COM SCI M152A',
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
    'PHYSICS 4AL',
    'STATS 100A',
    'ENGR 185EW',
]

const cs = [
    'COM SCI 1',
    'COM SCI 31',
    'COM SCI 32',
    'COM SCI 33',
    'COM SCI 35L',
    'COM SCI M51A',
    'COM SCI 111',
    'COM SCI 118',
    'COM SCI 131',
    'COM SCI M151B',
    'COM SCI 180',
    'COM SCI 181',
    'COM SCI M152A',
    'COM SCI 152B',
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
    'PHYSICS 4AL',
    'STATS 100A',
    'ENGR 185EW',
]

const ee = [
    'MATH 31A',
    'MATH 31B',
    'MATH 32A',
    'MATH 32B',
    'MATH 33A',
    'MATH 33B',
    'CHEM 20A',
    'PHYSICS 1A',
    'PHYSICS 1B',
    'PHYSICS 1C',
    'PHYSICS 4AL',
    'PHYSICS 4BL',
    'EC ENGR 2',
    'EC ENGR 3',
    'EC ENGR 10',
    'EC ENGR 11L',
    'EC ENGR M16',
    'COM SCI 31',
    'COM SCI 32',
    'EC ENGR 101A',
    'EC ENGR 102',
    'EC ENGR 110',
    'EC ENGR 111L',
    'EC ENGR 113',
    'EC ENGR 131A',
    'ENGR 183EW',
]

function courseCreate(name, cb) {
        var filter = name.split(' ');
        var subject = filter[0];
        var num = filter[1];
        if (filter.length > 2) {
            subject = filter[0] + ' ' + filter[1];
            num = filter[2];
        }
        Course.findOne({ subject: subject, num: num }, (err, res) => {
            if (err) {
                cb(err, null)
                return
            }
            // console.log('Found course: ' + res);
            // var course = new Course(res);
            courses.push(res);
            cb(null, res)
        });
    // console.log(courses)
    // cb(null, courses)
}

function catalogCreate(name, courses, cb) {
    catalogdetail = {
        name: name,
        courses: courses,
    }

    var catalog = new Catalog(catalogdetail);
    catalog.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New CourseList: ' + catalog);
        catalogs.push(catalog)
        cb(null, catalog)
    });
}

function planCreate(title, description, courses, courselist, coursePlan, cb) {
    plandetail = {
        title: title,
        courses: courses,
        courseList: courselist
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
        console.log('New Plan: ' + plan);
        plans.push(plan)
        cb(null, plan)
    });
}

function createCourses(cb) {
    async.series([
        // function (callback) {
        //     courseCreate('COM SCI 1', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 31', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 32', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 33', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 35L', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI M51A', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 111', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 131', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI M151B', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 180', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 181', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI M152A', callback);
        // },
        // function (callback) {
        //     courseCreate('COM SCI 152B', callback);
        // },
        // function (callback) {
        //     courseCreate('EC ENGR 100', callback);
        // },
        // function (callback) {
        //     courseCreate('EC ENGR 102', callback);
        // },
        // function (callback) {
        //     courseCreate('EC ENGR 115C', callback);
        // },
        function (callback) {
            courseCreate('EC ENGR 3', callback);
        },
        function (callback) {
            courseCreate('MATH 31A', callback);
        },
        function (callback) {
            courseCreate('MATH 31B', callback);
        },
        function (callback) {
            courseCreate('MATH 32A', callback);
        },
        function (callback) {
            courseCreate('MATH 33A', callback);
        },
        function (callback) {
            courseCreate('MATH 33B', callback);
        },
        // function (callback) {
        //     courseCreate('MATH 61', callback);
        // },
        function (callback) {
            courseCreate('PHYSICS 1A', callback);
        },
        function (callback) {
            courseCreate('PHYSICS 1B', callback);
        },
        function (callback) {
            courseCreate('PHYSICS 1C', callback);
        },
        function (callback) {
            courseCreate('PHYSICS 4AL', callback);
        },
        // function (callback) {
        //     courseCreate('STATS 100A', callback);
        // },
        // function (callback) {
        //     courseCreate('ENGR 185EW', callback);
        // },
        function (callback) {
            courseCreate('CHEM 20A', callback);
        },
        function (callback) {
            courseCreate('PHYSICS 4BL', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 2', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 10', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 11L', callback);
        },
        function (callback) {
            courseCreate('EC ENGR M16', callback);
        },
        function (callback) {
            courseCreate('COM SCI 31', callback);
        },
        function (callback) {
            courseCreate('COM SCI 32', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 101A', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 102', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 110', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 111L', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 113', callback);
        },
        function (callback) {
            courseCreate('EC ENGR 131A', callback);
        },
        function (callback) {
            courseCreate('ENGR 183EW', callback);
        },
    ],
    cb)
}

function createCatalogs(cb) {
    async.parallel([
        // function (callback) {
        //     catalogCreate("CSE", courses, callback);
        // },
        function (callback) {
            catalogCreate("EE", courses, callback);
        }
    ],
    cb);
}

function createPlans(cb) {
    async.parallel([
        function (callback) {
            planCreate(
                "My First Plan", 
                "Four year plan for EE",
                [catalogs[0]], 
                courses.slice(6),
                [
                    {
                        name: "year1",
                        quarters: ['fall', 'winter'],
                        fall: [courses[0], courses[1], courses[2]],
                        winter: [courses[3], courses[4], courses[5]],
                        spring: [],
                        summer: [],
                    },
            ], callback);
        },
    ],
        cb);
}

async.series([
    createCourses,
    createCatalogs,
    createPlans
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Plans: ' + plans);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });




/* function createCourses(cb) {
    async.series([
        function(callback) {
            courseCreate("COM SCI", "1", "Freshman Computer Science Seminar", 1,
            "Seminar, one hour; discussion, one hour. Introduction to department resources and principal topics and key ideas in computer science and computer engineering. Assignments given to bolster independent study and writing skills. Letter grading.", callback);
        },
        function(callback) {
            courseCreate("COM SCI", "31", "Introduction to Computer Science I", 4,
            "Lecture, four hours; discussion, two hours; outside study, six hours. Introduction to computer science via theory, applications, and programming. Basic data types, operators and control structures. Input/output. Procedural and data abstraction. Introduction to object-oriented software development. Functions, recursion. Arrays, strings, pointers. Abstract data types, object-oriented programming. Examples and exercises from computer science theory and applications. Letter grading."
            , callback);
        },
        function(callback) {
            courseCreate("COM SCI", "32", "Introduction to Computer Science II", 4,
            "Lecture, four hours; discussion, two hours; outside study, six hours. Enforced requisite: course 31. Object-oriented software development. Abstract data type definition and use. Overloading, inheritance, polymorphism. Object-oriented view of data structures: stacks, queues, lists. Algorithm analysis. Trees, graphs, and associated algorithms. Searching and sorting. Case studies and exercises from computer science applications. Letter grading."
            , callback);
        },
        function(callback) {
            courseCreate("COM SCI", "33", "Introduction to Computer Organization", 5,
            "Lecture, four hours; discussion, two hours; outside study, nine hours. Enforced requisite: course 32. Introductory course on computer architecture, assembly language, and operating systems fundamentals. Number systems, machine language, and assembly language. Procedure calls, stacks, interrupts, and traps. Assemblers, linkers, and loaders. Operating systems concepts: processes and process management, input/output (I/O) programming, memory management, file systems. Letter grading."
            , callback);
        },
        function(callback) {
            courseCreate("COM SCI", "35L", "Software Construction Laboratory", 3,
            "Laboratory, four hours; outside study, five hours. Requisite: course 31. Fundamentals of commonly used software tools and environments, particularly open-source tools to be used in upper-division computer science courses. Letter grading."
            , callback);
        },
        function(callback) {
            courseCreate("COM SCI", "M51A", "Logic Design of Digital Systems", 4,
            "(Same as Electrical and Computer Engineering M16.) Lecture, four hours; discussion, two hours; outside study, six hours. Introduction to digital systems. Specification and implementation of combinational and sequential systems. Standard logic modules and programmable logic arrays. Specification and implementation of algorithmic systems: data and control sections. Number systems and arithmetic algorithms. Error control codes for digital information. Letter grading."
            , callback);
        },
        function(callback) {
            courseCreate("COM SCI", "111", "Operating Systems Principles", 5,
            "Lecture, four hours; laboratory, two hours; outside study, nine hours. Enforced requisites: courses 32, 33, 35L. Introduction to operating systems design and evaluation. Computer software systems performance, robustness, and functionality. Kernel structure, bootstrapping, input/output (I/O) devices and interrupts. Processes and threads; address spaces, memory management, and virtual memory. Scheduling, synchronization. File systems: layout, performance, robustness. Distributed systems: networking, remote procedure call (RPC), asynchronous RPC, distributed file systems, transactions. Protection and security. Exercises involving applications using, and internals of, real-world operating systems. Letter grading."
            , callback);
        },
    ],
    // optional callback
    cb);
} */