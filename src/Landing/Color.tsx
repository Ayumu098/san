
import "./Color.scss";

interface ColorProps {
    color: string;
    selected: boolean;
    onClick: () => void;
}

export default function Color({color, onClick}: ColorProps) {
    return <button className="Color" style={{backgroundColor:color}} onClick={onClick}/>
}
