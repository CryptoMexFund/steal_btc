import React, {useState, useEffect} from 'react';
import {Collapse} from 'react-collapse';

/**
 * A simple collapse that has a +/-, descriptor, and sub items.
 * Looks like this (collapsed):
 * + Title
 * Looks like this (expanded):
 * - Title
 *   Content
 * @param {string | component} title - Title
 * @param {component} children - Content
 */

export function TextCollapse(props){
    const [isOpened, setIsOpened] = useState(false);
    return(
        <>
            <span className="text-black text-body font-semibold" onClick={() => setIsOpened(!isOpened)}>{`${isOpened ? "-" : "+"} ${props.title}`}</span>
            <Collapse isOpened={isOpened}>
                {props.children}
            </Collapse>
        </>
    )
}

/**
 * A collapse that displays nested json.
 * If the child is a JSON object, this renders a new NestedTextCollapse.
 * Otherwise, if the child is the last node, it renders a text - child.
 * All nested text collapses are also indented by one level.
 * @param {string | component} title - Title
 * @param {object} json - JSON object
 */
export function NestedTextCollapse(props){
    const [isOpened, setIsOpened] = useState(false);
    const [children, setChildren] = useState(null);

    useEffect(() => {
        if(props.json){
            setChildren(Object.entries(props.json).map(([key, value]) => {
                if(typeof value === "object"){
                    return <NestedTextCollapse key={key} title={key} json={value}/>
                }else{
                    return <div className="pl-4"><span key={key}><span className="font-semibold text-body">{key}</span>{`: ${value}`}</span></div>
                }
            }))
        }
    }, [props.json]);

    return(
        <div className="pl-4">
            <span className="text-black text-body font-semibold" onClick={() => setIsOpened(!isOpened)}>{`${isOpened ? "-" : "+"} ${props.title}`}</span>
            <Collapse isOpened={isOpened}>
                {children}
            </Collapse>
        </div>
    )
}
    