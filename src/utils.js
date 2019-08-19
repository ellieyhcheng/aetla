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