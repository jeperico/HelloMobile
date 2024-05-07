import IUser from '@/interfaces/IUser'
import { get } from '@/providers/api'

export const findUserById = async (
  userId: string | undefined,
  token: string,
): Promise<IUser> => {
  const result = await get(`management/user/${userId}`, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })
  return result as unknown as Promise<IUser>
}
