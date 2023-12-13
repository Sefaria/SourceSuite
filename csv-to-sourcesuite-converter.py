import re
import csv

data = []
data2 = []


def is_hebrew(s):
    return any("\u0590" <= c <= "\u05EA" for c in s)

def format_div(div):
    if div.startswith('<div class="zoom">'):
        if is_hebrew(div):
            d = div.replace('<div class="zoom">', '<div class="zoom"><div class="he">')
            return f'{d}</div>'
        else:
            d = div.replace('<div class="zoom">', '<div class="zoom"><div class="en">')
            return f'{d}</div>'

    else:
        if is_hebrew(div):
            return f'<div class="he">{div}</div>'
        else:
            return f'<div class="en">{div}</div>'



with open('in.csv') as csv_file:

    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        col1_focus_parsed = ""

        html_focus_parsed = ""
        html_zoom_parsed = ""
        html_line_parsed = ""


        pattern = r"_([^*?]*?)_"
        html_focus_parsed = html_focus_parsed + ( re.sub(pattern, lambda x: f'<span class="focus">{x.group(1)}</span>' if x.group(1) else x.group(), row[1]) )
        col1_focus_parsed = col1_focus_parsed + ( re.sub(pattern, lambda x: f'<span class="focus">{x.group(1)}</span>' if x.group(1) else x.group(), row[0]) )

        pattern = r"\*([^*]*)\*"
        html_zoom_parsed = html_zoom_parsed + ( re.sub(pattern, lambda x: f'<div class="zoom">{x.group(1)}</div>' if x.group(1) else x.group(), html_focus_parsed) )



        for div in html_zoom_parsed.split("\n"):
            html_line_parsed = html_line_parsed + format_div(div)

        if html_line_parsed == '<div class="en"></div>':
            html_line_parsed = '<div class="zoom"></div>'

        col1_focus_parsed = col1_focus_parsed.replace("\n","<br>")
        data2.append(col1_focus_parsed)
        data.append(html_line_parsed)


with open('out.js', 'w') as f:
    f.write(f'const data = {data}\n\nconst data2 = {data2}')
