import "../App.css";
interface Props {
    ans: string;
    setAns : (value: string) => void;
    displayProp:string
}
const Asection: React.FC<Props> = ({ans, setAns, displayProp}) => {
    return (
        <div className="a-section">
            <h3>Your Answer</h3>
            <textarea 
            className="input-box w-[50vw] h-[300px] pt-3"  
            value={ans}
            style={{display:displayProp}}
            onChange={(e) => setAns(e.target.value)}
            name="" id="" />
        </div>
    );
}
export default Asection;