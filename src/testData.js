const data = {
    title: "My First Plan!",
    description: "A very short description.",
    courses: {
        '5d2d3eb783d26171f4dfa447':
        {
            "_id": "5d2d3eb783d26171f4dfa447",
            "subject": "COM SCI",
            "num": "1",
            "title": "Freshman Computer Science Seminar",
            "units": 1,
            "description": "Seminar, one hour; discussion, one hour. Introduction to department resources and principal topics and key ideas in computer science and computer engineering. Assignments given to bolster independent study and writing skills. Letter grading."
        },
        '5d2d3eb783d26171f4dfa44a':
        {
            "_id": "5d2d3eb783d26171f4dfa44a",
            "subject": "COM SCI",
            "num": "31",
            "title": "Introduction to Computer Science I",
            "units": 4,
            "description": "Lecture, four hours; discussion, two hours; outside study, six hours. Introduction to computer science via theory, applications, and programming. Basic data types, operators and control structures. Input/output. Procedural and data abstraction. Introduction to object-oriented software development. Functions, recursion. Arrays, strings, pointers. Abstract data types, object-oriented programming. Examples and exercises from computer science theory and applications. Letter grading."
        },
        '5d2d3eb783d26171f4dfa44b':
        {
            "_id": "5d2d3eb783d26171f4dfa44b",
            "subject": "COM SCI",
            "num": "32",
            "title": "Introduction to Computer Science II",
            "units": 4,
            "description": "Lecture, four hours; discussion, two hours; outside study, six hours. Enforced requisite: course 31. Object-oriented software development. Abstract data type definition and use. Overloading, inheritance, polymorphism. Object-oriented view of data structures: stacks, queues, lists. Algorithm analysis. Trees, graphs, and associated algorithms. Searching and sorting. Case studies and exercises from computer science applications. Letter grading."
        },
        '5d2d3eb783d26171f4dfa44c':
        {
            "_id": "5d2d3eb783d26171f4dfa44c",
            "subject": "COM SCI",
            "num": "33",
            "title": "Introduction to Computer Organization",
            "units": 5,
            "description": "Lecture, four hours; discussion, two hours; outside study, nine hours. Enforced requisite: course 32. Introductory course on computer architecture, assembly language, and operating systems fundamentals. Number systems, machine language, and assembly language. Procedure calls, stacks, interrupts, and traps. Assemblers, linkers, and loaders. Operating systems concepts: processes and process management, input/output (I/O) programming, memory management, file systems. Letter grading."
        },
        '5d2d3eb783d26171f4dfa44d':
        {
            "_id": "5d2d3eb783d26171f4dfa44d",
            "subject": "COM SCI",
            "num": "35L",
            "title": "Software Construction Laboratory",
            "units": 3,
            "description": "Laboratory, four hours; outside study, five hours. Requisite: course 31. Fundamentals of commonly used software tools and environments, particularly open-source tools to be used in upper-division computer science courses. Letter grading."
        },
        '5d2d3eb783d26171f4dfa44e':
        {
            "_id": "5d2d3eb783d26171f4dfa44e",
            "subject": "COM SCI",
            "num": "M51A",
            "title": "Logic Design of Digital Systems",
            "units": 4,
            "description": "(Same as Electrical and Computer Engineering M16.) Lecture, four hours; discussion, two hours; outside study, six hours. Introduction to digital systems. Specification and implementation of combinational and sequential systems. Standard logic modules and programmable logic arrays. Specification and implementation of algorithmic systems: data and control sections. Number systems and arithmetic algorithms. Error control codes for digital information. Letter grading."
        },
        '5d2d3eb783d26171f4dfa451':
        {
            "_id": "5d2d3eb783d26171f4dfa451",
            "subject": "COM SCI",
            "num": "111",
            "title": "Operating Systems Principles",
            "units": 5,
            "description": "Lecture, four hours; laboratory, two hours; outside study, nine hours. Enforced requisites: courses 32, 33, 35L. Introduction to operating systems design and evaluation. Computer software systems performance, robustness, and functionality. Kernel structure, bootstrapping, input/output (I/O) devices and interrupts. Processes and threads; address spaces, memory management, and virtual memory. Scheduling, synchronization. File systems: layout, performance, robustness. Distributed systems: networking, remote procedure call (RPC), asynchronous RPC, distributed file systems, transactions. Protection and security. Exercises involving applications using, and internals of, real-world operating systems. Letter grading."
        },
        '5d2d3eb783d26171f4dfa454':
        {
            "_id": "5d2d3eb783d26171f4dfa454",
            "subject": "COM SCI",
            "num": "118",
            "title": "Computer Network Fundamentals",
            "units": 4,
            "description": "Lecture, four hours; discussion, two hours; outside study, six hours. Enforced requisite: course 111. Designed for juniors/seniors. Introduction to design and performance evaluation of computer networks, including such topics as what protocols are, layered network architecture, Internet protocol architecture, network applications, transport protocols, routing algorithms and protocols, internetworking, congestion control, and link layer protocols including Ethernet and wireless channels. Letter grading."
        },
        '5d2d3eb783d26171f4dfa45a':
        {
            "_id": "5d2d3eb783d26171f4dfa45a",
            "subject": "COM SCI",
            "num": "131",
            "title": "Programming Languages",
            "units": 4,
            "description": "Lecture, four hours; laboratory, two hours; outside study, six hours. Enforced requisites: courses 33, 35L. Basic concepts in design and use of programming languages, including abstraction, modularity, control mechanisms, types, declarations, syntax, and semantics. Study of several different language paradigms, including functional, object-oriented, and logic programming. Letter grading."
        },
        '5d2d3eb783d26171f4dfa464':
        {
            "_id": "5d2d3eb783d26171f4dfa464",
            "subject": "COM SCI",
            "num": "M151B",
            "title": "Computer Systems Architecture",
            "units": 4,
            "description": "(Same as Electrical and Computer Engineering M116C.) Lecture, four hours; discussion, two hours; outside study, six hours. Enforced requisites: courses 33, and M51A or Electrical and Computer Engineering M16. Recommended: courses 111, and M152A or Electrical and Computer Engineering M116L. Computer system organization and design, implementation of CPU datapath and control, instruction set design, memory hierarchy (caches, main memory, virtual memory) organization and management, input/output subsystems (bus structures, interrupts, DMA), performance evaluation, pipelined processors. Letter grading."
        },
        '5d2d3eb783d26171f4dfa465':
        {
            "_id": "5d2d3eb783d26171f4dfa465",
            "subject": "COM SCI",
            "num": "M152A",
            "title": "Introductory Digital Design Laboratory",
            "units": 2,
            "description": "(Same as Electrical and Computer Engineering M116L.) Laboratory, four hours; outside study, two hours. Enforced requisite: course M51A or Electrical and Computer Engineering M16. Hands-on design, implementation, and debugging of digital logic circuits, use of computer-aided design tools for schematic capture and simulation, implementation of complex circuits using programmed array logic, design projects. Letter grading."
        },
        '5d2d3eb783d26171f4dfa466':
        {
            "_id": "5d2d3eb783d26171f4dfa466",
            "subject": "COM SCI",
            "num": "152B",
            "title": "Digital Design Project Laboratory",
            "units": 4,
            "description": "Laboratory, four hours; discussion, two hours; outside study, six hours. Enforced requisite: course M151B or Electrical Engineering M116C. Recommended: Engineering 183EW or 185EW. Limited to seniors. Design and implementation of complex digital subsystems using field-programmable gate arrays (e.g., processors, special-purpose processors, device controllers, and input/output interfaces). Students work in teams to develop and implement designs and to document and give oral presentations of their work. Letter grading."
        },
        '5d2d3eb783d26171f4dfa467':
        {
            "_id": "5d2d3eb783d26171f4dfa467",
            "subject": "COM SCI",
            "num": "161",
            "title": "Fundamentals of Artificial Intelligence",
            "units": 4,
            "description": "Lecture, four hours; laboratory, two hours; outside study, six hours. Enforced requisite: course 180. Introduction to fundamental problem solving and knowledge representation paradigms of artificial intelligence. Introduction to Lisp with regular programming assignments. State-space and problem reduction methods, brute-force and heuristic search, planning techniques, two-player games. Knowledge structures including predicate logic, production systems, semantic nets and primitives, frames, scripts. Special topics in natural language processing, expert systems, vision, and parallel architectures. Letter grading."
        },
        '5d2d3eb783d26171f4dfa46f':
        {
            "_id": "5d2d3eb783d26171f4dfa46f",
            "subject": "COM SCI",
            "num": "180",
            "title": "Introduction to Algorithms and Complexity",
            "units": 4,
            "description": "Lecture, four hours; discussion, two hours; outside study, six hours. Enforced requisites: course 32, Mathematics 61. Designed for junior/senior Computer Science majors. Introduction to design and analysis of algorithms. Design techniques: divide-and-conquer, greedy method, dynamic programming; selection of prototypical algorithms; choice of data structures and representations; complexity measures: time, space, upper, lower bounds, asymptotic complexity; NP-completeness. Letter grading."
        },
        '5d2d3eb783d26171f4dfa470':
        {
            "_id": "5d2d3eb783d26171f4dfa470",
            "subject": "COM SCI",
            "num": "181",
            "title": "Introduction to Formal Languages and Automata Theory",
            "units": 4,
            "description": "Lecture, four hours; discussion, two hours; outside study, six hours. Enforced requisite: course 180. Designed for junior/senior Computer Science majors. Grammars, automata, and languages. Finite-state languages and finite-state automata. Context-free languages and pushdown story automata. Unrestricted rewriting systems, recursively enumerable and recursive languages, and Turing machines. Closure properties, pumping lemmas, and decision algorithms. Introduction to computability. Letter grading."
        },
        '5d2d3ebd83d26171f4dfc085':
        {
            "_id": "5d2d3ebd83d26171f4dfc085",
            "subject": "MATH",
            "num": "31A",
            "title": "Differential and Integral Calculus",
            "units": 4,
            "description": "Lecture, three hours; discussion, one hour. Preparation: at least three and one half years of high school mathematics (including some coordinate geometry and trigonometry). Requisite: successful completion of Mathematics Diagnostic Test or course 1 with grade of C- or better. Differential calculus and applications; introduction to integration. P/NP or letter grading."
        },
        '5d2d3ebd83d26171f4dfc088':
        {
            "_id": "5d2d3ebd83d26171f4dfc088",
            "subject": "MATH",
            "num": "31B",
            "title": "Integration and Infinite Series",
            "units": 4,
            "description": "Lecture, three hours; discussion, one hour. Requisite: course 31A with grade of C- or better. Not open for credit to students with credit for course 3B. Transcendental functions; methods and applications of integration; sequences and series. P/NP or letter grading."
        },
        '5d2d3ebd83d26171f4dfc08c':
        {
            "_id": "5d2d3ebd83d26171f4dfc08c",
            "subject": "MATH",
            "num": "32A",
            "title": "Calculus of Several Variables",
            "units": 4,
            "description": "Lecture, three hours; discussion, one hour. Enforced requisite: course 31A with grade of C- or better. Introduction to differential calculus of several variables, vector field theory. P/NP or letter grading."
        },
        '5d2d3ebd83d26171f4dfc08e':
        {
            "_id": "5d2d3ebd83d26171f4dfc08e",
            "subject": "MATH",
            "num": "32B",
            "title": "Calculus of Several Variables",
            "units": 4,
            "description": "Lecture, three hours; discussion, one hour. Enforced requisites: courses 31B and 32A, with grades of C- or better. Introduction to integral calculus of several variables, line and surface integrals. P/NP or letter grading."
        },
        '5d2d3ebd83d26171f4dfc091':
        {
            "_id": "5d2d3ebd83d26171f4dfc091",
            "subject": "MATH",
            "num": "33A",
            "title": "Linear Algebra and Applications",
            "units": 4,
            "description": "Lecture, three hours; discussion, one hour. Enforced requisite: course 3B or 31B or 32A with grade of C- or better. Introduction to linear algebra: systems of linear equations, matrix algebra, linear independence, subspaces, bases and dimension, orthogonality, least-squares methods, determinants, eigenvalues and eigenvectors, matrix diagonalization, and symmetric matrices. P/NP or letter grading."
        },
        '5d2d3ebd83d26171f4dfc093':
        {
            "_id": "5d2d3ebd83d26171f4dfc093",
            "subject": "MATH",
            "num": "33B",
            "title": "Differential Equations",
            "units": 4,
            "description": "Lecture, three hours; discussion, one hour. Enforced requisite: course 31B with grade of C- or better. Highly recommended: course 33A. First-order, linear differential equations; second-order, linear differential equations with constant coefficients; power series solutions; linear systems. P/NP or letter grading."
        },
        '5d2d3ebd83d26171f4dfc096':
        {
            "_id": "5d2d3ebd83d26171f4dfc096",
            "subject": "MATH",
            "num": "61",
            "title": "Introduction to Discrete Structures",
            "units": 4,
            "description": "Lecture, three hours; discussion, one hour. Requisites: courses 31A, 31B. Not open for credit to students with credit for course 180 or 184. Discrete structures commonly used in computer science and mathematics, including sets and relations, permutations and combinations, graphs and trees, induction. P/NP or letter grading."
        },
        '5d2d3ebf83d26171f4dfc7e3':
        {
            "_id": "5d2d3ebf83d26171f4dfc7e3",
            "subject": "PHYSICS",
            "num": "1A",
            "title": "Physics for Scientists and Engineers: Mechanics",
            "units": 5,
            "description": "Lecture/demonstration, four hours; discussion, one hour. Recommended preparation: high school physics, one year of high school calculus or Mathematics 31A and 31B. Enforced requisites: Mathematics 31A, 31B. Enforced corequisite: Mathematics 32A. Recommended corequisite: Mathematics 32B. Motion, Newton laws, work, energy, linear and angular momentum, rotation, equilibrium, gravitation. P/NP or letter grading."
        },
        '5d2d3ebf83d26171f4dfc7e5':
        {
            "_id": "5d2d3ebf83d26171f4dfc7e5",
            "subject": "PHYSICS",
            "num": "1B",
            "title": "Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields",
            "units": 5,
            "description": "Lecture/demonstration, four hours; discussion, one hour. Enforced requisites: course 1A, Mathematics 31B, 32A. Enforced corequisite: Mathematics 32B. Recommended corequisite: Mathematics 33A. Damped and driven oscillators, mechanical and acoustic waves. Electrostatics: electric field and potential, capacitors, and dielectrics. Currents and DC circuits. Magnetic field. P/NP or letter grading."
        },
        '5d2d3ebf83d26171f4dfc7e7':
        {
            "_id": "5d2d3ebf83d26171f4dfc7e7",
            "subject": "PHYSICS",
            "num": "1C",
            "title": "Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity",
            "units": 5,
            "description": "Lecture/demonstration, four hours; discussion, one hour. Enforced requisites: courses 1A, 1B, Mathematics 32A, 32B. Enforced corequisite: Mathematics 33A. Recommended corequisite: Mathematics 33B. Ampere law, Faraday law, inductance, and LRC circuits. Maxwell equations in integral and differential form. Electromagnetic waves. Light, geometrical, and physical optics. Special relativity. P/NP or letter grading."
        },
        '5d2d3ebf83d26171f4dfc7ea':
        {
            "_id": "5d2d3ebf83d26171f4dfc7ea",
            "subject": "PHYSICS",
            "num": "4BL",
            "title": "Physics Laboratory for Scientists and Engineers: Electricity and Magnetism",
            "units": 2,
            "description": "Laboratory, three hours. Enforced requisites: courses 1A or 1AH, 1B or 1BH. Enforced corequisite: course 1C or 1CH. Experiments on electric forces, fields, and potentials. Magnetic fields. Linear and nonlinear devices. Resistors, capacitors, and inductors. Modern circuits. Geometrical and physical optics. Letter grading."
        },
        '5d2d3eb983d26171f4dfad23':
        {
            "_id": "5d2d3eb983d26171f4dfad23",
            "subject": "EC ENGR",
            "num": "3",
            "title": "Introduction to Electrical Engineering",
            "units": 4,
            "description": "(Formerly numbered Electrical Engineering 3.) Lecture, two hours; laboratory, two hours; outside study, eight hours. Introduction to field of electrical engineering. Basic circuits techniques with application to explanation of electrical engineering inventions such as telecommunications, electrical grid, automatic computing and control, and enabling device technology. Research frontiers of electrical engineering. Introduction to measurement and design of electrical circuits. Letter grading."
        }
    },
    courseList1: [
        '5d2d3eb983d26171f4dfad23', 
        '5d2d3ebf83d26171f4dfc7ea', 
        '5d2d3ebd83d26171f4dfc093', 
        '5d2d3eb783d26171f4dfa467', 
        '5d2d3eb783d26171f4dfa44a',
        '5d2d3eb783d26171f4dfa447',
        '5d2d3eb783d26171f4dfa44b',
        '5d2d3eb783d26171f4dfa44c',
        '5d2d3eb783d26171f4dfa44d',
        '5d2d3eb783d26171f4dfa44e',
        '5d2d3eb783d26171f4dfa451',
        '5d2d3eb783d26171f4dfa454',
        '5d2d3eb783d26171f4dfa45a',
    ],
    courseList2: [
        '5d2d3eb783d26171f4dfa464',
        '5d2d3eb783d26171f4dfa465',
        '5d2d3eb783d26171f4dfa466',
        '5d2d3eb783d26171f4dfa46f',
        '5d2d3eb783d26171f4dfa470',
        '5d2d3ebd83d26171f4dfc085',
        '5d2d3ebd83d26171f4dfc088',
        '5d2d3ebd83d26171f4dfc08c',
        '5d2d3ebd83d26171f4dfc08e',
        '5d2d3ebd83d26171f4dfc091',
        '5d2d3ebd83d26171f4dfc096',
        '5d2d3ebf83d26171f4dfc7e3',
        '5d2d3ebf83d26171f4dfc7e5',
        '5d2d3ebf83d26171f4dfc7e7',
    ],
    coursePlan: {
        'year1': {  // Defaults to at least year1
            quarters: ['fall', 'winter'],
            fall: [],
            winter: [],
            spring: [],
            summer: [],
        },
        'year2': {
            quarters: ['fall'], // Defaults to at least 'fall' quarter
            fall: [],
            winter: [],
            spring: [],
            summer: [],
        },
    },
    planLayout: [
        'year1',
        'year2',
    ]

}

export default data;