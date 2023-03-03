const TelegramBot = require('node-telegram-bot-api');
const { spawn } = require('child_process');
const fs = require('fs');
const archiver = require('archiver');

// Create a Telegram bot using the API token
const bot = new TelegramBot('YOUR_TELEGRAM_API_TOKEN', { polling: true });

// Listen for messages from the user
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  
  // Extract the project name from the message
  const projectName = msg.text.trim();
  
  // Create a child process to run the composer create-project command
  const laravelProcess = spawn('composer', ['create-project', '--prefer-dist', 'laravel/laravel', projectName]);

  // Listen for output from the process
  laravelProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  laravelProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Wait for the process to exit
  await new Promise((resolve, reject) => {
    laravelProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Process exited with code ${code}`);
      }
    });
  });

  // Compress the project files into a zip file
  const archive = archiver('zip');
  const output = fs.createWriteStream(`${projectName}.zip`);

  archive.pipe(output);
  archive.directory(projectName, false);
  archive.finalize();

  // Send the zip file to the user
  bot.sendDocument(chatId, `${projectName}.zip`);
});
