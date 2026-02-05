import { SignUpcard } from "@/features/auth/components/sign-up-card";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
const SignUp = async ()=>{
  const user = await getCurrent()
    if(user)
    {
      redirect("/")
    }
  return (
    <div>
        Sign-Up
        <SignUpcard/>
    </div>

  );
}
export default SignUp;