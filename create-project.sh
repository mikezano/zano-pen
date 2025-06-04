#!/bin/bash

# Check if a parameter was provided
if [ -z "$1" ]; then
    echo "Error: Please provide a project name"
    exit 1
fi

# Create the project directory
mkdir "$1"

# Create index.html with basic HTML5 template
cat > "$1/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$1</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to $1</h1>
    
    <script src="script.js"></script>
</body>
</html>
EOF

# Create empty script.js
cat > "$1/script.js" << EOF
// JavaScript for $1
document.addEventListener('DOMContentLoaded', () => {
    console.log('$1 initialized');
});
EOF

# Create empty styles.css
cat > "$1/styles.css" << EOF
/* Styles for $1 */
body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
}
EOF

echo "Project '$1' has been created successfully!"
echo "Created:"
echo "  - $1/index.html"
echo "  - $1/script.js"
echo "  - $1/styles.css"
