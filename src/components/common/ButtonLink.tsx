function ButtonLink({ text }: { text: string }) {
    return (
          <li className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">{text}</li>
    )
}

export default ButtonLink