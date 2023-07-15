
import "./Color.scss";

interface ColorProps {
    color: string;
    selected: boolean;
    onClick: () => void;
}

export default function Color({color, onClick}: ColorProps) {
    // Returns a button with the color as the background
    // Applies an parameterless onClick event to the button
    return <button className="Color" style={{backgroundColor:color}} onClick={onClick}/>
}
