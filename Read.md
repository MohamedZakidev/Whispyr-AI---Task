# Log Analysis Tool

A small TypeScript utility that parses application logs and extracts useful operational insights such as:

- Error frequency
- Peak traffic hour
- Most frequent error messages
- Error cascade detection

## Installation & Running

Install dependencies:

npm install

Start the development server:

npm run dev

Build for production:

npm run build

Preview the production build:

npm run preview

## Design Decisions

I first parsed the raw log string into an array of structured objects.  
Each log entry contains a timestamp, level (INFO/ERROR), and message.  
This made it easier to filter ERROR entries, sort them by time, and detect cascades using simple time comparisons instead of complex string manipulation.

## Narrative

Around 10:06, several consecutive ERROR logs appeared from the database and authentication services, indicating temporary timeouts and failed session validations. I think the user lost the network connection for a short time then the connection came back.
