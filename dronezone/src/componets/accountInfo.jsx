
export function AccountInfo(){

	return(
		<div className="bg-primary-yellow flex grow ">
            <div className="flex grow-0 p-10 w-full">
				<div className="flex flex-col">
            	    <h2 className="text-3xl font-bold my-4">My Account</h2>
					<input
					placeholder="User Eliza"
					></input>
					<input
					placeholder="eliza@email.com"
					></input>
					<input
					placeholder="0701234566"
					></input>
				</div>
                <div className="ml-50 flex flex-col">
					<h2 className="text-3xl font-bold my-4 ">Devices</h2>
				</div>
                <div className="ml-50 flex flex-col">
					<h2 className="text-3xl font-bold my-4">Drone Licence</h2>
				</div>
            </div>
        </div>
	)
}