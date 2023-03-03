# laravel-project-generator
this is a telegram bot made of node js and it is used to create laravel projects 
Telegram Laravel Project Creator
This is a Node.js script that interacts with a Telegram user via Telegram and enables the user to enter a project name. The script creates a Laravel project in the server and sends the files to the user using threading.

# Prerequisites
Before you begin, ensure you have met the following requirements:

You have installed Node.js and npm on your server.
You have created a Telegram bot and obtained its API token.
Your server has the required permissions to create a Laravel project and write files to the file system.
# Installation
To install the required packages, run the following command in your project directory:

Copy code
npm install node-telegram-bot-api child_process fs archiver
Configuration
Update the script with your Telegram bot API token. Replace YOUR_TELEGRAM_API_TOKEN with the API token you obtained from Telegram.

# Usage
To run the script, navigate to the directory where it is saved and run the following command:

Copy code
node script_name.js
Replace script_name.js with the name of your script file.

# How it Works
When a user sends a message to the bot with a project name, the script creates a Laravel project in the server using the composer create-project command. The script then compresses the project files into a zip file using the archiver module and sends the zip file to the user using the node-telegram-bot-api package.

# License
This project is licensed under the MIT License - see the LICENSE file for details.
