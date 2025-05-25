import React, { type ReactNode } from "react";

interface CourseProp{
    course: string;
    number: string;
    name: string
};

const Course: React.FC<CourseProp> = ({ course, number, name }) => {
    const colorMap: { [key: string]: string } = {
        "5": "bg-orange-400",
        "6": "bg-blue-400",
        "7": "bg-green-400",
        "8": "bg-gray-400",
        "18": "bg-purple-400",
        "21M": "bg-pink-400",
        "24": "bg-red-400"
    };

    return (
        <>
            <div className={`rounded-lg ${colorMap[course]} pl-2 pr-2 pt-1 pb-1 mr-1`}>
                <div className="text-lg">
                    {course}.{number}
                </div>
                <div className="text-xs">
                    {name}
                </div>
            </div>
        </>
    )
};

interface YearProp{
    year: string;
    children: ReactNode;
};

const Year: React.FC<YearProp> = ({ year, children }) => {
    return (
        <>
            <div className="mt-8 mb-2 font-bold text-xl">
                { year }
            </div>
            <div className="flex flex-row flex-wrap gap-y-1">
                { children }
            </div>
        </>
    );
};

const Courses: React.FC = () => {
	return (
		<div className="flex">
			<div className="flex flex-col ml-auto mr-auto mt-20 mb-auto sm:w-2xl w-sm sm:p-12 p-8 rounded-lg bg-blue-300">
				<div className="sm:text-6xl text-5xl text-center">
                    Courses
                </div>
                <div className="mt-4">
                    Classes I took at MIT!
                </div>

                <Year year="Spring 2025">
                    <Course course="6" number="1903" name="Intro Program in C & Assembly"/>
                    <Course course="6" number="1910" name="Computation Structures"/>
                    <Course course="6" number="3900" name="Intro to Machine Learning"/>
                    <Course course="18" number="600" name="Probability & Random Variables"/>
                    <Course course="24" number="900" name="Introduction to Linguistics"/>
                    <Course course="21M" number="445" name="Chamber Music Society"/>
                </Year>

                <Year year="Fall 2024">
                    <Course course="5" number="111" name="Principles of Chemical Science"/>
                    <Course course="6" number="5210" name="Advanced Algorithms (G)"/>
                    <Course course="18" number="06" name="Linear Algebra"/>
                    <Course course="18" number="100B" name="Real Analysis"/>
                    <Course course="21M" number="445" name="Chamber Music Society"/>
                </Year>

                <Year year="Prior Credit">
                    <Course course="6" number="100A" name="Intro to CS Prog in Python"/>
                    <Course course="7" number="012" name="Introductory Biology"/>
                    <Course course="8" number="01" name="Physics I"/>
                    <Course course="8" number="02" name="Physics II"/>
                    <Course course="18" number="01" name="Calculus I"/>
                    <Course course="18" number="02" name="Calculus II"/>
                </Year>
			</div>
		</div>
	);
};

export default Courses;