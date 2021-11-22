import React, { useEffect, useRef, useState } from 'react';
import Interface from './Interface';
import './Canvas.css';
const Canvas = props => {

    const canvasRef = useRef(null);
    const [actionType, setActionType] = useState('freedraw');
    const [pattern, setPattern] = useState('solid');
    const [color, setStyle] = useState('black');
    const [beginPoint, setBeginPoint] = useState(null);
    const [Edgelines, setEdgeLines] = useState(false);
    const [drawing, isDrawing] = useState(false);
    const [drawCounter, setDrawCounter] = useState(0);
    const [lineWidth, setLineWidth] = useState(1.0);
    const [endPoint, setEndPoint] = useState(null);
    const [hollow, isHollow] = useState(false);
    const [cleared, setCleared] = useState(false);
    
   

    const setHollow = () => {
        isHollow(!hollow);
    }

    const cachedXY = {

        x:0,
        y:0

    }

    function clear() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0,0,context.canvas.width-1, context.canvas.height-1);
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.rect(0, 0, context.canvas.width, context.canvas.height);
        context.stroke();
    }, [cleared]);

    function onClick (e) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineWidth = lineWidth;
        context.fillStyle = color;
        context.strokeStyle = color;
        console.log(color);

        if(actionType==='point') {
            
            context.fillRect(e.clientX, e.clientY, 1, 1);
        }
        else if (actionType==='line') {

            if(beginPoint===null){
                setBeginPoint({x: e.clientX, y: e.clientY});
                context.fillRect(e.clientX, e.clientY, 1, 1);
                context.save();
            }
            else {
                context.restore();
                context.beginPath();
                context.moveTo(beginPoint.x,beginPoint.y);
                context.lineTo(e.clientX,e.clientY);
                context.stroke();
                setBeginPoint(null);
            }


        } else if (actionType==='rectangle') {

            //todo: add code for open rectangle...

            if(beginPoint===null){

                setBeginPoint({x: e.clientX, y: e.clientY});
                context.save();
            } else {
                context.restore();
                if(!hollow) {
                    context.fillRect(beginPoint.x, beginPoint.y, e.clientX-beginPoint.x, e.clientY-beginPoint.y);
                } else {
                    context.beginPath();
                    context.rect(beginPoint.x, beginPoint.y, e.clientX-beginPoint.x, e.clientY-beginPoint.y);
                    context.stroke();
                }
                
                
                
                setBeginPoint(null);
            }
        }

        else console.log("Somehow, an action type is not selected. This should not be possible. Panic is recommended.")
    }
    function onMouseOver (e) {
        

        if(beginPoint!==null&&actionType==='line'&&Edgelines){
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.restore();
            console.log("Should be drawing a temporary line");
            context.beginPath();
            context.moveTo(beginPoint.x,beginPoint.y);
            context.lineTo(e.clientX,e.clientY);
            context.stroke();
            
        }

    }

    function onMouseDown (e){
        
        if(actionType==='freedraw') {

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.lineWidth = lineWidth;
            context.strokeStyle = color;
            cachedXY.x = e.clientX;
            cachedXY.y = e.clientY;
            context.moveTo(e.clientX, e.clientY);
            context.beginPath();
            
            isDrawing(!drawing);

        }
    }

    function onMouseMove (e) {
        
            if(actionType==='freedraw') {

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                
                
                if(drawing&&pattern==='solid') {
                    
                    //context.moveTo(cachedXY.x, cachedXY.y);
                    //context.beginPath();
                    context.lineTo(e.clientX, e.clientY);
                    context.stroke();
                    cachedXY.x = e.clientX;
                    cachedXY.y = e.clientY;
                    
            
                } else if (drawing&&pattern==='broken'){

                context.lineTo(e.clientX, e.clientY);
                setDrawCounter(drawCounter+1);

                if(drawCounter>1) {

                    context.stroke();
                    context.moveTo(e.clientX, e.clientY);
                    context.beginPath();
                    setDrawCounter(0);

                }

            }
                

            }
            //endpoint is used by the preview pane
            if(beginPoint!==null){    
                setEndPoint({x: e.clientX, y: e.clientY});
            }

    }

    function onMouseUp (e) {

        if(actionType==='freedraw'&&drawing) {

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            //context.moveTo(cachedXY.x, cachedXY.y);
            context.lineTo(e.clientX, e.clientY);
            context.stroke();

            isDrawing(!drawing);
        }


    }

    return (

        <>
            <div className="canvasContainer">
                <canvas className="mainCanvas" ref={canvasRef} width="640" height="380" onClick={onClick} onMouseOver={onMouseOver} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}{...props}/>
            </div>
            
            <Interface beginPoint={beginPoint} endPoint={endPoint} width="64" height="38" actionType={actionType} setActionType={setActionType} setPattern={setPattern} pattern={pattern} setStyle={setStyle} color={color} lineWidth={lineWidth} setLineWidth={setLineWidth} hollow={hollow} setHollow={setHollow} clear={clear}/>
        </>

    )
}



export default Canvas;