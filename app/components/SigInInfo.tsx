import Image from "next/image"

function SigInInfo() {
    return (
        <div className="max-w-[400px] flex gap-y-2 flex-col">
            <Image
                src="/info.png"
                alt="Login"
                width={350}
                height={150}
                style={{ width: "auto", height: "auto" }}
                className="w-full h-auto object-contain"
                quality={100}
            />
            <h2 className="text-2xl font-medium">Log in to your workspace</h2>
            <p>Enter your email and password to access your QuizAI account. You're just one step away from creating awesome tests to boost your learning speed.</p>
        </div>
    )
}

export default SigInInfo