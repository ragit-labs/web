import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

interface LoginInputs {
  email: string;
  password: string;
}

const discord_login_uri =
  "https://discord.com/oauth2/authorize?client_id=1247251128249225348&permissions=362924853312&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Fverify&integration_type=0&scope=identify+guilds+bot";

export const LoginScreen = () => {
  const { loginAction } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  console.log(watch("email"));
  console.log(errors);

  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  const loginHandler = (data: LoginInputs) => {
    loginAction(data.email, data.password).then((response) =>
      console.log(response),
    );
  };

  return (
    <Card className="mx-auto max-w-sm">
      {/* <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        {/* <form className="grid gap-4" onSubmit={handleSubmit(loginHandler)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="bruce@wayne.tech"
              required
              {...register("email")}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              {...register("password")}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div> */}
        <Link to={`${discord_login_uri}`}>
          <Button>Login With Discord</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default LoginScreen;
