
import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { caller } from "@/trpc/server";
import { text } from "stream/consumers";

const Page = async () => {
  const session = await auth.api.getSession(
    {
      headers: await headers(),

    }
  );

  if(!session) {
    redirect("/sign-in");
  }

 
  return <HomeView />;
}
export default Page;