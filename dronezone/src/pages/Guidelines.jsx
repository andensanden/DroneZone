import { Header } from "@/componets/header"
import {Footer} from "@/componets/footer"
import { GuidelineInfo } from "../componets/guidelinesInfo"

export function Guidelines(){

    return (
        <div className="flex flex-col grow">
            <Header/>
            <GuidelineInfo/>
            <Footer/>
        </div>
    )
}