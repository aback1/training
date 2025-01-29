import Icon from '../Icon/Icon';

export default function Header() {
    return (
        <div className="flex items-center bg-blue-100 p-5 ">
            <Icon name="Logo" ending="png" className="w-12 h-12 mr-4" />
            <h1 className="text-2xl text-black">Trainings Projekt Food Ordering</h1>
        </div>
    );
}
