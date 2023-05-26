import useLoginRegister from "../../../hooks/useContextHooks/useLoginRegister";
import { Link } from "react-router-dom";
import { useState } from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginFormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { handleLogin } = useLoginRegister();

  const registerFormSchema: ZodType<LoginFormData> = z.object({
    username: z
      .string()
      .trim()
      .min(2, { message: "Username must be at least 2 characters long" })
      .regex(/^[A-Za-z0-9]+$/, {
        message: "Username can contain only letters and numbers",
      })
      .max(8, {
        message: "Username must not be longer than 8 characters",
      }),
    password: z
      .string()
      .trim()
      .min(6, {
        message: "Password must contain at least 6 characters",
      })
      .max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(registerFormSchema),
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
        <button
          disabled={errors.password || errors.username ? true : false}
          type="submit"
        >
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
