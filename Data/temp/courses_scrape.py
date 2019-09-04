import requests
import json
import time
import re
from bs4 import BeautifulSoup

base_url = "https://www.registrar.ucla.edu/Academics/Course-Descriptions"
response = requests.get(base_url)
if response.status_code != 200:
    print("Error: GET " + base_url + " results in " + response.status_code)
soup = BeautifulSoup(response.text, "html.parser")
prefix = "dnn_ctr38595_Courses_courses_courseAlpha_"

links = ['https://www.registrar.ucla.edu/Academics/Course-Descriptions/Course-Details?SA=HIN-URD&funsel=3',
    'https://www.registrar.ucla.edu/Academics/Course-Descriptions/Course-Details?SA=HNGAR&funsel=3',
    'https://www.registrar.ucla.edu/Academics/Course-Descriptions/Course-Details?SA=HIST&funsel=3']

for i in range(8, 26):
    id_label = prefix + str(i)
    table = soup.find(id=id_label)
    if table == None:
        continue
    alinks = table.findAll('a')
    for link in alinks:
        links.append("https://www.registrar.ucla.edu" + link.get('href'))

f = open("courses2.json", "w")

for link in links: # [:1]
    response = requests.get(link)
    if response.status_code != 200:
        print("Error: GET " + link + " results in " + response.status_code)
    soup = BeautifulSoup(response.text, "html.parser")
    items = soup.find_all(class_="media-body") # [:1]
    subject = re.search(r'SA=(\w+\+?\-?%?\d*)+&funsel', link)
    if subject == None:
        print(link)
        exit(1)
    subject = subject.group(0).replace('+', ' ').replace('%26', '&').replace('SA=', '').replace('&funsel', '').upper()

    for item in items:
        course = {}
        
        course['subject'] = subject

        text = item.get_text().lstrip().split('\n')
        
        course_head = text[0].split('. ')
        course['num'] = course_head[0]
        course['title'] = course_head[1]
        units = text[1].split(': ')[1]
        if re.search(r'\D', units):
            course['units'] = int(re.search(r'\d$', units).group(0))
        else:
            course['units'] = int(units)
        course['description'] = text[2]
        json.dump(course, f)
        
        f.write('\n')
    print('Finished with ' + subject)
    time.sleep(0.5)

f.close()

print("Done")