import { Ctx } from "blitz"
import db from "db"
import { hashPassword } from "app/auth/auth-utils"
import { SignupInput, SignupInputType } from "app/auth/validations"

export default async function signup(input: SignupInputType, { session }: Ctx) {
  const { email, password, firstName, lastName, role } = SignupInput.parse(input)
  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: {
      email: email.toLowerCase(),
      hashedPassword,
      role,
      firstName,
      lastName,
    },
    select: { id: true, firstName: true, lastName: true, email: true, role: true },
  })

  await session.create({ userId: user.id, roles: [user.role] })

  return user
}
