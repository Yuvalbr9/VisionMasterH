import React from 'react';
import { Length } from 'unitsnet-js';
import { CCRPItem } from './CCRPItem';

interface CCRPControlsProps {
  ccrpPS: Length;
  ccrpFA: Length;
  stemPS: Length;
  onCcrpPSChange: (value: Length) => void;
  onCcrpFAChange: (value: Length) => void;
  onStemPSChange: (value: Length) => void;
}

export const CCRPControls: React.FC<CCRPControlsProps> = ({ 
  ccrpPS, 
  ccrpFA, 
  stemPS,
  onCcrpPSChange,
  onCcrpFAChange,
  onStemPSChange
}) => {
  return (
    <div className="ccrp-group">
      <CCRPItem label="CCRP P/S" value={ccrpPS} onChange={onCcrpPSChange} />
      <CCRPItem label="CCRP F/A" value={ccrpFA} onChange={onCcrpFAChange} />
      <CCRPItem label="Stem P/S" value={stemPS} onChange={onStemPSChange} />
    </div>
  );
};
