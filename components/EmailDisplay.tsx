
import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface EmailDisplayProps {
  email: string;
}

const EmailDisplay: React.FC<EmailDisplayProps> = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const maskEmail = (email: string) => {
      const [localPart, domain] = email.split('@');
      if (localPart.length <= 5) return `${localPart} @ ${domain}`;
      const maskedLocal = localPart.substring(0, 5) + '*********';
      return `${maskedLocal}@${domain}`;
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [email]);

  return (
    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center justify-between w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pl-3">
            <div className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">KR Korea</div>
            <p className="text-sm font-semibold text-gray-800 hidden sm:block">Student Email:</p>
            <p className="text-sm text-gray-600 font-mono">{maskEmail(email)}</p>
        </div>
        <button 
            onClick={handleCopy}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors duration-200 ${
                copied 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
        >
            {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    </div>
  );
};

export default EmailDisplay;
