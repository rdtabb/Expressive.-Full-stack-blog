import useLoginRegister from "../../../hooks/useContextHooks/useLoginRegister";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../../zodSchemas/loginFormSchema/loginFormSchema";

export type LoginFormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { handleLogin } = useLoginRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  return (
    <section className="login">
      <h2 className="login__heading">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="form">
        <div className="form__inputcont">
          <input
            {...register("username")}
            name="username"
            id="username"
            placeholder="Enter username..."
            type="text"
            className={errors.username ? "input_type_error" : "input"}
          />
          {errors.username && (
            <span className="form__error">{errors.username.message}</span>
          )}
        </div>
        <div className="form__inputcont">
          <input
            {...register("password")}
            name="password"
            id="password"
            placeholder="Enter password..."
            type={showPass ? "text" : "password"}
            className={errors.password ? "input_type_error" : "input"}
          />
          {errors.password && (
            <span className="form__error">{errors.password.message}</span>
          )}
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="form__toggle "
          >
            {showPass ? "hide" : "show"}
          </button>
        </div>
        <button disabled={!isValid || isSubmitting} type="submit">
          Login
        </button>
      </form>
      <Link className="loginreg__redirect" to="/register">
        Register, if you are new user
      </Link>
    </section>
  );
};

export default Login;
