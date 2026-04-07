import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default async function Home() {

  const session = await authClient.getSession();
  console.log(session)

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>My Button</Button>
    </div>
  );
}
