export default function Key({ value, handleClick, className })
{
    return <button className={className} onClick={() => handleClick(value)}>
            {value}
        </button>
}
