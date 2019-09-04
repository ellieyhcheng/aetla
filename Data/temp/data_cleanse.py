import json
import re

with open('courses_new.json', 'w') as f:
    with open('courses.json', 'r') as file:
        line = file.readline()
        count = 0
        while line:
            # if count == 500:
            #     break
            course = json.loads(str(line))
            description = course['description']

            search = re.search(r'Requisites?: ([^.]+)\.', description)
            if search:
                course['description'] = description.replace(search.group() + ' ', '')
                course['requisites'] = search.group(1)
            
            search = re.search(r'Enforced requisites?: ([^.]+)\.', description)
            if search:
                course['description'] = description.replace(search.group() + ' ', '')
                course['requisites'] = search.group(1)

            search = re.search(r'[Cc]orequisites?: ([^.]+)\.', description)
            if search:
                course['description'] = description.replace(search.group() + ' ', '')
                course['corequisites'] = search.group(1)
            
            # search = re.search(r'Recommended: ([^.]+)\.', description)
            # if search:
            #     course['description'] = description.replace(search.group() + ' ', '')
            #     course['recommended'] = search.group(1)

            json.dump(course, f)
            f.write('\n')

            line = file.readline()
            count += 1

print('Done')


