import Image from "next/image"

function SigInfo({ title, subTitle }: { title: string, subTitle: string }) {
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
            <h2 className="text-2xl font-medium">{title}</h2>
            <p>{subTitle}</p>
        </div>
    )
}

export default SigInfo