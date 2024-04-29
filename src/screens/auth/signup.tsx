import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { fetchUser, signupUser } from "@/api/auth";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

interface SignupInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const SignupScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInputs>();
  const { user, setUser } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  const signupHandler = (data: SignupInputs) => {
    signupUser(data.firstName, data.lastName, data.email, data.password).then(
      (data) => {
        const { access_token: accessToken } = data;
        Cookies.set("accessToken", accessToken, { expires: 59 });
        if (accessToken) {
          fetchUser().then((loggedInUser) => {
            setUser(loggedInUser);
          });
        }
      },
    );
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(signupHandler)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Bruce"
                required
                {...register("firstName")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Wayne"
                required
                {...register("lastName")}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="bruce@waynetech.com"
              required
              {...register("email")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          {errors.firstName && <span>This field is required</span>}
          {errors.lastName && <span>This field is required</span>}
          {errors.email && <span>This field is required</span>}
          {errors.password && <span>This field is required</span>}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupScreen;
