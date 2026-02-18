import React from "react";
import style from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";

export default function RegisterPage(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const {data, error, loading, refetch} = useFetch(
        "http://localhost:3000/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        },
        false
    );
    const onSubmit = (formData) => {
        refetch(JSON.stringify(formData));
    }
    return (
        <div className={style.wrapper}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id="login"
                    {...register("login", {
                        required: true,
                        minLength: {
                            value: 3,
                            message: "Login must be at least 3 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "Login must be at most 20 characters",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Login must be only letters and numbers",
                        },
                    })}
                />
                <span></span>
                <br />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                <span></span>
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "Password must be at most 20 characters",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message:
                                "Password must be only letters and numbers",
                        },
                    })}
                />
                <span></span>
                <br />
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value) => {
                            if (value !== watch("password")) {
                                return "Passwords do not match";
                            }
                        },
                    })}
                />
                <span>{errors.login?.message}</span>
                <span>{errors.email?.message}</span>
                <span>{errors.password?.message}</span>
                <span>{errors.confirmPassword?.message}</span>
                <br />
                <button className={style.button}>Register</button>
            </form>
        </div>
    );
}
