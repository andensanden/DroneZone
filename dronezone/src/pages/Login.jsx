
import { Header } from "@/componets/header";
import { LoginInfo } from "@/componets/loginInfo";
import { Footer } from "@/componets/footer";


export function Login() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <LoginInfo/>
      <Footer />
  
    </div>
  )
}