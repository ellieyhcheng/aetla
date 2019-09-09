import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

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

const schools = [
    { key: 'UCLA', text: 'University of California - Los Angeles', value: 'ucla' },
]

const majors = [
    { key: 'CSE', text: 'Computer Science and Engineering', value: 'cse' },

]

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
    var {coursePlan, courses, title, description, selections} = plan;
    let totalUnits = 0;
    var table = [];
    coursePlan.forEach(year => {
        var rows = [];
        var units = [0, 0, 0, 0];
        var n = Math.max(year.fall.length, year.winter.length, year.spring.length, year.summer.length);

        const q = ["fall", "winter", "spring", "summer"];

        let int = 0;
        while (int < n) {
            let r = [];
            q.forEach((qid, j) => {
                var courseId = year[qid][int];
                if (courseId) {
                    var req = courses[courseId];
                    if ('options' in req) {
                        var {index} = selections[courseId];
                        var course = req.options[index];
                        // r[qid] = `${course.subject} ${course.num}`;
                        r.push(`${course.subject} ${course.num}`);
                        units[j] += course.units;
                        totalUnits += course.units;
                    }
                    else {
                        // r[qid] = `${req.subject} ${req.num}`;
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
        }
        // console.log(rows);
        rows.push(units);
        table.push(rows);
    })

    var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
        putOnlyUsedFonts: true,
    })

    var margin = 50;
    var y = margin;
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

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
    var text = doc.splitTextToSize(description, pageWidth - 2*margin);
    var lines = text.length  // splitted text is a string array
    var blockHeight = lines * lineHeight
    doc.text(text, margin, y); y+= (blockHeight + 10);

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

        var tableRows = body.length + 2;
        var tableHeight = tableRows * 20;

        doc.autoTable({
            head: head,
            body: body,
            startY: y,
            margin: {
                left: margin,
            },
            tableLineColor: [84, 78, 84],
            tableLineWidth: 1,
            tableWidth: (pageWidth) / 2,
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
        }); y += tableHeight;
    })
    
    y += (lineHeight * 2);
    doc.text(`Total Units: ${totalUnits}`, margin, y);

    
    window.open(doc.output('bloburl'), `${title}.pdf`);
    // doc.output('dataurlnewwindow', `${title}.pdf`)
    // doc.save(`${title}.pdf`);
}


export { schools, majors, download };