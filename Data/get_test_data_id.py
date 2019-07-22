import json
import re

ids = []
with open('test-courses.json', 'r') as file:
    line = file.readline()
    while line:
        course = json.loads(str(line))
        course_id = course["_id"]
        ids.append(course_id)
        line = file.readline()

print(ids)

print('Done')


