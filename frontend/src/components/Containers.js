import React from 'react';

export function WhiteContainer(props){
    return (
        <div className="bg-white w-full p-12 rounded-lg drop-shadow-lg text-black">
            {props.children}
        </div>
    )
}