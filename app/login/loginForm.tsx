"use client";

import { useState, useCallback } from "react";
import { LoginRequest } from "../types/auth/loginRequest";
import { loginUser } from "../services/authService";
import { useRouter } from "next/navigation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {

    const router = useRouter();

    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const validateForm = (): string | null => {
        if (!EMAIL_REGEX.test(formData.email)) {
            return "Invalid email format";
        }

        if (formData.password.length < 8) {
            return "Password must be at least 8 characters";
        }

        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return; 

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await loginUser(formData);
            router.push("/realm");
            alert("✅ Logged in successfully!");
        } catch (err: any) {
            setError(err?.message ?? "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-80 bg-slate-900/90 border-4 border-slate-700 p-6 shadow-2xl flex flex-col gap-4"
        >
            <h2 className="text-amber-500 font-bold text-center uppercase tracking-widest border-b border-slate-700 pb-2">
                Enter the Realm
            </h2>

            {error && (
                <div className="bg-red-900/20 border border-red-500 text-red-500 text-[11px] p-2 text-center uppercase">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 uppercase ml-1">
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-black/40 border-2 border-slate-600 p-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 uppercase ml-1">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-black/40 border-2 border-slate-600 p-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    disabled={isLoading}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`mt-2 font-bold py-2 px-4 border-b-4 uppercase text-sm transition-all
                    ${
                        isLoading
                            ? "bg-slate-700 border-slate-900 text-slate-500 cursor-not-allowed"
                            : "bg-amber-700 hover:bg-amber-600 text-white border-amber-900 hover:border-amber-700 active:translate-y-0.5 active:border-b-0"
                    }`}
            >
                {isLoading ? "Consulting Archives..." : "Log In"}
            </button>
        </form>
    );
};

export default LoginForm;