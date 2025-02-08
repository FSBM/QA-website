import { Book, Zap, LineChart } from 'lucide-react';

const QALanding = () => {
  return (
    <div className="h-[80vh]  text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold mb-4">
          Test Your Knowledge
        </h1>
        
        <p className="text-2xl font-medium text-gray-300">
          Explore • Learn • Master
        </p>
        
        <p className="text-lg text-gray-300">
          Submit any topic and challenge yourself with tailored questions. 
          Get instant feedback and track your progress as you learn.
        </p>
        
        <div className="flex justify-center gap-12 text-gray-300">
          <div className="flex flex-col items-center gap-2">
            <Book size={24} />
            <span>All Subjects</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap size={24} />
            <span>Instant Feedback</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <LineChart size={24} />
            <span>Progress Tracking</span>
          </div>
        </div>
        
        <p className="text-gray-500 italic">
          Ready to test your knowledge? Type your topic below and begin your learning journey.
        </p>
      </div>
    </div>
  );
};

export default QALanding;