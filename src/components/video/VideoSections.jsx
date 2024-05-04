/* eslint-disable react/prop-types */
import { FaPlay } from "react-icons/fa";
import { FaLink  } from "react-icons/fa6";
// eslint-disable-next-line react/prop-types
import "./videoSection.css"

const VideoSections = ({ sections, onSectionClick }) => {

  function createDescriptionWithLinks(description) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return description.split(' ').map((word, index) => {
        if (word.match(urlRegex)) {
            return <a key={index} href={word} target="_blank" rel="noopener noreferrer" className="text-[#b08aff] hover:underline">{word}</a>;
        } else {
            return word;
        }
    }).reduce((prev, current, index) => prev.concat(index > 0 ? [' ', current] : [current]), []);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  const sectionClick = (time) => {
    onSectionClick(time);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  return (
    
    <div className=" sec text-white  bg-[#1a1a1a] mt-20 py-4 ">
      {sections.map((section) => (
        <div id={section.title.replace(" ","-")} className="  flex flex-col justify-center items-start gap-4" key={section.id} onClick={() => sectionClick(section.start)}>
          {/* <img src={section.thumbnail} alt={section.title} /> */}
          
          <div className="group flex w-fit  relative items-center gap-2  mt-[1.5em] mb-[.75em]">
          <a className=" pin absolute  text-[25px] w-9 hidden group-hover:inline text-center text-[#515151] hover:text-white duration-100 " href="#">
            <FaLink />
          </a>
            <h1 className=" text-[2rem] font-[Greycliff,sans-serif] font-bold">
              {section.title} 
            </h1>
            <span className="text-xs font-medium flex justify-center items-center gap-2 hover:text-white hover:border-white border-[#8d8d8d] text-[#8d8d8d] duration-100  px-3 py-1 border-2  rounded-2xl  cursor-pointer">
              <FaPlay />
              <span>{formatTime(section.start)}</span>
            </span>
            </div>
            <p className="  md:text-[1rem] sm:text-[.85rem] lg:mb-[1.5em] md:mb-[1em] leading-[1.65em]">{createDescriptionWithLinks(section.description)}</p>
            {section?.links?.map((link) =>(
              <>
              <ul className="ul ml-2 mb-[.5em] marker:text-[#3e3e3e]">
                <li className="li   ml-4">
                  <a href={link} target="_blank" rel="noreferrer" className="text-[#b08aff] md:text-[1rem] sm:text-[.95rem] hover:underline">{link}</a>
                </li>
              </ul>
              </>
            ))}
        </div>
      ))}
    </div>
  );
};

export default VideoSections;
