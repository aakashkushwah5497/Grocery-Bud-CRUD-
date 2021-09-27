import React , {useEffect} from 'react'

const Alert = ({show, type , msg , removeAlert}) => {
    useEffect(() => {
       const timeout = setInterval(() => {
        removeAlert()   
       }, 3000);
       return () => clearTimeout(timeout)
    }, [])
    
    
    return (
       <p className={`alert alert-${type}`}>{msg}</p>
    )
}

export default Alert
