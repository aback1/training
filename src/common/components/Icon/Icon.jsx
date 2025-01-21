export default function Icon({ name, ending }) {
    return (
        <div className="w-14 h-14 flex items-center justify-center">
            <img src={`/src/assets/${name}.${ending}`} alt={name} className="w-full h-full object-contain" />
        </div>
    );
}
