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
        },
        "5d2d3eb483d26171f4df9814": {
            "_id": "5d2d3eb483d26171f4df9814", 
            "subject": "AERO ST", 
            "num": "130A", 
            "title": "Air Force Leadership Studies", 
            "units": 4, 
            "description": "Lecture, three hours. Requisites: courses 1A, 1B, 1C, 20A, 20B, 20C. Designed to provide cadets with leadership overview. Basic leadership skills for cadets beginning leadership role in detachment. Lessons on military relationships and rules that military members must follow when interacting with enlisted members and officers. Continuation of advanced skills and ethics training in preparation for becoming officer and supervisor. Introduction to variety of leadership topics in preparation to be effective leaders. P/NP or letter grading."},
	
        "5d2d3eb483d26171f4df9836": {"_id": "5d2d3eb483d26171f4df9836", "subject": "ARCHEOL", "num": "599", "title": "PhD Dissertation Research and Preparation", "units": 2, "description": "Tutorial, to be arranged. May be repeated for credit with consent of adviser. S/U grading."},
	    "5d2d3eb483d26171f4df9823": {"_id": "5d2d3eb483d26171f4df9823", "subject": "ARCHEOL", "num": "C159", "title": "Fieldwork in Archaeology", "units": 2, "description": "Fieldwork, to be arranged. Participation in archaeological field excavations or museum research under supervision of staff archaeologists at UCLA. Minimum of one month of field time away from campus required. May be repeated for credit with consent of adviser. Concurrently scheduled with course C259. P/NP or letter grading."},
        "5d2d3eb483d26171f4df983c": {"_id": "5d2d3eb483d26171f4df983c", "subject": "AF AMER", "num": "M7C", "title": "Elementary Yoruba", "units": 4, "description": ""},
        "5d2d3eb483d26171f4df9841": {"_id": "5d2d3eb483d26171f4df9841", "subject": "AF AMER", "num": "M12A", "title": "African American Musical Heritage", "units": 5, "description": "(Formerly numbered M110A.) (Same as Ethnomusicology M12A and Global Jazz Studies M12A.) Lecture, four hours; discussion, one hour. Sociocultural history and survey of African American music covering Africa and its impact on Americas; music of 17th through 19th centuries; minstrelsy and its impact on representation of blacks in film, television, and theater; religious music, including hymns, spirituals, and gospel; black music of Caribbean and Central and South America; and music of black Los Angeles. P/NP or letter grading."},
        "5d2d3eb483d26171f4df980c": {"_id": "5d2d3eb483d26171f4df980c", "subject": "AERO ST", "num": "A", "title": "Leadership Laboratory", "units": 0, "description": "(Formerly numbered Z.) Laboratory, three hours. Mandatory for and limited to Air Force ROTC cadets. Provides cadets with practical command and staff leadership experiences through performance of various tasks within framework of organized cadet corps. As integral part of aerospace studies curriculum, provides experiences designed to develop leadership potential and serves as orientation to active duty. P/NP grading."},
        "5d2d3eb483d26171f4df9819": {"_id": "5d2d3eb483d26171f4df9819", "subject": "AERO ST", "num": "140C", "title": "National Security Affairs/Preparation for Active Duty", "units": 4, "description": "Lecture, three hours. Requisites: courses 1A, 1B, 1C, 20A, 20B, 20C. Study of national security processes, regional studies, advanced leadership ethics, and Air Force doctrine. Special topics focus on military as profession, officership, military justice, civilian control of military, preparation for active duty, and current issues affecting military professionalism. Within this structure, continued emphasis on refining communication skills. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9835": {"_id": "5d2d3eb483d26171f4df9835", "subject": "ARCHEOL", "num": "598", "title": "MA Paper Preparation", "units": 2, "description": "Tutorial, to be arranged. May be repeated for credit with consent of adviser. S/U grading."},
        "5d2d3eb483d26171f4df9847": {"_id": "5d2d3eb483d26171f4df9847", "subject": "AF AMER", "num": "99", "title": "Student Research Program", "units": 2, "description": "Tutorial (supervised research or other scholarly work), three hours per week per unit. Entry-level research for lower-division students under guidance of faculty mentor. Students must be in good academic standing and enrolled in minimum of 12 units (excluding this course). Individual contract required; consult Undergraduate Research Center. May be repeated. P/NP grading."},
        "5d2d3eb483d26171f4df984a": {"_id": "5d2d3eb483d26171f4df984a", "subject": "AF AMER", "num": "M103B", "title": "African American Theater History: Minstrel Stage to Rise of American Musical", "units": 4, "description": "(Same as Theater M103B.) Lecture, three hours. Designed for juniors/seniors. Exploration of extant materials on history and literature of theater as developed and performed by African American artists in America from minstrel stage to rise of American musical. Letter grading."},
        "5d2d3eb483d26171f4df9812": {"_id": "5d2d3eb483d26171f4df9812", "subject": "AERO ST", "num": "20B", "title": "Team and Leadership Fundamentals", "units": 2, "description": "Lecture, one hour. Designed to provide fundamental understanding of both leadership and team building. Cadets are taught many layers of leadership, including listening, understanding themselves, being good follower and efficient problem solving. Students apply these leadership perspectives when completing team building activities and discussing conflict management. Demonstration of basic verbal and written communication skills. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9815": {"_id": "5d2d3eb483d26171f4df9815", "subject": "AERO ST", "num": "130B", "title": "Air Force Leadership Studies", "units": 4, "description": "Lecture, three hours. Requisites: courses 1A, 1B, 1C, 20A, 20B, 20C. Designed to provide cadets with leadership overview. Basic leadership skills for cadets beginning leadership role in detachment. Lessons on military relationships and rules that military members must follow when interacting with enlisted members and officers. Continuation of advanced skills and ethics training in preparation for becoming officer and supervisor. Introduction to variety of leadership topics in preparation to be effective leaders. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9824": {"_id": "5d2d3eb483d26171f4df9824", "subject": "ARCHEOL", "num": "C180", "title": "Ancient and Historic Metals: Corrosion, Technology, and Microstructure", "units": 6, "description": "Seminar, four hours; laboratory, four hours. Overview of technology of ancient metals, aspects of extraction and alloying, corrosion that ancient metals undergo, and how this impacts their preservation. Exploration of knowledge and research work of last two decades that has substantially advanced understanding of processes of extraction, alloying, surface patination, metallic coatings, corrosion, and microstructure. Laboratory work in preparation and examination of metallic samples under microscope, as well as lectures on technology of metallic works of art. Discussion of phase and stability diagrams of common alloying systems and environments. Metallographic study samples represent Bronze Age Europe, Renaissance Europe, China from Warring States to Tang dynasty, Japanese swordmaking, Indian high-tin bronze alloys, bronzes, Peruvian, Colombian, Costa Rican, and Panamanian copper and gold-copper alloys. Concurrently scheduled with course C280. Letter grading."},
        "5d2d3eb483d26171f4df9827": {"_id": "5d2d3eb483d26171f4df9827", "subject": "ARCHEOL", "num": "M201A", "title": "Graduate Core Seminar: Archaeology", "units": 4, "description": "(Same as Anthropology M201A.) Seminar, three hours. Required of all students. Seminar discussions based on carefully selected list of 25 major works related to development of archaeology in social sciences. Compulsory core seminars provide students with foundation in breadth of knowledge required of professional archaeologists. Archaeological historiography, survey of world archaeology, and archaeological techniques. Emphasis on appreciation of multidisciplinary background of modern archaeology and relevant interpretative strategies. May be repeated for credit with consent of adviser. S/U or letter grading."},
        "5d2d3eb483d26171f4df983e": {"_id": "5d2d3eb483d26171f4df983e", "subject": "AF AMER", "num": "M9B", "title": "Elementary Amharic", "units": 4, "description": "(Same as International and Area Studies M6B.) Lecture, five hours. Requisite: course M9A. Introduction to Amharic, Semitic language that is official language of Ethiopia. Coverage of basic Amharic grammar, with equal emphasis on reading, writing, conversation, and comprehension. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9843": {"_id": "5d2d3eb483d26171f4df9843", "subject": "AF AMER", "num": "M18", "title": "Leadership and Student-Initiated Retention", "units": 2, "description": "(Same as American Indian Studies M18, Asian American Studies M18, and Chicana and Chicano Studies M18.) Seminar, two hours. Limited to freshmen/sophomores/first-year transfer students. Not open for credit to students with credit for course M118. Exploration of issues in retention at UCLA through lens of student-initiated and student-run programs, efforts, activities, and services. Focus on populations with historically low graduation rates targeted by Campus Retention Committee. May not be applied toward departmental major or minor elective requirements. May be repeated once for credit. Letter grading."},
        "5d2d3eb483d26171f4df9846": {"_id": "5d2d3eb483d26171f4df9846", "subject": "AF AMER", "num": "89HC", "title": "Honors Contracts", "units": 1, "description": "Tutorial, three hours. Limited to students in College Honors Program. Designed as adjunct to lower-division lecture course. Individual study with lecture course instructor to explore topics in greater depth through supplemental readings, papers, or other activities. May be repeated for maximum of 4 units. Individual honors contract required. Honors content noted on transcript. Letter grading."},
        "5d2d3eb483d26171f4df9848": {"_id": "5d2d3eb483d26171f4df9848", "subject": "AF AMER", "num": "M102", "title": "Culture, Media, and Los Angeles", "units": 6, "description": "(Same as Asian American Studies M160 and Honors Collegium M102.) Lecture, four hours; screenings, two hours. Designed for juniors/seniors. Role of media in society and its influence on contemporary cultural environment, specifically in Los Angeles; issues of representation as they pertain to race, ethnicity, gender, and sexuality. P/NP or letter grading."},
        "5d2d3eb483d26171f4df981b": {"_id": "5d2d3eb483d26171f4df981b", "subject": "ARCHEOL", "num": "19", "title": "Fiat Lux Freshman Seminars", "units": 1, "description": "Seminar, one hour. Discussion of and critical thinking about topics of current intellectual importance, taught by faculty members in their areas of expertise and illuminating many paths of discovery at UCLA. P/NP grading."},
        "5d2d3eb483d26171f4df981c": {"_id": "5d2d3eb483d26171f4df981c", "subject": "ARCHEOL", "num": "30", "title": "Science in Archaeology", "units": 4, "description": "Lecture, three hours; discussion, one hour. Archaeology is rapidly developing due to ongoing introduction of new hardware, software, and information dissemination technology. It is multidisciplinary field of study, combining its own research methods and technologies with elements from geology, history, ethnography, geography, material science, statistics, biology, biochemistry, medicine, and others, presenting opportunities not only to obtain new scholarly insights, but also to provide integrated instruction in science, technology, engineering, and mathematics (STEM) skills. Use of archaeological data as paradigm in STEM education. Instant practical application of mathematics during surveying, geology during ceramic analysis or geophysical research, biochemistry during archaeological residue analysis, or biology during zooarchaeological or paleoethnobotanical research offers point of departure for instructors as well as motivation to students. P/NP or letter grading."},
        "5d2d3eb483d26171f4df982b": {"_id": "5d2d3eb483d26171f4df982b", "subject": "ARCHEOL", "num": "205B", "title": "Intensive Laboratory Training in Archaeology", "units": 6, "description": "(Formerly numbered M205B.) Lecture, three hours; laboratory, two hours minimum. Advanced laboratory training for graduate students with extended laboratory hours. Special laboratory-based topics, including but not limited to lithic analysis, ceramic analysis, zooarchaeology, and paleoethnobotany. May be repeated for credit with topic change. S/U or letter grading."},
        "5d2d3eb483d26171f4df980d": {"_id": "5d2d3eb483d26171f4df980d", "subject": "AERO ST", "num": "1A", "title": "Heritage and Values", "units": 2, "description": "Lecture, one hour. Introduction to U.S. Air Force. Examination of general aspects of Department of Air Force, leadership, benefits, and opportunities for officers. Foundation for becoming airmen by outlining heritage and values. Provides historical perspective through lessons on war and U.S. military, Air Force operations, principles of war, and airpower. Provides students with understanding for employment of air and space power, from institutional, doctrinal, and historical perspective. Students are introduced to Air Force way of life and gain knowledge on what it means to be airmen. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9811": {"_id": "5d2d3eb483d26171f4df9811", "subject": "AERO ST", "num": "20A", "title": "Team and Leadership Fundamentals", "units": 2, "description": "Lecture, one hour. Designed to provide fundamental understanding of both leadership and team building. Cadets are taught many layers of leadership, including listening, understanding themselves, being good follower and efficient problem solving. Students apply these leadership perspectives when completing team building activities and discussing conflict management. Demonstration of basic verbal and written communication skills. P/NP or letter grading."},
        "5d2d3eb483d26171f4df982d": {"_id": "5d2d3eb483d26171f4df982d", "subject": "ARCHEOL", "num": "C220", "title": "Special Topics in Archaeology", "units": 4, "description": "Lecture, three hours. Special topics on theoretical subjects in archaeology such as new strategies, regional synthesis, or current work by core program faculty or special visiting scholars. May be repeated for credit with topic change. Concurrently scheduled with course C120. Final project or paper required if taken for 4 units (S/U or letter grading); 2-unit course has S/U grading."},
        "5d2d3eb483d26171f4df983d": {"_id": "5d2d3eb483d26171f4df983d", "subject": "AF AMER", "num": "M9A", "title": "Elementary Amharic", "units": 4, "description": "(Same as International and Area Studies M6A.) Lecture, five hours. Course M9A is requisite to M9B, which is requisite to M9C. Introduction to Amharic, Semitic language that is official language of Ethiopia. Coverage of basic Amharic grammar, with equal emphasis on reading, writing, conversation, and comprehension. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9842": {"_id": "5d2d3eb483d26171f4df9842", "subject": "AF AMER", "num": "M12B", "title": "African American Musical Heritage", "units": 5, "description": "(Formerly numbered M110B.) (Same as Ethnomusicology M12B and Global Jazz Studies M12B.) Lecture, four hours; discussion, one hour. Sociocultural history and survey of African American music covering blues, pre-1947 jazz styles, rhythm 'n' blues, soul, funk, disco, hip-hop, and symbiotic relationship between recording industry and effects of cultural politics on black popular music productions. P/NP or letter grading."},
        "5d2d3eb483d26171f4df980f": {"_id": "5d2d3eb483d26171f4df980f", "subject": "AERO ST", "num": "1C", "title": "Heritage and Values", "units": 2, "description": "Lecture, one hour. Introduction to U.S. Air Force. Examination of general aspects of Department of Air Force, leadership, benefits, and opportunities for officers. Foundation for becoming airmen by outlining heritage and values. Provides historical perspective through lessons on war and U.S. military, Air Force operations, principles of war, and airpower. Provides students with understanding for employment of air and space power, from institutional, doctrinal, and historical perspective. Students are introduced to Air Force way of life and gain knowledge on what it means to be airmen. P/NP or letter grading."},
        "5d2d3eb483d26171f4df982a": {"_id": "5d2d3eb483d26171f4df982a", "subject": "ARCHEOL", "num": "M205A", "title": "Selected Laboratory Topics in Archaeology", "units": 4, "description": "(Same as Anthropology CM217.) Lecture, one hour; laboratory, two hours. Designed for graduate students in archaeology or in other departments. Specialized analysis of particular classes of cultural remains. Topic may be one of following: zooarchaeology, paleoethnobotany, ceramics, lithic analysis, rock art. Laboratory experience with collections and data. May be repeated for credit with topic change. S/U or letter grading."},
        "5d2d3eb483d26171f4df982f": {"_id": "5d2d3eb483d26171f4df982f", "subject": "ARCHEOL", "num": "M265", "title": "Depositional History and Stratigraphic Analysis", "units": 4, "description": "(Same as Ancient Near East M265.) Lecture, two hours. Theoretical understanding of depositional processes (\"laws\") which lead to site formation and of stratigraphic procedures to be used in recovery of embedded cultural materials. Study of issues covered in literature, with specific test cases from actual excavations and site reports. Coverage of theoretical implications of such disciplines as surveying and pedology with help of specialists. S/U or letter grading."},
        "5d2d3eb483d26171f4df983f": {"_id": "5d2d3eb483d26171f4df983f", "subject": "AF AMER", "num": "M9C", "title": "Elementary Amharic", "units": 4, "description": "(Same as International and Area Studies M6C.) Lecture, five hours. Requisite: course M9B. Introduction to Amharic, Semitic language that is official language of Ethiopia. Coverage of basic Amharic grammar, with equal emphasis on reading, writing, conversation, and comprehension. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9844": {"_id": "5d2d3eb483d26171f4df9844", "subject": "AF AMER", "num": "19", "title": "Fiat Lux Freshman Seminars", "units": 1, "description": "Seminar, one hour. Discussion of and critical thinking about topics of current intellectual importance, taught by faculty members in their areas of expertise and illuminating many paths of discovery at UCLA. P/NP grading."},
        "5d2d3eb483d26171f4df9849": {"_id": "5d2d3eb483d26171f4df9849", "subject": "AF AMER", "num": "M103A", "title": "African American Theater History: Slavery to Mid-1800s", "units": 4, "description": "(Same as Theater M103A.) Lecture, three hours. Designed for juniors/seniors. Exploration of extant materials on history and literature of theater as developed and performed by African American artists in America from slavery to mid-1800s. Letter grading."},
        "5d2d3eb483d26171f4df9817": {"_id": "5d2d3eb483d26171f4df9817", "subject": "AERO ST", "num": "140A", "title": "National Security Affairs/Preparation for Active Duty", "units": 4, "description": "Lecture, three hours. Requisites: courses 1A, 1B, 1C, 20A, 20B, 20C. Study of national security processes, regional studies, advanced leadership ethics, and Air Force doctrine. Special topics focus on military as profession, officership, military justice, civilian control of military, preparation for active duty, and current issues affecting military professionalism. Within this structure, continued emphasis on refining communication skills. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9818": {"_id": "5d2d3eb483d26171f4df9818", "subject": "AERO ST", "num": "140B", "title": "National Security Affairs/Preparation for Active Duty", "units": 4, "description": "Lecture, three hours. Requisites: courses 1A, 1B, 1C, 20A, 20B, 20C. Study of national security processes, regional studies, advanced leadership ethics, and Air Force doctrine. Special topics focus on military as profession, officership, military justice, civilian control of military, preparation for active duty, and current issues affecting military professionalism. Within this structure, continued emphasis on refining communication skills. P/NP or letter grading."},
        "5d2d3eb483d26171f4df981e": {"_id": "5d2d3eb483d26171f4df981e", "subject": "ARCHEOL", "num": "89HC", "title": "Honors Contracts", "units": 1, "description": "Tutorial, three hours. Limited to students in College Honors Program. Designed as adjunct to lower-division lecture course. Individual study with lecture course instructor to explore topics in greater depth through supplemental readings, papers, or other activities. May be repeated for maximum of 4 units. Individual honors contract required. Honors content noted on transcript. Letter grading."},
        "5d2d3eb483d26171f4df981f": {"_id": "5d2d3eb483d26171f4df981f", "subject": "ARCHEOL", "num": "99", "title": "Student Research Program", "units": 2, "description": "Tutorial (supervised research or other scholarly work), three hours per week per unit. Entry-level research for lower-division students under guidance of faculty mentor. Students must be in good academic standing and enrolled in minimum of 12 units (excluding this course). Individual contract required; consult Undergraduate Research Center. May be repeated. P/NP grading."},
        "5d2d3eb483d26171f4df9837": {"_id": "5d2d3eb483d26171f4df9837", "subject": "AF AMER", "num": "1", "title": "Introduction to Black Studies", "units": 5, "description": "Lecture, three hours; discussion, one hour. Introduction of methods, theories, conceptual frameworks, and key debates in black studies. Interrogation of how race structures notions of identity and meaning of blackness in relation to class, gender, and sexuality; essential role of African people in development of capitalism, liberalism, and democracy; what various disciplinary lenses and epistemologies (history, literature, sociology, geography, cultural studies, political theory, philosophy, etc.) reveal about experiences of black people in modern world. Key thinkers and ideas from across humanities and social sciences are highlighted. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9838": {"_id": "5d2d3eb483d26171f4df9838", "subject": "AF AMER", "num": "M5", "title": "Social Organization of Black Communities", "units": 5, "description": "(Same as Sociology M5.) Lecture, four hours; discussion, one hour; field trips. Analysis and interpretation of social organization of black communities, with focus on origins and development of black communities, competing theories and research findings, defining characteristics and contemporary issues. Letter grading."},
        "5d2d3eb483d26171f4df9832": {"_id": "5d2d3eb483d26171f4df9832", "subject": "ARCHEOL", "num": "501", "title": "Cooperative Program  ", "units": 8, "description": "Tutorial, to be arranged. Preparation: consent of UCLA graduate adviser and graduate dean, and host campus instructor, department chair, and graduate dean. Used to record enrollment of UCLA students in courses taken under cooperative arrangements with USC. S/U grading."},
        "5d2d3eb483d26171f4df9834": {"_id": "5d2d3eb483d26171f4df9834", "subject": "ARCHEOL", "num": "597", "title": "Preparation for PhD Qualifying Examination", "units": 2, "description": "Tutorial, to be arranged. Preparation: completion of formal coursework, passing of language examinations before enrollment. May be repeated for credit with consent of adviser. S/U grading."},
        "5d2d3eb483d26171f4df981d": {"_id": "5d2d3eb483d26171f4df981d", "subject": "ARCHEOL", "num": "89", "title": "Honors Seminars", "units": 1, "description": "Seminar, three hours. Limited to 20 students. Designed as adjunct to lower-division lecture course. Exploration of topics in greater depth through supplemental readings, papers, or other activities and led by lecture course instructor. May be applied toward honors credit for eligible students. Honors content noted on transcript. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9822": {"_id": "5d2d3eb483d26171f4df9822", "subject": "ARCHEOL", "num": "C120", "title": "Special Topics in Archaeology", "units": 4, "description": "Lecture, three hours. Designed for juniors/seniors. Special topics on theoretical subjects in archaeology such as new strategies, regional synthesis, or current work by core program faculty or special visiting scholars. May be repeated for credit with topic change. Concurrently scheduled with course C220. Final project or paper required if taken for 4 units (P/NP or letter grading); 2-unit course has P/NP grading."},
        "5d2d3eb483d26171f4df9820": {"_id": "5d2d3eb483d26171f4df9820", "subject": "ARCHEOL", "num": "C110", "title": "Archaeological Materials Identification and Characterization  ", "units": 4, "description": "Lecture, one hour; laboratory, two hours. Laboratory-oriented introduction for archaeologists to identification and quantitative description of solid materials, especially metals, ceramics, and other inorganic and some organic substances. Concurrently scheduled with course C210. P/NP or letter grading."},
        "5d2d3eb483d26171f4df9825": {"_id": "5d2d3eb483d26171f4df9825", "subject": "ARCHEOL", "num": "189", "title": "Advanced Honors Seminars", "units": 1, "description": "Seminar, three hours. Limited to 20 students. Designed as adjunct to undergraduate lecture course. Exploration of topics in greater depth through supplemental readings, papers, or other activities and led by lecture course instructor. May be applied toward honors credit for eligible students. Honors content noted on transcript. P/NP or letter grading."},
        "5d2d3eb483d26171f4df983b": {"_id": "5d2d3eb483d26171f4df983b", "subject": "AF AMER", "num": "M7B", "title": "Elementary Yoruba", "units": 4, "description": ""},
        "5d2d3eb483d26171f4df9845": {"_id": "5d2d3eb483d26171f4df9845", "subject": "AF AMER", "num": "89", "title": "Honors Seminars", "units": 1, "description": "Seminar, three hours. Limited to 20 students. Designed as adjunct to lower-division lecture course. Exploration of topics in greater depth through supplemental readings, papers, or other activities and led by lecture course instructor. May be applied toward honors credit for eligible students. Honors content noted on transcript. P/NP or letter grading."},
        "5d2d3eb483d26171f4df982e": {"_id": "5d2d3eb483d26171f4df982e", "subject": "ARCHEOL", "num": "C259", "title": "Fieldwork in Archaeology", "units": 2, "description": "Fieldwork, to be arranged. Participation in archaeological field excavations or museum research under supervision of staff archaeologists at UCLA. Minimum of one month of field time away from campus required. May be repeated for credit with consent of adviser. Concurrently scheduled with course C159. S/U or letter grading."},
        "5d2d3eb483d26171f4df9831": {"_id": "5d2d3eb483d26171f4df9831", "subject": "ARCHEOL", "num": "375", "title": "Teaching Apprentice Practicum", "units": 4, "description": "Seminar, to be arranged. Preparation: apprentice personnel employment as teaching assistant, associate, or fellow. Teaching apprenticeship under active guidance and supervision of regular faculty member responsible for curriculum and instruction at UCLA. May be repeated for credit. S/U grading."},
        "5d2d3eb483d26171f4df983a": {"_id": "5d2d3eb483d26171f4df983a", "subject": "AF AMER", "num": "M7A", "title": "Elementary Yoruba", "units": 4, "description": "(Same as International and Area Studies M7A.) Lecture, five hours. Course M7A is requisite to M7B, which is requisite to M7C. Introduction to Yoruba, one of major languages of West Africa, which is spoken widely throughout southwest Nigeria, Benin, and Togo. Coverage of basic Yoruba grammar, with equal emphasis on reading, writing, conversation, and comprehension. P/NP or letter grading."},
        "5d2d3eb483d26171f4df980e": {"_id": "5d2d3eb483d26171f4df980e", "subject": "AERO ST", "num": "1B", "title": "Heritage and Values", "units": 2, "description": "Lecture, one hour. Introduction to U.S. Air Force. Examination of general aspects of Department of Air Force, leadership, benefits, and opportunities for officers. Foundation for becoming airmen by outlining heritage and values. Provides historical perspective through lessons on war and U.S. military, Air Force operations, principles of war, and airpower. Provides students with understanding for employment of air and space power, from institutional, doctrinal, and historical perspective. Students are introduced to Air Force way of life and gain knowledge on what it means to be airmen. P/NP or letter grading."}
    },
    courseList: [
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
        '5d2d3eb483d26171f4df9817', 
        '5d2d3eb483d26171f4df9818', 
        '5d2d3eb483d26171f4df981e', 
        '5d2d3eb483d26171f4df981f', 
        '5d2d3eb483d26171f4df9837', 
        '5d2d3eb483d26171f4df9838', 
        '5d2d3eb483d26171f4df9832', 
        '5d2d3eb483d26171f4df9834', 
        '5d2d3eb483d26171f4df981d', 
        '5d2d3eb483d26171f4df9822', 
        '5d2d3eb483d26171f4df9820', 
        '5d2d3eb483d26171f4df9825', 
        '5d2d3eb483d26171f4df983b', 
        '5d2d3eb483d26171f4df9845', 
        '5d2d3eb483d26171f4df982e', 
        '5d2d3eb483d26171f4df9831', 
        '5d2d3eb483d26171f4df983a', 
        '5d2d3eb483d26171f4df980e'
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