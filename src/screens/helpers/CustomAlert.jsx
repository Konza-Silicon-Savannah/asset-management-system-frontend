import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

const CustomAlert = ({message, type = 'info', duration = 5000, onClose, show = true}) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);

        if (show && duration) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (!isVisible) return null;

    const alertStyles = {
        success: {
            background: 'bg-green-50',
            border: 'border-green-400',
            text: 'text-green-700',
            icon: <CheckCircle className="h-5 w-5 text-green-400" />,
        },
        error: {
            background: 'bg-red-50',
            border: 'border-red-400',
            text: 'text-red-700',
            icon: <AlertCircle className="h-5 w-5 text-red-400" />,
        },
        warning: {
            background: 'bg-yellow-50',
            border: 'border-yellow-400',
            text: 'text-yellow-700',
            icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
        },
        info: {
            background: 'bg-blue-50',
            border: 'border-blue-400',
            text: 'text-blue-700',
            icon: <Info className="h-5 w-5 text-blue-400" />,
        },
    };

    const styles = alertStyles[type] || alertStyles.info;

    return (
        <div className={`flex items-center p-3 mb-4 rounded-lg border absolute top-4 right-3 z-[100] ${styles.background} ${styles.border}`} role="alert">
            <div className="flex-shrink-0">{styles.icon}</div>
            <div className={`ml-3 text-sm font-medium ${styles.text}`}>{message}</div>
            <button
                type="button"
                className={`ml-auto -mx-1.5 -my-1.5 ${styles.background} ${styles.text} rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8`}
                onClick={handleClose}
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default CustomAlert;