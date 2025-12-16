import React from "react";
import { useState, useEffect, useRef } from "react";

import startGif from '../assets/desktop/start.gif';
import homepageGif from '../assets/desktop/homepage.gif';
import browserIconGif from '../assets/desktop/browser_icon.gif';
import folderProjectsGif from '../assets/desktop/folder_projects.gif';
import folderGif from '../assets/desktop/folder2.gif';
import xGif from '../assets/desktop/x.gif';
import minGif from '../assets/desktop/min.gif';

import hallucinateImg from '../assets/cursed_qwop.png';
import discordImg from '../assets/discord_graph.png';
import bfImg from '../assets/bf_int.png';
import noTrustImg from '../assets/no_trust.png';
import dlImg from '../assets/dl.png';

import Home from './Home.tsx';

const loadTime = Date.now();

type ButtonProps = {
    src: string,
    height: number,
    pad: number,
    onclick?: () => void;
};

const ImgButton: React.FC<ButtonProps> = ({ src, height, pad, onclick }) => {
    return <img className={`h-${height} my-1 p-${pad}
                bg-neutral-300
                border-t-neutral-100 border-t-3
                border-l-neutral-100 border-l-3
                border-r-neutral-700 border-r-3
                border-b-neutral-700 border-b-3
                active:border-t-neutral-700
                active:border-l-neutral-700
                active:border-r-neutral-100
                active:border-b-neutral-100`} onClick={onclick} src={src} />
};

type CondButtonProps = {
    src: string,
    height: number,
    pad: number,
    down: boolean,
    toggle?: () => void
};

const CondImgButton: React.FC<CondButtonProps> = ({ src, height, pad, down, toggle }) => {
    return <img className={`h-${height} my-1 p-${pad}
                bg-neutral-300
                border-t-3
                border-l-3
                border-r-3
                border-b-3
                ${down ? "border-t-neutral-700 border-l-neutral-700 border-r-neutral-100 border-b-neutral-100" : 
                    "border-t-neutral-100 border-l-neutral-100 border-r-neutral-700 border-b-neutral-700"}`} 
                onClick={toggle}
                src={src} />
};

type Window = {
    element: string,
    img: string,
    title: string,
    minimized: boolean,
    deleted: boolean,
    toggle: () => void,
    id: number,
    zidx: number,
    url?: string
};

type StartBarProps = {
    items: Window[]
}

const StartBar: React.FC<StartBarProps> = ({ items }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="bottom-0 w-screen bg-neutral-300
                        border-t-neutral-500 border-t-1 bg-neutral-300
                        border-l-neutral-700 border-l-1
                        border-r-neutral-700 border-r-1
                        border-b-neutral-700 border-b-1 z-[1000000000]">
            <div className="ml-1 flex justify-between">
                <div className="flex gap-1">
                    <ImgButton height={8} pad={1} src={startGif} onclick={() => {window.location.href = '/'}}/>
                    {
                        items.map((item, _) => {
                            return <CondImgButton height={8} pad={0} toggle={item.toggle} down={!item.minimized} src={item.img} />
                        })
                    }
                </div>
                <div className="flex my-auto mr-2">
                    {time.toLocaleDateString()} . {time.toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
}

type BrowserProps = {
    id: number,
    minimize: () => void,
    maximize: () => void,
    close: () => void,
    minimized: boolean,
    deleted: boolean,
    title: string,
    url: string,
    setzidx: (zidx: number) => void,

    children?: React.ReactNode
};

const Browser: React.FC<BrowserProps> = ({ id, minimize, close, minimized, deleted, title, setzidx, children }) => {
    const windowRef = useRef<HTMLDivElement>(null);

    const [zIndex, setZIndex] = useState(Date.now() - loadTime);

    const mouseDown = useRef(false);
    const initialPos = useRef({
        "mouseX": 0,
        "mouseY": 0,
        "windowX": 0,
        "windowY": 0,
    });
    const [translateX, setTranslateX] = useState(id == 0 ? 0 : 100 * (Math.random()-0.5));
    const [translateY, setTranslateY] = useState(id == 0 ? 0 : 100 * (Math.random()-0.3));

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement> | React.Touch) => {
        initialPos.current = {
            "mouseX": e.pageX,
            "mouseY": e.pageY,
            "windowX": translateX,
            "windowY": translateY,
        };
        mouseDown.current = true;
    };

    const mouseUpHandler = (_: MouseEvent | Touch) => {
        mouseDown.current = false;
    }

    const mouseMoveHandler = (e: MouseEvent | Touch) => {
        if(mouseDown.current){
            const diffX = e.pageX - initialPos.current.mouseX;
            const diffY = e.pageY - initialPos.current.mouseY;

            setTranslateX(initialPos.current.windowX + diffX);
            setTranslateY(initialPos.current.windowY + diffY);
        }
    };

    const touchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        mouseDownHandler(e.touches[0]);
    }

    const touchUpHandler = (e: TouchEvent) => {
        mouseUpHandler(e.touches[0]);
    }

    const touchMoveHandler = (e: TouchEvent) => {
        if(mouseDown.current){
            e.preventDefault();
        }
        mouseMoveHandler(e.touches[0]);
    }

    const updateZIndex = () => {
        const zidxval = Date.now() - loadTime;
        setZIndex(zidxval);
        setzidx(zidxval);
    }
    
    useEffect(() => {

        window.addEventListener("mouseup", mouseUpHandler);
        window.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("touchend", touchUpHandler);
        window.addEventListener("touchmove", touchMoveHandler, { passive: false });

        return () => {
            window.removeEventListener("mouseup", mouseUpHandler);
            window.removeEventListener("mousemove", mouseMoveHandler);
            window.removeEventListener("touchend", touchUpHandler);
            window.removeEventListener("touchmove", touchMoveHandler);
        }
    }, [])

    return (
        <div ref={windowRef}
            style={{
                transform: (
                    minimized 
                        ? "translate(0, 50vh) scale(0.01)" 
                        : `translate(${translateX}px, ${translateY}px)`
                ),
                zIndex: zIndex
            }}
            className={`absolute p-1 
                    md:w-2/3 md:h-9/10 md:top-1/30 md:left-1/6
                    w-7/8 h-4/5 top-1/8 left-1/16
                    border-t-neutral-100 border-t-3 bg-neutral-300
                    border-l-neutral-100 border-l-3
                    border-r-neutral-700 border-r-3
                    border-b-neutral-700 border-b-3
                    ${mouseDown.current ? "" : "transition-all duration-200 ease-in-out"}`}
            onMouseDown={updateZIndex}
            hidden={deleted}
        >
            <div className="flex flex-col h-full">
                <div 
                    className="flex bg-blue-400 justify-between mb-1"
                    onDragStart={dragStartHandler}
                    onMouseDown={mouseDownHandler}
                    onTouchStart={touchStartHandler}
                >
                    <img className="h-8 p-1" src={title}></img>
                    <div>
                        <div className="h-8 flex ml-auto mr-1 gap-1">
                            <ImgButton height={6} pad={0} onclick={minimize} src={minGif} />
                            {/* <ImgButton height={6} pad={0} onclick={maximize} src={maxGif} /> */}
                            <ImgButton height={6} pad={0} onclick={close} src={xGif} />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

type DesktopIconProps = {
    icon: string,
    label: string,
    ondblclick: () => void
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, ondblclick }) => {
    return (
        <div className="w-20 m-4 border-1 border-blue-300 hover:border-blue-500 hover:bg-blue-400 active:bg-blue-500"
            onDoubleClick={ondblclick}
            onTouchEnd={ondblclick}
        >
            <img className="mx-auto w-12" src={icon} />
            <div className="text-center">{label}</div>
        </div>
    )
}

const FileExplorer: React.FC = () => {
    return (
        <div className="flex overflow-hidden gap-2 border border-gray-400 shadow-lg p-1 bg-gray-100">
            <div className="flex-none md:w-48 w-24 border border-white border-b-gray-400 border-r-gray-400 bg-white p-1 md:text-sm text-xs">
                <div className={`flex items-center cursor-default py-0.5`}>
                    <span className="w-2"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">/</span>
                </div>
                <div className={`flex items-center cursor-default py-0.5`}>
                    <span className="md:w-6 w-3"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">Program Data</span>
                </div>
                <div className={`flex items-center cursor-default py-0.5`}>
                    <span className="md:w-6 w-3"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">Program Files</span>
                </div>
                <div className={`flex items-center cursor-default py-0.5`}>
                    <span className="md:w-6 w-3"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">Temp</span>
                </div>
                <div className={`flex items-center cursor-default py-0.5`}>
                    <span className="md:w-6 w-3"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">Users</span>
                </div>
                <div className={`flex items-center cursor-default py-0.5`}>
                    <span className="md:w-10 w-4"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">eyangch</span>
                </div>
                <div className={`flex items-center cursor-default py-0.5 bg-neutral-300`}>
                    <span className="md:w-14 w-5"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">Projects</span>
                </div>
                <div className={`flex items-center cursor-default py-0.5`}>
                    <span className="md:w-6 w-3"></span> 
                    <span className="mr-1"><img className="h-4" src={folderGif} /></span>
                    <span className="truncate">Windows</span>
                </div>
            </div>

            <div className="max-h-full overflow-scroll flex-grow border border-white border-b-gray-400 border-r-gray-400 bg-white p-3">
                <p className="font-bold text-5xl">Projects</p>
                <hr className="my-2 border-t border-gray-200" />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="p-4 bg-neutral-300">
                        <img className="md:w-1/4 w-1/2 mb-2 border-1" src={hallucinateImg} />
                        <p className="font-bold underline text-lg"><a href="https://github.com/eyangch/hallucinate/">Hallucinate</a></p>
                        <p>Simulating the video game QWOP in realtime on the browser using neural networks. Uses an autoencoder to compress gamestates and an LSTM to predict future states. Noise is added during training to improve stability. Play the game <a className="underline" href="https://eyangch.github.io/hallucinate/">here</a>!</p>
                    </div>
                    <div className="p-4 bg-neutral-300">
                        <img className="md:w-1/4 w-1/2 mb-2 border-1" src={discordImg} />
                        <p className="font-bold underline text-lg"><a href="https://github.com/eyangch/discord-graph/">Discord Graph</a></p>
                        <p>Creates a graph visualization of your friends' connections to each other on Discord. Try it out <a className="underline" href="https://eyangch.github.io/discord-graph/">here</a>!</p>
                    </div>
                    <div className="p-4 bg-neutral-300">
                        <img className="md:w-1/4 w-1/2 mb-2 border-1" src={dlImg} />
                        <p className="font-bold underline text-lg"><a href="http://mc.eyangch.me/static/dl/index.html">Noise Resistant Adversarial Images in VLMs</a></p>
                        <p>Final project for 6.7960 (Deep Learning) at MIT. Some interesting things about training adversarial images to be noise resistant.</p>
                    </div>
                    <div className="p-4 bg-neutral-300">
                        <img className="md:w-1/4 w-1/2 mb-2 border-1" src={bfImg} />
                        <p className="font-bold underline text-lg"><a href="https://ide.usaco.guide/O6lu6OYDARRsCkPGwjJ">Fast BF Interpreter</a></p>
                        <p>First place for the HackMIT 2024 BF Interpreter <a className="underline" href="https://dayof.hackmit.org/challenges">Sponsor Challenge</a>, winning $1000 for the fastest BF interpreter.</p>
                    </div>
                    <div className="p-4 bg-neutral-300">
                        <img className="md:w-1/4 w-1/2 mb-2 border-1" src={noTrustImg} />
                        <p className="font-bold underline text-lg"><a href="https://github.com/eyangch/no-trust/">No Trust</a></p>
                        <p>Creates a layer of authentication over any service using TCP connections by proxying connections using Python aiohttp and asyncio. Complete with a web interface and user system.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Desktop: React.FC = () => {
    const windowIndex = useRef(0);

    const deleteIdFn = (id: number) => {
        return () => {
            setWindows(pWindows => pWindows.map((window, _) => {
                if(window.id == id){
                    return { ...window, deleted: true };
                }
                return window;
            }));
        }
    }

    const toggleIdFn = (id: number) => {
        return () => {
            setWindows(pWindows => pWindows.map((window, _) => {
                if(window.id == id){
                    return { ...window, minimized: !window.minimized };
                }
                return window;
            }));
        }
    }

    const setIdZidxFn = (id: number) => {
        return (zidx: number) => {
            setWindows(pWindows => pWindows.map((window, _) => {
                if(window.id == id){
                    return { ...window, zidx: zidx };
                }
                return window;
            }));
        }
    }

    const emptyBrowserWindow = () => {
        return {
            element: "browser",
            img: browserIconGif,
            title: homepageGif,
            minimized: false,
            deleted: false,
            toggle: toggleIdFn(windowIndex.current),
            id: windowIndex.current++,
            zidx: Date.now() - loadTime,
            url: ""
        }
    }

    const emptyFileExplorerWindow = () => {
        return {
            element: "fileExplorer",
            img: folderGif,
            title: folderProjectsGif,
            minimized: false,
            deleted: false,
            toggle: toggleIdFn(windowIndex.current),
            id: windowIndex.current++,
            zidx: Date.now() - loadTime,
            url: "#projects"
        }
    }

    const [windows, setWindows] = useState<Window[]>([
        window.location.hash == "#projects" ? emptyFileExplorerWindow() : emptyBrowserWindow()
    ]);

    const newBrowser = () => {
        return () => {
            setWindows(
                [
                    ...windows,
                    emptyBrowserWindow()
                ]
            )
        }
    }

    const newFileExplorer = () => {
        return () => {
            setWindows(
                [
                    ...windows,
                   emptyFileExplorerWindow()
                ]
            )
        }
    }

    useEffect(() => {
        let topWindow = null;
        for(let window of windows){
            if(!window.minimized && !window.deleted){
                if(topWindow == null) topWindow = window;
                else{
                    if(topWindow.zidx < window.zidx){
                        topWindow = window;
                    }
                }
            }
        }
        if(topWindow == null){
            window.location.hash = '';
        }else{
            window.location.hash = topWindow.url!;
        }
    }, [windows]);

	return (
		<div className="font-[w95fa] flex flex-col h-dvh bg-blue-300 overflow-hidden">
            <div className="w-full overflow-hidden flex-grow">
                <div className="absolute top-0 w-full h-full overflow-hidden">
                    <div className="flex md:flex-col">
                        <DesktopIcon icon={browserIconGif} label="Homepage" ondblclick={newBrowser()}></DesktopIcon>
                        <DesktopIcon icon={folderGif} label="Projects" ondblclick={newFileExplorer()}></DesktopIcon>
                    </div>
                    {
                        ...windows.map((window, _) => (
                            <Browser 
                                id={window.id}
                                minimize={window.toggle}
                                maximize={() => {console.log("MAX")}}
                                close={deleteIdFn(window.id)}
                                minimized={window.minimized}
                                deleted={window.deleted}
                                title={window.title}
                                setzidx={setIdZidxFn(window.id)}
                                url={window.url!}
                            >
                                {
                                    (() => {
                                        if(window.element == "browser"){
                                            return <>
                                                <div className="flex">
                                                    <div className="my-auto mr-2">
                                                        Address:
                                                    </div>
                                                    <div className="px-1 mb-1 grow
                                                            border-t-neutral-700 border-t-3 bg-neutral-300
                                                            border-l-neutral-700 border-l-3
                                                            border-r-neutral-100 border-r-3
                                                            border-b-neutral-100 border-b-3">
                                                        <div className="my-auto">https://eyangch.me{window.url}</div>
                                                    </div>
                                                </div>
                                                <div className="bg-white grow overflow-scroll">
                                                    {/* <iframe ref={iframeRef} onLoad={iframeLoadHandler} className="w-full h-full" src="/"></iframe> */}
                                                    <Home />
                                                </div>
                                            </>
                                        }
                                        if(window.element == "fileExplorer"){
                                            return <>
                                                <FileExplorer />
                                            </>
                                        }
                                        return "null"
                                    })()
                                }
                                </Browser>
                        ))
                    }
                </div>
            </div>
			<StartBar items={windows.filter((window, _) => !window.deleted)} />
		</div>
	);
};

export default Desktop;