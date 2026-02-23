import {Link} from 'react-router';
export default function NotFound(){
    return(
        <>
        <div>
        <p>Page Not Found</p>
        <Link className="linkButton" to="/">
                Go Back Home
                </Link>
        </div>        
        </>
    )
}