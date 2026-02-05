import { getCurrent } from "@/features/auth/queries";
import { SignIncard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";
const SignIn = async ()=>{
  const user = await getCurrent()
  //console.log(user)
  if(user)
  {
    redirect("/")
  }
  return (
    <div>
        <SignIncard/>
    </div>

  );
}

export default SignIn;