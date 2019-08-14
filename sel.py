"""
Install chromedriver from here https://sites.google.com/a/chromium.org/chromedriver/downloads for your chrome version
Run pip install selenium xlrd in working directory
Fill your username below
I assume the list of CAs is in your home directory as ~/cas.csv.
"""

import csv
import xlrd
import os
import sys
import os.path
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait  # available since 2.4.0
from selenium.common.exceptions import TimeoutException
from selenium import webdriver
from time import sleep


YOUR_USER_NAME = "ecell"  # CHANGE THIS
HOME = "/home/" + YOUR_USER_NAME  # don't change these
howzhackfile = HOME + '/output/howzhack-registered.xlsx'
answerCSV = HOME + "/answer.csv"
leaderCSV = HOME + "/leader.csv"
caCSV = HOME + "/cas.csv"


def csv_from_excel():
    wb = xlrd.open_workbook(howzhackfile)
    sh = wb.sheet_by_name('Sheet1')
    your_csv_file = None
    try:
        your_csv_file = open(answerCSV, 'x')
    except FileExistsError:
        your_csv_file = open(answerCSV, 'w')

    wr = csv.writer(your_csv_file, quoting=csv.QUOTE_ALL)

    for rownum in range(sh.nrows):
        wr.writerow(sh.row_values(rownum))

    your_csv_file.close()


options = Options()
download_path = HOME + "/output"
options.headless = True
# options.add_argument('--headless')
options.add_argument('--no-sandbox')
# options.add_argument('start-maximized')
prefs = {'download.default_directory' : download_path}
options.add_experimental_option('prefs', prefs)
# Create a new instance of the Firefox driver

driver = webdriver.Chrome(options=options)

driver.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': download_path}}
command_result = driver.execute("send_command", params)

driver.get(
    "https://sprint.hackerearth.com/challenges/hackathon/admin/howzhack/registrations/users/")

print(driver.title)
# find the element that's name attribute is q (the google search box)
email = driver.find_element_by_id("id_email")
passw = driver.find_element_by_id("id_password")

# type in the search
email.send_keys("ecell@iiit.ac.in")
passw.send_keys(sys.argv[1])

# submit the form (although google automatically searches now without submitting)
passw.submit()

try:
    if os.path.isfile(howzhackfile):
        os.remove(howzhackfile)
        print("Previous howzhack file found and deleted")
    if os.path.isfile(answerCSV):
        os.remove(answerCSV)
        print("Previous answer csv file found and deleted")
    # we have to wait for the page to refresh, the last thing that seems to be updated is the title
    WebDriverWait(driver, 10).until(EC.title_contains("HOWZHACK"))

    btn = driver.find_element_by_css_selector(".page-data a.btn-blue")
    btn.click()

    print("Download started")
    # wait for download
    sleep(3)

finally:
    driver.quit()

    # then open the file and convert to csv
print("converting excel to csv")
csv_from_excel()

with open(answerCSV) as f:
    # this is a list of dictionaries
    result = [{k: v for k, v in row.items()}
              for row in csv.DictReader(f, skipinitialspace=True)]
    caCodeToName = {}
    with open(caCSV) as f2:
        result2 = [{k: v for k, v in row.items()}
                   for row in csv.DictReader(f2, skipinitialspace=True)]

        for ca in result2:
            caCodeToName[ca["CA Code"].lower()] = ca["Name"]

    caCounts = {}
    for reg in result:
        ca = reg["CA Code"].lower()
        if ca:
            if caCounts.get(ca):
                caCounts[ca] += 1
            else:
                caCounts[ca] = 1
    caCounts = [(k, v) for k, v in caCounts.items()]
    caCounts = sorted(caCounts, key=lambda x: x[1], reverse=True)
    leaderboard = []
    blockedWords = ["language", "good"]

    for ca in caCounts:
        ans = {}
        dont = False
        for word in blockedWords:
            if word in ca[0]:
                dont = True
                break
        if not dont:
            ans["Name"] = ca[0]
            ans["Points"] = ca[1]
            leaderboard.append(ans)

    csv_file = None
    try:
        csv_file = open(leaderCSV, "x")
    except FileExistsError:
        csv_file = open(leaderCSV, "w")

    writer = csv.writer(csv_file)
    for leader in leaderboard:
        writer.writerow([leader["Name"], leader["Points"]])
    csv_file.close()
print("finished success")
