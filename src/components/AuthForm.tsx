"use client";
import { useRouter } from "next/navigation";
import { signin, signup } from "src/lib/api";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { useCallback, useState } from "react";
import { authConfig, SIGNIN, SIGNUP } from "./authConfig";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

export default function AuthForm({ mode }) {
  const [formData, setFormData] = useState({ ...initialState });
  const authContent = mode === SIGNUP ? authConfig[SIGNUP] : authConfig[SIGNIN];
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === SIGNUP) {
        await signup(formData);
      } else {
        await signin(formData);
      }

      router.replace("/home");
    } catch (error) {
      console.error("something went wrong");
    } finally {
      setFormData({ ...initialState });
    }
  };

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{authContent.header}</h2>
          <p className="tex-lg text-black/25">{authContent.subheader}</p>
        </div>
        <form onSubmit={handleSubmit}>
          {mode === SIGNUP && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  required
                  placeholder="first name"
                  value={formData.firstName}
                  type="text"
                  onChange={(e) =>
                    setFormData((formData) => ({
                      ...formData,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  type="text"
                  placeholder="last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((formData) => ({
                      ...formData,
                      lastName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formData.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formData.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={authContent.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {authContent.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {authContent.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
