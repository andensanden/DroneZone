import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SignUpForm } from "@/components/signUpForm";

export function CreateAccount() {
  return (
    <div>
      <Header></Header>
      <SignUpForm />
      <Footer></Footer>
    </div>
  );
}
