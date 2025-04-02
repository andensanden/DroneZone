import { Header } from "@/componets/header"
import {Footer} from "@/componets/footer"
import { AccountInfo } from "../componets/accountInfo"

export function Account(){

	return(
		<div>
			<Header></Header>
			<AccountInfo></AccountInfo>
			<Footer></Footer>
		</div>
	)
}