import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div style={{display: "grid", gap: "10px", padding: "pl-7"}}>
            <div className="flex justify-left items-center p-6">
                <body className="grid grid-cols-2"> Username:</body>
                <input type="text" placeholder="username"/>
            </div>
            <div className="flex justify-left items-center p-6">
                <body className="grid grid-cols-2"> Password:</body>
                <input type="text" placeholder="password"/>
            </div>

            <Link to={'/home'} className="pl-6"> Login</Link>
        </div>
    );
}