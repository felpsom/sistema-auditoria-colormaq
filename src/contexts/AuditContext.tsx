
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audit, AuditResponse } from '@/types/audit';
import { useAuth } from './AuthContext';
import { getStorageItem, setStorageItem } from '@/utils/storageUtils';

interface AuditContextType {
  audits: Audit[];
  createAudit: (auditData: Omit<Audit, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateAudit: (id: string, auditData: Partial<Audit>) => void;
  getAuditById: (id: string) => Audit | undefined;
  getUserAudits: () => Audit[];
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
};

export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load audits from localStorage on component mount with better validation
    const savedAudits = getStorageItem('5s_audit_data', []);
    
    if (Array.isArray(savedAudits)) {
      // Validate each audit object
      const validAudits = savedAudits.filter(audit => 
        audit && 
        typeof audit.id === 'string' && 
        typeof audit.title === 'string' &&
        typeof audit.auditorId === 'string'
      );
      setAudits(validAudits);
    } else {
      console.warn('Invalid audits data in localStorage, resetting to empty array');
      setAudits([]);
    }
  }, []);

  const saveAuditsToStorage = (updatedAudits: Audit[]) => {
    const success = setStorageItem('5s_audit_data', updatedAudits);
    if (success) {
      setAudits(updatedAudits);
    } else {
      console.error('Failed to save audits to localStorage');
    }
  };

  const createAudit = (auditData: Omit<Audit, 'id' | 'createdAt' | 'updatedAt'>): string => {
    if (!user) {
      throw new Error('User must be authenticated to create audit');
    }

    // Validate required fields
    if (!auditData.title || !auditData.area) {
      throw new Error('Title and area are required to create audit');
    }

    const newAudit: Audit = {
      ...auditData,
      id: Date.now().toString(),
      auditorId: user.id,
      auditorName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('Creating new audit:', newAudit);
    
    const updatedAudits = [...audits, newAudit];
    saveAuditsToStorage(updatedAudits);
    
    return newAudit.id;
  };

  const updateAudit = (id: string, auditData: Partial<Audit>) => {
    if (!id) {
      console.error('Audit ID is required for update');
      return;
    }

    console.log('Updating audit:', id, auditData);
    
    const updatedAudits = audits.map(audit =>
      audit.id === id
        ? { ...audit, ...auditData, updatedAt: new Date().toISOString() }
        : audit
    );
    
    saveAuditsToStorage(updatedAudits);
  };

  const getAuditById = (id: string): Audit | undefined => {
    if (!id) return undefined;
    return audits.find(audit => audit.id === id);
  };

  const getUserAudits = (): Audit[] => {
    if (!user) return [];
    return audits.filter(audit => audit.auditorId === user.id);
  };

  return (
    <AuditContext.Provider value={{
      audits,
      createAudit,
      updateAudit,
      getAuditById,
      getUserAudits
    }}>
      {children}
    </AuditContext.Provider>
  );
};
