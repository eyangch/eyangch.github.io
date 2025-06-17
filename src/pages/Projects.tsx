import React, { type ReactNode } from "react";
import cursed_qwop from '../assets/cursed_qwop.png';
import discord_graph from '../assets/discord_graph.png';
import bf_int from '../assets/bf_int.png';
import no_trust from '../assets/no_trust.png';

interface SingleProjectProps{
    name: string;
    url: string;
    img: string;
    children: ReactNode;
};

const SingleProject: React.FC<SingleProjectProps> = ({ name, url, img, children }) => {
    return (
        <div className="flex flex-row mt-12">
            <div>
                <div className="text-xl font-bold underline">
                    <a href={ url }>{ name }</a>
                </div>
                <div className="text-justify">
                    { children }
                </div>
            </div>
            <img className="ml-8 w-24 h-24 border-1 rounded-md" src={ img }></img>
        </div>
    );
};

const Projects: React.FC = () => {
	return (
		<div className="flex">
			<div className="flex flex-col ml-auto mr-auto mt-20 mb-auto sm:w-2xl w-sm sm:p-12 p-8 rounded-lg bg-blue-300">
				<div className="sm:text-6xl text-5xl text-center">
                    Projects
                </div>
                <div className="mt-4">
                    Here's some small projects I've been working on in my free time!
                </div>

                <SingleProject 
                    name="Hallucinate" 
                    url="https://github.com/eyangch/hallucinate/"
                    img={cursed_qwop}>
                    Simulating the video game QWOP in realtime on the browser using neural networks. Uses an autoencoder to compress gamestates and an LSTM to predict future states. Noise is added during training to improve stability. Play the game <a className="underline" href="https://eyangch.github.io/hallucinate/">here</a>!
                </SingleProject>

                <SingleProject 
                    name="Discord Graph" 
                    url="https://github.com/eyangch/discord-graph/"
                    img={discord_graph}>
                    Creates a graph visualization of your friends' connections to each other on Discord. Try it out <a className="underline" href="https://eyangch.github.io/discord-graph/">here</a>!
                </SingleProject>

                <SingleProject 
                    name="Fast BF Interpreter" 
                    url="https://ide.usaco.guide/O6lu6OYDARRsCkPGwjJ"
                    img={bf_int}>
                    First place for the HackMIT 2024 BF Interpreter <a className="underline" href="https://dayof.hackmit.org/challenges">Sponsor Challenge</a>, winning $1000 for the fastest BF interpreter.
                </SingleProject>

                <SingleProject 
                    name="No Trust" 
                    url="https://github.com/eyangch/no-trust/"
                    img={no_trust}>
                    Creates a layer of authentication over any service using TCP connections by proxying connections. Complete with a web interface and user system.
                </SingleProject>
			</div>
		</div>
	);
};

export default Projects;