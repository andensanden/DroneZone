import { Header } from "@/componets/header"
import {Footer} from "@/componets/footer"
import { CreateInfo } from "@/componets/createInfo"

export function CreateAccount(){

    return(
        <div>
            <Header></Header>
            <CreateInfo></CreateInfo>
            <Footer></Footer>
        </div>
    )
}