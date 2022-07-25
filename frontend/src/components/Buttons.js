import React, {useState} from 'react';

/**
 * The primary button
 * 
 * @param {string | Component} children: the text to display w/in the button
 * @param {function} onClick
 * @param {bool} disabled: whether or not the button is disabled
 */
 export function ButtonPrimary(props){
    return (
        <button className="flex items-center justify-center w-auto bg-blue-400 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[40px] disabled:opacity-80 disabled:cursor-default disabled:bg-blue-400 disabled:text-white disabled:border-0 hover:border-2 hover:text-indigo-600 hover:border-indigo-600 hover:bg-transparent" onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    )
}

/**
 * The red button (used for deleting)
 */
export function ButtonRed(props){
    return (
        <button className="flex items-center justify-center w-auto  min-w-[140px] bg-red-400 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[40px] disabled:opacity-80 disabled:cursor-default disabled:bg-red-400 disabled:text-white disabled:border-0 hover:border-2 hover:text-red-600 hover:border-red-600 hover:bg-transparent" onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export function ButtonGreen(props){
    return (
        <button className="flex items-center justify-center w-auto  min-w-[140px] bg-green-400 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[40px] disabled:opacity-80 disabled:cursor-default disabled:bg-green-400 disabled:text-white disabled:border-0 hover:border-2 hover:text-green-600 hover:border-green-600 hover:bg-transparent" onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    )
}

/**
 * 
 */

/**
 * A component that has a button and then displays nested JSON w/ the results of an
 * asyncronous call. Shows a loader until the call is completed.
 * @param {object} children - Text to display within the action button.
 * @param {function} onClick - Function to call when the button is clicked.
 * @param {string} description - Description of the action.
 * @param {object} loadingText - Text to display while the action is loading.
 * @param {function} renderResults - Function to render the results of the async call.
*/
export function AsyncActionButton(props){
    const [loading, setLoading] = useState(false);
    const [actionResponse, setActionResponse] = useState(null);

    async function handleClick(){
        setLoading(true);
        try{
            const resp = await props.onClick();
            if (resp.data.success){
                setActionResponse(resp.data);
            } else {
                setActionResponse({"error": resp.data.error || "An error occurred."});
            }
        } catch (err){
            
            setActionResponse({"error": err.response.data.error || "An error occurred."});
        }
        setLoading(false);
    }

    return(
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col">
                <ButtonPrimary onClick={handleClick} disabled={loading}>{!loading ? props.children : props.loadingText}</ButtonPrimary>
                <span className="text-body">{props.description}</span>
            </div>
            {actionResponse && !loading && !actionResponse['error'] && props.renderResults(actionResponse)}
            {actionResponse && !loading && actionResponse['error'] && <span className="text-red-500 text-sm">{actionResponse['error']}</span>}
        </div>
    );
}
    