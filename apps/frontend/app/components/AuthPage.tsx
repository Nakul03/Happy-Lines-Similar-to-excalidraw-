"use client"
export function AuthPage({isSignin}: {
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white text-black rounded-2xl">
            <div className="p-2 rounded-2xl bg-white">
                <input type="email" placeholder="Email"/>
            </div>
            <div className="p-2 rounded-2xl bg-white">
                <input type="password" placeholder="Password" />
            </div>
            <div className="p-2 rounded-2xl bg-blue-700">
                <button onClick={() => {

                }}>{isSignin ? "Sign in" : "Sign up"}</button>
            </div>
        </div>
    </div>
}