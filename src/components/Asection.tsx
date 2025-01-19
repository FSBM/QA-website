import "../App.css";
interface Props {
    ans: string;
    setAns : (value: string) => void;
}
const Asection: React.FC<Props> = ({ans, setAns}) => {
    return (
        <div className="a-section">
            <h3>Your Answer</h3>
            <textarea 
            className="input-box answer"  
            value={ans}
            onChange={(e) => setAns(e.target.value)}
            name="" id="" />
        </div>
    );
}
export default Asection;