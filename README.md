![coderspace](https://socialify.git.ci/mrExplorist/coderspace/image?description=1&descriptionEditable=Elevate%20your%20Coding%20Experience%3A%20Coderspace%20-%20Unleash%20the%20Potential%20of%20Real-time%20Collaboration%20and%20Conference%20Meets&font=Source%20Code%20Pro&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&theme=Light)

# Coderspace 🚀

Elevate your Coding Experience: Coderspace - Unleash the Potential of Real-time Collaboration and Conference Meets! 💻🔥

## Features 🔥

- 💬 **Conference Meetings**: Conduct virtual conference meetings with multiple participants, including audio and video capabilities, screen sharing, and chat functionality. 🎤🎥🖥️💬
- 🤝 **Pair Programming**: Collaborate with other developers in real-time, allowing simultaneous code editing, chat, and audio communication. 👥💻💬🎤
- 🔄 **Code Sync**: Enable synchronized code editing in real-time, allowing all participants to see and interact with code changes as they happen. 🔄💻
- 📝 **Live Whiteboard**: Facilitate brainstorming and visual explanations through a shared whiteboard where participants can draw, write, and annotate. 📝🎨
- ✋ **Raise Hand**: Participants can raise their hand to indicate that they have a question or need assistance, triggering a visual notification for others. 🙋‍♂️🙋‍♀️✋
- 🍞 **Toasts**: Display toast messages to participants when important events occur, such as someone raising their hand or joining/leaving the room. 🍞📢

## Technologies Used 💻

- **Frontend**: React, Redux
- **Backend**: Node.js, Express.js, MongoDB
- **Real-time Communication**: WebRTC, Socket.IO
- **Authentication**: Twilio API for OTP (One-Time Password) authentication
- **Deployment**: Docker, AWS (Amazon Web Services), or any preferred hosting service

## Getting Started 🚀

To set up Coderspace locally for development and testing, follow these steps:

- This documentation will guide you through the process of setting up Coderspace locally on your machine. By following these steps, you will be able to run the application, and integrate Twilio for OTP service.

Prerequisites:

- Node.js (v14.x or higher) and npm (v6.x or higher) installed on your machine
- MongoDB installed locally (v4.x or higher)
- Twilio account with Account SID, Auth Token, and a registered phone number

Step 1: Clone the Repository

1. Open your terminal or command prompt.
2. Change to the directory where you want to clone the repository.
3. Run the following command to clone the repository:
   ```
   git clone https://github.com/your-username/coderspace.git
   ```
   Replace `your-username` with your actual GitHub username.

Step 2: Install Dependencies on frontend and backend:

1. Navigate to the project's root directory:
   ```
   cd coderspace
   ```
2. Run the following command to install the project dependencies in both frontend and backend directory:
   ```
   npm install
   ```

Step 3: Configure Twilio for OTP Service

1. Sign up for a Twilio account at https://www.twilio.com and obtain your Account SID, Auth Token, and a registered phone number.
2. Open the `.env` file in the project's root directory.
3. Set the `SMS_SID` variable to your Twilio Account SID.
4. Set the `SMS_AUTH_TOKEN` variable to your Twilio Auth Token.
5. Set the `SMS_FROM_NUMBER` variable to your registered Twilio phone number.

Step 4: Set Up Environment Variables

1. In the project's root directory, locate the `.env.example` file.
2. Create a new file named `.env` in both backend and frontend directory and copy the contents of `.env.example` and `.env.dev` respectively.
3. Modify the values in the `.env` file in backend directory to match your local configuration. Make sure to set the necessary variables, such as database connection information, Twilio Account SID, Auth Token, and Twilio phone number.
4. Set the SECRETS in the `.env` file by `crypto.randomBytes(length).toString('hex')`. It is a Node.js method that generates a random string of bytes with the specified length and converts it to a hexadecimal string representation which you can use to generate strong SECRET VARIABLES. You can set secrets to be any random generated string.

Step 5: Start MongoDB

1. Open a new terminal or command prompt window.
2. Start the MongoDB service by running the following command:
   ```
   mongod
   ```

Step 6: Run the Application

1. In the original terminal or command prompt window, navigate to the project's root directory if you're not already there.
2. Run the following command to start the application:
   ```
   cd /frontend
   npm start
   cd ../backend
   npm run dev
   ```
   This will start the server and the client development server.

Step 7: Access the Application

1. Open your web browser and visit `http://localhost:3000` to access the Coderspace application.

Congratulations! You have successfully set up Coderspaces locally, including the integration of Twilio for OTP service and now it's a time to collaborate ..

Note: Remember to keep your local environment variables and configurations secure and do not commit them to any version control system.

Step 8: Collaborate:

Contributions to the collaboration feature in our Coderspace project are welcome! If you would like to contribute, please follow these guidelines:

- Fork the repository and create a new branch for your feature or bug fix.
- Commit your changes with descriptive commit messages.
- Push your changes to your forked repository.
- Submit a pull request detailing your changes and explaining the purpose and benefits of the contribution.

We appreciate your contributions to making Coderspace an even better coding community app!
