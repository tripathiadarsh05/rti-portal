import { AuditLog } from "@/lib/models"; export function audit(actor,action,entityType,entityId,metadata){return AuditLog.create({actor,action,entityType,entityId,metadata})}
