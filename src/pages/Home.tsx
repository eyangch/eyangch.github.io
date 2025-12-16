import React from "react";
import Smile from "../components/Smile.tsx";

const Home: React.FC = () => {

	return (
		<div className="flex h-full font-[Onest]">
			<div className="flex flex-col m-auto xl:w-2xl lg:w-xl w-7/8 md:p-12 p-6 rounded-lg bg-blue-300">
				<div className="flex flex-row shrink-0">
					<div className="flex flex-col md:my-4 my-2">
						<div className="md:text-2xl text-xl">
							Hi, I'm
						</div>
						<div className="md:text-6xl md:-ml-1 -ml-1 text-4xl">
							Eric Yang
						</div>
					</div>
					<div className="relative m-auto md:h-32 h-16 md:w-32 w-16 aspect-square">
						<Smile/>
					</div>
				</div>
				<div className="md:my-3 text-wrap w-full md:text-base text-xs">
					<p className="mt-4">
						Hello! I'm an undergrad at MIT, studying CS. Last summer, I was in NYC working at <a className="underline" href="https://withtandem.com/">Tandem</a> as an Engineering Intern. My current interests revolve around low-level stuff, algorithms, ML, and any intersection of the three. 
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