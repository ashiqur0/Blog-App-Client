'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: formSchema
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User logged in successfully", { id: toastId });

      } catch (error) {
        toast.error("User login failed", { id: toastId });
      }
    }
  });

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000"
    });
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your information below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          <FieldGroup>
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )
                  }
                </Field>
              )
            }} />

            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )
                  }
                </Field>
              )
            }} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" form="login-form" className="w-full">Login</Button>

        <Button onClick={() => handleGoogleLogin()} variant="outline" type="button" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
