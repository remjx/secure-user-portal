import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(role, { session }: Ctx) {
  if (!session.userId) return null

  if (role === "superAdmin") {
    const users = await db.user.findMany({
      select: { firstName: true, lastName: true, email: true },
    })
    return users
  }

  return null
}
