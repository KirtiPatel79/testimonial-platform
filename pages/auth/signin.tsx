import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {providers ? (
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="mb-4">
            <button
              onClick={() => signIn(provider.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))
      ) : (
        <div>
          <button
            onClick={() => signIn("guest")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign in as Guest
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
