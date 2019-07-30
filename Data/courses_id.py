import json
import re

ids = []
courses = {}
i = 0
with open('courses2.json', 'r') as file:
    line = file.readline()
    while line and i < 50:
        course = json.loads(str(line))
        course_id = course["_id"]['$oid']
        course["_id"] = course_id
        # course.pop("_id")
        course["units"] = int(course["units"]["$numberInt"])
        ids.append(course_id)
        courses[course_id] = course
        line = file.readline()
        i += 1

with open('courses_array.json', 'w') as file:
    json.dump(courses, file)

print(ids)

print('Done')


