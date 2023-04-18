import useLoginRegister from "../../../hooks/useLoginRegister"
import { Link } from "react-router-dom"

const Login = () => {
    const { 
        handleLogin, 
        loginName,
        setLoginName,
        loginPass,
        setLoginPass,
    } = useLoginRegister()

    return (
        <section className="login">
            <h2 className="login__heading">Login</h2>
            <form onSubmit={(e) => e.preventDefault()} className="login__form">
                <input
                    placeholder="Enter username..."
                    type="text"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                />
                <input
                    placeholder="Enter password..."
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleLogin}
                >Login</button>
            </form>
            <Link className="loginreg__redirect" to="/register">Register, if you are new user</Link>
        </section>
    )
}

export default Login
