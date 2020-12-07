import React from "react"
import { useMutation, Link } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import signup from "app/auth/mutations/signup"
import { SignupInput } from "app/auth/validations"
import { Heading, Text } from "@chakra-ui/react"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <Heading as="h1">Create an Account</Heading>

      <Form
        submitText="Create Account"
        schema={SignupInput}
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="firstName" label="First Name" placeholder="First Name" />
        <LabeledTextField name="lastName" label="Last Name" placeholder="Last Name" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <LabeledTextField
          name="role"
          label="User Type"
          placeholder="user or superAdmin"
          type="text"
        />
      </Form>

      <Text fontSize="sm" style={{ marginTop: "1rem" }}>
        or <Link href="/login">Log in</Link>
      </Text>
    </div>
  )
}

export default SignupForm
