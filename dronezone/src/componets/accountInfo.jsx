
export function AccountInfo(){

	return(
		<div className="bg-primary-yellow flex grow ">
            <div className="flex grow-0 p-10 w-full">
				<div className="flex flex-col">
            	    <h2 className="text-3xl font-bold my-4">My Account</h2>
					<input
					className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
					placeholder="User Eliza"
					// value={}

					></input>
					<input
					className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
					placeholder="eliza@email.com"
					// value={}
					></input>
					<input
					className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
					placeholder="0701234566"
					// value={}
					></input>
				</div>
                <div className="ml-50 flex flex-col">
					<h2 className="text-3xl font-bold my-4 ">Devices</h2>
					<input
					className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
					placeholder="drone 1"
					// value={}

					></input>
					<input
					className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
					placeholder="drone 2"
					// value={} 
					></input>
				</div>
                <div className="ml-50 flex flex-col">
					<h2 className="text-3xl font-bold my-4">Drone Licence</h2>
					<label
					className="bg-primary-white w-16 h-16 text-gray-700 my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
					>
						<input
						class="hidden"
						type="file" 
						id="fileUpload" 
						accept=".pdf, .png"
						></input>

					</label>
				</div>
            </div>
        </div>
	)
}