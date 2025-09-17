import React from 'react';
import { validatePassword } from '@/lib/security';

interface PasswordStrengthProps {
  password: string;
  showValidation?: boolean;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, showValidation = true }) => {
  const validation = validatePassword(password);
  
  const getStrengthColor = (score: number) => {
    if (score < 30) return 'text-red-500';
    if (score < 60) return 'text-yellow-500';
    if (score < 80) return 'text-blue-500';
    return 'text-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score < 30) return 'Very Weak';
    if (score < 60) return 'Weak';
    if (score < 80) return 'Good';
    return 'Strong';
  };

  const getProgressWidth = (score: number) => {
    return `${Math.max(0, Math.min(100, score))}%`;
  };

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>Password Strength:</span>
        <span className={`font-medium ${getStrengthColor(validation.score)}`}>
          {getStrengthText(validation.score)}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            validation.score < 30 ? 'bg-red-500' :
            validation.score < 60 ? 'bg-yellow-500' :
            validation.score < 80 ? 'bg-blue-500' : 'bg-green-500'
          }`}
          style={{ width: getProgressWidth(validation.score) }}
        />
      </div>

      {showValidation && validation.errors.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-red-600">Password requirements:</p>
          <ul className="text-sm text-red-600 space-y-1">
            {validation.errors.map((error, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-red-500">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showValidation && validation.isValid && (
        <div className="text-sm text-green-600 flex items-center gap-2">
          <span className="text-green-500">✓</span>
          Password meets all security requirements
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;


