import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.model';
import { Student } from '../models/studentsignup.model';
import { Teacher } from '../models/teachersignup.model';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { validateRoleIdMiddleware } from '../utils/loginValidator';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type LoginRole = 'student' | 'teacher' | 'admin';

type StudentTeacherRole = Exclude<LoginRole, 'admin'>;

const roleConfig: Record<StudentTeacherRole, { model: typeof Student | typeof Teacher; idField: 'StudentID' | 'TeacherID' }> = {
  student: { model: Student, idField: 'StudentID' },
  teacher: { model: Teacher, idField: 'TeacherID' },
};

export const loginUser = asyncHandler(async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new ApiError(500, 'JWT_SECRET is not configured');
  }

  const { roleInfo } = res.locals as { roleInfo?: { role: LoginRole | null; numericId: string | null } };
  const { role_id, Password } = req.body;
  const loginId = typeof role_id === 'string' ? role_id.trim() : '';

  if (!loginId) {
    throw new ApiError(400, 'role_id is required');
  }

  if (!Password) {
    throw new ApiError(400, 'Password is required');
  }

  const resolvedRole = roleInfo?.role;

  if (resolvedRole === 'student' || resolvedRole === 'teacher') {
    const config = roleConfig[resolvedRole];
    const identifier = `${resolvedRole === 'student' ? 'std' : 'tch'}${roleInfo?.numericId ?? ''}`;

    const user = await (config.model as any).findOne({
      [config.idField]: new RegExp(`^${identifier}$`, 'i'),
    });

    if (!user) {
      throw new ApiError(404, `${resolvedRole} not found`);
    }

    const isPasswordCorrect = await (user as any).isPasswordCorrect(Password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = (jwt as any).sign(
      {
        sub: String((user as any)._id),
        role: resolvedRole,
        role_id: loginId,
        numericId: roleInfo?.numericId,
      },
      JWT_SECRET as any,
      { expiresIn: JWT_EXPIRES_IN },
    );

    const safeUser = {
      _id: String((user as any)._id),
      FullName: (user as any).FullName,
      Email: (user as any).Email,
      role: resolvedRole,
      role_id: identifier,
    };

    return res.status(200).json(
      new ApiResponse(200, { token, user: safeUser }, 'Login successful'),
    );
  }

  const admin = await (Admin as any).findOne({ AdminID: new RegExp(`^${escapeRegex(loginId)}$`, 'i') });

  if (!admin) {
    throw new ApiError(404, 'admin not found');
  }

  const isPasswordCorrect = await (admin as any).isPasswordCorrect(Password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = (jwt as any).sign(
    {
      sub: String((admin as any)._id),
      role: 'admin',
      role_id: loginId,
    },
    JWT_SECRET as any,
    { expiresIn: JWT_EXPIRES_IN },
  );

  const safeUser = {
    _id: String((admin as any)._id),
    FullName: (admin as any).FullName,
    Email: (admin as any).Email,
    role: 'admin' as const,
    role_id: loginId,
  };

  return res.status(200).json(
    new ApiResponse(200, { token, user: safeUser }, 'Login successful'),
  );
});

// Route helper so we can attach validation middleware without creating a second file export.
export const loginValidators = [validateRoleIdMiddleware] as const;
