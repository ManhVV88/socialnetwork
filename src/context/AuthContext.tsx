import { createContext, ReactNode, useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
    token: string | null;
    setToken: (token: string) => void;
    role:string | null;
    setRole: (token: string) => void;
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => { },
    token: "",
    setToken: () => { },
    role : "",
    setRole: () => { },
}

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") === 'true' ? true : false);
    const [token, setToken] = useState<string | null>( localStorage.getItem("token"));
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
    useEffect(() => {
        const fetchData =async () => {
        const storedAuth = localStorage.getItem("authenticated");
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        if (storedAuth) {
            setAuthenticated(JSON.parse(storedAuth));
        }

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedRole) {
            setRole(storedRole);
        }
        }
        fetchData();
    }, []);


    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode.jwtDecode(token) as { exp: number };
            const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds            
            if (Date.now() >= expirationTime) {
                // Token has expired
                console.log("expired");
                setAuthenticated(false);
                localStorage.removeItem("authenticated");
                localStorage.removeItem("token");
                localStorage.removeItem("role");
            }
        }
    }, [token]);

    const updateAuthenticated = (newState: boolean) => {
        setAuthenticated(newState);
        localStorage.setItem("authenticated", JSON.stringify(newState));
    };

    const updateToken = (newToken: string) => {
        setToken(newToken);
        
        localStorage.setItem("token", newToken);
    };

    const updateRole = (newRole: string) => {
        setRole(newRole);
        localStorage.setItem("role", newRole);
    };
    return (
        
        <AuthContext.Provider value={{ authenticated, setAuthenticated: updateAuthenticated,token, setToken: updateToken, role , setRole : updateRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }