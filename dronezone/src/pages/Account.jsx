import { Header } from "@/components/header"
import {Footer} from "@/components/footer"
import { AccountInfo } from "@/components/accountInfo"

export function Account(){

	return(
		<div>
			<Header></Header>
			<AccountInfo></AccountInfo>
			<Footer></Footer>
		</div>
	)
}