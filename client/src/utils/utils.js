import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

const schools = [
    { key: 'UCLA', text: 'University of California - Los Angeles', value: 'UCLA' },
]

const majors = [
    { key: 'COM SCI', text: 'Computer Science', value: 'COM SCI' },
    { key: 'CS&ENGR', text: 'Computer Science and Engineering', value: 'CS&ENGR' },
    { key: 'ELE ENGR', text: 'Electrical and Computer Engineering', value: 'ELE ENGR' },
    { key: 'MAT ENGR E', text: 'Materials Engineering - Electronic Option', value: 'MAT ENGR E' },
    { key: 'MAT ENGR S', text: 'Materials Engineering - Straight Option', value: 'MAT ENGR S' },
    { key: 'MECHANIC', text: 'Mechanical Engineering', value: 'MECHANIC' },
]

const subjects = [
    {key: "AERO ST", text: "AERO ST", value: "AERO ST"},
    {key: "ARCHEOL", text: "ARCHEOL", value: "ARCHEOL"},
    {key: "AF AMER", text: "AF AMER", value: "AF AMER"},
    {key: "ARCH&UD", text: "ARCH&UD", value: "ARCH&UD"},
    {key: "AFRC ST", text: "AFRC ST", value: "AFRC ST"},
    {key: "ARMENIA", text: "ARMENIA", value: "ARMENIA"},
    {key: "AFRKAAN", text: "AFRKAAN", value: "AFRKAAN"},
    {key: "ART", text: "ART", value: "ART"},
    {key: "AM IND", text: "AM IND", value: "AM IND"},
    {key: "ART HIS", text: "ART HIS", value: "ART HIS"},
    {key: "ASL", text: "ASL", value: "ASL"},
    {key: "ART&ARC", text: "ART&ARC", value: "ART&ARC"},
    {key: "AN N EA", text: "AN N EA", value: "AN N EA"},
    {key: "ARTS ED", text: "ARTS ED", value: "ARTS ED"},
    {key: "ANES", text: "ANES", value: "ANES"},
    {key: "ASIAN", text: "ASIAN", value: "ASIAN"},
    {key: "ANTHRO", text: "ANTHRO", value: "ANTHRO"},
    {key: "ASIA AM", text: "ASIA AM", value: "ASIA AM"},
    {key: "APPLING", text: "APPLING", value: "APPLING"},
    {key: "ASTR", text: "ASTR", value: "ASTR"},
    {key: "ARABIC", text: "ARABIC", value: "ARABIC"},
    {key: "A&O SCI", text: "A&O SCI", value: "A&O SCI"},
    {key: "BIOENGR", text: "BIOENGR", value: "BIOENGR"},
    {key: "BIOMATH", text: "BIOMATH", value: "BIOMATH"},
    {key: "BIOINFO", text: "BIOINFO", value: "BIOINFO"},
    {key: "BMD RES", text: "BMD RES", value: "BMD RES"},
    {key: "BIOINFR", text: "BIOINFR", value: "BIOINFR"},
    {key: "BIOSTAT", text: "BIOSTAT", value: "BIOSTAT"},
    {key: "BIOL CH", text: "BIOL CH", value: "BIOL CH"},
    {key: "BULGR", text: "BULGR", value: "BULGR"},
    {key: "C&EE ST", text: "C&EE ST", value: "C&EE ST"},
    {key: "COMM", text: "COMM", value: "COMM"},
    {key: "CH ENGR", text: "CH ENGR", value: "CH ENGR"},
    {key: "CESC", text: "CESC", value: "CESC"},
    {key: "CHEM", text: "CHEM", value: "CHEM"},
    {key: "COM HLT", text: "COM HLT", value: "COM HLT"},
    {key: "CHICANO", text: "CHICANO", value: "CHICANO"},
    {key: "COM LIT", text: "COM LIT", value: "COM LIT"},
    {key: "CHIN", text: "CHIN", value: "CHIN"},
    {key: "C&S BIO", text: "C&S BIO", value: "C&S BIO"},
    {key: "C&EE", text: "C&EE", value: "C&EE"},
    {key: "COM SCI", text: "COM SCI", value: "COM SCI"},
    {key: "CLASSIC", text: "CLASSIC", value: "CLASSIC"},
    {key: "CAEM", text: "CAEM", value: "CAEM"},
    {key: "CLUSTER", text: "CLUSTER", value: "CLUSTER"},
    {key: "CZCH", text: "CZCH", value: "CZCH"},
    {key: "DANCE", text: "DANCE", value: "DANCE"},
    {key: "DGT HUM", text: "DGT HUM", value: "DGT HUM"},
    {key: "DENT", text: "DENT", value: "DENT"},
    {key: "DIS STD", text: "DIS STD", value: "DIS STD"},
    {key: "DESMA", text: "DESMA", value: "DESMA"},
    {key: "DUTCH", text: "DUTCH", value: "DUTCH"},
    {key: "EPS SCI", text: "EPS SCI", value: "EPS SCI"},
    {key: "ENGL", text: "ENGL", value: "ENGL"},
    {key: "EA STDS", text: "EA STDS", value: "EA STDS"},
    {key: "ESL", text: "ESL", value: "ESL"},
    {key: "EE BIOL", text: "EE BIOL", value: "EE BIOL"},
    {key: "ENGCOMP", text: "ENGCOMP", value: "ENGCOMP"},
    {key: "ECON", text: "ECON", value: "ECON"},
    {key: "ENVIRON", text: "ENVIRON", value: "ENVIRON"},
    {key: "EDUC", text: "EDUC", value: "EDUC"},
    {key: "ENV HLT", text: "ENV HLT", value: "ENV HLT"},
    {key: "EC ENGR", text: "EC ENGR", value: "EC ENGR"},
    {key: "EPIDEM", text: "EPIDEM", value: "EPIDEM"},
    {key: "ENGR", text: "ENGR", value: "ENGR"},
    {key: "ETHNMUS", text: "ETHNMUS", value: "ETHNMUS"},
    {key: "FAM MED", text: "FAM MED", value: "FAM MED"},
    {key: "FOOD ST", text: "FOOD ST", value: "FOOD ST"},
    {key: "FILIPNO", text: "FILIPNO", value: "FILIPNO"},
    {key: "FRNCH", text: "FRNCH", value: "FRNCH"},
    {key: "FILM TV", text: "FILM TV", value: "FILM TV"},
    {key: "GENDER", text: "GENDER", value: "GENDER"},
    {key: "GJ STDS", text: "GJ STDS", value: "GJ STDS"},
    {key: "GEOG", text: "GEOG", value: "GEOG"},
    {key: "GLBL ST", text: "GLBL ST", value: "GLBL ST"},
    {key: "GERMAN", text: "GERMAN", value: "GERMAN"},
    {key: "GRAD PD", text: "GRAD PD", value: "GRAD PD"},
    {key: "GRNTLGY", text: "GRNTLGY", value: "GRNTLGY"},
    {key: "GREEK", text: "GREEK", value: "GREEK"},
    {key: "GLB HLT", text: "GLB HLT", value: "GLB HLT"},
    {key: "HLT POL", text: "HLT POL", value: "HLT POL"},
    {key: "HNRS", text: "HNRS", value: "HNRS"},
    {key: "HEBREW", text: "HEBREW", value: "HEBREW"},
    {key: "HUM GEN", text: "HUM GEN", value: "HUM GEN"},
    {key: "HIN-URD", text: "HIN-URD", value: "HIN-URD"},
    {key: "HNGAR", text: "HNGAR", value: "HNGAR"},
    {key: "HIST", text: "HIST", value: "HIST"},
    {key: "IL AMER", text: "IL AMER", value: "IL AMER"},
    {key: "INTL DV", text: "INTL DV", value: "INTL DV"},
    {key: "I E STD", text: "I E STD", value: "I E STD"},
    {key: "I M STD", text: "I M STD", value: "I M STD"},
    {key: "INDO", text: "INDO", value: "INDO"},
    {key: "IRANIAN", text: "IRANIAN", value: "IRANIAN"},
    {key: "INF STD", text: "INF STD", value: "INF STD"},
    {key: "ISLM ST", text: "ISLM ST", value: "ISLM ST"},
    {key: "I A STD", text: "I A STD", value: "I A STD"},
    {key: "ITALIAN", text: "ITALIAN", value: "ITALIAN"},
    {key: "JAPAN", text: "JAPAN", value: "JAPAN"},
    {key: "JEWISH", text: "JEWISH", value: "JEWISH"},
    {key: "KOREA", text: "KOREA", value: "KOREA"},
    {key: "LBR&WS", text: "LBR&WS", value: "LBR&WS"},
    {key: "UG-LAW", text: "UG-LAW", value: "UG-LAW"},
    {key: "LBR STD", text: "LBR STD", value: "LBR STD"},
    {key: "LGBTQS", text: "LGBTQS", value: "LGBTQS"},
    {key: "LATIN", text: "LATIN", value: "LATIN"},
    {key: "LIFESCI", text: "LIFESCI", value: "LIFESCI"},
    {key: "LATN AM", text: "LATN AM", value: "LATN AM"},
    {key: "LING", text: "LING", value: "LING"},
    {key: "LAW", text: "LAW", value: "LAW"},
    {key: "LTHUAN", text: "LTHUAN", value: "LTHUAN"},
    {key: "MGMT", text: "MGMT", value: "MGMT"},
    {key: "MED", text: "MED", value: "MED"},
    {key: "MGMTEX", text: "MGMTEX", value: "MGMTEX"},
    {key: "MIMG", text: "MIMG", value: "MIMG"},
    {key: "MGMTFT", text: "MGMTFT", value: "MGMTFT"},
    {key: "M E STD", text: "M E STD", value: "M E STD"},
    {key: "MGMTFE", text: "MGMTFE", value: "MGMTFE"},
    {key: "MIL SCI", text: "MIL SCI", value: "MIL SCI"},
    {key: "MGMTGEX", text: "MGMTGEX", value: "MGMTGEX"},
    {key: "M PHARM", text: "M PHARM", value: "M PHARM"},
    {key: "MGMTMFE", text: "MGMTMFE", value: "MGMTMFE"},
    {key: "MOL BIO", text: "MOL BIO", value: "MOL BIO"},
    {key: "MGMTMSA", text: "MGMTMSA", value: "MGMTMSA"},
    {key: "MOL TOX", text: "MOL TOX", value: "MOL TOX"},
    {key: "MGMTPHD", text: "MGMTPHD", value: "MGMTPHD"},
    {key: "MCD BIO", text: "MCD BIO", value: "MCD BIO"},
    {key: "MAT SCI", text: "MAT SCI", value: "MAT SCI"},
    {key: "MC&IP", text: "MC&IP", value: "MC&IP"},
    {key: "MATH", text: "MATH", value: "MATH"},
    {key: "MUSC", text: "MUSC", value: "MUSC"},
    {key: "MECH&AE", text: "MECH&AE", value: "MECH&AE"},
    {key: "MSC IND", text: "MSC IND", value: "MSC IND"},
    {key: "MED HIS", text: "MED HIS", value: "MED HIS"},
    {key: "MUSCLG", text: "MUSCLG", value: "MUSCLG"},
    {key: "NAV SCI", text: "NAV SCI", value: "NAV SCI"},
    {key: "NEUROSC", text: "NEUROSC", value: "NEUROSC"},
    {key: "NR EAST", text: "NR EAST", value: "NR EAST"},
    {key: "NEURO", text: "NEURO", value: "NEURO"},
    {key: "NEURBIO", text: "NEURBIO", value: "NEURBIO"},
    {key: "NEURSGY", text: "NEURSGY", value: "NEURSGY"},
    {key: "NEURLGY", text: "NEURLGY", value: "NEURLGY"},
    {key: "NURSING", text: "NURSING", value: "NURSING"},
    {key: "OBGYN", text: "OBGYN", value: "OBGYN"},
    {key: "ORL BIO", text: "ORL BIO", value: "ORL BIO"},
    {key: "OPTH", text: "OPTH", value: "OPTH"},
    {key: "ORTHPDC", text: "ORTHPDC", value: "ORTHPDC"},
    {key: "PATH", text: "PATH", value: "PATH"},
    {key: "POL SCI", text: "POL SCI", value: "POL SCI"},
    {key: "PEDS", text: "PEDS", value: "PEDS"},
    {key: "PORTGSE", text: "PORTGSE", value: "PORTGSE"},
    {key: "PHILOS", text: "PHILOS", value: "PHILOS"},
    {key: "COMPTNG", text: "COMPTNG", value: "COMPTNG"},
    {key: "PHYSICS", text: "PHYSICS", value: "PHYSICS"},
    {key: "PSYCTRY", text: "PSYCTRY", value: "PSYCTRY"},
    {key: "PBMED", text: "PBMED", value: "PBMED"},
    {key: "PSYCH", text: "PSYCH", value: "PSYCH"},
    {key: "PHYSCI", text: "PHYSCI", value: "PHYSCI"},
    {key: "PUB AFF", text: "PUB AFF", value: "PUB AFF"},
    {key: "PHYSIOL", text: "PHYSIOL", value: "PHYSIOL"},
    {key: "PUB HLT", text: "PUB HLT", value: "PUB HLT"},
    {key: "POLSH", text: "POLSH", value: "POLSH"},
    {key: "PUB PLC", text: "PUB PLC", value: "PUB PLC"},
    {key: "RAD ONC", text: "RAD ONC", value: "RAD ONC"},
    {key: "ROMANIA", text: "ROMANIA", value: "ROMANIA"},
    {key: "RELIGN", text: "RELIGN", value: "RELIGN"},
    {key: "RUSSN", text: "RUSSN", value: "RUSSN"},
    {key: "SCAND", text: "SCAND", value: "SCAND"},
    {key: "SOC GEN", text: "SOC GEN", value: "SOC GEN"},
    {key: "SCI EDU", text: "SCI EDU", value: "SCI EDU"},
    {key: "SOCIOL", text: "SOCIOL", value: "SOCIOL"},
    {key: "SEMITIC", text: "SEMITIC", value: "SEMITIC"},
    {key: "S ASIAN", text: "S ASIAN", value: "S ASIAN"},
    {key: "SRB CRO", text: "SRB CRO", value: "SRB CRO"},
    {key: "SEASIAN", text: "SEASIAN", value: "SEASIAN"},
    {key: "SLAVC", text: "SLAVC", value: "SLAVC"},
    {key: "SPAN", text: "SPAN", value: "SPAN"},
    {key: "SOC SC", text: "SOC SC", value: "SOC SC"},
    {key: "STATS", text: "STATS", value: "STATS"},
    {key: "SOC THT", text: "SOC THT", value: "SOC THT"},
    {key: "SURGERY", text: "SURGERY", value: "SURGERY"},
    {key: "SOC WLF", text: "SOC WLF", value: "SOC WLF"},
    {key: "SWAHILI", text: "SWAHILI", value: "SWAHILI"},
    {key: "THAI", text: "THAI", value: "THAI"},
    {key: "TURKIC", text: "TURKIC", value: "TURKIC"},
    {key: "THEATER", text: "THEATER", value: "THEATER"},
    {key: "UKRN", text: "UKRN", value: "UKRN"},
    {key: "URBN PL", text: "URBN PL", value: "URBN PL"},
    {key: "UNIV ST", text: "UNIV ST", value: "UNIV ST"},
    {key: "UROLOGY", text: "UROLOGY", value: "UROLOGY"},
    {key: "VIETMSE", text: "VIETMSE", value: "VIETMSE"},
    {key: "WL ARTS", text: "WL ARTS", value: "WL ARTS"},
    {key: "YIDDSH", text: "YIDDSH", value: "YIDDSH"}
]

export default function splitList(courseList, courses) {
    const list = sortCourseList(courseList, courses)
    let list1 = [];
    let list2 = [];
    list.forEach((courseId, i) => {
        if (i % 2) {
            list2.push(courses[courseId])
        }
        else
            list1.push(courses[courseId])
    })
    return [list1, list2];
}

function sortCourseList(courseList, courses) {
    const newList = courseList.sort((courseId1, courseId2) => {
        const course1 = courses[courseId1];
        const course2 = courses[courseId2];
        if (!course1) console.log(courseId1)
        if (!course2) console.log(courseId2)
        if ('options' in course1) {
            if ('options' in course2) {
                if (course1.name.includes('GE')) {
                    if (course2.name.includes('GE')) {
                        if (course1.name < course2.name)
                            return -1;
                        else if (course1.name > course2.name)
                            return 1;
                        else
                            return 0;
                    }
                    else
                        return 1;
                }
                else {
                    if (course2.name.includes('GE'))
                        return -1;
                    else {
                        if (course1.name < course2.name)
                            return -1;
                        else if (course1.name > course2.name)
                            return 1;
                        else
                            return 0;
                    }
                }
            }
            else {
                if (course1.name.includes('GE'))
                    return 1;
                else {
                    if (course2.subject === 'GE')
                        return -1;
                    else
                        return 1;
                }
            }
        }
        else if ('options' in course2) {
            if (course2.name.includes('GE'))
                return -1;
            else {
                if (course1.subject === 'GE')
                    return 1;
                else
                    return -1;
            }
        }
        else {
            if (course1.subject === "GE" && course2.subject !== "GE") {
                return 1
            }
            else if (course2.subject === "GE" && course1.subject !== "GE") {
                return -1
            }
            else if (course2.subject === "GE" && course1.subject === "GE") {
                if (course1.num > course2.num)
                    return 1;
                else
                    return -1;
            }
            if (course1.subject > course2.subject)
                return 1;
            else if (course1.subject < course2.subject)
                return -1;
            else {
                const course1Num = parseInt(course1.num.match(/\d+/g));
                const course2Num = parseInt(course2.num.match(/\d+/g));

                if (course1Num > course2Num)
                    return 1;
                else if (course1Num < course2Num)
                    return -1;
                else {
                    const lastLetter1 = course1.num.substring(course1.num.length - 1);
                    const lastLetter2 = course2.num.substring(course2.num.length - 1);

                    if (lastLetter1 > lastLetter2)
                        return 1;
                    else
                        return -1;
                }
            }
        }
    });

    return newList
}

function ordinalize(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

function download(plan) {
    var {coursePlan, courses, description, title, selections} = plan;
    let totalUnits = 0;
    var table = [];
    var foot = [];
    coursePlan.forEach(year => {
        var rows = [];
        var units = [0, 0, 0, 0];
        var n = Math.max(year.fall.length, year.winter.length, year.spring.length, year.summer.length);

        const q = ["fall", "winter", "spring", "summer"];

        Array.from(Array(n).keys()).forEach(int => {
            let r = [];
            q.forEach((qid, j) => {
                var courseId = year[qid][int];
                if (courseId) {
                    var req = courses[courseId];
                    if ('options' in req) {
                        var {index} = selections[courseId];
                        var course = req.options[index];
                        r.push(`${course.subject} ${course.num}`);
                        units[j] += course.units;
                        totalUnits += course.units;
                    }
                    else {
                        r.push(`${req.subject} ${req.num}`);
                        units[j] += req.units;
                        totalUnits += req.units;
                    }
                }
                else {
                    r.push('');
                }
            })
            rows.push(r);
            int++;
        })
        foot.push(units);
        
        table.push(rows);
    })

    var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
        putOnlyUsedFonts: true,
    })

    var margin = 50;
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var x = pageWidth / 2 + margin + 10;
    var y = margin;

    // Title
    if (title.length > 50)
        doc.setFontSize(17);
    else
        doc.setFontSize(20)
    doc.text(title, margin + 10, y); y += 10;

    // Line
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y); y += 18;

    // Description
    doc.setFontSize(10);
    doc.setTextColor(100);

    var lineHeight = doc.getLineHeight(description) / doc.internal.scaleFactor
    var text = doc.splitTextToSize(description, pageWidth / 2 - 2 * margin - 10);
    var lines = text.length  // splitted text is a string array
    var blockHeight = lines * lineHeight
    var y1 = y + 10;
    doc.text(text, x, y + 10); 

    y1 += (blockHeight + 10);
    doc.text(`Total Units: ${totalUnits}`, x, y1);

    // Generate table
    table.forEach((body, i) => {
        var head = [
            [{
                content: `${ordinalize(i + 1)} Year`, 
                colSpan: 4, 
                styles: { 
                    fillColor: [255, 255, 255], 
                    textColor: [84, 78, 84], 
                    halign: 'center',
                    fontSize: 10,
                }
            }],
            ["Fall", "Winter", "Spring", "Summer"],
        ]

        var tableRows = body.length + 3;
        var tableHeight = tableRows * 20.2;

        doc.autoTable({
            head: head,
            body: body,
            foot: [foot[i]],
            startY: y,
            margin: {
                left: margin,
            },
            tableLineColor: [84, 78, 84],
            tableLineWidth: 1,
            tableWidth: (pageWidth) / 2,
            showHead: 'firstPage',
            showFoot: 'lastPage',
            styles: {
                lineColor: [84, 78, 84],
                lineWidth: 0.5,
                fontSize: 8,
                cellWidth: (pageWidth) / 8,
                minCellHeight: 20,
            },
            headStyles: {
                fillColor: [84, 78, 84],
                textColor: [255, 255, 255],
                fontSize: 9,
            },
            bodyStyles: {
                fillColor: [244, 242, 241],
                textColor: [84, 78, 84],
                fontSize: 8,
            },
            footStyles: {
                fillColor: [244, 242, 241],
                fontSize: 8,
                textColor: [84, 78, 84],
                fontStyle: 'bold',
            },
        }); y += tableHeight;
    })
    
    window.open(doc.output('bloburl'), `${title}.pdf`);
}

export { schools, majors, subjects, download };