import type { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError';

// Result returned by the validator
export interface RoleIdValidationResult {
  isValid: boolean;
  role: 'student' | 'teacher' | null;
  // numeric part extracted from the id (digits only) as a string
  numericId: string | null;
}

/**
 * validateRoleId
 * - Validates `role_id` for student and teacher ID patterns using strict regex.
 * - Student pattern: ^std(\d+)$  (case-insensitive)
 * - Teacher pattern: ^tch(\d+)$  (case-insensitive)
 * - Rejects trailing characters, spaces or symbols.
 * Returns an object with `isValid`, `role` and `numericId`.
 */
export function validateRoleId(role_id: unknown): RoleIdValidationResult {
  if (typeof role_id !== 'string' || role_id.trim() === '') return { isValid: false, role: null, numericId: null };

  // Trim is intentionally NOT applied because spaces should make the id invalid.
  // Use case-insensitive regex anchored to start/end so only exact matches pass.
  const studentRegex = /^std(\d+)$/i;
  const teacherRegex = /^tch(\d+)$/i;

  const studentMatch = role_id.match(studentRegex);
  if (studentMatch) {
    return { isValid: true, role: 'student', numericId: studentMatch[1] ?? null };
  }

  const teacherMatch = role_id.match(teacherRegex);
  if (teacherMatch) {
    return { isValid: true, role: 'teacher', numericId: teacherMatch[1] ?? null };
  }

  return { isValid: false, role: null, numericId: null };
}

/**
 * Express middleware wrapper (optional)
 * - Reads `role_id` from `req.body.role_id` and validates it.
 * - On success attaches `{ role, numericId }` to `res.locals.roleInfo` and calls `next()`.
 * - On failure throws `ApiError(400, ...)` so existing globalErrorHandler can handle responses.
 */
export function validateRoleIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const { role_id } = req.body ?? {};
  if (typeof role_id !== 'string' || role_id.trim() === '') {
    throw new ApiError(400, 'role_id is required');
  }

  const result = validateRoleId(role_id);

  // attach parsed data for downstream handlers
  res.locals.roleInfo = { role: result.role, numericId: result.numericId };
  return next();
}

export default validateRoleId;
