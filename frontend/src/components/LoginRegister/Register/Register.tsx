import useLoginRegister from "../../../hooks/useContextHooks/useLoginRegister";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerFormSchema } from "../../../zodSchemas/registerFormSchema/registerFormSchema";

export type RegisterFormData = {
  username: string;
  password: string;
  conpassword: string;
};

const Register = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConPass, setShowConPass] = useState<boolean>(false);
  const { handleRegister } = useLoginRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <section className="reg">
      <h2 className="reg__heading">Register</h2>
      <form onSubmit={handleSubmit(handleRegister)} className="form">
        <div className="form__inputcont">
          <input
            {...register("username")}
            placeholder="Enter username..."
            type="text"
            name="username"
            id="username"
            className={errors.username ? "input_type_error" : ""}
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
            className={errors.password ? "input_type_error" : ""}
          />
          {errors.password && (
            <span className="form__error">{errors.password.message}</span>
          )}
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="form__toggle"
          >
            {showPass ? "hide" : "show"}
          </button>
        </div>
        <div className="form__inputcont">
          <input
            {...register("conpassword")}
            placeholder="Confirm password..."
            name="conpassword"
            id="conpassword"
            type={showConPass ? "text" : "password"}
            className={errors.conpassword ? "input_type_error" : ""}
          />
          {errors.conpassword && (
            <span className="form__error">{errors.conpassword.message}</span>
          )}
          <button
            type="button"
            onClick={() => setShowConPass((prev) => !prev)}
            className="form__toggle"
          >
            {showConPass ? "hide" : "show"}
          </button>
        </div>
        <button
          disabled={
            errors.username || errors.password || errors.conpassword
              ? true
              : false
          }
          type="submit"
        >
          Register
        </button>
      </form>
      <Link className="loginreg__redirect" to="/">
        Login if you have an account
      </Link>
    </section>
  );
};

export default Register;
