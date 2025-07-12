
import { useMemo } from 'react';
import { useAudit } from '@/contexts/AuditContext';

export const useDashboardMetrics = () => {
  const { getUserAudits } = useAudit();

  return useMemo(() => {
    const userAudits = getUserAudits();
    const totalAudits = userAudits.length;
    const completedAudits = userAudits.filter(audit => audit.status === 'completed');
    
    // Calculate average score (0-100 scale)
    const averageScore = completedAudits.length > 0 
      ? (completedAudits.reduce((sum, audit) => sum + audit.percentageScore, 0) / completedAudits.length)
      : 0;
    
    // Critical issues (audits with score below 60%)
    const criticalIssues = completedAudits.filter(audit => audit.percentageScore < 60).length;
    
    // Excellent audits (score above 80%)
    const excellentAudits = completedAudits.filter(audit => audit.percentageScore >= 80).length;
    
    // Calculate improvement trend
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 2);
    
    const lastMonthAudits = completedAudits.filter(audit => {
      const auditDate = new Date(audit.date);
      return auditDate >= lastMonth && auditDate <= now;
    });
    
    const previousMonthAudits = completedAudits.filter(audit => {
      const auditDate = new Date(audit.date);
      return auditDate >= previousMonth && auditDate < lastMonth;
    });
    
    const lastMonthAvg = lastMonthAudits.length > 0 
      ? lastMonthAudits.reduce((sum, audit) => sum + audit.percentageScore, 0) / lastMonthAudits.length
      : 0;
    
    const previousMonthAvg = previousMonthAudits.length > 0 
      ? previousMonthAudits.reduce((sum, audit) => sum + audit.percentageScore, 0) / previousMonthAudits.length
      : 0;
    
    const improvementTrend = previousMonthAvg > 0 
      ? ((lastMonthAvg - previousMonthAvg) / previousMonthAvg) * 100
      : 0;

    // Compliance rate (audits with score >= 70%)
    const complianceRate = completedAudits.length > 0 
      ? (completedAudits.filter(audit => audit.percentageScore >= 70).length / completedAudits.length) * 100
      : 0;

    return {
      totalAudits,
      completedAudits,
      averageScore,
      criticalIssues,
      excellentAudits,
      improvementTrend,
      lastMonthAudits: lastMonthAudits.length,
      complianceRate,
      userAudits
    };
  }, [getUserAudits]);
};
