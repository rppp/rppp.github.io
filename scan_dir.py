import os

# 获取当前目录
current_dir = os.getcwd()

# 查找所有的 .htm 和 .html 文件
html_files = sorted([f for f in os.listdir(current_dir) if f.endswith(('.htm', '.html'))])
print(html_files)

# 创建 index.html 文件内容
index_content = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML文件索引</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
        a {
            color: #1a73e8;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <ul>
"""

# 为每个文件添加链接
for file in html_files:
    if file != 'index.html':  # 排除index.html自身
        index_content += f'        <li><a href="{file}">{file}</a></li>\n'

index_content += """
    </ul>
</body>
</html>
"""

# 写入 index.html 文件
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

print("index.html 已成功生成。")
