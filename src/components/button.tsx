


interface Props{
    BtnName:string;
}
export default function Button(BtnName:Props) {

    




    return (
        <>
            <a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[--secondary-violet-color] transition duration-300 ease-out border-2 border-[--secondary-violet-color] rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[--secondary-violet-color] group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">{BtnName.BtnName}</span>
                <span className="relative invisible">{BtnName.BtnName}</span>
            </a>

        </>

    )

}