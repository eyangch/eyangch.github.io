import React from "react";
import Smile from "../components/Smile.tsx";

const Home: React.FC = () => {

	return (
		<div className="flex h-full font-[Onest]">
			<div className="flex flex-col m-auto sm:w-2xl w-sm sm:p-12 p-8 rounded-lg bg-blue-300">
				<div className="flex flex-row shrink-0">
					<div className="flex flex-col mt-4 mb-4">
						<div className="sm:text-2xl text-xl">
							Hi, I'm
						</div>
						<div className="sm:text-6xl sm:-ml-1 -ml-1 text-5xl">
							Eric Yang
						</div>
					</div>
					<div className="relative m-auto sm:h-32 h-20 sm:w-32 w-20 aspect-square">
						<Smile/>
					</div>
				</div>
				<div className="mt-3 mb-3 text-wrap w-full">
					<p className="mt-4">
						Hello! I'm an undergrad at MIT, studying CS. Last summer, I'm was in NYC working at <a className="underline" href="https://withtandem.com/">Tandem</a> as an Engineering Intern. My current interests revolve around low-level stuff, algorithms, ML, and any intersection of the three. 
					</p>
					<p className="mt-4">
						In the past, I've dabbled in some <a className="underline" href="https://codeforces.com/profile/eyangch/">competitive programming</a>, ML projects, <a className="underline" href="https://ctftime.org/team/78193">cybersecurity</a> <a className="underline" href="https://ctftime.org/ctf/646/">tournaments</a>, and <a className="underline" href="https://doi.org/10.1016/j.dam.2024.11.022">math research</a>.
					</p>
					<p className="mt-4">
						When I'm not on the grind, you'll probably find me playing cello, getting cooked in <a className="underline" href="https://ch.tetr.io/u/eyangch">tetris</a>, or sleeping.
					</p>
				</div>
				<div className="flex flex-row justify-left mt-4">
					<div className="mr-4 underline">
						<a href="https://github.com/eyangch/">Github</a>
					</div>
					<div className="mr-4 underline">
						<a href="https://www.linkedin.com/in/eyangch/">Linkedin</a>
					</div>
					<div id="email" className="mr-4 underline cursor-pointer" onClick={
						() => {
							const emailElement = document.getElementById("email");
							if(emailElement !== null && emailElement.innerHTML === "Email"){
								emailElement.innerHTML = "ehyang [at] mit.edu";
								emailElement.classList = "";
								emailElement.removeAttribute("onclick");
							}
						}
					}>
						Email
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;