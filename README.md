# AI-Powered Quiz Generator

This application is an interactive quiz generator that uses AI to create custom quizzes on any topic. Users can specify the quiz topic, number of questions, time limit, and even provide custom instructions for the AI to follow when generating the quiz.

## Features

- AI-generated quizzes on any topic
- Customizable number of questions and time limit
- Vintage-style timer for each quiz
- Interactive UI with animations
- Immediate feedback on answers
- Detailed results page with score and correct answers
- Responsive design for various screen sizes

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- OpenAI API for quiz generation
- Zod for schema validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. On the home page, enter a quiz topic, number of questions, and time limit.
2. Optionally, add custom instructions for the AI.
3. Click "Generate Quiz" to create your custom quiz.
4. Answer the questions within the time limit.
5. View your results and correct answers at the end of the quiz.
6. Start a new quiz on any topic you like!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
