import useLoginRegister from "../../../hooks/useContextHooks/useLoginRegister";
import { Link } from "react-router-dom";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export type RegisterFormData = {
  username: string;
  password: string;
  conpassword: string;
};

const Register = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConPass, setShowConPass] = useState<boolean>(false);
  const { handleRegister } = useLoginRegister();

  const registerFormSchema: ZodType<RegisterFormData> = z
    .object({
      username: z
        .string()
        .trim()
        .min(2, {
          message: "Username must be at least 2 characters long",
        })
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
      conpassword: z
        .string()
        .trim()
        .min(6, {
          message: "Password must contain at least 6 characters",
        })
        .max(20),
    })
    .refine((data) => data.password === data.conpassword, {
      message: "Passwords do not match",
      path: ["conpassword"],
    });

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
