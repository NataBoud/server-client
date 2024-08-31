type Props = {
    children: string;
    size?: string;
    className?: string; // Nouvelle prop ajoutée pour les classes personnalisées
};

export const Typography: React.FC<Props> = ({ children, size = "text-xl", className = "" }) => {
    return <p className={`${size} ${className}`}>{children}</p>; // Ajout de `className` aux classes
};
