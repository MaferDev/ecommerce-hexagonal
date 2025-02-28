export interface IUserRepository {
  getAllUsers(): { id: number; name: string }[];
}
