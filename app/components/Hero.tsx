import ChooseFileButton from "./ChooseFileButton"

function Hero() {
    return (
        <section className="flex gap-y-28 relative justify-center items-center flex-col bg-[--hero-section] w-full py-16 min-h-[500px]">
            <h2 className="gap-5 text-[--sub-font] text-2xl font-light">Easily create your quiz from a PDF in sencods.</h2>
            <ChooseFileButton />
            <h2 className="font-bold text-xl text-[--sub-font]">How to Create Quiz from a PDF</h2>

            <div className="flex max-w-[1200px] flex-wrap justify-center w-full xl:justify-between gap-8 px-4">
                <div className="flex items-center gap-4">
                    <span className="bg-white border border-[#cecece] flex items-center justify-center rounded-full w-8 h-8 text-[--main-color] font-bold">
                        1
                    </span>
                    <p className="text-[--sub-font] text-lg font-light max-w-[300px]">
                        Select the PDF file from which you wish to create the quiz.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="bg-white border border-[#cecece] flex items-center justify-center rounded-full w-8 h-8 text-[--main-color] font-bold">
                        2
                    </span>
                    <p className="text-[--sub-font] text-lg font-light max-w-[300px]">
                        Our system will analyze your PDF file and create a quiz with 20 questions about it.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="bg-white border border-[#cecece] flex items-center justify-center rounded-full w-8 h-8 text-[--main-color] font-bold">
                        3
                    </span>
                    <p className="text-[--sub-font] text-lg font-light max-w-[300px]">
                        After this process, your form will be created and you could ask your questions and send it for validation automatically and easily.
                    </p>
                </div>
            </div>

        </section>
    )
}

export default Hero