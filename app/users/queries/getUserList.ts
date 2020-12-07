import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { role: true },
  })

  if (user.role === "superAdmin") {
    const users = await db.user.findMany({
      select: { firstName: true, lastName: true, email: true },
    })
    return users
  }

  return null
}
