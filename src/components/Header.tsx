import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderLinkProps {
    link: string;
    text: string;
    transition: boolean;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({ link, text, transition }) => {
    const navigate = useNavigate();
  
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                navigate(link);
            });
        } else {
            navigate(link);
        }
    };

    const isCurrentLink: boolean = (window.location.href.split("/").pop() == link);
    const doTransition: boolean = (!isCurrentLink && transition);

    return (
        <a className={`underline p-4 ${isCurrentLink ? "font-bold" : "font-normal"}`} href={transition ? `/#/${link}` : link} onClick={doTransition ? handleClick : ()=>{}}>{text}</a>
    )
};

const Header: React.FC = () => {
	return (
        <div className="absolute w-full">
            <div className="flex ml-auto mr-auto mt-2 sm:w-xl w-sm justify-center">
                <HeaderLink link="" text="Home" transition={true} />
                <HeaderLink link="projects" text="Projects" transition={true} />
                <HeaderLink link="courses" text="Courses" transition={true} />
                <HeaderLink link="eric_yang_resume.pdf" text="Resume" transition={false} />
            </div>
        </div>
	);
};

export default Header;