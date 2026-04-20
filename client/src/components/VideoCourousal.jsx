import React, { useEffect } from 'react'
import { useRef , useState } from 'react';
import { hightlightsSlides } from '../lib/utils.js'
import { useGSAP } from '@gsap/react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { pauseImg, playImg, replayImg } from '../lib/utils.js';
gsap.registerPlugin(ScrollTrigger);
const  VideoCourousal = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video , setVideo ] = useState({
        isEnd : false,
        startPlay : false,
        videoId : 0,
        isLastVideo : false ,
        isPlaying : false
    });

    const [loadedData , setLoadedData] = useState([]);
    const {isEnd , startPlay , videoId , isLastVideo , isPlaying} = video;

    useGSAP(() => {

        gsap.to('#slider' , {
            transform : `translateX(${-100 * videoId}%)`,
            duration  :2
        })
        gsap.to('#video' , {
            scrollTrigger : {
                trigger : '#video',
                toggleActions: 'restart none none none'
            },

            onComplete : () => {
                setVideo((prev) => ({...prev , startPlay : true , isPlaying : true}))
            }
        })
    },[isEnd , videoId])

    useEffect(() => {
        if(loadedData.length > 3) {
            if(!isPlaying) {
                videoRef.current[videoId].pause();
            }else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[startPlay , videoId , isPlaying , loadedData]);

    const handleLoadedMetaData = (i , e) => {
        setLoadedData((prev) => [...prev ,e])
    }

    useEffect(() => {
        let anim;
        let animUpdate;
    
        if (videoSpanRef.current[videoId]) {
            anim = gsap.to(videoSpanRef.current[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    gsap.to(videoDivRef.current[videoId], {
                        width: window.innerWidth < 760 ? '10vw' : '4vw'
                    });
                    gsap.to(videoSpanRef.current[videoId], {
                        width: `${progress}%`,
                        backgroundColor: 'white',
                    });
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], { width: '12px' });
                        gsap.to(videoSpanRef.current[videoId], { backgroundColor: '#afafaf' });
                    }
                }
            });
    
            animUpdate = () => {    
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
            };
    
            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    
        return () => {
            if (animUpdate) gsap.ticker.remove(animUpdate);
        };
    }, [videoId, isPlaying, startPlay]);
    

    const handleProcess = (type , i) => {
        switch(type) {
            case 'video-end' : 
                setVideo((prevVideo) => ({...prevVideo, isEnd : true , videoId : i + 1}));
                break;
            case 'video-last' : 
                setVideo((prevVideo) => ({...prevVideo , isLastVideo : true}));
                break;
            case 'video-reset' : 
                setVideo((prevVideo) => ({...prevVideo, isLastVideo : false , videoId : 0}) );
                break;
            case 'play' :
                setVideo((prev) => ({...prev , isPlaying : !prev.isPlaying}));
                break;
            case 'pause':
                setVideo((prev) => ({...prev, isPlaying: false}));
                break;
            
        }
    }

  return (
    <>
        <div className='flex items-center '>
            {hightlightsSlides.map((list , index) => (
                <div key={list.id} id='slider' className='sm:pr-12 pr-10 '>
                    <div className=" video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video id='video'
                                 ref={(el) => (videoRef.current[index] = el)} 
                                 onEnded={() => {
                                    index !== 3
                                        ? handleProcess('video-end' , index)
                                        : handleProcess('video-last') 
                                 }}
                                 onPlay={() => setVideo((prevVideo) => ({
                                    ...prevVideo, isPlaying  : true
                                 }))}
                                 className={`
                                    ${ list.id === 2 && 'translate-x-44'}
                                    pointer-events-none
                                 `}
                                 onLoadedMetadata={(e) => handleLoadedMetaData(index,e)}
                                 preload='auto'  
                                 playsInline={true} 
                                 muted>
                                <source src={list.video} type='video/mp4' />
                            </video>
                        </div>

                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text) => (
                                <p key={text} className='font-medium text-white md:text-2xl text-xl'>
                                    {text}
                                </p>
                            ))} 
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="realtive flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-blue-600 rounded-full backdrop-blur">
                {videoRef.current.map((_ , i) => (
                    <span className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer' 
                        key={i} 
                        ref={(el) => (videoDivRef.current[i] = el)}>
                        <span className='absolute h-full w-full rounded-full ' ref={(el) => (videoSpanRef.current[i] = el)} />
                    </span>
                ))}
            </div>
            <button className="control-btn bg-black">
                <img src={
                    isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg
                } alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                    onClick={ isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')}
                />
            </button>
        </div>

    </>
  )
}

export default VideoCourousal