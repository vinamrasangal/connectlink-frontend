import React, { useEffect, useState } from 'react';

const Logo = ({styles}) => {
    const [dimensions,setDimensions] = useState({width:0,height:0,FS:0});
    const logoStyles = {
        backgroundColor:styles.BG || 'transparent',
        width:`${dimensions.width}px`,
        height:`${dimensions.height}px`,
        position:'relative'
    }
    const circle1 = {
        height:`${dimensions.height * 0.75}px`,
        width:`${dimensions.height * 0.75}px`,
        backgroundColor:'#B6BCC4',
        borderRadius:'50%',
        position:'absolute',
        left:'0px',
        top:'0px'
    }
    const circle2 = {
        height:`${dimensions.height * 0.75}px`,
        width:`${dimensions.height * 0.75}px`,
        backgroundColor:'#004AAD',
        borderRadius:'50%',
        position:'absolute',
        left:'0px',
        bottom:'0px'
    }
    const p = {
        position:'absolute',
        right:'0px',
        top:'50%',
        transform:'translateY(-50%)'
    }
    const span1 = {
        fontFamily: 'Poppins',
        fontSize: `${dimensions.FS}px`,
        fontWeight: '700',
        letterSpacing: '-0.01em',
        color:'#000000',
    }
    const span2 = {
        fontFamily: 'Poppins',
        fontSize: `${dimensions.FS}px`,
        fontWeight: '400',
        letterSpacing: '-0.01em',
        color:'#B6BCC4',
    }
    function dimensionsSetter(){
        let winWidth = window.innerWidth;
        if(winWidth >= 1200){
            setDimensions(styles.l);
        }else if(winWidth < 1200 && winWidth >= 768){
            setDimensions(styles.m);
        }else {
            setDimensions(styles.s);
        }
    }

    useEffect(()=>{
        dimensionsSetter();
        window.addEventListener('resize',() => dimensionsSetter());
        return () => window.removeEventListener('reset',()=>dimensionsSetter());
    },[])
    return (
        <div style={logoStyles}>
            <div style={circle1}></div>
            <div style={circle2}></div>
            <p style={p}>
                <span style={span1}>Connect </span>
                <span style={span2}>link</span>
            </p>
        </div>
    )
}

export default Logo