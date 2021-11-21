import React, { useEffect, useRef, useState} from 'react';
import './interface.css';


const Interface = props => {

    const canvasRef = useRef(null);
    const actionType = props.actionType;
    const setActionType = props.setActionType;
    const setPattern = props.setPattern;
    const pattern = props.pattern;
    const color = props.color;
    const setStyle = props.setStyle;
    const lineWidth = props.lineWidth;
    const setLineWidth = props.setLineWidth;
    const beginPoint = props.beginPoint;
    const endPoint = props.endPoint;
    const hollow = props.hollow;
    const setHollow = props.setHollow;
    const clear = props.clear;

    const [previewCleared, setPreviewCleared] = useState(false);
    const [startedPreview, setStartedPreview] = useState(false);


    

    useEffect(()=>{
        const preview = canvasRef.current;
        const context = preview.getContext('2d');
        context.beginPath();
        context.rect(0, 0, context.canvas.width, context.canvas.height);
        context.stroke();
        //if(!startedPreview) setStartedPreview(!startedPreview);
    }, [previewCleared]);

    useEffect(()=>{

        const clearPreview = (context) => {
            context.clearRect(0,0,context.canvas.width-1, context.canvas.height-1);
            return setPreviewCleared(!previewCleared);
        }

        const previewPane = () => {
        //should just be transformed copy of whatever is happening in Canvas, in between clicks.

            if(beginPoint!==null){
                const x = Math.round(beginPoint.x/10) ;
                const y = Math.round(beginPoint.y/10);
                const preview = canvasRef.current;
                const context = preview.getContext('2d');
                clearPreview(context);

                //move \/ behind conditional if newer shapes interfere
                context.fillRect(x, y, 1, 1);

                if(endPoint!==null) {
                    endPoint.x = Math.round(endPoint.x/10);
                    endPoint.y = Math.round(endPoint.y/10);
                }

                if(actionType==="rectangle") {
                
                        
                        //context.save();
                    if (endPoint!==null) {
                        
                        //context.restore();
                        //for leftward rects
                        if(!hollow) context.fillRect(x, y, endPoint.x-x, endPoint.y-y);
                        else {
                            context.beginPath();
                            context.rect(x, y, endPoint.x-x, endPoint.y-y);
                            context.stroke();

                        }
                    }

                }else if (actionType==='line') {

                    if(endPoint!==null){

                        context.beginPath();
                        context.moveTo(x,y);
                        context.lineTo(endPoint.x,endPoint.y);
                        context.stroke();
                    }

                }
            } else {
                const preview = canvasRef.current;
                const context = preview.getContext('2d');
                clearPreview(context);
            }     
        }
        /*startedPreview && */previewPane();
    }, [beginPoint, endPoint]);    





    function changeColor (e) {
        return setStyle(e.target.value);
    }
    function changeLineWidth (e) {

        console.log("changing line width to " + e.target.value);
        return setLineWidth(e.target.value);

    }



    const PatternToggle = () => {

        if(pattern==='solid') {
            return (
                <button onClick={()=>setPattern('broken')}>Solid</button>
            );
        } else if (pattern==='broken') {
            return (
                <button onClick={()=>setPattern('solid')}>Broken</button>
            );
        }

    }

    const ColorSelect = () => {

        return (
            <label style={{backgroundColor: color, color: color}}>
                Color
                <select value={color} onChange={changeColor}>
                    <option value="#000000" style={{color:'black'}}>Black</option>
                    <option value="#00FFFF" style={{color:'aqua'}}>Aqua</option>                    
                    <option value="#0000FF" style={{color:'blue'}}>Blue</option>
                    <option value="#FF00FF" style={{color:'fuchsia'}}>Fuchsia</option>
                    <option value="#808080" style={{color:'gray'}}>Gray</option>
                    <option value="#008000" style={{color:'green'}}>Green</option>
                    <option value="#00FF00" style={{color:'lime'}}>Lime</option>
                    <option value="#800000" style={{color:'maroon'}}>Maroon</option>
                    <option value="#000080" style={{color:'navy'}}>Navy</option>
                    <option value="#808000" style={{color:'olive'}}>Olive</option>
                    <option value="#800080" style={{color:'purple'}}>Purple</option>
                    <option value="#FF0000" style={{color:'red'}}>Red</option>
                    <option value="#C0C0C0" style={{color:'silver'}}>Silver</option>
                    <option value="#008080" style={{color:'teal'}}>Teal</option>
                    <option value="#FFFFFF" className='shadowed'>White</option>
                    <option value="#FFFF00" style={{color:'yellow'}}>Yellow</option>

                </select>
            </label>

        );

    }

    const LineWidthSelect = () => {

        return <input type="range" max="10.0" min="0.01" step="0.01" value={lineWidth} onInput={changeLineWidth}></input>

    }

    const HollowButton = () => {

        return <button onClick={setHollow}>{hollow ? "Hollow" : "Filled"}</button>

    }

    const Preview = () => {

        return (
            <>
                
                <canvas ref={canvasRef} width="64" height="38"></canvas>
            </>

        );

    }

    return (
       

        <div className="flex-container">
            <Preview />
            <button onClick={()=>setActionType('point')}>Point</button>
            <button onClick={()=>setActionType('line')}>Line</button>
            <button onClick={()=>setActionType('freedraw')}>Free Draw</button>
            <button onClick={()=>setActionType('rectangle')}>Rectangle</button>
            <button onClick={clear}>Clear All</button>
            <HollowButton />
            <PatternToggle />
            <ColorSelect />
            <LineWidthSelect />

        </div>
            
            
            
        
    );



}



export default Interface;




