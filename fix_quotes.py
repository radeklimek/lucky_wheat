with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('\u201c', '\\u201c')
content = content.replace('\u201d', '\\u201d')
content = content.replace('\u201e', '\\u201e')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
