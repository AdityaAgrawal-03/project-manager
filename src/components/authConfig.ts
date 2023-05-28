export const SIGNUP = "signup";
export const SIGNIN = "signin";

export const authConfig = {
  [SIGNUP]: {
    linkUrl: "/signin",
    linkText: "Already have an account?",
    header: "Create a new Account",
    subheader: "Just a few things to get started",
    buttonText: "Register",
  },
  [SIGNIN]: {
    linkUrl: "/signup",
    linkText: "Don't have an account?",
    header: "Welcome Back",
    subheader: "Enter your credentials to access your account",
    buttonText: "Sign In",
  },
};
