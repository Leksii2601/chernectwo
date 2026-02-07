export const copyToClipboard = async (text: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    // Standard modern way
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy using navigator.clipboard:', err);
        }
    }

    // Fallback for non-secure contexts or older browsers
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Ensure the textarea is not visible
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        console.error('Fallback copy failed:', err);
        return false;
    }
};
