import { useState } from "react";
import { handleRegister } from "../../axios/axios";

const LoginRegister = () => {
  const [loginName, setLoginName] = useState<string>("")
  const [loginPass, setLoginPass] = useState<string>("")

  const [regName, setRegName] = useState<string>("")
  const [regPass, setRegPass] = useState<string>("")

  return (
    <div className="loginreg">
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
          <button onClick={() => handleRegister(regName, regPass, setRegName, setRegPass)}>Register</button>
        </form>
      </section>

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
          <button>Login</button>
        </form>
      </section>
    </div>
  );
};

export default LoginRegister;
