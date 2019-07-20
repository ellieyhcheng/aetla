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

obj = {
    "subjects": []
}

for i in range(0, 26):
    id_label = prefix + str(i)
    table = soup.find(id=id_label)
    if table == None:
        continue
    alinks = table.findAll('a')
    for link in alinks:
        subject = re.search(r'SA=(\w+\+?\-?%?\d*)+&funsel', link.get('href'))
        if subject == None:
            print(link)
            exit(1)
        subject = subject.group(0).replace('+', ' ').replace('%26', '&').replace('SA=', '').replace('&funsel', '').upper()
        obj["subjects"].append(subject)

f = open("subjects.json", "w")
json.dump(obj, f)

f.close()

print("Done")