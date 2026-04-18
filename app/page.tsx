import { redirect } from "next/navigation";

export default function Home() {
  const isLoggedIn = true; // ambil dari cookie / session

  if (isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
