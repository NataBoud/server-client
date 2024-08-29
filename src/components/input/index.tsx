import { useController, type Control } from 'react-hook-form'; // useController est utilisé pour contrôler un champ de formulaire
import type React from 'react'; 
import { Input as NextInput } from '@nextui-org/react'; 

type Props = {
    name: string; 
    label: string; 
    placeholder?: string; 
    type?: string; // Type de l'entrée (par ex., "text", "password") (facultatif)
    control: Control<any>; // Objet de contrôle de formulaire fourni par react-hook-form
    required?: string; // Message d'erreur personnalisé pour le champ requis (facultatif)
    endContent?: JSX.Element; // Contenu à afficher à la fin du champ (facultatif)
}

export const Input: React.FC<Props> = ({
    name,
    label,
    placeholder,
    type,
    control,
    required = '', // Valeur par défaut pour le message d'erreur requis
    endContent
}) => {
    // Utilisation du hook useController pour contrôler le champ de formulaire
    const {
        field, // Propriétés de base du champ d'entrée 
        fieldState: { invalid }, // État du champ (par exemple, si le champ est invalide)
        formState: { errors } // Liste des erreurs du formulaire
    } = useController({
        name, // Nom du champ, utilisé pour le lier au formulaire
        control, // Objet de contrôle de formulaire de react-hook-form
        rules: {
            required // Règle de validation pour indiquer si le champ est requis
        }
    });

    return (
        <NextInput
            id={name} 
            label={label} 
            placeholder={placeholder} 
            value={field.value} // Valeur actuelle du champ
            name={field.name} // Nom du champ d'entrée
            isInvalid={invalid} // Indique si le champ est invalide
            onChange={field.onChange} 
            onBlur={field.onBlur} // Gestionnaire d'événement pour le flou (perte de focus)
            errorMessage={`${errors[name]?.message ?? ''}`} 
            // Si errors[name]?.message est undefined ou null, alors l'expression entière renvoie une chaîne vide ''.
            // Sinon, elle renvoie le message d'erreur réel.
            type={type}
            endContent={endContent}
        />
    );
};
