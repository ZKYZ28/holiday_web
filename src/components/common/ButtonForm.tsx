function ButtonForm({ text }: { text: string }) {
    return (
        <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">{text}</button>
    )
}

export default ButtonForm