import { User } from '../../interfaces/user.interface';

export const authMockUser: { user: User; token: string } = {
  user: {
    id: 'USR-001',
    name: 'Usuario de prueba',
    username: 'USUARIO_PRUEBA',
    role: 'USER_REQUEST',
    createdAt: '2026-10-16T08:30:00Z',
    updateAt: '2026-10-16T08:30:00Z',
  },
  token: 'mytoken'
};
