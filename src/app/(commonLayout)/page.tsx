import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {

  const { data } = await userService.getSession();
  console.log({ data });

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>My Button</Button>
    </div>
  );
}
