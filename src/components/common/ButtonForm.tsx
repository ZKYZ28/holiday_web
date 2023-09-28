
function ButtonForm({text, style} : {text : string, style : string}) {
    return <button className={style}>{text}</button>;
}
export default ButtonForm