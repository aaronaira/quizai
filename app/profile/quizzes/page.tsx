'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import { Loader2 } from "lucide-react"

function Quizzes() {

    const [getQuizzes, setQuizzes] = useState<any>(null);

    const fetchQuizzes = async () => {
        const response = await fetch('/api/quiz');
        const data = await response.json()
        console.log(data.data)
        setQuizzes(data.data)
    }

    useEffect(() => {
        fetchQuizzes();
    }, [])

    function QuizForm({ quiz }: { quiz: any }) {
        const [score, setScore] = useState<number | null>(null);
        const [answers, setAnswers] = useState<{ [key: number]: { userAnswer: string; isCorrect: boolean } }>({});

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const formObject = Object.fromEntries(formData.entries());

            const questions = JSON.parse(quiz.questions);

            const allAnswered = questions.every((q: any) => formObject[`answer-${q.id}`]);
            if (!allAnswered) {
                return alert("Please answer all the questions.");
            }

            let correctCount = 0;
            let results: { [key: number]: { userAnswer: string; isCorrect: boolean } } = {};

            questions.forEach((question: any) => {
                const userAnswer = formObject[`answer-${question.id}`] as string;
                const isCorrect = userAnswer === question.correct;

                results[question.id] = { userAnswer, isCorrect };
                if (isCorrect) correctCount++;
            });

            setScore(correctCount);
            setAnswers(results);

            try {
                const response = await fetch('/api/quiz', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quizId: quiz.id,
                        score: correctCount,
                    }),
                })

                const data = await response.json()
                console.log("DATA =>", data)

            } catch (error) {
                console.error('Error updating score:', error);
                alert('Failed to update score. Please try again.');
            }

            alert(`You successfully answered ${correctCount} out of ${questions.length}`)
        };

        const resetQuiz = () => {
            setAnswers({});
            setScore(null)

            const form = document.getElementById('quiz-form') as HTMLFormElement;
            if (form) {
                form.reset();
            }
        };


        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-green-500">
                        Make the Quiz
                    </Button>
                </DialogTrigger>
                <DialogContent className="overflow-scroll min-w-[500px] h-full">
                    <DialogHeader>
                        <DialogTitle>QUIZ</DialogTitle>
                        <DialogDescription>
                            Answer the questions, submit your responses, and see your score instantly.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} id="quiz-form">
                        {JSON.parse(quiz.questions).map((question: any) => {
                            const answerState = answers[question.id];

                            return (
                                <div key={question.id} className="flex flex-col mb-4 p-2 border rounded-lg">
                                    <label className="text-lg font-semibold">{question.question}</label>
                                    {["A", "B", "C"].map((option) => {
                                        const isUserAnswer = answerState?.userAnswer === option;
                                        const isCorrectAnswer = question.correct === option;
                                        let bgColor = "";

                                        if (answerState) {
                                            if (isCorrectAnswer) bgColor = "bg-green-300";
                                            if (isUserAnswer) bgColor = "bg-red-300";
                                            if (isCorrectAnswer && isUserAnswer) bgColor = "bg-green-300";
                                        }

                                        return (
                                            <div key={option} className={`flex gap-x-2 p-1 rounded-lg ${bgColor}`}>
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    name={`answer-${question.id}`}
                                                    id={`question-${question.id}-${option}`}
                                                    disabled={!!answerState}
                                                />
                                                <label htmlFor={`question-${question.id}-${option}`}>
                                                    {option}) {question[option]}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        <DialogFooter >
                            <div className="flex justify-between w-full">
                                <Button type="submit">Send</Button>
                                <div className="text-xl font-semibold">{score && score}</div>
                                <Button onClick={resetQuiz}>Re-Do</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div>
            {getQuizzes ? (
                getQuizzes.map((quizzes: any) => {
                    {
                        return (
                            <div key={quizzes.hash} className='flex flex-col gap-y-4 p-4 items-center justify-center rounded-md shadow-md'>
                                <h6 className='text-xl mb-2'>PDF - {quizzes.name}</h6>
                                {
                                    quizzes.Quizzes.map((quiz: any) => {
                                        return (
                                            <div key={quiz.id} className='flex p-2 w-full gap-y-2 items-center bg-slate-100 justify-between rounded-md'>
                                                <div className='flex items-center flex-col'>
                                                    <span>{quiz.size}</span>
                                                    <small>Questions</small>
                                                </div>
                                                <div className='flex items-center flex-col'>
                                                    {quiz.score && `last score: ${quiz.score}`}
                                                    <QuizForm quiz={quiz} />

                                                </div>
                                                <div className='flex items-center flex-col'>
                                                    <span>{quiz.difficulty}</span>
                                                    <small>Difficulty</small>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                })
            ) : (
                <div className="flex flex-col items-center"><Loader2 className="animate-spin w-12 h-12 text-[--main-color]" /><span>Loading...</span></div>
            )}
        </div>
    );
}

export default Quizzes