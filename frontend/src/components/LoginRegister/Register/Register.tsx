import useLoginRegister from "../../../hooks/useContextHooks/useLoginRegister"
import { Link } from "react-router-dom"

const Register = () => {
    const { 
        handleRegister,
        regName,
        setRegName,
        regPass,
        setRegPass
    } = useLoginRegister()

    return (
        <section className="reg">
            <h2 className="reg__heading">Register</h2>
            <form onSubmit={(e) => e.preventDefault()} className="reg__form">
                <input
                    placeholder="Enter username..."
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                />
                <input
                    placeholder="Enter password..."
                    type="text"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleRegister}
                >Register</button>
            </form>
            <Link className="loginreg__redirect" to="/">Login if you have an account</Link>
        </section>
    )
}

export default Register
