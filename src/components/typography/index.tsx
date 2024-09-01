type Props = {
    children: string;
    size?: string;
    className?: string;
};

export const Typography: React.FC<Props> = ({ children, size = "text-l", className = "" }) => {
    return <p className={`${size} ${className}`}>{children}</p>;
};
