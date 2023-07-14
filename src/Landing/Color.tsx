
import "./Color.scss";

interface ColorProps {
    color: string;
    selected: boolean;
    onClick: () => void;
}

export default function Color({color, selected, onClick}: ColorProps) {
    return <button className="Color" style={{backgroundColor:color, scale:selected?2:1 }} onClick={onClick}/>
}
