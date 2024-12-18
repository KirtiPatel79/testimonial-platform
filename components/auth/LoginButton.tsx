import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Login
    </button>
  );
};

export default LoginButton;
